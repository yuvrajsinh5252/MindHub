import { Plus } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CourseContext } from "./CourseContext";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

export default function CouresUpload1() {
  const [courseImage, setCourseImage] = useState<File>();
  const tags: { [key: string]: boolean } = {};
  const [customTags, setCustomTags] = useState<string[]>([
    "Beginner", "Intermediate", "Advanced", "Professional", "Certified"
  ]);
  const { setFormData, setDataSaved, dataSaved } = React.useContext(CourseContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("courseTitle", (e.target as any).courseTitle.value);
    formData.append("courseCategory", (e.target as any).courseCategory.value);
    formData.append("courseDescription", (e.target as any).courseDescription.value);
    formData.append("courseImage", courseImage!);

    setFormData(formData)
    setDataSaved(true);
  }

  return (
    <div className="bg-background text-foreground">
      <form onSubmit={handleSubmit}>
        <div className='flex justify-between'>
          <div className='pt-2'>
            <Label className="flex flex-col gap-3 p-2">
              Course Title
              <Input type="text" name="courseTitle" id="courseTitle" required placeholder="Enter course title" />
            </Label>
            <Label className="flex flex-col gap-3 p-2">
              Course Category
              <Input type="text" name="courseCategory" id="courseCategory" required placeholder="Enter course category" />
            </Label>
            <div className='flex flex-col gap-3'>
              <div
                className="flex flex-wrap gap-3 p-2 text-sm"
                onClick={(e) => {
                  if ((e.target as HTMLSpanElement).tagName === "SPAN") {
                    const target = e.target as HTMLSpanElement;
                    if (tags[target.innerText]) {
                      delete tags[target.innerText];
                      target.classList.remove("border-gray-600");
                    } else {
                      target.classList.add("border-gray-600");
                      tags[target.innerText] = true;
                    }
                  }
                }}>
                {/* custom tags */}
                {
                  customTags.map((tag, index) => (
                    <span key={index} className="border-2 border-border rounded-md p-1 cursor-pointer">
                      {tag}
                    </span>
                  ))
                }
                <div className="flex">
                  <Input type="text" placeholder="custom tags" className=" text-center border-2 h-9 w-52 rounded-s-full border-border" />
                  <Plus
                    onClick={(e) => {
                      const target = e.target as HTMLInputElement;
                      const inputField = target.parentElement?.children[0] as HTMLInputElement;

                      if (inputField.value) tags[inputField.value] = true;
                      setCustomTags([...customTags, inputField.value]);
                    }}
                    className="rounded-e-full border-e-2 border-y-2 cursor-pointer h-9 border-border p-2" size={45} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full border-border border-2 rounded-md m-5 py-4 justify-center items-center gap-3 p-2">
            <Label htmlFor="courseImage" className="text-md">
              Upload Course Image
            </Label>
            <img
              src={courseImage ? URL.createObjectURL(courseImage) : "https://via.placeholder.com/150"}
              alt="image" className="rounded-md" />
            <Input
              type='file'
              required
              className='cursor-pointer w-52'
              onChange={(e) => setCourseImage(e.target.files?.item(0) as File)}
            />
          </div>
        </div>
        <Label className="flex flex-col gap-3 p-2">
          Course Description
          <Textarea name="courseDescription" required id="courseDescription" placeholder="Enter course description" rows={4} />
        </Label>
        <Button className='ml-2 mt-2' type="submit">{
          dataSaved ? "Data Saved" : "Save"
        }</Button>
      </form>
    </div>
  )
}