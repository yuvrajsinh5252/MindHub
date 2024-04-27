import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { uploadCourse, useCreatorCourse, useGithubUser } from '@/querries/db';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { Loader2, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import CouresUpload1 from '@/components/courses/CourseUpload-1';
import CouresUpload2 from '@/components/courses/CourseUpload-2';
import { CourseContext } from '@/components/courses/CourseContext';
import CourseBox from '@/components/courses/CourseBox';

export const Route = createFileRoute('/_studio/creator-studio')({
  component: creatorStudio,
})

function creatorStudio() {
  const { formData, dataSaved } = React.useContext(CourseContext);

  const [open, setOpen] = useState(false);
  const [next, setNext] = useState(false);

  const { toast } = useToast();

  const { data: user, isSuccess, error, isLoading: userLoading } = useGithubUser();
  const uploadMutation = useMutation({ mutationFn: uploadCourse })
  const { data: courseData, isLoading } = useCreatorCourse({ variables: { id: user?.data.id }, enabled: !!user?.data.id });

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
      <div>
        {
          isLoading || userLoading ? (
            <div className="h-[calc(100vh-12rem)] flex justify-center items-center">
              <div className="flex flex-col items-center gap-5">
                <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
                <div className="text-lg font-semibold dark:text-white text-gray-500 text-center w-72 px-5 py-2">
                  Loading...
                </div>
              </div>
            </div>
          ) : (
            courseData && courseData.data.length > 0 ? (
              <div className='h-[calc(100vh-12rem)] flex pt-4 pl-4 gap-5'>
                {
                  courseData?.data.map((course: any, index: number) => (
                    <CourseBox key={index} course={course} index={index} />
                  ))
                }
              </div>
            ) : (
              <div className="h-[calc(100vh-12rem)] flex justify-center items-center">
                <div className="flex flex-col items-center gap-5">
                  <img src="/EmptyState.png" alt="image" className="rounded-md h-32 w-32" />
                  <div className="text-lg font-semibold dark:text-white text-gray-500 text-center w-72 px-5 py-2">
                    Pretty much empty here...
                  </div>
                </div>
              </div>
            )
          )
        }
      </div>
    </div>
  );
}