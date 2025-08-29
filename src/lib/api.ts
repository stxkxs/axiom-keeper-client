import { League, Player, Pick } from '@/types'

// Use relative URLs in production, absolute in development
const getApiUrl = (path: string) => {
  if (typeof window !== 'undefined') {
    // Client-side: use relative URLs
    return path
  }
  // Server-side: use absolute URL for development
  const API_BASE = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3000'
  return `${API_BASE}${path}`
}

export async function getPlayers(): Promise<Player[]> {
  const response = await fetch(getApiUrl('/api/draft/players'))
  if (!response.ok) {
    throw new Error('Failed to fetch players')
  }
  return response.json()
}

export async function generateDraft(league: League): Promise<Pick[]> {
  const response = await fetch(getApiUrl('/api/draft/generate'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(league),
  })
  
  if (!response.ok) {
    const errorText = await response.text()
    console.error('Draft generation failed:', response.status, errorText)
    throw new Error(`Failed to generate draft: ${response.status}`)
  }
  
  return response.json()
}