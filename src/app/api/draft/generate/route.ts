import { NextRequest, NextResponse } from 'next/server'
import { generateDraftOrder } from '@/lib/draft-logic'
import { League } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const league: League = await request.json()
    
    // Validate league data
    if (!league.totalRounds || !league.members || league.members.length === 0) {
      return NextResponse.json(
        { error: 'Invalid league data' },
        { status: 400 }
      )
    }

    // Process the draft
    const picks = generateDraftOrder(league)
    
    return NextResponse.json(picks)
  } catch (error) {
    console.error('Error generating draft:', error)
    return NextResponse.json(
      { error: 'Failed to generate draft' },
      { status: 500 }
    )
  }
}