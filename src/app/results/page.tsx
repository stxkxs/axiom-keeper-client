'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Pick } from '@/types'

function ResultsContent() {
  const [totalRounds, setTotalRounds] = useState(0)
  const [picks, setPicks] = useState<Pick[]>([])
  
  useEffect(() => {
    // Get data from sessionStorage on client side only
    const data = sessionStorage.getItem('draftResults')
    if (data) {
      try {
        const parsed = JSON.parse(data)
        setTotalRounds(parsed.totalRounds)
        setPicks(parsed.picks)
      } catch (error) {
        console.error('Failed to parse results data:', error)
      }
    }
  }, [])

  const generateDraftText = () => {
    if (picks.length === 0) return ''

    // Group picks by round
    const picksByRound: { [round: number]: Pick[] } = {}
    picks.forEach(pick => {
      if (!picksByRound[pick.round]) {
        picksByRound[pick.round] = []
      }
      picksByRound[pick.round].push(pick)
    })

    // Generate text format
    let draftText = `DRAFT ORDER - ${totalRounds} Rounds\n`
    draftText += `Total Picks: ${picks.length} | Keepers: ${picks.filter(p => p.keeper).length}\n\n`

    for (let round = 1; round <= totalRounds; round++) {
      const roundPicks = picksByRound[round] || []
      if (roundPicks.length > 0) {
        draftText += `ROUND ${round}\n`
        draftText += '─'.repeat(50) + '\n'
        
        const sortedPicks = roundPicks.sort((a, b) => a.pick - b.pick)
        sortedPicks.forEach((pick) => {
          const keeperTag = pick.keeper ? ' [KEEPER]' : ''
          draftText += `${pick.pick.toString().padStart(3)}. ${pick.member.padEnd(25)} ${pick.player}${keeperTag}\n`
        })
        draftText += '\n'
      }
    }

    return draftText
  }

  const copyDraftOrder = async () => {
    const draftText = generateDraftText()
    if (!draftText) return

    try {
      await navigator.clipboard.writeText(draftText)
      // You could add a toast notification here if desired
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }

  const downloadDraftOrder = () => {
    const draftText = generateDraftText()
    if (!draftText) return

    const blob = new Blob([draftText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `draft-order-${totalRounds}-rounds.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!picks.length) {
    return (
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold font-serif">No Results</h1>
        <p className="text-muted-foreground">
          No draft results to display.
        </p>
        <Button asChild>
          <Link href="/setup">Back to Setup</Link>
        </Button>
      </div>
    )
  }

  const groupedByRound = picks.reduce((acc, pick) => {
    if (!acc[pick.round]) {
      acc[pick.round] = []
    }
    acc[pick.round].push(pick)
    return acc
  }, {} as Record<number, Pick[]>)

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold font-serif">Draft Results</h1>
        <p className="text-muted-foreground">
          Complete draft order with keeper assignments and penalties
        </p>
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground font-mono">
          <span>Total Picks: {picks.length}</span>
          <span>•</span>
          <span>Rounds: {totalRounds}</span>
          <span>•</span>
          <span>Keepers: {picks.filter(p => p.keeper).length}</span>
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedByRound)
          .sort(([a], [b]) => parseInt(a) - parseInt(b))
          .map(([roundStr, roundPicks]) => {
            const round = parseInt(roundStr)
            const sortedPicks = roundPicks.sort((a, b) => a.pick - b.pick)
            
            return (
              <Card key={round} className="border-border/40 shadow-sm">
                <CardHeader>
                  <CardTitle className="font-serif text-lg flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-mono">
                      {round}
                    </span>
                    Round {round}
                    <span className="text-sm font-normal text-muted-foreground">
                      ({sortedPicks.length} picks)
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sortedPicks.map((pick) => (
                      <div
                        key={`${pick.round}-${pick.pick}`}
                        className={`p-3 rounded-lg border ${
                          pick.keeper 
                            ? 'bg-primary/5 border-primary/20' 
                            : 'bg-card/50 border-border/30'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <p className="font-medium">{pick.player}</p>
                            <p className="text-sm text-muted-foreground font-mono">{pick.member}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-mono text-xs text-muted-foreground">#{pick.pick}</p>
                            {pick.keeper && (
                              <span className="inline-flex items-center px-2 py-1 text-xs font-mono bg-primary/10 text-primary rounded-full border border-primary/20">
                                KEEPER
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
      </div>

      <div className="flex justify-center gap-4 pt-8">
        <Button variant="outline" asChild>
          <Link href="/setup">Back to Setup</Link>
        </Button>
        <Button variant="outline" onClick={copyDraftOrder}>
          Copy Draft Order
        </Button>
        <Button onClick={downloadDraftOrder}>
          Download as Text
        </Button>
      </div>
    </div>
  )
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div>Loading results...</div>}>
      <ResultsContent />
    </Suspense>
  )
}