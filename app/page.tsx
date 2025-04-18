"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight, BarChart2, Zap, Linkedin, Target } from "lucide-react"

export default function LandingPage() {
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

  return (
    <div className="flex min-h-screen flex-col bg-[#EEE5E9]">
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

      <main className="flex-1 bg-[#EEE5E9]">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-16 lg:py-20 xl:py-24 bg-[#EEE5E9]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter text-[#38686A] sm:text-5xl xl:text-6xl/none">
                  You Create. We Automate.
                </h1>
                <p className="text-[#38686A] md:text-xl max-w-[600px] mx-auto">
                  Marketing your course shouldn't take a huge team and hours of work. Let us market for you.
                </p>
              </div>
              <div className="mt-6">
                <Link href="/waitlist#top">
                  <Button
                    size="lg"
                    className="gap-1 transition-all duration-300 hover:scale-105 hover:bg-primary/90 hover:shadow-lg"
                  >
                    Join the Waitlist <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-10 md:py-14 lg:py-16 bg-[#EEE5E9]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter text-[#38686A] md:text-4xl">Everything You Need</h2>
                <p className="max-w-[900px] text-[#38686A] md:text-xl">
                  We help you sell your course effectively and get more customers
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-8 lg:grid-cols-3">
              <Card className="bg-[#EEE5E9] border border-[#38686A]/20">
                <CardHeader>
                  <Target className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="text-[#38686A]">Custom Marketing Solutions</CardTitle>
                  <CardDescription className="text-[#38686A]/70">
                    Tailored marketing strategies designed specifically for your niche.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-[#38686A]">Target audience analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-[#38686A]">Personalized campaigns</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-[#38686A]">Multi-channel promotion</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-[#EEE5E9] border border-[#38686A]/20">
                <CardHeader>
                  <Zap className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="text-[#38686A]">Automation</CardTitle>
                  <CardDescription className="text-[#38686A]/70">
                    Automate repetitive tasks and focus on creating content.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-[#38686A]">Workflow automation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-[#38686A]">Scheduled tasks</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-[#38686A]">Easy-to-use tools</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-[#EEE5E9] border border-[#38686A]/20">
                <CardHeader>
                  <BarChart2 className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="text-[#38686A]">Advanced Analytics</CardTitle>
                  <CardDescription className="text-[#38686A]/70">
                    Gain insights into your workflow with detailed analytics and reporting.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-[#38686A]">Advanced data visualization</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-[#38686A]">Custom report generation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-[#38686A]">Performance tracking</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-10 md:py-14 lg:py-16 bg-[#EEE5E9]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter text-[#38686A] md:text-4xl">
                  Ready to Level Up Your Marketing?
                </h2>
              </div>
              <div>
                <Link href="/waitlist#top">
                  <Button
                    size="lg"
                    className="gap-1 transition-all duration-300 hover:scale-105 hover:bg-primary/90 hover:shadow-lg"
                  >
                    Join the Waitlist <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-[#38686A] pb-4">Sign up to be a free beta tester.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-[#EEE5E9]">
        <div className="container flex flex-col items-center justify-center gap-4 py-8">
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
          <div className="container py-3">
            <p className="text-center text-sm text-[#38686A]">
              &copy; {new Date().getFullYear()} WithinFlo. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
