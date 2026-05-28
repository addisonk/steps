"use client"

import * as React from "react"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type StepsSize = "sm" | "default" | "lg"
type StepsStatus = "complete" | "current" | "upcoming"
type StepId = string | number

type StepDefinition = {
  id: StepId
  label: React.ReactNode
  description?: React.ReactNode
  href?: string
  disabled?: boolean
}

type StepsProps = Omit<React.ComponentProps<"nav">, "children" | "onChange"> & {
  steps: StepDefinition[]
  currentStep?: StepId
  currentStepIndex?: number
  onStepSelect?: (step: StepDefinition, index: number) => void
  size?: StepsSize
  showDescriptions?: boolean
  showLabels?: boolean
  showProgress?: boolean
  progressLabel?: React.ReactNode
  ariaLabel?: string
}

function resolveCurrentStepIndex({
  steps,
  currentStep,
  currentStepIndex,
}: {
  steps: StepDefinition[]
  currentStep?: StepId
  currentStepIndex?: number
}) {
  if (steps.length === 0) {
    return -1
  }

  if (typeof currentStepIndex === "number") {
    return Math.min(Math.max(currentStepIndex, 0), steps.length)
  }

  if (currentStep !== undefined) {
    const index = steps.findIndex((step) => step.id === currentStep)

    return index === -1 ? 0 : index
  }

  return 0
}

function getStepStatus(index: number, currentStepIndex: number): StepsStatus {
  if (index < currentStepIndex) {
    return "complete"
  }

  if (index === currentStepIndex) {
    return "current"
  }

  return "upcoming"
}

function getStepProgress(steps: StepDefinition[], currentStepIndex: number) {
  if (steps.length === 0 || currentStepIndex < 0) {
    return 0
  }

  if (currentStepIndex >= steps.length) {
    return 100
  }

  return Math.round(((currentStepIndex + 1) / steps.length) * 100)
}

const sizeStyles = {
  sm: {
    root: "gap-3",
    progress: "h-1",
    list: "pt-1",
    connector: "top-3 h-px",
    indicator: "size-6 text-[11px]",
    check: "size-3",
    label: "text-xs",
    description: "text-[11px]",
  },
  default: {
    root: "gap-4",
    progress: "h-1.5",
    list: "pt-1.5",
    connector: "top-4 h-px",
    indicator: "size-8 text-xs",
    check: "size-3.5",
    label: "text-sm",
    description: "text-xs",
  },
  lg: {
    root: "gap-5",
    progress: "h-2",
    list: "pt-2",
    connector: "top-5 h-0.5",
    indicator: "size-10 text-sm",
    check: "size-4",
    label: "text-base",
    description: "text-sm",
  },
} satisfies Record<
  StepsSize,
  Record<
    | "root"
    | "progress"
    | "list"
    | "connector"
    | "indicator"
    | "check"
    | "label"
    | "description",
    string
  >
>

