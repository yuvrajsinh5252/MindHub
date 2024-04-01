import { useState, useEffect, useRef } from 'react'

const Stepper = ({ steps, currentStepNumber, setCurrentStep }: {
  steps: string[],
  currentStepNumber: number,
  setCurrentStep: any
}) => {

  const [stepperSteps, setStep] = useState<
    {
      description: string,
      completed: boolean,
      highlighted: boolean,
      selected: boolean
    }[]
  >([]);
  const stepsStateRef: any = useRef();

  useEffect(() => {
    const stepsState = steps.map((step, index) => {
      const stepObj = {
        description: '',
        completed: false,
        highlighted: false,
        selected: false
      };
      stepObj.description = step;
      stepObj.completed = false;
      stepObj.highlighted = index === 0 ? true : false;
      stepObj.selected = index === 0 ? true : false;
      return stepObj;
    });
    stepsStateRef.current = stepsState;
    const currentSteps = updateStep(currentStepNumber - 1, stepsState)
    setStep(currentSteps)
  }, []);

  useEffect(() => {
    const currentSteps = updateStep(currentStepNumber - 1, stepsStateRef.current)
    setStep(currentSteps)
  }, [currentStepNumber]);


  function updateStep(stepNumber: number, steps: any) {
    const newSteps = [...steps];
    let stepCounter = 0;

    while (stepCounter < newSteps.length) {
      //current step
      if (stepCounter === stepNumber) {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          highlighted: true,
          selected: true,
          completed: false
        };
        stepCounter++;
      }
      // Past step
      else if (stepCounter < stepNumber) {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          highlighted: false,
          selected: true,
          completed: true
        };
        stepCounter++;
      }
      // Future steps
      else {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          highlighted: false,
          selected: false,
          completed: false
        }
        stepCounter++;
      }
    }

    return newSteps
  }


  const stepsDisplay = stepperSteps.map((step, index) => {
    return (
      <div key={index}
        className={index !== stepperSteps.length - 1 ? "w-full flex items-center" : "flex items-center"} >
        <div className="relative flex flex-col items-center text-blue-600">
          <div
            onClick={() => {
              const currentSteps = updateStep(index, stepperSteps)
              setStep(currentSteps)
              setCurrentStep(index + 1)
            }}
            className={`rounded-full hover:cursor-pointer transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3  ${step.selected ? "bg-blue-600 text-white font-bold" : ""}`}
          >
            {step.completed ? <span className="text-white font-bold text-xl">✓</span> : index + 1}
          </div>
        </div>
        <div className={`flex-auto border-t-2 transition duration-500 ease-in-out
          ${step.selected ? "border-blue-600" : ""}`}>
        </div>
      </div >
    )
  })

  return (
    <div className="mx-4 p-4 flex justify-between items-center">
      {stepsDisplay}
    </div>
  )
}

export default Stepper;