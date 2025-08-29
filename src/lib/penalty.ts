import { Member } from '@/types'

export function penalize(member: Member, keeper: 'firstKeeper' | 'secondKeeper', totalRounds: number): number | null {
  const keeperData = member[keeper]
  if (!keeperData?.round) return null
  
  const penalty = Math.max(1, keeperData.round - 1)
  return Math.min(penalty, totalRounds)
}