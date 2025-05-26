"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LayoutDashboard, UserPlus, Eye, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ReviewPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const steps = [
    { id: 1, title: "Check Merchant", completed: true },
    { id: 2, title: "Distribution Detail", completed: true },
    { id: 3, title: "Business Type", completed: true },
    { id: 4, title: "Business Detail", completed: true },
    { id: 5, title: "Business Owner", completed: true },
    { id: 6, title: "Fund Withdraw", completed: true },
    { id: 7, title: "Review", completed: false, current: true },
  ]

 
  const formData = {
    bankName: "Commercial Bank of Ethiopia",
    branchName: "QATtest1",
    accountName: "Test 2  ",
    accountNumber: "100034534534534",
    proofOfBankAccount: "BANK ACCOUNT FILE"
  }

  const handleBack = () => {
    router.back()
  }

  const handleSaveAsDraft = async () => {
    setIsSaving(true)
    try {
      // Simulate API call to save as draft
      await new Promise((resolve) => setTimeout(resolve, 1500))
      // Show success message or redirect
      console.log("Saved as draft")
    } catch (error) {
      console.error("Failed to save draft:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      // Simulate API call to submit
      await new Promise((resolve) => setTimeout(resolve, 2000))
      // Redirect to success page or dashboard
      router.push("/partner-onboarding/success")
    } catch (error) {
      console.error("Failed to submit:", error)
    } finally {
      setIsSubmitting(false)
    }
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
          <h2 className="text-xl font-semibold text-gray-800">Partner Onboarding Review</h2>
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

      
        <div className="flex-1 px-8 py-8">
          <div className="max-w-6xl">
            <h3 className="text-2xl font-semibold text-gray-800 mb-12">FUND WITHDRAW OPTION</h3>

          
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">BANK NAME:</h4>
                    <p className="text-gray-600">{formData.bankName}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">ACCOUNT NUMBER:</h4>
                    <p className="text-gray-600">{formData.accountNumber}</p>
                  </div>
                </div>

                {/* Middle Column */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">BANK BRANCH NAME:</h4>
                    <p className="text-gray-600">{formData.branchName}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">PROOF OF BANK ACCOUNT:</h4>
                    <p className="text-green-600 font-medium">{formData.proofOfBankAccount}</p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">ACCOUNT NAME:</h4>
                    <p className="text-gray-600">{formData.accountName}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="bg-white border-t border-gray-200 px-8 py-4 flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={handleBack}
            className="px-6 bg-green-600 text-white hover:bg-green-700 border-green-600"
            disabled={isSubmitting || isSaving}
          >
            Back
          </Button>
          <Button
            variant="outline"
            onClick={handleSaveAsDraft}
            className="px-6 bg-green-600 text-white hover:bg-green-700 border-green-600"
            disabled={isSubmitting || isSaving}
          >
            {isSaving ? "Saving..." : "Save as Draft"}
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-6"
            disabled={isSubmitting || isSaving}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  )
}
