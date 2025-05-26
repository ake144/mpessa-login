"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LayoutDashboard, UserPlus, Eye, User, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface OnboardingStep {
  id: number
  title: string
  completed: boolean
  current: boolean
}

export default function PartnerOnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(6)
  const [showKYCForm, setShowKYCForm] = useState(false)
  const [bankSelected, setBankSelected] = useState(false)
  const [steps, setSteps] = useState<OnboardingStep[]>([
    { id: 1, title: "Check Merchant", completed: true, current: false },
    { id: 2, title: "Distribution Detail", completed: true, current: false },
    { id: 3, title: "Business Type", completed: true, current: false },
    { id: 4, title: "Business Detail", completed: true, current: false },
    { id: 5, title: "Business Owner", completed: true, current: false },
    { id: 6, title: "Fund Withdraw", completed: false, current: true },
    { id: 7, title: "Review", completed: false, current: false },
  ])

  const handleBankSelection = () => {
    setBankSelected(true)
    setShowKYCForm(true)
  }

  const handleStepCompletion = (stepId: number) => {
    setSteps((prev) =>
      prev.map((step) => ({
        ...step,
        completed: step.id === stepId ? true : step.completed,
        current: step.id === stepId + 1,
      })),
    )
    setCurrentStep((prev) => prev + 1)
  }

  const handleBack = () => {
    if (showKYCForm) {
      setShowKYCForm(false)
      setBankSelected(false)
    } else {
      setCurrentStep((prev) => prev - 1)
      setSteps((prev) =>
        prev.map((step) => ({
          ...step,
          current: step.id === currentStep - 1,
        })),
      )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">

      <div className="w-64 bg-slate-800 text-white flex-shrink-0">
        <div className="p-6">
          <h1 className="text-lg font-bold mb-8">OP-PARTNER MANAGEMENT</h1>
          <nav className="space-y-2">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700">
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-600">
              <UserPlus className="w-5 h-5" />
              <span>Onboarding</span>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-700 cursor-pointer">
              <Eye className="w-5 h-5" />
              <span>View</span>
            </div>
          </nav>
        </div>
      </div>

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
                  <div
                    className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-medium ${
                      step.completed
                        ? "bg-green-500 text-white"
                        : step.current
                          ? "bg-green-500 text-white"
                          : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {step.completed ? "✓" : step.id}
                  </div>
                  <span
                    className={`mt-1 md:mt-2 text-[10px] md:text-xs font-medium ${
                      step.completed || step.current ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 md:w-16 h-0.5 mx-2 md:mx-4 ${step.completed ? "bg-green-500" : "bg-gray-300"}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <main className="flex-1 p-4 md:px-8 md:py-8 overflow-y-auto">
          {currentStep === 6 && !showKYCForm && (
            <div className="max-w-xl mx-auto">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-8">Fund Withdraw Option</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
             
                <Card
                  className={`cursor-pointer hover:shadow-lg transition-all border-2 ${
                    bankSelected ? "border-green-500 bg-green-50" : "hover:border-green-500"
                  }`}
                  onClick={handleBankSelection}
                >
                  <CardContent className="p-8 text-center relative">
                    {bankSelected && (
                      <div className="absolute top-4 right-4 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Bank</h4>
                  
                  </CardContent>
                </Card>

                
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="px-6 bg-green-600 text-white hover:bg-green-700 border-green-600"
                >
                  Back
                </Button>
                <Button
                  onClick={() => handleStepCompletion(6)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6"
                  disabled={!bankSelected}
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {currentStep === 6 && showKYCForm && (
            <KYCFormComponent onBack={handleBack} onComplete={() => handleStepCompletion(6)} />
          )}

          {currentStep === 7 && (
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-8 text-center">Fund Withdraw Option</h3>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">BANK NAME:</h4>
                      <p className="text-gray-600">Commercial Bank of Ethiopia</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">ACCOUNT NUMBER:</h4>
                      <p className="text-gray-600">100034534534534</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">BANK BRANCH NAME:</h4>
                      <p className="text-gray-600">QATtest1</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">PROOF OF BANK ACCOUNT:</h4>
                      <p className="text-green-600 font-medium">BANK ACCOUNT FILE</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">ACCOUNT NAME:</h4>
                      <p className="text-gray-600">Test Test</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="px-6 bg-green-600 text-white hover:bg-green-700 border-green-600"
                >
                  Back
                </Button>
                <Button variant="outline" className="px-6 bg-green-600 text-white hover:bg-green-700 border-green-600">
                  Save as Draft
                </Button>
                <Button
                  onClick={() => router.push("/partner-onboarding/success")}
                  className="bg-green-600 hover:bg-green-700 text-white px-6"
                >
                  Submit
                </Button>
              </div>
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
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const banks = ["Commercial Bank of Ethiopia", "Awash Bank", "Dashen Bank", "Bank of Abyssinia"]

  const branches: Record<string, string[]> = {
    "Commercial Bank of Ethiopia": ["Addis Ababa Branch", "Dire Dawa Branch", "Bahir Dar Branch", "QATtest1"],
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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setTouched((prev) => ({ ...prev, [field]: true }))

    if (field === "bankName") {
      setFormData((prev) => ({ ...prev, branchName: "" }))
      setTouched((prev) => ({ ...prev, branchName: false }))
    }

    // Clear errors when user starts typing
    if (value.trim() !== "") {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateAndShowErrors = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.branchName) {
      newErrors.branchName = "Branch Name is required"
    }
    if (!formData.accountName.trim()) {
      newErrors.accountName = "Bank Account Name is required"
    }
    if (!formData.accountNumber) {
      newErrors.accountNumber = "Bank Account Number is required"
    } else if (!/^\d{8,20}$/.test(formData.accountNumber)) {
      newErrors.accountNumber = "Account number must be 8-20 digits"
    }
    if (!formData.proofOfBankAccount) {
      newErrors.proofOfBankAccount = "Bank Account File is required"
    }

    setErrors(newErrors)
    setTouched({
      branchName: true,
      accountName: true,
      accountNumber: true,
      proofOfBankAccount: true,
    })

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateAndShowErrors()) {
      onComplete()
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-8 text-center">Fund Withdraw Option</h3>

      {/* Bank Selection Card */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 bg-white border-2 border-green-500 rounded-lg px-4 py-3 shadow-sm">
          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </div>
          <span className="font-medium text-gray-800">Bank</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Bank</label>
            <select
              value={formData.bankName}
              onChange={(e) => handleInputChange("bankName", e.target.value)}
              className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 bg-white"
            >
              {banks.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Select Branch</label>
            <select
              value={formData.branchName}
              onChange={(e) => handleInputChange("branchName", e.target.value)}
              className={`w-full h-12 px-3 border rounded-lg focus:ring-2 focus:ring-green-500 bg-white ${
                errors.branchName && touched.branchName ? "border-red-500" : "border-gray-300"
              }`}
              required
            >
              <option value="">Select Branch</option>
              {branches[formData.bankName]?.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
            {errors.branchName && touched.branchName && <p className="text-sm text-red-500">{errors.branchName}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Account Name</label>
            <input
              type="text"
              placeholder="Enter Account Name"
              value={formData.accountName}
              onChange={(e) => handleInputChange("accountName", e.target.value)}
              className={`w-full h-12 px-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                errors.accountName && touched.accountName ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {errors.accountName && touched.accountName && <p className="text-sm text-red-500">{errors.accountName}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Account Number</label>
            <input
              type="text"
              placeholder="Enter Account Number"
              value={formData.accountNumber}
              onChange={(e) => handleInputChange("accountNumber", e.target.value.replace(/\D/g, ""))}
              className={`w-full h-12 px-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                errors.accountNumber && touched.accountNumber ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {errors.accountNumber && touched.accountNumber && (
              <p className="text-sm text-red-500">{errors.accountNumber}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">Proof of Bank Account</label>
          <div
            className={`border-2 border-dashed rounded-lg p-6 ${
              errors.proofOfBankAccount && touched.proofOfBankAccount ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
          >
            {formData.proofOfBankAccount ? (
              <div className="flex items-center justify-between">
                <span className="text-green-600 font-medium">{formData.proofOfBankAccount.name}</span>
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, proofOfBankAccount: null }))}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="text-center">
                <label className="cursor-pointer">
                  <div className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50">
                    <span className="text-gray-600">Choose File</span>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        setFormData((prev) => ({ ...prev, proofOfBankAccount: file }))
                        setErrors((prev) => {
                          const newErrors = { ...prev }
                          delete newErrors.proofOfBankAccount
                          return newErrors
                        })
                      }
                    }}
                  />
                </label>
              </div>
            )}
          </div>
          {errors.proofOfBankAccount && touched.proofOfBankAccount && (
            <p className="text-sm text-red-500">{errors.proofOfBankAccount}</p>
          )}
        </div>

        <div className="flex justify-end gap-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="px-6 bg-green-600 text-white hover:bg-green-700 border-green-600"
          >
            Back
          </Button>
          <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6" disabled={!validateForm()}>
            Next
          </Button>
        </div>
      </form>
    </div>
  )
}
