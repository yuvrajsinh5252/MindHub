import db from "../db";
import { course } from "../db/schema";

export const getViewerCourse = async () => {
  try {
    const courses = await db.select().from(course);
    return courses;
  } catch (error) {
    console.log(error);
    return "Something went wrong while fetching viewer courses";
  }
};
