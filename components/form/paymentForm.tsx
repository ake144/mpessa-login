"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LayoutDashboard, UserPlus, Eye, User, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import SideBar from "../sidebar"

interface OnboardingStep {
  id: number
  title: string
  completed: boolean
  current: boolean
}

export default function PartnerOnboardingPage() {
  const router = useRouter()
  const [showKYCForm, setShowKYCForm] = useState(false)

  const steps: OnboardingStep[] = [
    { id: 1, title: "Check Merchant", completed: true, current: false },
    { id: 2, title: "Distribution Detail", completed: true, current: false },
    { id: 3, title: "Business Type", completed: true, current: false },
    { id: 4, title: "Business Detail", completed: true, current: false },
    { id: 5, title: "Business Owner", completed: true, current: false },
    { id: 6, title: "Fund Withdraw", completed: false, current: true },
    { id: 7, title: "Review", completed: false, current: false },
  ]

  const handleBankSelection = () => {
    setShowKYCForm(true)
  }

  const handleBack = () => {
    console.log("Going back to previous step")
  }

  const handleNext = () => {
    router.push("/partner-onboarding/review")
  }

  if (showKYCForm) {
    return <KYCFormComponent onBack={() => setShowKYCForm(false)} onComplete={handleNext} />
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Partner Onboarding</h2>
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between max-w-6xl">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step.completed
                        ? "bg-gray-10  text-green-600"
                        : step.current
                          ? "bg-green-500 text-white"
                          : "bg-gray-200  text-gray-600"
                    }`}
                  >
                    {step.completed ? "✓" : step.id}
                  </div>
                  <span
                    className={`mt-2 text-xs font-medium ${
                      step.completed || step.current ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${step.completed ? "bg-green-500" : "bg-gray-300"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 px-8 py-8">
          <div className="max-w-4xl">
            <div className="flex items-center justify-between mb-8">
                 <h3 className="text-2xl font-semibold text-gray-800 mb-8">Fund Withdraw Option</h3>

            </div>
           

            {/* <div className=" w-26  h-10 gap-6 mb-12">
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-green-500"
               
              > */}
                   
               <div className="mb-8"   onClick={handleBankSelection}>
              <div className="inline-flex items-center space-x-2 bg-white border-2 border-green-500 rounded-lg px-4 py-3 shadow-sm">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="font-medium text-gray-800">Bank</span>
              </div>
            </div>

          </div>
        </div>

        <div className="bg-white border-t border-gray-200 px-8 py-4 flex justify-end space-x-4">
          <Button variant="outline" onClick={handleBack} className="px-6">
            Back
          </Button>
          <Button onClick={handleNext} className="bg-green-600 hover:bg-green-700 text-white px-6" disabled>
            Next
          </Button>
        </div>
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
  const [errors, setErrors] = useState<Record<string, string>>({
    branchName: "Branch Name is required",
    accountName: "Bank Account Name is required",
    accountNumber: "Bank Account Number is required",
    proofOfBankAccount: "Bank Account File is required",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

 
  const banks = [
    "Commercial Bank of Ethiopia",
     "Awash",
    "Dashen Bank",
    "Bank of Abyssinia",
  ]

  const branches: Record<string, string[]> = {
    "Commercial Bank of Ethiopia": [
      "Addis Ababa Branch",
      "Dire Dawa Branch",
      "Bahir Dar Branch",
      "Mekelle Branch",
      "Hawassa Branch",
    ],
    Awash: [
      "Addis Ababa Branch",
      "Dire Dawa Branch",
      "Bahir Dar Branch",
      "Mekelle Branch",
      "Hawassa Branch",
    ],
    "Dashen Bank": [
      "Addis Ababa Branch",
      "Dire Dawa Branch",
      "Bahir Dar Branch",
      "Mekelle Branch",
      "Hawassa Branch",
    ],
  }

  const validateAccountNumber = (accountNumber: string): boolean => {
    return /^\d+$/.test(accountNumber) && accountNumber.length >= 8 && accountNumber.length <= 20
  }

  const validateFile = (file: File): string | null => {
    const allowedTypes = ["application/pdf", "image/png", "image/jpeg", "image/jpg"]
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (!allowedTypes.includes(file.type)) {
      return "File must be PDF, PNG, or JPG format"
    }

    if (file.size > maxSize) {
      return "File size must be less than 5MB"
    }

    return null
  }

  const isFormValid = (): boolean => {
    return (
      formData.bankName !== "" &&
      formData.branchName !== "" &&
      formData.accountName.trim() !== "" &&
      formData.accountNumber !== "" &&
      validateAccountNumber(formData.accountNumber) &&
      formData.proofOfBankAccount !== null
    )
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (field === "bankName") {
      setFormData((prev) => ({ ...prev, branchName: "" }))
    }

  
    if (value.trim() !== "") {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    } else {
      // Set error if field becomes empty
      let errorMessage = ""
      switch (field) {
        case "branchName":
          errorMessage = "Branch Name is required"
          break
        case "accountName":
          errorMessage = "Bank Account Name is required"
          break
        case "accountNumber":
          errorMessage = "Bank Account Number is required"
          break
      }
      if (errorMessage) {
        setErrors((prev) => ({ ...prev, [field]: errorMessage }))
      }
    }
  }

  const handleFileUpload = (file: File) => {
    const fileError = validateFile(file)
    if (fileError) {
      setErrors((prev) => ({ ...prev, proofOfBankAccount: fileError }))
      return
    }

    setFormData((prev) => ({ ...prev, proofOfBankAccount: file }))
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors.proofOfBankAccount
      return newErrors
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid()) {
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      onComplete()
    } catch (error) {
      console.error("KYC submission failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
    

    <SideBar  />
      <div className="flex-1 flex flex-col">
   
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Partner Onboarding</h2>
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
        </div>

     
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between max-w-6xl">
            {[
              { id: 1, title: "Check Merchant", completed: true },
              { id: 2, title: "Distribution Detail", completed: true },
              { id: 3, title: "Business Type", completed: true },
              { id: 4, title: "Business Detail", completed: true },
              { id: 5, title: "Business Owner", completed: true },
              { id: 6, title: "Fund Withdraw", completed: false, current: true },
              { id: 7, title: "Review", completed: false },
            ].map((step, index, steps) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
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
                    className={`mt-2 text-xs font-medium ${
                      step.completed || step.current ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${step.completed ? "bg-green-500" : "bg-gray-300"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

 
        <div className="flex-1 px-8 py-8 overflow-y-auto">
          <div className="max-w-6xl">
            <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Fund Withdraw Option</h3>

       
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 bg-white border-2 border-green-500 rounded-lg px-4 py-3 shadow-sm">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="font-medium text-gray-800">Bank</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Form Fields Row */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Bank Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Bank</label>
                  <select
                    value={formData.bankName}
                    onChange={(e) => handleInputChange("bankName", e.target.value)}
                    className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
                    required
                  >
                    {banks.map((bank) => (
                      <option key={bank} value={bank}>
                        {bank}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Branch Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Select Branch</label>
                  <select
                    value={formData.branchName}
                    onChange={(e) => handleInputChange("branchName", e.target.value)}
                    className={`w-full h-12 px-3 border rounded-lg focus:ring-2 focus:ring-green-500 bg-white ${
                      errors.branchName ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  >
                    <option value="">Select Branch</option>
                    {formData.bankName &&
                      branches[formData.bankName]?.map((branch) => (
                        <option key={branch} value={branch}>
                          {branch}
                        </option>
                      ))}
                  </select>
                  {errors.branchName && <p className="text-sm text-red-500">{errors.branchName}</p>}
                </div>

                {/* Account Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Account Name</label>
                  <input
                    type="text"
                    placeholder="Enter Account Name"
                    value={formData.accountName}
                    onChange={(e) => handleInputChange("accountName", e.target.value)}
                    className={`w-full h-12 px-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                      errors.accountName ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  />
                  {errors.accountName && <p className="text-sm text-red-500">{errors.accountName}</p>}
                </div>

                {/* Account Number */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Account Number</label>
                  <input
                    type="text"
                    placeholder="Enter Account Number"
                    value={formData.accountNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "")
                      handleInputChange("accountNumber", value)
                    }}
                    className={`w-full h-12 px-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                      errors.accountNumber ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  />
                  {errors.accountNumber && <p className="text-sm text-red-500">{errors.accountNumber}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Proof of Bank Account</label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 ${
                    errors.proofOfBankAccount ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                >
                  {formData.proofOfBankAccount ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M3 17a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3 5a2 2 0 012-2h1.586a1 1 0 01.707.293l1.414 1.414a1 1 0 00.707.293H15a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-green-600 font-medium">{formData.proofOfBankAccount.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, proofOfBankAccount: null }))
                          setErrors((prev) => ({ ...prev, proofOfBankAccount: "Bank Account File is required" }))
                        }}
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
                            if (e.target.files && e.target.files[0]) {
                              handleFileUpload(e.target.files[0])
                            }
                          }}
                        />
                      </label>
                    </div>
                  )}
                </div>
                {errors.proofOfBankAccount && <p className="text-sm text-red-500">{errors.proofOfBankAccount}</p>}
              </div>
            </form>
          </div>
        </div>

        <div className="bg-white border-t border-gray-200 px-8 py-4 flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="px-6 bg-green-600 text-white hover:bg-green-700 border-green-600"
          >
            Back
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-6"
            disabled={!isFormValid() || isSubmitting}
          >
            {isSubmitting ? "PROCESSING..." : "Next"}
          </Button>
        </div>
      </div>
    </div>
  )
}
