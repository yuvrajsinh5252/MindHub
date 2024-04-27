import React, { useEffect } from "react";
import { CourseContext } from "./CourseContext";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";

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
    <div className="text-foreground bg-background">
      <form>
        <div className="flex flex-col justify-center items-center gap-10">
          <div className="h-72 w-[500px] border-2 border-border rounded-lg flex justify-center items-center">
            {
              !video ? (
                <p className="text-lg">No video uploaded</p>
              ) : (
                <video src={URL.createObjectURL(video)} className="h-72 w-[500px]" controls />
              )
            }
          </div>
          <Label className="text-lg flex justify-between w-[500px]">
            Course Video
            <Input onChange={(e) => setVideo(e.target.files?.item(0)!)} type="file" name="courseVideo" className='cursor-pointer w-52' id="courseVideo" />
          </Label>
        </div>
      </form>
    </div>
  )
}