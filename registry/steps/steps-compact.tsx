import { Steps } from "@/components/ui/steps"

const steps = [
  { id: "cart", label: "Cart" },
  { id: "address", label: "Address" },
  { id: "payment", label: "Payment" },
  { id: "confirm", label: "Confirm" },
]

export default function StepsCompact() {
  return (
    <Steps
      steps={steps}
      currentStep="payment"
      size="sm"
      showDescriptions={false}
    />
  )
}
