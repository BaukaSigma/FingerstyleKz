import { TabForm } from "@/components/admin/TabForm"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

export const revalidate = 0

export default async function EditTabPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient()
    const { data: tab } = await supabase.from('tabs').select('*').eq('id', id).single()

    if (!tab) notFound()

    return (
        <div className="max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Edit Tab</h1>
            <TabForm initialData={tab} />
        </div>
    )
}
