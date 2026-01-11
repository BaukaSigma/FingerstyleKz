export interface Tab {
    id: string
    slug: string
    code: string
    title_kz: string
    title_ru?: string | null
    artist_kz?: string | null
    artist_ru?: string | null
    description_kz?: string | null
    description_ru?: string | null
    difficulty: 'easy' | 'medium' | 'hard'
    price_kzt: number
    youtube_embed_url?: string | null
    formats: string[]
    tuning?: string | null
    capo?: number | null
    tempo_bpm?: number | null
    tags?: string[] | null
    is_published: boolean
    promo_1plus1: boolean
    created_at: string
    updated_at: string
}

export interface Post {
    id: string
    slug: string
    status: 'draft' | 'published'
    pinned: boolean
    category: string
    tags: string[]
    published_at?: string | null
    title_ru: string
    title_kz: string
    excerpt_ru?: string | null
    excerpt_kz?: string | null
    cover_url?: string | null
    content_ru_md: string
    content_kz_md: string
    created_at: string
    updated_at: string
}

export interface Settings {
    id: string
    telegram_username: string
    whatsapp_phone_e164: string
    instagram_url?: string | null
    tiktok_url?: string | null
    youtube_url?: string | null
    support_note_kz?: string | null
    support_note_ru?: string | null
}
