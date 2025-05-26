"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, ShoppingCart, FileText, Users, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
// Update the import path below if your Input component is located elsewhere
import { Input } from "../ui/input"
import { Label } from "@/components/ui/label"
import Header from "../header"

interface FormData {
  email: string
  password: string
}

interface FormErrors {
  email?: string
  password?: string[]
}

export default function MPesaLoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }


  const validatePassword = (password: string): string[] => {
    const errors: string[] = []

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long")
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter")
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter")
    }
    if (!/\d/.test(password)) {
      errors.push("Password must contain at least one number")
    }
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      errors.push("Password must contain at least one special character")
    }

    return errors
  }

  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

   
    const passwordErrors = validatePassword(formData.password)
    if (!formData.password) {
      newErrors.password = ["Password is required"]
    } else if (passwordErrors.length > 0) {
      newErrors.password = passwordErrors
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }


  const isFormValid = (): boolean => {
    return (
      formData.email.trim() !== "" &&
      validateEmail(formData.email) &&
      formData.password !== "" &&
      validatePassword(formData.password).length === 0
    )
  }


  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/dashboard")
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gray-100">
     <Header   />
      <main className="w-full  mx-auto py-9">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className=" rounded-lg  p-8 lg:p-12">
            <div className="mb-8">
              <h1 className=" font-bold text-gray-500  text-4xl  mb-4">M-PESA Acquisition Portal</h1>
              <p className="text-gray-600 leading-relaxed">
                Welcome to M-PESA world of convenience! This Portal provides an efficient way to access and manage your
                sales.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e:any) => handleInputChange("email", e.target.value)}
                    className={`pl-12 h-12 border-gray-300 focus:border-green-500 focus:ring-green-500 ${
                      errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                    required
                  />
                </div>
                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password"   className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : " type something"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e:any) => handleInputChange("password", e.target.value)}
                    className={`pr-12 h-12 border-gray-300 focus:border-green-500 focus:ring-green-500 ${
                      errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <div className="space-y-1">
                    {errors.password.map((error, index) => (
                      <p key={index} className="text-sm text-red-600">
                        • {error}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium text-lg"
                disabled={!isFormValid() || isSubmitting}
              >
                {isSubmitting ? "SIGNING IN..." : "LOGIN"}
              </Button>

              {/* Forgot Password Link */}
              <div className="text-center">
                <a href="#" className="text-green-600 hover:text-green-700 font-medium text-sm">
                  FORGOT PASSWORD?
                </a>
              </div>
            </form>
          </div>

   
          <div className="hidden lg:flex flex-col items-center justify-center space-y-8">
            <div className="grid grid-cols-2 gap-8">

              <div className="flex flex-col items-center space-y-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">6</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-8 h-8 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-cyan-600" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
