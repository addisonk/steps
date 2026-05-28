"use client"

import { useMemo, useState } from "react"
import { ArrowLeftIcon, ArrowRightIcon, RotateCcwIcon } from "lucide-react"

import { Steps } from "@/components/custom-ui/steps"
import { Button } from "@/components/ui/button"

const trainingSteps = [
  {
    id: "basic-info",
    title: "Step 1",
    description: "Basic info and Selfie",
  },
  {
    id: "photo-pack",
    title: "Step 2",
    description: "Photo pack selection",
  },
  {
    id: "upload-photos",
    title: "Step 3",
    description: "Upload photos",
  },
  {
    id: "review",
    title: "Step 4",
    description: "Review & submit",
  },
]

const setupSteps = [
  {
    id: "profile",
    title: "Profile",
    description: "Basics for the flow",
  },
  {
    id: "photos",
    title: "Photos",
    description: "Upload the source",
  },
  {
    id: "style",
    title: "Style",
    description: "Choose the look",
  },
  {
    id: "review",
    title: "Review",
    description: "Confirm details",
  },
]

const compactSteps = [
  { id: "cart", title: "Cart" },
  { id: "address", title: "Address" },
  { id: "payment", title: "Payment" },
  { id: "confirm", title: "Confirm" },
]

const clickableSteps = [
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

const stepCopy = {
  "basic-info": {
    eyebrow: "Step 1",
    title: "Selfie review",
    description:
      "Confirm the source image and basic attributes before choosing a pack.",
  },
  "photo-pack": {
    eyebrow: "Step 2",
    title: "Photo pack selection",
    description:
      "Pick the output set while keeping the user oriented in the process.",
  },
  "upload-photos": {
    eyebrow: "Step 3",
    title: "Upload photos",
    description:
      "Collect the training images after the setup choices are complete.",
  },
  review: {
    eyebrow: "Step 4",
    title: "Review and submit",
    description: "Show the final state clearly before training begins.",
  },
} satisfies Record<
  string,
  {
    eyebrow: string
    title: string
    description: string
  }
>

export default function Page() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [clickableStep, setClickableStep] = useState("assets")

  const currentStep = trainingSteps[currentStepIndex] ?? trainingSteps[0]
  const currentCopy = useMemo(() => {
    const stepId = String(currentStep.id)

    return stepId in stepCopy
      ? stepCopy[stepId as keyof typeof stepCopy]
      : stepCopy["basic-info"]
  }, [currentStep.id])

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-12 md:py-16">
        <section className="flex flex-col gap-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Steps</h1>
              <p className="mt-2 max-w-2xl text-pretty text-muted-foreground">
                A segmented progress navigation component for training,
                onboarding, checkout, and other multi-step flows.
              </p>
            </div>
          </div>

          <code className="block rounded-lg border bg-muted/50 px-4 py-3 font-mono text-sm break-all">
            npx shadcn@latest add
            https://raw.githubusercontent.com/addisonk/steps/main/public/r/steps.json
          </code>
        </section>

        <section
          id="steps-training-demo"
          className="dark overflow-hidden rounded-lg border bg-background text-foreground"
          style={
            {
              "--background": "oklch(0.09 0 0)",
              "--foreground": "oklch(0.98 0 0)",
              "--primary": "oklch(0.64 0.22 264)",
              "--primary-foreground": "oklch(0.98 0 0)",
              "--muted": "oklch(0.18 0 0)",
              "--muted-foreground": "oklch(0.72 0 0)",
              "--border": "oklch(1 0 0 / 14%)",
              "--ring": "oklch(0.64 0.22 264)",
            } as React.CSSProperties
          }
        >
          <div className="border-b px-5 py-5 md:px-8">
            <div className="mb-10 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium">Studio setup</p>
                <p className="text-xs text-muted-foreground">
                  Reusable top progress for a four-step flow
                </p>
              </div>
              <Button variant="outline" size="sm">
                Save draft
              </Button>
            </div>
            <Steps steps={trainingSteps} currentStepIndex={currentStepIndex} />
          </div>

          <div className="grid gap-8 p-5 md:grid-cols-[1fr_280px] md:p-8">
            <div className="flex min-h-56 flex-col justify-center gap-3">
              <p className="text-sm font-medium text-muted-foreground">
                {currentCopy.eyebrow}
              </p>
              <h2 className="max-w-xl text-2xl font-semibold tracking-tight">
                {currentCopy.title}
              </h2>
              <p className="max-w-xl text-pretty text-muted-foreground">
                {currentCopy.description}
              </p>
            </div>
            <div className="grid gap-10 rounded-lg border bg-muted/30 p-5 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Current step</span>
                <span className="font-medium">{currentStep.title}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">
                  {currentStepIndex + 1} of {trainingSteps.length}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Pattern</span>
                <span className="font-medium">Training</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 border-t bg-muted/40 px-5 py-4 md:px-8">
            <Button
              variant="outline"
              onClick={() =>
                setCurrentStepIndex((step) => Math.max(0, step - 1))
              }
              disabled={currentStepIndex === 0}
            >
              <ArrowLeftIcon data-icon="inline-start" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => setCurrentStepIndex(0)}
                disabled={currentStepIndex === 0}
              >
                <RotateCcwIcon data-icon="inline-start" />
                Reset
              </Button>
              <Button
                onClick={() =>
                  setCurrentStepIndex((step) =>
                    Math.min(trainingSteps.length - 1, step + 1)
                  )
                }
                disabled={currentStepIndex === trainingSteps.length - 1}
              >
                Next
                <ArrowRightIcon data-icon="inline-end" />
              </Button>
            </div>
          </div>
        </section>

        <section id="steps-overview" className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Overview</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              The core component is just one segmented progress row.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <Steps steps={setupSteps} currentStep="style" />
          </div>
        </section>

        <section
          id="steps-compact"
          className="grid gap-4 md:grid-cols-[260px_1fr]"
        >
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Compact</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Hide descriptions when a flow needs less vertical space.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <Steps
              steps={compactSteps}
              currentStep="payment"
              showDescriptions={false}
            />
          </div>
        </section>

        <section
          id="steps-clickable"
          className="grid gap-4 md:grid-cols-[260px_1fr]"
        >
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Clickable</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Pass an `onStepSelect` handler when users can jump between steps.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <Steps
              steps={clickableSteps}
              currentStep={clickableStep}
              onStepSelect={(step) => setClickableStep(String(step.id))}
            />
          </div>
        </section>
      </div>
    </main>
  )
}
