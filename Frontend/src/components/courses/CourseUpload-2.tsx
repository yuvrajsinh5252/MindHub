import React, { useEffect } from "react";
import { CourseContext } from "./CourseContext";

export default function CouresUpload2() {
  const { formData, setFormData } = React.useContext(CourseContext);
  const [video, setVideo] = React.useState<File | null>(null);

  useEffect(() => {
    if (video) {
      const formDatas = formData!;
      if (formDatas.get("courseVideo") && formDatas.get("courseVideo") !== video) formDatas.delete("courseVideo");
      else formDatas.append("courseVideo", video!);
      setFormData(formDatas);
    }
  }, [video]);

  return (
    <div>
      <form>
        <div className="flex flex-col justify-center items-center gap-10">
          <div className="h-72 w-[500px] border-2 rounded-lg flex justify-center items-center bg-gray-200">
            {
              !video ? (
                <p className="text-lg text-gray-600">No video uploaded</p>
              ) : (
                <video src={URL.createObjectURL(video)} className="h-72 w-[500px]" controls />
              )
            }
          </div>
          <div className="flex justify-between w-[500px]">
            <label htmlFor="courseVideo" className="text-lg text-gray-600">
              Course Video
            </label>
            <input onChange={(e) => setVideo(e.target.files?.item(0)!)} type="file" name="courseVideo" className='cursor-pointer w-52' id="courseVideo" />
          </div>
        </div>
      </form>
    </div>
  )
}