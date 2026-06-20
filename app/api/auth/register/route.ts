import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"
import bcrypt from "bcrypt"
import { z } from "zod"

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters").regex(/[0-9]/, "Password must contain a number"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = registerSchema.safeParse(body)
    if (!result.success) {
      const errorMessage =
        result.error.issues[0]?.message || "Validation failed"

      return NextResponse.json({ error: errorMessage }, { status: 400 })
    }

    const { name, email, password } = result.data

    await dbConnect()

    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "user"
    })

    return NextResponse.json({
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }, { status: 201 })
  } catch (error) {
    console.error("Register Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
