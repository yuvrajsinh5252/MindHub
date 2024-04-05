import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { handleUpload, useGithubUser } from '@/querries/db';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { X } from 'lucide-react';
import { useRef, useState } from 'react';
import CouresUpload1 from '@/components/studio/CourseUpload-1';

export const Route = createFileRoute('/_studio/creator-studio')({
  component: creatorStudio,
})

function studio() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [img, setImg] = useState<File>();
  const [video, setVideo] = useState<File>();
  const [type, setType] = useState<string>("");
  const { toast } = useToast();

  const { data: user, isSuccess, error } = useGithubUser();
  const uploadMutation = useMutation({ mutationFn: handleUpload })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", type === "image" ? img! : video!);
    formData.append("upload_preset", type === "image" ? "image_preset" : "videos_preset");

    if (isSuccess) {
      if ((type === "image" && img != null) || (type === "video" && video != null)) {
        formData.append("userId", user?.data.id.toString());
        uploadMutation.mutate(formData);
      } else {
        toast({
          title: 'Error uploading file!',
          description: 'Please select a file to upload',
          variant: 'default',
          duration: 4000,
        });
      }
    } else {
      toast({
        title: 'Did not get user data!',
        description: `${error}`,
        variant: 'default',
        duration: 4000,
      });
    }
    formRef.current?.reset();
  };


  return (
    <div>
      {!isSuccess && <div>Loading...</div>}
      {
        uploadMutation.isPending ? (
          <div className="bg-blue-500 text-white p-2 rounded-md m-2">Uploading...</div>
        ) : uploadMutation.isError ? (
          <div className="bg-red-500 text-white p-2 rounded-md m-2">Error uploading file</div>
        ) : uploadMutation.isSuccess ? (
          <div className="bg-green-500 text-white p-2 rounded-md m-2">File uploaded successfully</div>
        ) : (
          <div className="bg-blue-500 text-white p-2 rounded-md m-2">Upload an image or video</div>
        )
      }
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

function creatorStudio() {
  const [open, setOpen] = useState(false);

  return (
    <div className='divide-y-2'>
      <div className="flex justify-between p-2 pr-20 h-24 mb-2 font-[600]">
        <div className="text-3xl my-auto font-semibold space-y-3">
          Your Courses
        </div>
        <div className='my-auto'>
          <Button
            onClick={() => setOpen(true)}
            variant="outline">
            Create Courses
          </Button>
          <Dialog open={open}>
            <DialogContent className="max-w-[800px]">
              <X className="absolute top-1 cursor-pointer right-1 dark:text-white" onClick={() => setOpen(false)} />
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription>
                  Create your course here by adding the course name and description below.
                </DialogDescription>
              </DialogHeader>
              <CouresUpload1 />
              <DialogFooter>
                <Button>next</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>
      </div>
      <div>
        <div className="absolute right-[42%] top-[40%]">
          <div className="flex flex-col items-center gap-5">
            <img src="/EmptyState.png" alt="image" className="rounded-md h-32 w-32" />
            <div className="text-lg font-semibold dark:text-white text-gray-500 text-center w-72 px-5 py-2">
              Pretty much empty here...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}