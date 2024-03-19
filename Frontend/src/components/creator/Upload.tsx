import { useRef, useState } from "react";
import { getUrl, handleUpload, setUrl } from "src/querries/db";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface UploadProps {
    img: File | null;
    video: File | null;
    type: string;
}

export default function Upload() {
    const formRef = useRef<HTMLFormElement | null>(null);
    const queryClient = useQueryClient();

    const [img, setImg] = useState<File | null>(null);
    const [video, setVideo] = useState<File | null>(null);
    const [type, setType] = useState<string>("");

    const { data: getVideoSrc, isLoading } = useQuery({
        queryKey: ['video'],
        queryFn: () => getUrl(117096680),
    })

    const setUrlMutation = useMutation({mutationFn: setUrl,
        onSuccess: () => {queryClient.invalidateQueries({ queryKey: ['video'] })}
    })

    const uploadMutation = useMutation({
        mutationFn: handleUpload,
        onSuccess: (data) => {
            setUrlMutation.mutate({url: data?.secure_url, id: 117096680});

        },
        onError: (error) => {
            console.log("Error uploading file", error);
        }
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const uploadData: UploadProps = { img, video, type };
        uploadMutation.mutate(uploadData);
        formRef.current?.reset();
    };

    return (
        <div>
            <form ref={formRef} onSubmit={handleSubmit}>
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
                {
                    isLoading ? <div>Loading...</div> : (
                        getVideoSrc?.data != "error" &&
                        getVideoSrc?.data.map((item: {url: string, id: number}) => {
                            return (
                                <video key={item.id} src={item.url} controls width="400" height="300" />
                            )
                        })
                    )
                }
            </div>
        </div>
    );
}