"use client"

import { useMemo, useState } from "react"
import { ArrowLeftIcon, ArrowRightIcon, RotateCcwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Steps } from "@/components/ui/steps"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Size = "sm" | "default" | "lg"

const flowSteps = [
  {
    id: "profile",
    label: "Profile",
    description: "Basics for the flow",
  },
  {
    id: "photos",
    label: "Photos",
    description: "Upload the source",
  },
  {
    id: "style",
    label: "Style",
    description: "Choose the look",
  },
  {
    id: "review",
    label: "Review",
    description: "Confirm details",
  },
]

const checkoutSteps = [
  { id: "cart", label: "Cart" },
  { id: "address", label: "Address" },
  { id: "payment", label: "Payment" },
  { id: "confirm", label: "Confirm" },
]

const clickableSteps = [
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

const stepCopy = {
  profile: {
    eyebrow: "Step 1",
    title: "Set up the profile",
    description:
      "Collect the minimum details needed before the rest of the flow starts.",
  },
  photos: {
    eyebrow: "Step 2",
    title: "Upload source photos",
    description:
      "Keep progress visible while the user handles the highest-friction part.",
  },
  style: {
    eyebrow: "Step 3",
    title: "Choose the style",
    description:
      "Let people adjust preferences without losing their place in the process.",
  },
  review: {
    eyebrow: "Step 4",
    title: "Review and finish",
    description:
      "Show the end state clearly before the final action becomes available.",
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
  const [size, setSize] = useState<Size>("default")
  const [currentStepIndex, setCurrentStepIndex] = useState(1)
  const [clickableStep, setClickableStep] = useState("assets")

  const currentStep = flowSteps[currentStepIndex] ?? flowSteps[0]
  const currentCopy = useMemo(() => {
    const stepId = String(currentStep.id)

    return stepId in stepCopy
      ? stepCopy[stepId as keyof typeof stepCopy]
      : stepCopy.profile
  }, [currentStep.id])

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-12 md:py-16">
        <section className="flex flex-col gap-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Steps</h1>
              <p className="mt-2 max-w-2xl text-pretty text-muted-foreground">
                A horizontal process indicator for onboarding, checkout, setup,
                and other multi-step flows.
              </p>
            </div>
            <Tabs
              value={size}
              onValueChange={(value) => setSize(value as Size)}
            >
              <TabsList>
                <TabsTrigger value="sm">sm</TabsTrigger>
                <TabsTrigger value="default">default</TabsTrigger>
                <TabsTrigger value="lg">lg</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <code className="block rounded-lg border bg-muted/50 px-4 py-3 font-mono text-sm break-all">
            npx shadcn@latest add
            https://raw.githubusercontent.com/addisonk/steps/main/public/r/steps.json
          </code>
        </section>

        <section
          id="steps-progress-demo"
          className="overflow-hidden rounded-lg border bg-card"
        >
          <div className="border-b bg-background px-5 py-4 md:px-6">
            <div className="mb-5 flex items-center justify-between gap-4">
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
            <Steps
              steps={flowSteps}
              currentStepIndex={currentStepIndex}
              size={size}
            />
          </div>

          <div className="grid gap-6 p-5 md:grid-cols-[1fr_260px] md:p-6">
            <div className="flex min-h-52 flex-col justify-center gap-3">
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
            <div className="grid gap-2 rounded-lg border bg-muted/30 p-4 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Current step</span>
                <span className="font-medium">{currentStep.label}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">
                  {currentStepIndex + 1} of {flowSteps.length}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Pattern</span>
                <span className="font-medium">Onboarding</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 border-t bg-muted/40 px-5 py-4 md:px-6">
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
                    Math.min(flowSteps.length - 1, step + 1)
                  )
                }
                disabled={currentStepIndex === flowSteps.length - 1}
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
              The active step stays visible while completed work is marked.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <Steps steps={flowSteps} currentStep="style" size="lg" />
          </div>
        </section>

        <section
          id="steps-compact"
          className="grid gap-4 md:grid-cols-[260px_1fr]"
        >
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Compact</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              A slimmer checkout-style flow for tight headers.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <Steps
              steps={checkoutSteps}
              currentStep="payment"
              size="sm"
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
              A jumpable process when previous sections stay editable.
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
