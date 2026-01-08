'use client'

import { Settings } from "@/lib/types"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

export function SettingsForm({ initialData }: { initialData: Settings }) {
    const supabase = createClient()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState<Settings>(initialData)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const { error } = await supabase
            .from('settings')
            .update(formData)
            .eq('id', initialData.id)

        setLoading(false)
        if (error) {
            alert(`Error: ${error.message}`)
        } else {
            alert('Settings saved successfully')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg pb-10">
            <div className="p-4 border border-blue-500/20 bg-blue-500/10 rounded-lg text-sm mb-6">
                Global settings for contact buttons and footer links.
            </div>

            <h2 className="text-lg font-semibold border-b pb-2 text-primary">Contacts</h2>
            <div className="space-y-2">
                <Label>Telegram Username (without @)</Label>
                <div className="flex items-center">
                    <span className="p-2 bg-muted text-muted-foreground border border-r-0 rounded-l-md text-sm">@</span>
                    <Input
                        className="rounded-l-none"
                        value={formData.telegram_username}
                        onChange={e => setFormData({ ...formData, telegram_username: e.target.value })}
                        required
                    />
                </div>
            </div>
            <div className="space-y-2">
                <Label>WhatsApp Phone (e.g. 77001234567)</Label>
                <Input value={formData.whatsapp_phone_e164} onChange={e => setFormData({ ...formData, whatsapp_phone_e164: e.target.value })} required />
            </div>

            <h2 className="text-lg font-semibold border-b pb-2 pt-4 text-primary">Social Links</h2>
            <div className="space-y-2">
                <Label>Instagram URL</Label>
                <Input value={formData.instagram_url || ''} onChange={e => setFormData({ ...formData, instagram_url: e.target.value })} placeholder="https://instagram.com/..." />
            </div>
            <div className="space-y-2">
                <Label>TikTok URL</Label>
                <Input value={formData.tiktok_url || ''} onChange={e => setFormData({ ...formData, tiktok_url: e.target.value })} placeholder="https://tiktok.com/..." />
            </div>
            <div className="space-y-2">
                <Label>YouTube Channel URL</Label>
                <Input value={formData.youtube_url || ''} onChange={e => setFormData({ ...formData, youtube_url: e.target.value })} placeholder="https://youtube.com/..." />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Settings
            </Button>
        </form>
    )
}
