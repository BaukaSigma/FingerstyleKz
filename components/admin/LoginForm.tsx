'use client'
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClient()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            router.refresh()
            // Wait a bit for cookie to set? ssr client sets it automatically via response? 
            // No, createBrowserClient sets it in document.cookie. 
            // Router refresh syncs server.
            router.push('/admin/tabs')
        }
    }

    return (
        <form onSubmit={handleLogin} className="space-y-4 text-left">
            {error && <div className="text-destructive text-sm bg-destructive/10 p-2 rounded">{error}</div>}
            <div>
                <label className="block text-sm font-medium mb-1.5 ml-1">Email</label>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="admin@fingerstyle.kz" />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1.5 ml-1">Password</label>
                <Input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </Button>
        </form>
    )
}
