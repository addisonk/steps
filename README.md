# Steps

A reusable horizontal steps component for showing where someone is in a multi-step process.

## Preview

![Animated steps component moving through a four step onboarding flow](public/readme/steps-progress.gif)

![Horizontal steps component with completed, current, and upcoming states](public/readme/steps-overview.png)

![Compact steps component for a checkout flow](public/readme/steps-compact.png)

![Clickable steps component with labels and descriptions](public/readme/steps-clickable.png)

## Installation

```bash
npx shadcn@latest add https://raw.githubusercontent.com/addisonk/steps/main/public/r/steps.json
```

## Usage

```tsx
import { Steps } from "@/components/ui/steps"

const steps = [
  { id: "profile", label: "Profile", description: "Tell us about you" },
  { id: "photos", label: "Photos", description: "Upload your images" },
  { id: "style", label: "Style", description: "Choose the look" },
  { id: "review", label: "Review", description: "Confirm details" },
]

<Steps steps={steps} currentStep="photos" />
```

### Clickable steps

```tsx
const [currentStep, setCurrentStep] = React.useState("profile")

<Steps
  steps={steps}
  currentStep={currentStep}
  onStepSelect={(step) => setCurrentStep(String(step.id))}
/>
```

### Compact

```tsx
<Steps
  steps={steps}
  currentStep="style"
  showDescriptions={false}
  size="sm"
/>
```

## Props

| Prop | Description |
|------|-------------|
| `steps` | Array of steps with `id`, `label`, optional `description`, optional `href`, and optional `disabled`. |
| `currentStep` | Current step id. |
| `currentStepIndex` | Current step index. Useful when ids are not available. |
| `onStepSelect` | Optional callback that makes steps interactive. |
| `size` | `sm`, `default`, or `lg`. |
| `showLabels` | Show or hide step labels. |
| `showDescriptions` | Show or hide step descriptions. |
| `showProgress` | Show or hide the top progress bar. |

## License

MIT
