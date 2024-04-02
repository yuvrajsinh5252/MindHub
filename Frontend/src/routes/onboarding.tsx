import Stepper from '@/components/Stepper';
import Roles from '@/components/roles';
import useAuth from '@/hook/useAuth';
import { useUserRole } from '@/querries/db';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/onboarding')({
  component: OnBoarding,
})

function OnBoarding() {
  const { user, loading: userLoading, error: userError } = useAuth();
  const { data: role, isLoading: roleLoading, error: roleError } = useUserRole({ variables: { id: user?.id }, enabled: !!user?.id });
  const navigate = useNavigate();

  // if (!userLoading && !user?.data) console.log(user?.data)

  useEffect(() => {
    if (role?.data == "viewer") navigate({ to: '/dashboard' })
    else if (role?.data === "creator") navigate({ to: '/creator-studio' })
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
          <div className='h-screen flex justify-center items-center flex-col dark:bg-zinc-800 dark:text-white'>
            Checking your role...
          </div>
        ) : (
          <Wizard />
        )
      }
    </div >
  )
}

function Wizard() {
  const [currentStep, setCurrentStep] = useState(1);

  const stepArray = [
    "User details",
    "About",
    "Get Started"
  ];

  return (
    <div className='h-screen flex justify-center items-center flex-col dark:bg-zinc-800 dark:text-white'>
      <div className="flex flex-col border-2 dark:border-zinc-500 rounded-lg min-h-28 h-fit gap-5">

        <div className='w-96'>
          {
            currentStep === 1 &&
            <div className="flex  flex-col items-center gap-5">
              <h1 className="text-2xl mt-5 font-bold text-blue-400 uppercase font-mono">select your role</h1>
              <Roles />
            </div>
          }
          {
            currentStep === 2 &&
            <div className="flex  flex-col gap-5 items-center">
              <h1 className="text-2xl mt-5 font-bold text-blue-400 uppercase font-mono">About</h1>
              <p
                className='text-center text-gray-500 w-72 dark:text-slate-200'
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          }
          {
            currentStep === 3 &&
            <div className="flex  flex-col items-center gap-5">
              <h1 className="text-2xl mt-5 font-bold text-blue-400 uppercase font-mono">Get Started</h1>
              <div className='flex-col flex gap-5'>
                <p className='text-center text-gray-500 w-72 dark:text-slate-200'>
                  so you have selected your role and you are ready to get started
                </p>
                <div className='text-center'>
                  <button
                    className="m-auto border-2 font-[700] px-4 py-2 w-32 rounded-full hover:bg-blue-600 hover:text-white transition duration-500 ease-in-out bg-white text-black border-black hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-0"
                  >
                    confirm
                  </button>
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
    </div>
  )
}