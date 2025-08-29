import { NextRequest, NextResponse } from 'next/server'
import { generateDraftOrder } from '@/lib/draft-logic'
import { League } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    console.log('Received request body:', body)
    
    const league: League = JSON.parse(body)
    console.log('Parsed league:', { 
      totalRounds: league.totalRounds, 
      membersCount: league.members?.length,
      members: league.members?.map(m => ({ name: m.name, firstKeeper: !!m.firstKeeper?.id, secondKeeper: !!m.secondKeeper?.id }))
    })
    
    // Validate league data
    if (!league.totalRounds || !league.members || league.members.length === 0) {
      console.error('Invalid league data:', { totalRounds: league.totalRounds, membersLength: league.members?.length })
      return NextResponse.json(
        { error: 'Invalid league data: missing totalRounds or members' },
        { status: 400 }
      )
    }

    // Process the draft
    const picks = generateDraftOrder(league)
    console.log('Generated picks:', picks.length)
    
    return NextResponse.json(picks)
  } catch (error) {
    console.error('Error generating draft:', error)
    return NextResponse.json(
      { error: `Failed to generate draft: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}