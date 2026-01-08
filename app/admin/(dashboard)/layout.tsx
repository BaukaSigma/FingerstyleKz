import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogoutButton } from "@/components/admin/LogoutButton"
import { LayoutDashboard, FileMusic, Settings } from "lucide-react"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            <aside className="w-full md:w-64 border-r border-border bg-card/50 backdrop-blur-sm sticky md:h-screen top-0">
                <div className="p-6 border-b border-border/50">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Admin Panel
                    </h2>
                </div>
                <nav className="flex flex-col gap-2 p-4 flex-1">
                    <Link href="/admin/tabs">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <FileMusic className="w-4 h-4" />
                            Tabs
                        </Button>
                    </Link>
                    <Link href="/admin/settings">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <Settings className="w-4 h-4" />
                            Settings
                        </Button>
                    </Link>

                    <div className="mt-auto pt-6 border-t border-border/50">
                        <LogoutButton />
                    </div>
                </nav>
            </aside>
            <main className="flex-1 p-4 md:p-8 bg-background/50">
                {children}
            </main>
        </div>
    )
}