function Steps({
  className,
  steps,
  currentStep,
  currentStepIndex,
  onStepSelect,
  size = "default",
  showDescriptions = true,
  showLabels = true,
  showProgress = true,
  progressLabel,
  ariaLabel = "Progress",
  ...props
}: StepsProps) {
  const currentIndex = resolveCurrentStepIndex({
    steps,
    currentStep,
    currentStepIndex,
  })
  const progress = getStepProgress(steps, currentIndex)
  const currentStepNumber =
    steps.length === 0 ? 0 : Math.min(currentIndex + 1, steps.length)
  const progressText =
    progressLabel ?? `Step ${currentStepNumber} of ${steps.length}`
  const styles = sizeStyles[size]

  return (
    <nav
      data-slot="steps"
      className={cn("flex w-full flex-col", styles.root, className)}
      {...props}
      aria-label={props["aria-label"] ?? ariaLabel}
    >
      {showProgress && (
        <div data-slot="steps-progress" className="flex items-center gap-3">
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-valuetext={
              typeof progressText === "string" ? progressText : undefined
            }
            className={cn(
              "relative flex-1 overflow-hidden rounded-full bg-muted",
              styles.progress
            )}
          >
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-500 ease-[cubic-bezier(0.2,0,0,1)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div
            data-slot="steps-progress-label"
            className="min-w-fit text-xs font-medium text-muted-foreground"
          >
            {progressText}
          </div>
        </div>
      )}

      <ol
        data-slot="steps-list"
        role="list"
        className={cn("grid items-start", styles.list)}
        style={
          steps.length > 0
            ? { gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }
            : undefined
        }
      >
        {steps.map((step, index) => {
          const status = getStepStatus(index, currentIndex)
          const isInteractive =
            !step.disabled && (!!step.href || !!onStepSelect)
          const stepContent = (
            <>
              <span
                data-slot="steps-indicator"
                aria-hidden="true"
                className={cn(
                  "relative z-10 flex shrink-0 items-center justify-center rounded-full border bg-background font-medium tabular-nums transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
                  styles.indicator,
                  status === "complete" &&
                    "border-primary bg-primary text-primary-foreground",
                  status === "current" &&
                    "border-primary text-foreground ring-4 ring-primary/10",
                  status === "upcoming" && "border-border text-muted-foreground"
                )}
              >
                {status === "complete" ? (
                  <CheckIcon className={styles.check} />
                ) : (
                  index + 1
                )}
              </span>

              {showLabels && (
                <span
                  data-slot="steps-content"
                  className="flex max-w-32 min-w-0 flex-col items-center gap-1 text-center"
                >
                  <span
                    data-slot="steps-label"
                    className={cn(
                      "leading-tight font-medium text-balance transition-colors duration-300",
                      styles.label,
                      status === "upcoming" && "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </span>
                  {showDescriptions && step.description && (
                    <span
                      data-slot="steps-description"
                      className={cn(
                        "leading-snug text-balance text-muted-foreground transition-opacity duration-300",
                        styles.description,
                        status === "upcoming" && "opacity-70"
                      )}
                    >
                      {step.description}
                    </span>
                  )}
                </span>
              )}
            </>
          )

          const controlClassName = cn(
            "relative z-10 mx-auto flex w-full min-w-0 flex-col items-center gap-2 rounded-md transition-colors outline-none",
            isInteractive &&
              "cursor-pointer hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50",
            step.disabled && "cursor-not-allowed opacity-50"
          )

          return (
            <li
              key={step.id}
              data-slot="steps-item"
              data-status={status}
              className="relative min-w-0"
            >
              {index < steps.length - 1 && (
                <span
                  data-slot="steps-connector"
                  aria-hidden="true"
                  className={cn(
                    "absolute left-1/2 z-0 w-full overflow-hidden bg-border",
                    styles.connector
                  )}
                >
                  <span
                    className={cn(
                      "block h-full origin-left bg-primary transition-transform duration-500 ease-[cubic-bezier(0.2,0,0,1)]",
                      status === "complete" ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </span>
              )}

              {step.href ? (
                <a
                  href={step.href}
                  aria-current={status === "current" ? "step" : undefined}
                  aria-disabled={step.disabled || undefined}
                  className={controlClassName}
                  onClick={(event) => {
                    if (step.disabled) {
                      event.preventDefault()
                    }
                  }}
                >
                  {stepContent}
                </a>
              ) : onStepSelect ? (
                <button
                  type="button"
                  disabled={step.disabled}
                  aria-current={status === "current" ? "step" : undefined}
                  className={controlClassName}
                  onClick={() => onStepSelect(step, index)}
                >
                  {stepContent}
                </button>
              ) : (
                <div
                  aria-current={status === "current" ? "step" : undefined}
                  className={controlClassName}
                >
                  {stepContent}
                </div>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export {
  Steps,
  getStepProgress,
  getStepStatus,
  type StepDefinition,
  type StepId,
  type StepsProps,
  type StepsSize,
  type StepsStatus,
}
