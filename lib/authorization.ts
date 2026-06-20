import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth"
import { NextResponse } from "next/server"

export async function requireAuth() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return {
      authorized: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
      session: null
    }
  }

  return { authorized: true, session, response: null }
}

export async function requireAdmin() {
  const auth = await requireAuth()
  
  if (!auth.authorized) return auth

  if (auth.session?.user.role !== "admin") {
    return {
      authorized: false,
      response: NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 }),
      session: auth.session
    }
  }

  return { authorized: true, session: auth.session, response: null }
}

export async function requireOwnership(resourceOwnerId: string) {
  const auth = await requireAuth()
  
  if (!auth.authorized) return auth

  if (auth.session?.user.role === "admin") {
    return { authorized: true, session: auth.session, response: null }
  }

  if (auth.session?.user.id !== resourceOwnerId) {
    return {
      authorized: false,
      response: NextResponse.json({ error: "Forbidden: You do not own this resource" }, { status: 403 }),
      session: auth.session
    }
  }

  return { authorized: true, session: auth.session, response: null }
}
