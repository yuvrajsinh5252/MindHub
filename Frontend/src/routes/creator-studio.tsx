import { handleUpload } from '@/querries/db';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { useRef, useState } from 'react';

interface UploadProps {
  formData: FormData;
  type: string;
}

export const Route = createFileRoute('/creator-studio')({
  component: studio,
})

function studio() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [img, setImg] = useState<File>();
  const [video, setVideo] = useState<File>();
  const [type, setType] = useState<string>("");

  const uploadMutation = useMutation({
    mutationFn: handleUpload,
    onSuccess: () => {
      console.log("File uploaded successfully");
    },
    onError: (error) => {
      console.log("Error uploading file", error);
    }
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", type === "image" ? img! : video!);
    formData.append("upload_preset", type === "image" ? "image_preset" : "videos_preset");

    const uploadData: UploadProps = { formData, type };
    uploadMutation.mutate(uploadData);
    formRef.current?.reset();
  };


  return (
    <div>
      <form ref={formRef} onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="flex flex-col gap-5 items-center pt-10">
          <div>
            <label htmlFor="image" className="bg-blue-500 w-24 text-white p-2 rounded-md m-2">Upload Image</label>
            <input type="file" name="image" accept="image/*"
              onChange={(e) => {
                setImg(e.target.files?.item(0)!)
                setType("image")
              }}
            />
          </div>
          <div>
            <label htmlFor="video" className="bg-blue-500 w-24 text-white p-2 rounded-md m-2">Upload Video</label>
            <input type="file" name="video" accept="video/*"
              onChange={(e) => {
                setVideo(e.target.files?.item(0) as File)
                setType("video")
              }}
            />
          </div>
          <button className="bg-blue-500 w-24 text-white p-2 rounded-md m-2" type="submit">Upload</button>
        </div>
      </form>
    </div>
  );
}