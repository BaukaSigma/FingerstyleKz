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
