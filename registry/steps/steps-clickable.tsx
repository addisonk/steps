"use client"

import * as React from "react"

import { Steps } from "@/components/custom-ui/steps"

const steps = [
  {
    id: "draft",
    title: "Draft",
    description: "Write the brief",
  },
  {
    id: "assets",
    title: "Assets",
    description: "Add references",
  },
  {
    id: "settings",
    title: "Settings",
    description: "Tune output",
  },
  {
    id: "publish",
    title: "Publish",
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
