import { League, Player, Pick } from '@/types'

const API_BASE = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3000'

export async function getPlayers(): Promise<Player[]> {
  const response = await fetch(`${API_BASE}/api/draft/players`)
  if (!response.ok) {
    throw new Error('Failed to fetch players')
  }
  return response.json()
}

export async function generateDraft(league: League): Promise<Pick[]> {
  const response = await fetch(`${API_BASE}/api/draft/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(league),
  })
  
  if (!response.ok) {
    throw new Error('Failed to generate draft')
  }
  
  return response.json()
}