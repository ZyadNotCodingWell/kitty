/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useState } from "react"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [signup, setSignup] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name_comple: "",
    phone: "",
    email: "",
    datenaissance: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSignup = async (e: React.FormEvent) => {
  e.preventDefault()
  setError("")

  try {
    const res = await fetch("http://localhost:8000/users/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.detail?.[0]?.msg || "Signup failed")
    }

    const user = await res.json()

    // Save to localStorage
    localStorage.setItem("guid", user.guid)
    localStorage.setItem("name_comple", user.name_comple)
    localStorage.setItem("email", user.email)

    window.location.href = "/dashboard"
  } catch (err: any) {
    setError(err.message || "Something went wrong")
  }
}


  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault()
  setError("")

  try {
    const res = await fetch("http://localhost:8000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.detail?.[0]?.msg || "Login failed")
    }

    const user = await res.json()

    // Save to localStorage
    localStorage.setItem("guid", user.guid)
    localStorage.setItem("name_comple", user.name_comple)
    localStorage.setItem("email", user.email)

    window.location.href = "/dashboard"
  } catch (err: any) {
    setError(err.message || "Something went wrong")
  }
}


  return (
    <div className={cn("flex flex-col gap-6 lg:gap-12 text-sm lg:text-xl", className)} {...props}>
      <Card className="hover:shadow-transparent">
        <CardHeader className="lg:mt-8">
          <CardTitle>{signup ? "Create your account" : "Login to your account"}</CardTitle>
          <CardDescription className="text-xs lg:text-base">
            {signup
              ? "Fill in the details below to create your account"
              : "Enter your email below to login to your account"}
          </CardDescription>
        </CardHeader>
        <CardContent className="lg:mb-4">
          <form onSubmit={signup ? handleSignup : handleLogin}>
            <div className="flex flex-col gap-6 lg:gap-7">
              {signup && (
                <>
                  <div className="grid gap-3">
                    <Label>Full Name</Label>
                    <Input
                      id="name_comple"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name_comple}
                      onChange={handleChange}
                      required
                    />
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <Label>Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1234567890"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                    <Label>Date of Birth</Label>
                    <Input
                      id="datenaissance"
                      type="date"
                      value={formData.datenaissance}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              )}
              {!signup && (
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {!signup && (
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}

              <div className="flex flex-col gap-3 lg:mt-4">
                <Button type="submit" className="w-full">
                  {signup ? "Sign Up" : "Login"}
                </Button>
              </div>
            </div>

            <div className="mt-4 text-center text-sm">
              {signup ? (
                <>
                  Already have an account?{" "}
                  <a
                    href="#"
                    onClick={() => setSignup(false)}
                    className="underline underline-offset-4"
                  >
                    Login
                  </a>
                </>
              ) : (
                <>
                  Don&apos;t have an account?{" "}
                  <a
                    href="#"
                    onClick={() => setSignup(true)}
                    className="underline underline-offset-4"
                  >
                    Sign up
                  </a>
                </>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
