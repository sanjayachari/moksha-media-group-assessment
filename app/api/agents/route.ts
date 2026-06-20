import { NextResponse } from "next/server"
import { requireAuth } from "@/lib/authorization"
import dbConnect from "@/lib/mongodb"
import Agent from "@/models/Agent"
import { z } from "zod"

const agentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["active", "inactive", "archived"]).optional(),
})

export async function GET(request: Request) {
  const auth = await requireAuth()
  if (!auth.authorized) return auth.response

  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1", 10)
    const limit = parseInt(searchParams.get("limit") || "10", 10)
    const search = searchParams.get("search") || ""

    const query: any = {}

    if (auth.session?.user.role !== "admin") {
      query.createdBy = auth.session?.user.id
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ]
    }

    const skip = (page - 1) * limit
    const total = await Agent.countDocuments(query)
    const agents = await Agent.find(query).populate("createdBy", "name email").skip(skip).limit(limit).sort({ createdAt: -1 })

    return NextResponse.json({
      data: agents,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const auth = await requireAuth()
  if (!auth.authorized) return auth.response

  try {
    const body = await request.json()
    const result = agentSchema.safeParse(body)

    return NextResponse.json(
      { error: result.error.issues[0]?.message || "Invalid input" },
      { status: 400 }
    )

    await dbConnect()
    const agent = await Agent.create({
      ...result.data,
      createdBy: auth.session?.user.id
    })

    return NextResponse.json({ data: agent }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
