import { SettingsForm } from "@/components/admin/SettingsForm"
import { createClient } from "@/lib/supabase/server"

export const revalidate = 0

export default async function SettingsPage() {
    const supabase = await createClient()
    const { data: settings } = await supabase.from('settings').select('*').single()

    if (!settings) {
        return <div>Error: Settings row not found. Please run the migration.</div>
    }

    return (
        <div className="max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            <SettingsForm initialData={settings} />
        </div>
    )
}
