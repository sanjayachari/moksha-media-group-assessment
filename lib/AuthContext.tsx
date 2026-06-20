'use client'

import { SessionProvider, useSession } from "next-auth/react"
import React, { ReactNode } from "react"

export function AuthProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}

export function useAuth() {
  const { data: session, status, update } = useSession()
  return {
    user: session?.user,
    status,
    refreshUser: update,
  }
}
