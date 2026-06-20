import { NextResponse } from "next/server"
import { requireAuth } from "@/lib/authorization"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"
import Agent from "@/models/Agent"

export async function GET() {
  const auth = await requireAuth()
  if (!auth.authorized) return auth.response

  try {
    await dbConnect()

    const isAdmin = auth.session?.user.role === "admin"
    const userId = auth.session?.user.id

    const agentQuery = isAdmin ? {} : { createdBy: userId }

    const [totalUsers, totalAgents, activeAgents, recentAgents] = await Promise.all([
      isAdmin ? User.countDocuments() : Promise.resolve(0),
      Agent.countDocuments(agentQuery),
      Agent.countDocuments({ ...agentQuery, status: "active" }),
      Agent.find(agentQuery)
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("createdBy", "name email")
        .lean()
    ])

    return NextResponse.json({
      data: {
        totalUsers,
        totalAgents,
        activeAgents,
        recentAgents
      }
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
