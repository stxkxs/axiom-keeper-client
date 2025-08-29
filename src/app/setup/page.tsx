'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MemberForm } from '@/components/member-form'
import { Member, Player } from '@/types'
import { getPlayers, generateDraft } from '@/lib/api'
import { createEmptyKeeper } from '@/lib/keeper-rules'
import { keepers2025, draftOrder2025 } from '@/data/draft-2024'

const DEFAULT_ROUNDS = 14
const DEFAULT_MEMBERS = 12
const MIN_ROUNDS = 10
const MAX_ROUNDS = 18

function createEmptyMember(): Member {
  return {
    name: '',
    firstKeeper: createEmptyKeeper(),
    secondKeeper: { ...createEmptyKeeper(), keeperSlot: 2 }
  }
}

export default function SetupPage() {
  const router = useRouter()
  const [totalRounds, setTotalRounds] = useState(DEFAULT_ROUNDS)
  const [players, setPlayers] = useState<Player[]>([])
  const [members, setMembers] = useState<Member[]>(
    Array.from({ length: DEFAULT_MEMBERS }, createEmptyMember)
  )
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getPlayers()
      .then(setPlayers)
      .catch(console.error)
  }, [])

  const updateMember = (index: number, member: Member) => {
    const updated = [...members]
    updated[index] = member
    setMembers(updated)
  }

  const load2025Keepers = () => {
    const updatedMembers = Array.from({ length: 12 }, () => createEmptyMember())
    
    // Fill members in draft order (position 0 = #1 pick, position 11 = #12 pick)
    draftOrder2025.forEach((teamName, draftPosition) => {
      const teamKeeper = keepers2025.find(tk => tk.displayName === teamName)
      
      if (teamKeeper) {
        updatedMembers[draftPosition] = {
          name: teamKeeper.displayName,
          firstKeeper: createEmptyKeeper(),
          secondKeeper: { ...createEmptyKeeper(), keeperSlot: 2 }
        }
        
        // Set keepers for this team
        teamKeeper.keepers.forEach((keeper, keeperIndex) => {
          const player = players.find(p => 
            p.name.toLowerCase().includes(keeper.player.toLowerCase()) ||
            keeper.player.toLowerCase().includes(p.name.toLowerCase())
          )
          const keeperSlot = keeperIndex === 0 ? 'firstKeeper' : 'secondKeeper'
          
          if (player) {
            const originalRound = keeper.isFreeAgent ? 0 : (keeper.originalRound || 0)
            const penaltyRound = keeper.isFreeAgent ? null : (originalRound + 2 > totalRounds ? null : originalRound + 2)
            
            updatedMembers[draftPosition][keeperSlot] = {
              id: player.id,
              name: player.name,
              originalRound,
              yearsKept: 1,
              keeperSlot: keeperIndex + 1 as 1 | 2,
              penaltyRound
            }
          }
        })
      } else {
        // Team with no keepers
        updatedMembers[draftPosition] = {
          name: teamName,
          firstKeeper: createEmptyKeeper(),
          secondKeeper: { ...createEmptyKeeper(), keeperSlot: 2 }
        }
      }
    })
    
    setMembers(updatedMembers)
  }

  const increaseTotalRounds = () => {
    if (totalRounds < MAX_ROUNDS) {
      setTotalRounds(totalRounds + 1)
    }
  }

  const decreaseTotalRounds = () => {
    if (totalRounds > MIN_ROUNDS) {
      setTotalRounds(totalRounds - 1)
    }
  }

  const cleanMembers = (members: Member[]) => {
    return members.map(member => {
      const cleaned: any = { name: member.name }
      
      if (member.firstKeeper?.id && member.firstKeeper?.name) {
        cleaned.firstKeeper = member.firstKeeper
      }
      
      if (member.secondKeeper?.id && member.secondKeeper?.name) {
        cleaned.secondKeeper = member.secondKeeper
      }
      
      return cleaned
    })
  }

  const handleGenerateDraft = async () => {
    const configuredMembers = members.filter(m => m.name && m.name.trim() !== '')
    
    if (configuredMembers.length < 2) {
      alert('Please configure at least 2 team members before generating draft order.')
      return
    }
    
    setLoading(true)
    try {
      const league = {
        totalRounds,
        members: cleanMembers(configuredMembers)
      }
      
      const picks = await generateDraft(league)
      
      // Store results in sessionStorage to avoid URL length limits
      const resultsData = { totalRounds, picks }
      sessionStorage.setItem('draftResults', JSON.stringify(resultsData))
      router.push('/results')
    } catch (error) {
      console.error('Failed to generate draft:', error)
      alert('Failed to generate draft order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold font-serif">Draft Setup</h1>
        <p className="text-muted-foreground">
          Configure your league settings and member keepers
        </p>
      </div>

      {/* Round Selector */}
      <Card className="border-border/40 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-serif">League Settings</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={load2025Keepers}
              className="text-sm"
            >
              🏈 Load 2025 Keepers
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="total-rounds">Total Rounds</Label>
              <div className="flex items-center gap-4 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={decreaseTotalRounds}
                  disabled={totalRounds <= MIN_ROUNDS}
                >
                  -
                </Button>
                <Input
                  id="total-rounds"
                  type="number"
                  min={MIN_ROUNDS}
                  max={MAX_ROUNDS}
                  value={totalRounds}
                  onChange={(e) => {
                    const value = parseInt(e.target.value)
                    if (value >= MIN_ROUNDS && value <= MAX_ROUNDS) {
                      setTotalRounds(value)
                    }
                  }}
                  className="w-20 text-center"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={increaseTotalRounds}
                  disabled={totalRounds >= MAX_ROUNDS}
                >
                  +
                </Button>
                <span className="text-xs font-mono text-muted-foreground">
                  ({MIN_ROUNDS}-{MAX_ROUNDS} rounds allowed)
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Keeper Rules */}
      <Card className="border-border/40 shadow-sm bg-muted/20">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Keeper Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <h4 className="font-medium text-foreground mb-2">Basic Rules</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Maximum 2 keepers per team (optional)</li>
                <li>• Cannot keep same player for more than 2 years</li>
                <li>• Snake draft order (alternating each round)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Penalties</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• <strong>Drafted players:</strong> Keep in original round, lose pick 2 rounds later</li>
                <li>• <strong>Undrafted players:</strong> No penalty, auto-assigned to late rounds</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Member Forms */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold font-serif">Members & Keepers</h2>
          <p className="text-sm text-muted-foreground font-mono">
            {members.filter(m => m.name).length}/{members.length} teams configured
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {members.map((member, index) => (
            <MemberForm
              key={index}
              member={member}
              index={index}
              players={players}
              totalRounds={totalRounds}
              onUpdate={updateMember}
            />
          ))}
        </div>
      </div>

      {/* Arbitrate Button */}
      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Ready to generate your draft order? All keeper penalties will be automatically calculated.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
            <span>Teams: {members.filter(m => m.name).length}</span>
            <span>•</span>
            <span>Rounds: {totalRounds}</span>
            <span>•</span>
            <span>Keepers: {members.reduce((acc, m) => acc + (m.firstKeeper?.id ? 1 : 0) + (m.secondKeeper?.id ? 1 : 0), 0)}</span>
          </div>
        </div>
        <Button
          size="lg"
          onClick={handleGenerateDraft}
          disabled={loading || members.filter(m => m.name).length < 2}
          className="px-8"
        >
          {loading ? 'Processing...' : 'Generate Draft Order'}
        </Button>
      </div>
    </div>
  )
}