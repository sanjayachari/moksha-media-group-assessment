import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // Allow only logged in users to access /dashboard
      if (req.nextUrl.pathname.startsWith("/dashboard")) {
        return !!token
      }
      return true
    },
  },
})

export const config = {
  matcher: ["/dashboard/:path*", "/api/users/:path*", "/api/agents/:path*"],
}
