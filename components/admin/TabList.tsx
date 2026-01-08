'use client'

import { Tab } from "@/lib/types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { formatPrice } from "@/lib/utils"

export function TabList({ tabs }: { tabs: Tab[] }) {
    const supabase = createClient()
    const router = useRouter()
    const [deleting, setDeleting] = useState<string | null>(null)

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this tab?')) return
        setDeleting(id)
        await supabase.from('tabs').delete().eq('id', id)
        router.refresh()
        setDeleting(null)
    }

    const handleTogglePublish = async (tab: Tab) => {
        await supabase.from('tabs').update({ is_published: !tab.is_published }).eq('id', tab.id)
        router.refresh()
    }

    return (
        <div className="grid gap-4">
            {tabs.length === 0 && <p className="text-muted-foreground">No tabs found. Create one!</p>}
            {tabs.map((tab) => (
                <Card key={tab.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4 bg-card/50">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <Badge variant={tab.is_published ? 'default' : 'secondary'} className={tab.is_published ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' : ''}>
                                {tab.is_published ? 'Published' : 'Draft'}
                            </Badge>
                            <span className="text-xs text-muted-foreground font-mono bg-muted p-1 rounded">{tab.code}</span>
                        </div>
                        <h3 className="text-lg font-semibold">{tab.title_kz}</h3>
                        {tab.title_ru && <p className="text-sm text-muted-foreground">{tab.title_ru}</p>}
                        <p className="text-sm font-medium mt-1 text-primary">{formatPrice(tab.price_kzt)}</p>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Button size="icon" variant="ghost" onClick={() => handleTogglePublish(tab)} title={tab.is_published ? "Unpublish" : "Publish"}>
                            {tab.is_published ? <Eye className="h-4 w-4 text-green-500" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                        </Button>
                        <Link href={`/admin/tabs/${tab.id}/edit`}>
                            <Button size="icon" variant="ghost">
                                <Edit className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Button
                            size="icon"
                            variant="ghost"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDelete(tab.id)}
                            disabled={deleting === tab.id}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
    )
}
