'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Post } from "@/lib/types"
import { slugify } from "@/lib/utils/slugify"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface PostFormProps {
    initialData?: Post | null
}

export function PostForm({ initialData }: PostFormProps) {
    const router = useRouter()
    const supabase = createClient()
    const [loading, setLoading] = useState(false)
    const [slugError, setSlugError] = useState<string | null>(null)

    const [formData, setFormData] = useState<Partial<Post>>(initialData || {
        status: 'draft',
        pinned: false,
        category: 'update',
        title_ru: '',
        title_kz: '',
        content_ru_md: '',
        content_kz_md: '',
        tags: []
    })

    // Helper for tags input (comma separated)
    const [tagsInput, setTagsInput] = useState(initialData?.tags?.join(', ') || '')

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagsInput(e.target.value)
        const tags = e.target.value.split(',').map(t => t.trim()).filter(Boolean)
        setFormData({ ...formData, tags })
    }

    const generateSlug = () => {
        if (!formData.slug && formData.title_kz) {
            const newSlug = slugify(formData.title_kz)
            setFormData(prev => ({ ...prev, slug: newSlug }))
            validateSlug(newSlug)
        }
    }

    const validateSlug = (val: string) => {
        if (!/^[a-z0-9-]+$/.test(val)) {
            setSlugError("Slug must be latin lowercase, numbers, hyphen only")
            return false
        }
        setSlugError(null)
        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Strict slug check
        if (!formData.slug || !validateSlug(formData.slug)) {
            setLoading(false)
            return
        }

        const payload = {
            ...formData,
            // If publishing now and no date set, set it
            published_at: (formData.status === 'published' && !formData.published_at)
                ? new Date().toISOString()
                : formData.published_at
        }

        let error
        if (initialData?.id) {
            const res = await supabase.from('posts').update(payload).eq('id', initialData.id)
            error = res.error
        } else {
            const res = await supabase.from('posts').insert([payload])
            error = res.error
        }

        setLoading(false)

        if (error) {
            alert(`Error: ${error.message}`)
        } else {
            router.push('/admin/news')
            router.refresh()
        }
    }

    // Delete handler
    const handleDelete = async () => {
        if (!initialData?.id) return
        if (!confirm("Are you sure you want to delete this post?")) return

        setLoading(true)
        const { error } = await supabase.from('posts').delete().eq('id', initialData.id)

        if (error) {
            alert(error.message)
            setLoading(false)
        } else {
            router.push('/admin/news')
            router.refresh()
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl pb-20">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/admin/news">
                        <Button variant="ghost" size="icon" type="button"><ArrowLeft className="w-4 h-4" /></Button>
                    </Link>
                    <h1 className="text-2xl font-bold">{initialData ? 'Edit Post' : 'New Post'}</h1>
                </div>
                {initialData && (
                    <Button type="button" variant="destructive" size="sm" onClick={handleDelete} disabled={loading}>
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Content Column */}
                <div className="md:col-span-2 space-y-6">

                    {/* Titles */}
                    <div className="space-y-4 p-4 border rounded-lg bg-card/50">
                        <Label className="text-lg font-semibold">Titles</Label>
                        <div className="grid gap-4">
                            <div>
                                <Label>Title (KZ) *</Label>
                                <Input
                                    value={formData.title_kz || ''}
                                    onChange={e => setFormData({ ...formData, title_kz: e.target.value })}
                                    onBlur={generateSlug}
                                    required
                                />
                            </div>
                            <div>
                                <Label>Title (RU) *</Label>
                                <Input
                                    value={formData.title_ru || ''}
                                    onChange={e => setFormData({ ...formData, title_ru: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content (KZ) */}
                    <div className="space-y-2">
                        <Label>Content (KZ Markdown)</Label>
                        <Textarea
                            className="min-h-[300px] font-mono text-sm"
                            value={formData.content_kz_md || ''}
                            onChange={e => setFormData({ ...formData, content_kz_md: e.target.value })}
                        />
                        <p className="text-xs text-muted-foreground">Supports :::callout ... ::: and :::tab slug="ukili-dombyra":::</p>
                    </div>

                    {/* Content (RU) */}
                    <div className="space-y-2">
                        <Label>Content (RU Markdown)</Label>
                        <Textarea
                            className="min-h-[300px] font-mono text-sm"
                            value={formData.content_ru_md || ''}
                            onChange={e => setFormData({ ...formData, content_ru_md: e.target.value })}
                        />
                    </div>

                </div>

                {/* Sidebar Column */}
                <div className="space-y-6">

                    {/* Status Card */}
                    <div className="p-4 border rounded-lg bg-card space-y-4">
                        <div className="flex items-center justify-between">
                            <Label>Status</Label>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">{formData.status}</span>
                                <Switch
                                    checked={formData.status === 'published'}
                                    onCheckedChange={checked => setFormData({ ...formData, status: checked ? 'published' : 'draft' })}
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between border-t pt-4">
                            <Label>Pinned</Label>
                            <Switch
                                checked={formData.pinned}
                                onCheckedChange={checked => setFormData({ ...formData, pinned: checked })}
                            />
                        </div>
                    </div>

                    {/* Metadata */}
                    <div className="p-4 border rounded-lg bg-card space-y-4">
                        <div className="space-y-2">
                            <Label>Slug *</Label>
                            <Input
                                value={formData.slug || ''}
                                onChange={e => {
                                    setFormData({ ...formData, slug: e.target.value })
                                    validateSlug(e.target.value)
                                }}
                                placeholder="my-post-url"
                            />
                            {slugError && <p className="text-xs text-red-500">{slugError}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>Category</Label>
                            <select
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="update">Update</option>
                                <option value="release">Release</option>
                                <option value="tutorial">Tutorial</option>
                                <option value="event">Event</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label>Tags (comma separated)</Label>
                            <Input
                                value={tagsInput}
                                onChange={handleTagsChange}
                                placeholder="news, guitar, fingerstyle"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Cover URL</Label>
                            <Input
                                value={formData.cover_url || ''}
                                onChange={e => setFormData({ ...formData, cover_url: e.target.value })}
                                placeholder="https://..."
                            />
                        </div>
                    </div>

                    {/* Excerpts */}
                    <div className="p-4 border rounded-lg bg-card space-y-4">
                        <div className="space-y-2">
                            <Label>Excerpt (KZ)</Label>
                            <Textarea
                                className="h-24"
                                value={formData.excerpt_kz || ''}
                                onChange={e => setFormData({ ...formData, excerpt_kz: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Excerpt (RU)</Label>
                            <Textarea
                                className="h-24"
                                value={formData.excerpt_ru || ''}
                                onChange={e => setFormData({ ...formData, excerpt_ru: e.target.value })}
                            />
                        </div>
                    </div>

                    <Button type="submit" disabled={loading || !!slugError} className="w-full h-12 text-lg">
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Post
                    </Button>
                </div>
            </div>
        </form>
    )
}
import { Trash2 } from "lucide-react"
