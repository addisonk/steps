import { Steps } from "@/components/custom-ui/steps"

const steps = [
  { id: "cart", title: "Cart" },
  { id: "address", title: "Address" },
  { id: "payment", title: "Payment" },
  { id: "confirm", title: "Confirm" },
]

export default function StepsCompact() {
  return <Steps steps={steps} currentStep="payment" showDescriptions={false} />
}
