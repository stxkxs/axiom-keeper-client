'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Member, Player, Keeper } from '@/types'
import { createEmptyKeeper, getPenaltyRound, getKeeperRound, validateKeepers } from '@/lib/keeper-rules'

interface MemberFormProps {
  member: Member
  index: number
  players: Player[]
  totalRounds: number
  onUpdate: (index: number, member: Member) => void
}

export function MemberForm({ member, index, players, totalRounds, onUpdate }: MemberFormProps) {
  const [localMember, setLocalMember] = useState<Member>(member)

  useEffect(() => {
    setLocalMember(member)
  }, [member])

  const updateMember = (updates: Partial<Member>) => {
    const updated = { ...localMember, ...updates }
    setLocalMember(updated)
    onUpdate(index, updated)
  }

  const updateKeeper = (keeper: 'firstKeeper' | 'secondKeeper', updates: Partial<Keeper>) => {
    const currentKeeper = localMember[keeper] || createEmptyKeeper()
    const updatedKeeper = { ...currentKeeper, ...updates }
    
    // Set keeper slot for undrafted players
    if (keeper === 'firstKeeper') updatedKeeper.keeperSlot = 1
    if (keeper === 'secondKeeper') updatedKeeper.keeperSlot = 2
    
    updateMember({ [keeper]: updatedKeeper })
  }

  const calculatePenalty = (keeper: 'firstKeeper' | 'secondKeeper') => {
    const keeperData = localMember[keeper]
    if (!keeperData) return
    
    const penaltyRound = getPenaltyRound(keeperData)
    updateKeeper(keeper, { penaltyRound })
  }

  const errors = validateKeepers(localMember.firstKeeper, localMember.secondKeeper)
  const hasPlayer = localMember.name && localMember.name.trim() !== ''

  return (
    <Card className="border-border/40 shadow-sm">
      <CardHeader>
        <CardTitle className="font-serif text-lg flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-mono">
            {index + 1}
          </span>
          Member {index + 1}
          {hasPlayer && (
            <span className="text-sm font-normal text-muted-foreground">- {localMember.name}</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor={`member-${index}-name`} className="text-sm font-medium">
            Team Owner Name *
          </Label>
          <Input
            id={`member-${index}-name`}
            value={localMember.name}
            onChange={(e) => updateMember({ name: e.target.value })}
            placeholder="e.g., John Smith"
            className="text-base"
          />
          {errors.length > 0 && (
            <div className="space-y-1">
              {errors.map((error, idx) => (
                <p key={idx} className="text-sm text-destructive">
                  {error}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* First Keeper */}
        <div className="border border-border/30 rounded-lg p-4 space-y-4 bg-card/50">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm font-mono uppercase tracking-wide text-muted-foreground">First Keeper (Optional)</h4>
            {localMember.firstKeeper?.id && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => updateKeeper('firstKeeper', createEmptyKeeper())}
                className="text-muted-foreground hover:text-destructive h-8 px-2"
              >
                Clear
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Player to Keep</Label>
              <Select
                value={localMember.firstKeeper?.id?.toString() || ''}
                onChange={(e) => {
                  const value = e.target.value
                  if (value === '') {
                    updateKeeper('firstKeeper', { id: null, name: null })
                  } else {
                    const player = players.find(p => p.id.toString() === value)
                    updateKeeper('firstKeeper', {
                      id: player?.id || null,
                      name: player?.name || null
                    })
                  }
                }}
                className="w-full"
              >
                <option value="">Choose a player to keep</option>
                {players.map((player) => (
                  <option key={player.id} value={player.id.toString()}>
                    {player.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`first-keeper-${index}-round`} className="text-sm font-medium">
                Original Draft Round
              </Label>
              <div className="space-y-1">
                <Input
                  id={`first-keeper-${index}-round`}
                  type="number"
                  min="0"
                  max={totalRounds}
                  value={localMember.firstKeeper?.originalRound ?? ''}
                  onChange={(e) => {
                    const originalRound = e.target.value ? parseInt(e.target.value) : null
                    updateKeeper('firstKeeper', { originalRound, penaltyRound: null })
                  }}
                  placeholder="0 for undrafted"
                  disabled={!localMember.firstKeeper?.id}
                />
                <p className="text-xs text-muted-foreground">
                  Enter 0 if player was undrafted
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <Label htmlFor={`first-keeper-${index}-years`}>Years Kept (max 2)</Label>
                <Input
                  id={`first-keeper-${index}-years`}
                  type="number"
                  min="0"
                  max="2"
                  value={localMember.firstKeeper?.yearsKept ?? 0}
                  onChange={(e) => {
                    const yearsKept = parseInt(e.target.value) || 0
                    updateKeeper('firstKeeper', { yearsKept })
                  }}
                />
              </div>
              <div>
                <Label>Penalty Round</Label>
                <div className="flex items-center gap-2">
                  <Input
                    value={localMember.firstKeeper?.penaltyRound || 'None'}
                    readOnly
                    placeholder="Auto-calculated"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => calculatePenalty('firstKeeper')}
                    disabled={!localMember.firstKeeper?.originalRound}
                  >
                    Calculate
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second Keeper */}
        <div className="border border-border/30 rounded-lg p-4 space-y-4 bg-card/50">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm font-mono uppercase tracking-wide text-muted-foreground">Second Keeper (Optional)</h4>
            {localMember.secondKeeper?.id && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => updateKeeper('secondKeeper', { ...createEmptyKeeper(), keeperSlot: 2 })}
                className="text-muted-foreground hover:text-destructive h-8 px-2"
              >
                Clear
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Player to Keep</Label>
              <Select
                value={localMember.secondKeeper?.id?.toString() || ''}
                onChange={(e) => {
                  const value = e.target.value
                  if (value === '') {
                    updateKeeper('secondKeeper', { id: null, name: null })
                  } else {
                    const player = players.find(p => p.id.toString() === value)
                    updateKeeper('secondKeeper', {
                      id: player?.id || null,
                      name: player?.name || null
                    })
                  }
                }}
                className="w-full"
              >
                <option value="">Choose a player to keep</option>
                {players
                  .filter(player => player.id !== localMember.firstKeeper?.id)
                  .map((player) => (
                    <option key={player.id} value={player.id.toString()}>
                      {player.name}
                    </option>
                  ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`second-keeper-${index}-round`} className="text-sm font-medium">
                Original Draft Round
              </Label>
              <div className="space-y-1">
                <Input
                  id={`second-keeper-${index}-round`}
                  type="number"
                  min="0"
                  max={totalRounds}
                  value={localMember.secondKeeper?.originalRound ?? ''}
                  onChange={(e) => {
                    const originalRound = e.target.value ? parseInt(e.target.value) : null
                    updateKeeper('secondKeeper', { originalRound, penaltyRound: null })
                  }}
                  placeholder="0 for undrafted"
                  disabled={!localMember.secondKeeper?.id}
                />
                <p className="text-xs text-muted-foreground">
                  Enter 0 if player was undrafted
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <Label htmlFor={`second-keeper-${index}-years`}>Years Kept (max 2)</Label>
                <Input
                  id={`second-keeper-${index}-years`}
                  type="number"
                  min="0"
                  max="2"
                  value={localMember.secondKeeper?.yearsKept ?? 0}
                  onChange={(e) => {
                    const yearsKept = parseInt(e.target.value) || 0
                    updateKeeper('secondKeeper', { yearsKept })
                  }}
                />
              </div>
              <div>
                <Label>Penalty Round</Label>
                <div className="flex items-center gap-2">
                  <Input
                    value={localMember.secondKeeper?.penaltyRound || 'None'}
                    readOnly
                    placeholder="Auto-calculated"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => calculatePenalty('secondKeeper')}
                    disabled={!localMember.secondKeeper?.originalRound}
                  >
                    Calculate
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}