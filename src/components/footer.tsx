import { Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border/40 mt-16">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center text-sm text-muted-foreground">
          <a
            href="https://github.com/stxkxs/axiom-keeper-client"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <Github className="h-4 w-4" />
            <span>View on GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  )
}