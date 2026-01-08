import { LoginForm } from "@/components/admin/LoginForm"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function LoginPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <div className="absolute top-4 left-4">
                <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Home
                </Link>
            </div>
            <div className="w-full max-w-sm p-8 border rounded-xl bg-card shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold">Admin Access</h1>
                    <p className="text-sm text-muted-foreground mt-2">Sign in to manage tabs</p>
                </div>
                <LoginForm />
            </div>
        </div>
    )
}
