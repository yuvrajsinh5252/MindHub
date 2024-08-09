import Stepper from '@/components/Stepper';
import Roles from '@/components/roles';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import useAuth from '@/hook/useAuth';
import { useUserRole } from '@/querries/db';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/onboarding')({
  component: OnBoarding,
})

function OnBoarding() {
  const { user, loading: userLoading, error: userError } = useAuth();
  const { data: role, isLoading: roleLoading, error: roleError, refetch } = useUserRole({ variables: { id: user?.id }, enabled: !!user?.id });
  const navigate = useNavigate();
  const [pageParam, setPageParam] = useState(1);

  useEffect(() => {
    if (role?.data == "viewer" && pageParam == 1) navigate({ to: '/dashboard' })
    else if (role?.data === "creator" && pageParam == 1) navigate({ to: '/creator-dashboard' })
  })

  if (roleError || userError) {
    return (
      <div className='h-screen flex justify-center items-center flex-col dark:bg-zinc-800 dark:text-white'>
        <h1>Something went wrong</h1>
        {roleError && <p>{roleError.message}</p>}
        {userError && <p>{userError}</p>}
      </div>
    )
  }

  return (
    <div>
      {
        roleLoading || userLoading ? (
          <div className='h-screen flex justify-center items-center flex-col'>
            Checking your role...
          </div>
        ) : (
          <Wizard role={role?.data} setPageParam={setPageParam} refetch={refetch} />
        )
      }
    </div >
  )
}

function Wizard({ role, setPageParam, refetch }: { role: string, setPageParam: any, refetch: any }) {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const stepArray = [
    "User details",
    "About",
    "Get Started"
  ];

  const { toast } = useToast();

  useEffect(() => {
    setPageParam(currentStep)
  }, [currentStep]);

  return (
    <div className='h-screen flex justify-center items-center flex-col'>
      <div className="flex flex-col border-2 border-border rounded-lg min-h-28 h-fit gap-5">

        <div className='w-96'>
          {
            currentStep === 1 &&
            <div className="flex  flex-col items-center gap-5">
              <h1 className="text-2xl mt-5 font-bold uppercase font-mono">select your role</h1>
              <Roles
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
              />
            </div>
          }
          {
            currentStep === 2 &&
            <div className="flex  flex-col gap-5 items-center">
              <h1 className="text-2xl mt-5 font-bold uppercase font-mono">About</h1>
              <p
                className='text-center w-72'
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <Button onClick={() => setCurrentStep(currentStep + 1)} >next</Button>
            </div>
          }
          {
            currentStep === 3 &&
            <div className="flex  flex-col items-center gap-5">
              <h1 className="text-2xl mt-5 font-bold uppercase font-mono">Get Started</h1>
              <div className='flex-col flex gap-5'>
                <p className='text-center text-gray-500 w-72 dark:text-slate-200'>
                  so you have selected your role and you are ready to get started
                </p>
                <div className='text-center'>
                  <Button
                    onClick={async () => {
                      await refetch()
                      console.log(role)
                      if (role === "viewer") navigate({ to: '/dashboard' })
                      else if (role === "creator") navigate({ to: '/creator-dashboard' })
                      else {
                        toast({
                          title: 'Error',
                          description: 'Please select a role',
                        })
                      }
                    }}
                  >
                    confirm
                  </Button>
                </div>
              </div>
            </div>
          }
        </div >
        <Stepper
          steps={stepArray}
          currentStepNumber={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </div >
    </div >
  )
}