import { createClient } from "@/lib/supabase/server"
import { PostForm } from "@/components/admin/PostForm"
import { Post } from "@/lib/types"

export const revalidate = 0

// Correctly typing params for Next.js 15
export default async function AdminEditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const supabase = await createClient()
    const { id } = await params

    const { data: post } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single()

    if (!post) {
        return <div>Post not found</div>
    }

    return <PostForm initialData={post as Post} />
}
