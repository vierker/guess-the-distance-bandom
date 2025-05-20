"use client"

import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

type IProps = { children: React.ReactNode; session: Session | null }

export function SessionWrapper(props: IProps) {
  const { children, session } = props
  return <SessionProvider session={session}>{children}</SessionProvider>
}
