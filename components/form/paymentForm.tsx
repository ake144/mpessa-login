"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LayoutDashboard, UserPlus, Eye, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import SideBar from "../sidebar"

interface OnboardingStep {
  id: number
  title: string
  completed: boolean
  current: boolean
}

export default function PartnerOnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(6)
  const [steps, setSteps] = useState<OnboardingStep[]>([
    { id: 1, title: "Check Merchant", completed: true, current: false },
    { id: 2, title: "Distribution Detail", completed: true, current: false },
    { id: 3, title: "Business Type", completed: true, current: false },
    { id: 4, title: "Business Detail", completed: true, current: false },
    { id: 5, title: "Business Owner", completed: true, current: false },
    { id: 6, title: "Fund Withdraw", completed: false, current: true },
    { id: 7, title: "Review", completed: false, current: false },
  ])

  const handleStepCompletion = (stepId: number) => {
    setSteps(prev => prev.map(step => ({
      ...step,
      completed: step.id === stepId ? true : step.completed,
      current: step.id === stepId + 1
    })))
    setCurrentStep(prev => prev + 1)
  }

  const handleBack = () => {
    setCurrentStep(prev => prev - 1)
    setSteps(prev => prev.map(step => ({
      ...step,
      current: step.id === currentStep - 1
    })))
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <SideBar />
      
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 flex justify-between items-center">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">Partner Onboarding</h2>
          <div className="w-8 h-8 md:w-10 md:h-10 bg-green-500 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 md:w-6 md:h-6 text-white" />
          </div>
        </div>

        <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[700px]">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-medium ${
                    step.completed ? "bg-green-500 text-white" :
                    step.current ? "bg-green-100 text-green-600" :
                    "bg-gray-100 text-gray-600"
                  }`}>
                    {step.completed ? "✓" : step.id}
                  </div>
                  <span className={`mt-1 md:mt-2 text-[10px] md:text-xs font-medium ${
                    step.completed || step.current ? "text-green-600" : "text-gray-500"
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 md:w-16 h-0.5 mx-2 md:mx-4 ${step.completed ? "bg-green-500" : "bg-gray-300"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <main className="flex-1 p-4 md:px-8 md:py-8 overflow-y-auto">
          {currentStep === 6 && (
            <KYCFormComponent 
              onBack={handleBack}
              onComplete={() => handleStepCompletion(6)}
            />
          )}
          
          {currentStep === 7 && (
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <img 
                  src="/success-checkmark.png" 
                  alt="Success" 
                  className="w-32 h-32 mx-auto mb-6"
                />
                <h3 className="text-2xl font-bold text-green-600 mb-4">
                  Onboarding Complete!
                </h3>
                <p className="text-gray-600">
                  Your partner onboarding process has been successfully completed.
                </p>
              </div>
              <Button 
                onClick={() => router.push("/dashboard")}
                className="bg-green-600 hover:bg-green-700"
              >
                Go to Dashboard
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

function KYCFormComponent({ onBack, onComplete }: { onBack: () => void; onComplete: () => void }) {
  const [formData, setFormData] = useState({
    bankName: "Commercial Bank of Ethiopia",
    branchName: "",
    accountName: "",
    accountNumber: "",
    proofOfBankAccount: null as File | null,
  })

  const banks = [
    "Commercial Bank of Ethiopia",
    "Awash Bank",
    "Dashen Bank",
    "Bank of Abyssinia",
  ]

  const branches: Record<string, string[]> = {
    "Commercial Bank of Ethiopia": [
      "Addis Ababa Branch",
      "Dire Dawa Branch",
      "Bahir Dar Branch",
    ],
  }

  const validateForm = () => {
    return (
      formData.bankName &&
      formData.branchName &&
      formData.accountName.trim() &&
      /^\d{8,20}$/.test(formData.accountNumber) &&
      formData.proofOfBankAccount
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) onComplete()
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">Fund Withdraw Option</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Bank</label>
            <select
              value={formData.bankName}
              onChange={e => setFormData({...formData, bankName: e.target.value})}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            >
              {banks.map(bank => (
                <option key={bank} value={bank}>{bank}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Branch</label>
            <select
              value={formData.branchName}
              onChange={e => setFormData({...formData, branchName: e.target.value})}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select Branch</option>
              {branches[formData.bankName]?.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Account Name</label>
            <input
              type="text"
              value={formData.accountName}
              onChange={e => setFormData({...formData, accountName: e.target.value})}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Account Number</label>
            <input
              type="text"
              value={formData.accountNumber}
              onChange={e => setFormData({...formData, accountNumber: e.target.value.replace(/\D/g, '')})}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              pattern="\d{8,20}"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">Bank Proof</label>
          <div className="border-2 border-dashed rounded-lg p-4">
            <input
              type="file"
              onChange={e => setFormData({...formData, proofOfBankAccount: e.target.files?.[0] || null})}
              className="w-full"
              accept=".pdf,.png,.jpg,.jpeg"
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="px-6"
          >
            Back
          </Button>
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700 px-6"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}