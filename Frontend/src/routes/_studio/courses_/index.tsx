import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { uploadCourse, useGithubUser } from '@/querries/db';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { PlusIcon, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import CouresUpload1 from '@/components/courses/CourseUpload-1';
import CouresUpload2 from '@/components/courses/CourseUpload-2';
import { CourseContext } from '@/components/courses/CourseContext';
import CourseTable from '@/components/courses/Course-table';

export const Route = createFileRoute('/_studio/courses/')({
  component: creatorStudio,
})

function creatorStudio() {
  const { formData, dataSaved } = React.useContext(CourseContext);

  const [open, setOpen] = useState(false);
  const [next, setNext] = useState(false);

  const { toast } = useToast();

  const { data: user, isSuccess, error, isLoading: userLoading } = useGithubUser();
  const uploadMutation = useMutation({ mutationFn: uploadCourse })

  function handleCourseUpload() {
    if (isSuccess) {
      formData.append("userId", user?.data.id.toString());
      uploadMutation.mutate(formData);
    } else {
      toast({
        title: 'Did not get user data!',
        description: `${error}`,
        variant: 'default',
        duration: 4000,
      });
    }
  }

  useEffect(() => {
    if (uploadMutation.isSuccess) {
      toast({
        title: 'Course uploaded successfully!',
        description: 'You can now view your course in the courses section',
        duration: 4000,
      });

      setTimeout(() => {
        setNext(false);
        setOpen(false);
      }, 4000);
    }
  }, [uploadMutation.isSuccess]);

  return (
    <div className=' dark:bg-secondary'>
      <div className="flex justify-between p-2 pr-20 h-24 mb-2 font-[600]">
        <div>
          <div className="text-3xl my-auto font-semibold space-y-3">
            Your Courses
          </div>
          <p className='text-gray-400'>
            This is where you can view and manage your courses.
          </p>
        </div>
        <div className='my-auto'>
          <Button
            onClick={() => setOpen(true)}
            variant="outline">
            <PlusIcon className="h-6 w-6 mr-2" />
            Create Courses
          </Button>
          <Dialog open={open}>
            <DialogContent className="max-w-[800px]">
              <X className="absolute top-1 cursor-pointer right-1 dark:text-white" onClick={() => setOpen(false)} />
              <DialogHeader>
                <DialogDescription>
                  {
                    !next ? <>Create your course here by adding the course name and description below.</> : <></>
                  }
                </DialogDescription>
                <DialogTitle>
                  {
                    !next ? <></> :
                      uploadMutation.isPending ? (
                        <div className="bg-blue-400 text-center text-white p-2 rounded-md m-2">Uploading...</div>
                      ) : uploadMutation.isError ? (
                        <div className="bg-red-500 text-center text-white p-2 rounded-md m-2">Error uploading file</div>
                      ) : uploadMutation.isSuccess ? (
                        <div className="bg-green-500 text-center text-white p-2 rounded-md m-2">File uploaded successfully</div>
                      ) : (
                        <div className="bg-blue-500 text-center text-white p-2 rounded-md m-2">Upload your course</div>
                      )
                  }
                </DialogTitle>
              </DialogHeader>
              {
                !next ? <CouresUpload1 /> : <CouresUpload2 />
              }
              <DialogFooter>
                <Button onClick={() => {
                  if (next) handleCourseUpload();
                  else {
                    if (dataSaved) setNext(true);
                    else alert("Please save the course details first");
                  }
                }}>
                  {
                    next ? "Upload Course" : "Next"
                  }
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <CourseTable user={user} userLoading={userLoading} />
    </div>
  );
}