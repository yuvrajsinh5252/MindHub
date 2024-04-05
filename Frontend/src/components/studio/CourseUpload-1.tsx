import { ArrowBigRight, Plus } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function CouresUpload1() {
  const [courseImage, setCourseImage] = useState<File>();
  const tags: { [key: string]: boolean } = {};

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(tags);
    e.preventDefault();
    const formData = new FormData();

    formData.append("courseTitle", (e.target as any).courseTitle.value);
    formData.append("courseCategory", (e.target as any).courseCategory.value);
    formData.append("courseDescription", (e.target as any).courseDescription.value);

    localStorage.setItem("courseData", JSON.stringify(Object.fromEntries(formData.entries())));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='flex justify-between'>
          <div className='pt-2'>
            <div className="flex flex-col gap-3 p-2">
              <span className='flex gap-2 items-center'>
                <ArrowBigRight className="text-blue-500" />
                <label htmlFor="courseTitle" className="text-md hover:underline underline-offset-4">Course Title</label>
              </span>
              <Input type="text" name="courseTitle" id="courseTitle" required placeholder="Enter course title" />
            </div>
            <div className="flex flex-col gap-3 p-2">
              <span className='flex gap-2 items-center'>
                <ArrowBigRight className="text-blue-500" />
                <label htmlFor="courseCategory" className="text-md hover:underline underline-offset-4">Course Category</label>
              </span>
              <Input type="text" name="courseCategory" id="courseCategory" required placeholder="Enter course category" />
            </div>
            <div className='flex flex-col gap-3 p-2'>
              <span className='flex gap-2 items-center'>
                <ArrowBigRight className="text-blue-500" />
                <label htmlFor="courseCategory" className="text-md hover:underline underline-offset-4">
                  Course Tags
                </label>
              </span>
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
                <span className='rounded-xl bg-blue-300 border-2 p-2'>Machine learning-ML</span>
                <span className='rounded-xl bg-blue-300 border-2 p-2'>Adaptive AI</span>
                {/* custom tags */}
                <div className="flex">
                  <input type="text" placeholder="custom tags" className=" text-center border-2 h-9 w-52 rounded-s-full border-gray-400" />
                  <Plus
                    onClick={(e) => {
                      const target = e.target as HTMLInputElement;
                      const inputField = target.parentElement?.children[0] as HTMLInputElement;

                      if (inputField.value) tags[inputField.value] = true;
                    }}
                    className="text-black rounded-e-full border-e-2 border-y-2 cursor-pointer h-9 border-gray-400 p-2" size={45} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full border-2 rounded-md m-5 py-4 justify-center items-center gap-3 p-2">
            <label htmlFor="courseImage" className="text-lg text-gray-600">
              Upload Course Image
            </label>
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
        <div className="flex flex-col gap-3 p-2">
          <span className='flex gap-2 items-center'>
            <ArrowBigRight className="text-blue-500" />
            <label htmlFor="courseDescription" className="text-md hover:underline underline-offset-4">Course Description</label>
          </span>
          <textarea name="courseDescription" required id="courseDescription" placeholder="Enter course description" className="p-2 w-full h-40 border-2 border-gray-400 rounded-md" />
        </div>
        <Button className='ml-2' type="submit">Save</Button>
      </form>
    </div>
  )
}