import './globals.css'
import { AuthProvider } from '@/lib/AuthContext'

export const metadata = {
  title: 'Enterprise AI Agents — Built for Real Work',
  description:
    'Deploy customer support, research, and workflow automation agents tailored to your business needs and goals. Scalable AI systems for modern enterprises.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
