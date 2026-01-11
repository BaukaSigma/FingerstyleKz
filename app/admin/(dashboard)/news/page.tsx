import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, Pin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Post } from "@/lib/types"

export const revalidate = 0

export default async function AdminNewsPage() {
    const supabase = await createClient()

    const { data: posts, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        return <div className="p-4 text-red-500">Error loading posts: {error.message}</div>
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">News & Posts</h1>
                <Link href="/admin/news/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        New Post
                    </Button>
                </Link>
            </div>

            <div className="border rounded-lg bg-card text-card-foreground shadow-sm">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground uppercase h-10">
                        <tr>
                            <th className="px-4 py-2 font-medium">Title (RU)</th>
                            <th className="px-4 py-2 font-medium">Status</th>
                            <th className="px-4 py-2 font-medium">Date</th>
                            <th className="px-4 py-2 font-medium">Pinned</th>
                            <th className="px-4 py-2 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {posts?.map((post: Post) => (
                            <tr key={post.id} className="hover:bg-muted/50 transition-colors">
                                <td className="px-4 py-3 font-medium">{post.title_ru}</td>
                                <td className="px-4 py-3">
                                    <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                                        {post.status}
                                    </Badge>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">
                                    {post.published_at ? new Date(post.published_at).toLocaleDateString() : '-'}
                                </td>
                                <td className="px-4 py-3">
                                    {post.pinned && <Pin className="h-4 w-4 text-primary" />}
                                </td>
                                <td className="px-4 py-3 text-right space-x-2">
                                    <Link href={`/admin/news/${post.id}/edit`}>
                                        <Button variant="ghost" size="icon">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    {/* Delete logic typically requires a client component wrapper or form action.
                                        For MVP simplicity, we can make this edit page have a delete button inside.
                                    */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {!posts?.length && (
                    <div className="p-8 text-center text-muted-foreground">
                        No posts found. Create your first one!
                    </div>
                )}
            </div>
        </div>
    )
}
