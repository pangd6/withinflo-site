"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Zap, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { submitToWaitlist } from "../actions"

export default function WaitlistPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setError("")

    try {
      const result = await submitToWaitlist(formData)

      if (result.success) {
        setIsSuccess(true)
      } else {
        setError(result.error || "Something went wrong. Please try again.")
      }
    } catch (e) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#EEE5E9]" id="top">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-[#EEE5E9]">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-[#38686A]">WithinFlo</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {!scrolled && (
              <Link href="/#features" className="text-sm font-medium text-[#38686A] hover:text-primary">
                Features
              </Link>
            )}
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/waitlist#top">
              <Button>Join the Waitlist</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 md:p-8 bg-[#EEE5E9]">
        <Card className="w-full max-w-md bg-[#EEE5E9] border border-[#38686A]/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-[#38686A]">Join the Waitlist</CardTitle>
            <CardDescription>
              Be the first to know when WithinFlo launches. We'll notify you as soon as we're ready.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSuccess ? (
              <div className="text-center space-y-4">
                <div className="text-xl font-medium text-primary">Thank you for joining our waitlist!</div>
                <p className="text-[#38686A]">We'll notify you when WithinFlo is ready to launch.</p>
                <Link href="/">
                  <Button variant="outline" className="mt-4 bg-[#EEE5E9]">
                    Return to Home
                  </Button>
                </Link>
              </div>
            ) : (
              <form className="space-y-4" action={handleSubmit}>
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-[#38686A] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Name
                  </label>
                  <Input id="name" name="name" placeholder="Enter your name" className="bg-[#EEE5E9]" />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-[#38686A] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="bg-[#EEE5E9]"
                  />
                </div>
                {error && <div className="text-sm text-red-500">{error}</div>}
                <Button
                  type="submit"
                  className="w-full transition-all duration-300 hover:scale-105 hover:bg-primary/90 hover:shadow-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Join Now"}
                </Button>
              </form>
            )}
            <div className="mt-4 text-center text-sm text-[#38686A]">
              <p>We respect your privacy and will never share your information.</p>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-[#EEE5E9]">
        <div className="container flex flex-col items-center justify-center gap-4 py-10">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-6 md:px-0">
            <Link href="/#features" className="text-sm font-medium text-[#38686A] hover:text-primary">
              Features
            </Link>
            <Link href="/waitlist#top" className="text-sm font-medium text-[#38686A] hover:text-primary">
              Waitlist
            </Link>
            <Link href="/contact#top" className="text-sm font-medium text-[#38686A] hover:text-primary">
              Contact
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <Link href="#" className="text-[#38686A] hover:text-primary">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
          <div className="container py-4 md:py-6">
            <p className="text-center text-sm text-[#38686A]">
              &copy; {new Date().getFullYear()} WithinFlo. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
