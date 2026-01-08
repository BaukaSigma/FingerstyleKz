import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { TabList } from "@/components/admin/TabList"

export const revalidate = 0

export default async function AdminTabsPage() {
    const supabase = await createClient()
    const { data: tabs } = await supabase
        .from('tabs')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Tabs</h1>
                <Link href="/admin/tabs/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        New Tab
                    </Button>
                </Link>
            </div>

            <TabList tabs={tabs || []} />
        </div>
    )
}
