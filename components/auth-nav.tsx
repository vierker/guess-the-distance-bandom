import { auth, signOut } from "@/auth"

export async function AuthNav() {
  const session = await auth()
  return (
    <ul className="grid grid-flow-col w-fit gap-x-2">
      {!session ? (
        <>
          <li>
            <a className="text-sm text-orange-700" href="/signup">
              Registruotis
            </a>
          </li>
          <li>
            <a className="text-sm text-orange-700" href="/signin">
              Prisijungti
            </a>
          </li>
        </>
      ) : null}
      {session ? (
        <>
          <li>
            <button type="button" className="text-sm text-orange-700">
              {session?.user ? session?.user?.name : ""}
            </button>
          </li>
          <li>
            <form
              action={async () => {
                "use server"
                await signOut({ redirectTo: "/" })
              }}
            >
              <button className="text-sm text-orange-700" type="submit">
                Atsijungti
              </button>
            </form>
          </li>
        </>
      ) : null}
    </ul>
  )
}
