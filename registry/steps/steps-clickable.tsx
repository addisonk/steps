"use client"

import * as React from "react"

import { Steps } from "@/components/ui/steps"

const steps = [
  {
    id: "draft",
    label: "Draft",
    description: "Write the brief",
  },
  {
    id: "assets",
    label: "Assets",
    description: "Add references",
  },
  {
    id: "settings",
    label: "Settings",
    description: "Tune output",
  },
  {
    id: "publish",
    label: "Publish",
    description: "Ship the job",
  },
]

export default function StepsClickable() {
  const [currentStep, setCurrentStep] = React.useState("assets")

  return (
    <Steps
      steps={steps}
      currentStep={currentStep}
      onStepSelect={(step) => setCurrentStep(String(step.id))}
    />
  )
}
