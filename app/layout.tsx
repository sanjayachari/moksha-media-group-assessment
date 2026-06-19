import './globals.css'

export const metadata = {
  title: 'Enterprise AI Agents — Built for Real Work',
  description:
    'Deploy customer support, research, and workflow automation agents tailored to your business needs and goals. Scalable AI systems for modern enterprises.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
