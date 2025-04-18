"use server"

import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"

// Define the type for our waitlist entries
type WaitlistEntry = {
  id: string
  name: string
  email: string
  timestamp: string
}

// Define the type for contact form submissions
type ContactSubmission = {
  id: string
  name: string
  email: string
  message: string
  timestamp: string
}

// Path to our local JSON files that will store the data
const WAITLIST_FILE_PATH = path.join(process.cwd(), "data", "waitlist.json")
const CONTACT_FILE_PATH = path.join(process.cwd(), "data", "contact.json")

// Ensure the data directory exists
function ensureDataDirectoryExists() {
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Read the current waitlist data
function readWaitlistData(): WaitlistEntry[] {
  ensureDataDirectoryExists()

  if (!fs.existsSync(WAITLIST_FILE_PATH)) {
    // If the file doesn't exist yet, create it with an empty array
    fs.writeFileSync(WAITLIST_FILE_PATH, JSON.stringify([]), "utf8")
    return []
  }

  const fileContent = fs.readFileSync(WAITLIST_FILE_PATH, "utf8")
  try {
    return JSON.parse(fileContent)
  } catch (error) {
    console.error("Error parsing waitlist data:", error)
    return []
  }
}

// Read the current contact submissions
function readContactData(): ContactSubmission[] {
  ensureDataDirectoryExists()

  if (!fs.existsSync(CONTACT_FILE_PATH)) {
    // If the file doesn't exist yet, create it with an empty array
    fs.writeFileSync(CONTACT_FILE_PATH, JSON.stringify([]), "utf8")
    return []
  }

  const fileContent = fs.readFileSync(CONTACT_FILE_PATH, "utf8")
  try {
    return JSON.parse(fileContent)
  } catch (error) {
    console.error("Error parsing contact data:", error)
    return []
  }
}

// Write data to the waitlist file
function writeWaitlistData(data: WaitlistEntry[]) {
  ensureDataDirectoryExists()
  fs.writeFileSync(WAITLIST_FILE_PATH, JSON.stringify(data, null, 2), "utf8")
}

// Write data to the contact file
function writeContactData(data: ContactSubmission[]) {
  ensureDataDirectoryExists()
  fs.writeFileSync(CONTACT_FILE_PATH, JSON.stringify(data, null, 2), "utf8")
}

// Add a new entry to the waitlist
export async function submitToWaitlist(formData: FormData) {
  try {
    // Get form data
    const email = formData.get("email") as string
    const name = (formData.get("name") as string) || "Not provided"

    if (!email) {
      throw new Error("Email is required")
    }

    // Read current data
    const currentData = readWaitlistData()

    // Check if email already exists
    const emailExists = currentData.some((entry) => entry.email === email)
    if (emailExists) {
      return { success: false, error: "This email is already on our waitlist" }
    }

    // Create new entry
    const newEntry: WaitlistEntry = {
      id: uuidv4(),
      name,
      email,
      timestamp: new Date().toISOString(),
    }

    // Add to data and write back to file
    currentData.push(newEntry)
    writeWaitlistData(currentData)

    console.log("New waitlist entry:", newEntry)

    return { success: true }
  } catch (error) {
    console.error("Error submitting form:", error)
    return { success: false, error: "Failed to submit form" }
  }
}

// Submit a contact form
export async function submitContactForm(formData: FormData) {
  try {
    // Get form data
    const email = formData.get("email") as string
    const name = formData.get("name") as string
    const message = formData.get("message") as string

    if (!email || !name || !message) {
      throw new Error("All fields are required")
    }

    // Read current data
    const currentData = readContactData()

    // Create new entry
    const newSubmission: ContactSubmission = {
      id: uuidv4(),
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    }

    // Add to data and write back to file
    currentData.push(newSubmission)
    writeContactData(currentData)

    console.log("New contact submission:", newSubmission)

    return { success: true }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return { success: false, error: "Failed to submit form" }
  }
}

// Get all waitlist entries (for admin purposes)
export async function getWaitlistEntries() {
  return readWaitlistData()
}

// Get all contact submissions (for admin purposes)
export async function getContactSubmissions() {
  return readContactData()
}
