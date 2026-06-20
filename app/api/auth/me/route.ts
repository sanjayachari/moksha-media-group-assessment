import { NextResponse } from "next/server"
import { requireAuth } from "@/lib/authorization"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"

export async function GET() {
  const auth = await requireAuth()
  if (!auth.authorized) return auth.response

  try {
    await dbConnect()
    const user = await User.findById(auth.session?.user.id).select("-password")
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
