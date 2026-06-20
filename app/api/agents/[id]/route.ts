import { NextResponse } from "next/server"
import { requireAuth } from "@/lib/authorization"
import dbConnect from "@/lib/mongodb"
import Agent from "@/models/Agent"
import mongoose from "mongoose"
import { z } from "zod"

const agentSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  status: z.enum(["active", "inactive", "archived"]).optional(),
})

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const auth = await requireAuth()
  if (!auth.authorized) return auth.response

  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return NextResponse.json({ error: "Invalid agent ID" }, { status: 400 })
  }

  try {
    await dbConnect()
    const agent = await Agent.findById(params.id).populate("createdBy", "name email")

    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 })
    }

    if (auth.session?.user.role !== "admin" && agent.createdBy._id.toString() !== auth.session?.user.id) {
      return NextResponse.json({ error: "Forbidden: You do not own this agent" }, { status: 403 })
    }

    return NextResponse.json({ data: agent })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const auth = await requireAuth()
  if (!auth.authorized) return auth.response

  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return NextResponse.json({ error: "Invalid agent ID" }, { status: 400 })
  }

  try {
    const body = await request.json()
    const result = agentSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.flatten().formErrors[0] || "Invalid input" },
        { status: 400 }
      )
    }

    await dbConnect()
    const agent = await Agent.findById(params.id)

    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 })
    }

    if (auth.session?.user.role !== "admin" && agent.createdBy.toString() !== auth.session?.user.id) {
      return NextResponse.json({ error: "Forbidden: You do not own this agent" }, { status: 403 })
    }

    const updated = await Agent.findByIdAndUpdate(params.id, result.data, { new: true })
    return NextResponse.json({ data: updated })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const auth = await requireAuth()
  if (!auth.authorized) return auth.response

  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return NextResponse.json({ error: "Invalid agent ID" }, { status: 400 })
  }

  try {
    await dbConnect()
    const agent = await Agent.findById(params.id)

    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 })
    }

    if (auth.session?.user.role !== "admin" && agent.createdBy.toString() !== auth.session?.user.id) {
      return NextResponse.json({ error: "Forbidden: You do not own this agent" }, { status: 403 })
    }

    await Agent.findByIdAndDelete(params.id)
    return NextResponse.json({ data: { success: true } })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
