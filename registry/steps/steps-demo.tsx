"use client"

import * as React from "react"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Steps } from "@/components/custom-ui/steps"

const steps = [
  {
    id: "profile",
    title: "Step 1",
    description: "Basics for the flow",
  },
  {
    id: "photos",
    title: "Step 2",
    description: "Upload the source",
  },
  {
    id: "style",
    title: "Step 3",
    description: "Choose the look",
  },
  {
    id: "review",
    title: "Step 4",
    description: "Confirm details",
  },
]

export default function StepsDemo() {
  const [currentStepIndex, setCurrentStepIndex] = React.useState(1)

  return (
    <div className="grid gap-6">
      <Steps steps={steps} currentStepIndex={currentStepIndex} />
      <div className="flex justify-between gap-3">
        <Button
          variant="outline"
          onClick={() => setCurrentStepIndex((step) => Math.max(0, step - 1))}
          disabled={currentStepIndex === 0}
        >
          <ArrowLeftIcon data-icon="inline-start" />
          Back
        </Button>
        <Button
          onClick={() =>
            setCurrentStepIndex((step) => Math.min(steps.length - 1, step + 1))
          }
          disabled={currentStepIndex === steps.length - 1}
        >
          Next
          <ArrowRightIcon data-icon="inline-end" />
        </Button>
      </div>
    </div>
  )
}
