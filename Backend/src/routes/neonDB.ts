import { eq } from "drizzle-orm";
import db from "../db";
import { File, course, creators, users, viewer } from "../db/schema";

interface file {
  secure_url: string;
  original_filename: string;
  resource_type: string;
  bytes: number;
  asset_id: string;
}

export const createUser = async (set: any, body: any) => {
  const { id, username } = body;

  if (!id || !username) {
    set.status(400);
    return "Invalid input";
  }

  try {
    // first check if user already exists
    const user = await db.select().from(users).where(eq(users.id, id));
    if (user.length > 0) return "User already exists";
    else {
      const newUser = await db.insert(users).values({
        id: id,
        name: username,
      });

      return newUser.rows[0];
    }
  } catch (error) {
    console.log(error);
    set.status(500);
    return "Something went wrong while creating user";
  }
};

export const setRole = async (body: any) => {
  const { id, role } = body;

  try {
    const user = await db.select().from(users).where(eq(users.id, id));

    if (user.length == 0) return "User not found";
    else {
      if (role == "creator") {
        const typeCreator = await db.insert(creators).values({ id: id });
        return typeCreator.rows[0];
      } else if (role == "user") {
        const typeViewer = await db.insert(viewer).values({ id: id });
        return typeViewer.rows[0];
      }
    }
  } catch (error) {
    console.log(error);
    return "Something went wrong while updating user role";
  }
};

export const getRole = async (body: any) => {
  try {
    const creatorRole = await db
      .select()
      .from(creators)
      .where(eq(creators.id, body.id));

    const viewerRole = await db
      .select()
      .from(viewer)
      .where(eq(viewer.id, body.id));

    if (creatorRole.length > 0) return "creator";
    else if (viewerRole.length > 0) return "viewer";
    else return "not set yet";
  } catch (error) {
    console.log(error);
    return "Something went wrong while fetching user role";
  }
};

export const uploadCourse = async (set: any, body: any) => {
  const courseTitle = body.courseTitle;
  const courseDescription = body.courseDescription;
  const courseCategory = body.courseCategory;
  const courseCreator = body.userId;

  const formdata = new FormData();
  formdata.append("file", body.courseImage);
  formdata.append("upload_preset", "image_preset");

  let cloudName: string = "dp6puihqw";
  let resourceType: string = "image";
  let url: string = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

  const response = await fetch(url, {
    method: "POST",
    body: formdata,
  }).then((res) => res.json());

  const { secure_url: secure_url_image }: { secure_url: string } = response;

  resourceType = "video";
  formdata.delete("file");
  formdata.append("file", body.courseVideo);
  formdata.delete("upload_preset");
  formdata.append("upload_preset", "videos_preset");
  url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

  const VideoResponse = await fetch(url, {
    method: "POST",
    body: formdata,
  }).then((res) => res.json());

  const {
    secure_url: secure_url_video,
    original_filename: original_filename_video,
    resource_type: resource_type_video,
    bytes: bytes_video,
    asset_id: asset_id_video,
  }: file = VideoResponse;

  try {
    await db.insert(File).values({
      id: asset_id_video,
      name: original_filename_video,
      type: resource_type_video,
      url: secure_url_video,
      size: bytes_video,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.log(error);
    set.status(500);
    return "Something went wrong while uploading file";
  }

  try {
    await db.insert(course).values({
      creator_id: courseCreator,
      name: courseTitle,
      courseUrl: secure_url_image,
      file_id: asset_id_video,
      description: courseDescription,
      courseTags: courseCategory,
      category: courseCategory,
    });
  } catch (error) {
    console.log(error);
    set.status(500);
    return "Something went wrong while uploading course";
  }

  return "file uploaded";
};

export const getCreatorCourse = async (body: any) => {
  const creatorId = body.id;

  try {
    const courses = await db
      .select()
      .from(course)
      .where(eq(course.creator_id, creatorId));

    return courses;
  } catch (error) {
    console.log(error);
    return "Something went wrong while fetching creator courses";
  }
};

export const getViewerCourse = async () => {
  try {
    const courses = await db.select().from(course);
    return courses;
  } catch (error) {
    console.log(error);
    return "Something went wrong while fetching viewer courses";
  }
};

export const getCourseFile = async (body: any) => {
  const courseId = body.id;

  console.log(courseId);

  try {
    const courseFile = await db
      .select()
      .from(File)
      .where(eq(File.id, courseId));

    return courseFile;
  } catch (error) {
    console.log(error);
    return "Something went wrong while fetching course file";
  }
};
