import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { auth } from "@/auth"
import { SessionWrapper } from "@/components/session-wrapper"

export const metadata: Metadata = {
  title: "Guess The Distance",
  description: "A game where you guess the distance between 2 cities.",
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  return (
    <html lang="lt">
      <body className={`container mx-auto max-w-screen-x1`}>
        <SessionWrapper session={session}>
          <Header />
          {children}
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  )
}
