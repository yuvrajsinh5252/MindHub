import db from "../db";
import { File, course, creators, users, viewer } from "../db/schema";
import { eq } from "drizzle-orm";

interface file {
  secure_url: string;
  original_filename: string;
  resource_type: string;
  bytes: number;
  asset_id: string;
}

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
