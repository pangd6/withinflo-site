"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Zap, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { getWaitlistEntries } from "../../actions"

type WaitlistEntry = {
  id: string
  name: string
  email: string
  timestamp: string
}

export default function AdminWaitlistPage() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  // Check if user is already authenticated
  useEffect(() => {
    const auth = localStorage.getItem("admin-auth")
    if (auth === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      loadEntries()
    }
  }, [isAuthenticated])

  async function loadEntries() {
    setIsLoading(true)
    try {
      const data = await getWaitlistEntries()
      setEntries(data)
    } catch (error) {
      console.error("Error loading waitlist entries:", error)
    } finally {
      setIsLoading(false)
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (password === "password") {
      setIsAuthenticated(true)
      localStorage.setItem("admin-auth", "true")
      setError("")
    } else {
      setError("Invalid password")
    }
  }

  function handleLogout() {
    setIsAuthenticated(false)
    localStorage.removeItem("admin-auth")
    setShowLogoutDialog(false)
  }

  function handleBackToSite() {
    setShowLogoutDialog(true)
  }

  const exportToCSV = () => {
    // Create CSV content
    const headers = ["Name", "Email", "Timestamp (EST)"]
    const csvRows = [
      headers.join(","),
      ...entries.map((entry) => {
        const date = new Date(entry.timestamp)
        // Format date in EST
        const estDate = new Intl.DateTimeFormat("en-US", {
          timeZone: "America/Toronto",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(date)
        return `"${entry.name}","${entry.email}","${estDate}"`
      }),
    ]
    const csvContent = csvRows.join("\n")

    // Create a blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `withinflo-waitlist-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Format date to EST
  const formatDateToEST = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Toronto",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(date)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#EEE5E9]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-[#EEE5E9]">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-[#38686A]">WithinFlo Admin</span>
          </Link>
          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <Button variant="outline" onClick={handleBackToSite} className="bg-[#EEE5E9]">
                Back to Site
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8 bg-[#EEE5E9]">
        {!isAuthenticated ? (
          <Card className="max-w-md mx-auto bg-[#EEE5E9] border border-[#38686A]/20">
            <CardHeader>
              <CardTitle className="text-[#38686A]">Admin Login</CardTitle>
              <CardDescription>Enter your password to access the admin dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-[#38686A]">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-[#EEE5E9]"
                  />
                </div>
                {error && <div className="text-sm text-red-500">{error}</div>}
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-[#EEE5E9] border border-[#38686A]/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-[#38686A]">Waitlist Entries</CardTitle>
                <CardDescription>View and manage all waitlist sign-ups</CardDescription>
              </div>
              <Button onClick={exportToCSV} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8 text-[#38686A]">Loading waitlist data...</div>
              ) : entries.length === 0 ? (
                <div className="text-center py-8 text-[#38686A]">No waitlist entries yet.</div>
              ) : (
                <Table>
                  <TableHeader className="bg-[#EEE5E9]">
                    <TableRow>
                      <TableHead className="text-[#38686A]">Name</TableHead>
                      <TableHead className="text-[#38686A]">Email</TableHead>
                      <TableHead className="text-[#38686A]">Date (EST)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {entries.map((entry) => (
                      <TableRow key={entry.id} className="bg-[#EEE5E9]">
                        <TableCell className="text-[#38686A]">{entry.name || "Not provided"}</TableCell>
                        <TableCell className="text-[#38686A]">{entry.email}</TableCell>
                        <TableCell className="text-[#38686A]">{formatDateToEST(entry.timestamp)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              <div className="mt-4 text-sm text-[#38686A]">Total entries: {entries.length}</div>
            </CardContent>
          </Card>
        )}
      </main>

      <footer className="w-full border-t bg-[#EEE5E9]">
        <div className="container py-4 md:py-6">
          <p className="text-center text-sm text-[#38686A]">
            &copy; {new Date().getFullYear()} WithinFlo Admin Dashboard
          </p>
        </div>
      </footer>

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent className="bg-[#EEE5E9] border border-[#38686A]/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#38686A]">Are you sure you want to leave?</AlertDialogTitle>
            <AlertDialogDescription>Do you want to log out of the admin dashboard?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#EEE5E9]">No, Stay Logged In</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>
              <Link
                href="/"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                Yes, Log Out
              </Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
