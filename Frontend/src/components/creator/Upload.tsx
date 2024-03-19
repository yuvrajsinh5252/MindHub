import { useState } from "react";
import { handleUpload } from "src/querries/db";
import { useMutation } from "@tanstack/react-query";
import axios from "src/api/axios";

interface UploadProps {
    img: File | null;
    video: File | null;
    type: string;
}

export default function Upload() {
    const [img, setImg] = useState<File | null>(null);
    const [video, setVideo] = useState<File | null>(null);
    const [type, setType] = useState<string>("");
    const [videoUrl, setVideoUrl] = useState<string>("");
    const [imgUrl, setImgUrl] = useState<string>("");

    const uploadMutation = useMutation({
        mutationFn: handleUpload,
        onSuccess: (data) => {
            (data?.type == "image" ? setImgUrl(data?.secure_url) : setVideoUrl(data?.secure_url));
        },
        onError: (error) => {
            console.log("Error uploading file", error);
        }
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const uploadData: UploadProps = { img, video, type };
        uploadMutation.mutate(uploadData);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5 items-center pt-10">
                    <div>
                        <label htmlFor="image" className="bg-blue-500 w-24 text-white p-2 rounded-md m-2">Upload Image</label>
                        <input type="file" name="image" accept="image/*"
                            onChange={(e) => {
                                setImg(e.target.files?.item(0) as File)
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
            {uploadMutation.isPending && <div>Uploading...</div>}
            <div className="flex justify-center">
                <video width="480" height="320" controls>
                    <source src={videoUrl} type="video/mp4" />
                </video>
            </div>
        </div>
    );
}