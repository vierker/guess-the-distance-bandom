import { AuthNav } from "./auth-nav"
import { Nav } from "./nav"
import { INav } from "@/types/nav-t"

const menu: INav[] = [
  { title: "ex 1", slug: "goto1" },
  { title: "ex 2", slug: "goto2" },
  { title: "ex 3", slug: "goto3" },
]

export function Header() {
  return (
    <header className="border-b border-blue-500 p-1 mb-5 grid grid-flow-col gap-x-4 justify-between items-center">
      <Nav menu={menu} />
      <AuthNav />
      <div className="text-orange-50 bg-purple-950 text-red-600 font-sans rounded-tl-2xl rounded-tr-2xl text-center">
        You're screwd
      </div>
    </header>
  )
}
