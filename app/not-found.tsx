import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
            <h2 className="text-4xl font-bold text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">404</h2>
            <p className="text-muted-foreground text-lg">Page not found</p>
            <Link href="/">
                <Button variant="outline">Go Home</Button>
            </Link>
        </div>
    )
}
