'use client'

import { Tab } from "@/lib/types"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { getYoutubeEmbedUrl } from "@/lib/utils"
import { slugify } from "@/lib/utils/slugify"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export function TabForm({ initialData }: { initialData?: Tab | null }) {
    const router = useRouter()
    const supabase = createClient()
    const [loading, setLoading] = useState(false)
    const [slugError, setSlugError] = useState<string | null>(null)

    // Initialize defaults
    const [formData, setFormData] = useState<Partial<Tab>>(initialData || {
        difficulty: 'medium',
        price_kzt: 1000,
        formats: ['PDF'],
        is_published: false,
        tags: [],
        youtube_embed_url: '',
        code: ''
    })

    const toggleFormat = (format: string) => {
        const current = formData.formats || []
        if (current.includes(format)) {
            setFormData({ ...formData, formats: current.filter(f => f !== format) })
        } else {
            setFormData({ ...formData, formats: [...current, format] })
        }
    }

    const validateSlug = (value: string) => {
        if (!value) {
            setSlugError(null)
            return true
        }

        // Strict regex: only a-z, 0-9, and hyphen
        const isValid = /^[a-z0-9-]+$/.test(value)
        if (!isValid) {
            setSlugError("Slug must be written in Latin letters, numbers, and hyphens only")
            return false
        }

        setSlugError(null)
        return true
    }

    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setFormData({ ...formData, slug: val })
        validateSlug(val)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Final validation check
        if (formData.slug && !validateSlug(formData.slug)) {
            return
        }

        setLoading(true)

        // Auto-generate Slug if missing
        let slug = formData.slug
        if (!slug && formData.title_kz) {
            // Auto-transliterate safely
            slug = slugify(formData.title_kz) + '-' + Math.floor(Math.random() * 1000)
        }

        // Validate generated or existing slug one last time
        if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
            setLoading(false)
            setSlugError("Invalid slug. Use Latin letters, numbers and hyphens only.")
            return
        }

        // Auto-generate Code if missing
        let code = formData.code
        if (!code) {
            code = `FSKZ-${Math.floor(1000 + Math.random() * 9000)}`
        }

        const payload = {
            ...formData,
            slug,
            code,
            youtube_embed_url: getYoutubeEmbedUrl(formData.youtube_embed_url || ''),
            price_kzt: Number(formData.price_kzt), // ensure number
            capo: formData.capo ? Number(formData.capo) : null,
            tempo_bpm: formData.tempo_bpm ? Number(formData.tempo_bpm) : null,
        }

        let error
        if (initialData?.id) {
            const res = await supabase.from('tabs').update(payload).eq('id', initialData.id)
            error = res.error
        } else {
            const res = await supabase.from('tabs').insert([payload])
            error = res.error
        }

        setLoading(false)
        if (error) {
            alert(`Error: ${error.message}`)
        } else {
            router.push('/admin/tabs')
            router.refresh()
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg pb-20">
            <div className="flex items-center gap-2 mb-4">
                <Link href="/admin/tabs">
                    <Button variant="ghost" size="icon" type="button"><ArrowLeft className="w-4 h-4" /></Button>
                </Link>
                <span className="text-sm text-muted-foreground">Back to list</span>
            </div>

            {/* Status Card */}
            <div className="p-4 border rounded-lg bg-card/50 flex items-center justify-between">
                <Label>Published Status</Label>
                <Switch
                    checked={formData.is_published}
                    onCheckedChange={checked => setFormData({ ...formData, is_published: checked })}
                />
            </div>

            <div className="space-y-2">
                <Label>Code (Auto-generated if empty)</Label>
                <Input value={formData.code || ''} onChange={e => setFormData({ ...formData, code: e.target.value })} placeholder="FSKZ-####" />
            </div>

            <div className="space-y-2">
                <Label>Title (KZ) *</Label>
                <Input value={formData.title_kz || ''} onChange={e => setFormData({ ...formData, title_kz: e.target.value })} required />
            </div>

            <div className="space-y-2">
                <Label>Title (RU)</Label>
                <Input value={formData.title_ru || ''} onChange={e => setFormData({ ...formData, title_ru: e.target.value })} />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Price (KZT) *</Label>
                    <Input type="number" value={formData.price_kzt || ''} onChange={e => setFormData({ ...formData, price_kzt: Number(e.target.value) })} required min={0} />
                </div>
                <div className="space-y-2">
                    <Label>Difficulty</Label>
                    <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                        value={formData.difficulty}
                        onChange={e => setFormData({ ...formData, difficulty: e.target.value as any })}
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <Label>Description (KZ)</Label>
                <Textarea value={formData.description_kz || ''} onChange={e => setFormData({ ...formData, description_kz: e.target.value })} />
            </div>

            <div className="space-y-2">
                <Label>Description (RU)</Label>
                <Textarea value={formData.description_ru || ''} onChange={e => setFormData({ ...formData, description_ru: e.target.value })} />
            </div>

            <div className="space-y-2">
                <Label>YouTube URL</Label>
                <Input value={formData.youtube_embed_url || ''} onChange={e => setFormData({ ...formData, youtube_embed_url: e.target.value })} placeholder="https://youtube.com/watch?v=..." />
                {formData.youtube_embed_url && (
                    <p className="text-xs text-muted-foreground">Will be normalized to embed URL on save.</p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Artist (KZ)</Label>
                    <Input value={formData.artist_kz || ''} onChange={e => setFormData({ ...formData, artist_kz: e.target.value })} />
                </div>
                <div className="space-y-2">
                    <Label>Artist (RU)</Label>
                    <Input value={formData.artist_ru || ''} onChange={e => setFormData({ ...formData, artist_ru: e.target.value })} />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label>Tuning</Label>
                    <Input value={formData.tuning || ''} onChange={e => setFormData({ ...formData, tuning: e.target.value })} placeholder="Standard" />
                </div>
                <div className="space-y-2">
                    <Label>Capo</Label>
                    <Input type="number" value={formData.capo || ''} onChange={e => setFormData({ ...formData, capo: Number(e.target.value) })} />
                </div>
                <div className="space-y-2">
                    <Label>BPM</Label>
                    <Input type="number" value={formData.tempo_bpm || ''} onChange={e => setFormData({ ...formData, tempo_bpm: Number(e.target.value) })} />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Formats</Label>
                <div className="flex gap-4">
                    {['PDF', 'GPX', 'GP5'].map(fmt => (
                        <label key={fmt} className="flex items-center gap-2 cursor-pointer border p-2 rounded hover:bg-muted/50">
                            <input
                                type="checkbox"
                                checked={formData.formats?.includes(fmt)}
                                onChange={() => toggleFormat(fmt)}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <span className="text-sm font-medium">{fmt}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <Label>Slug (SEO URL)</Label>
                <Input
                    value={formData.slug || ''}
                    onChange={handleSlugChange}
                    placeholder="Auto-generated from title (Latin only)"
                    className={slugError ? "border-red-500" : ""}
                />
                <p className="text-xs text-muted-foreground">
                    URL slug (Latin only). Leave empty to auto-generate.
                </p>
                {slugError && (
                    <p className="text-xs text-red-500 font-medium animate-pulse">{slugError}</p>
                )}
            </div>

            <Button type="submit" disabled={loading || !!slugError} className="w-full h-12 text-lg">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Tab
            </Button>
        </form>
    )
}
