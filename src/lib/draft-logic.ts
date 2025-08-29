import { League, Member, Pick, Keeper } from '@/types'
import { getKeeperRound, getPenaltyRound } from './keeper-rules'

export function generateDraftOrder(league: League): Pick[] {
  const { totalRounds, members } = league
  const picks: Pick[] = []
  let currentPick = 1

  // Create draft order - snake draft
  const draftOrder: string[][] = []
  for (let round = 1; round <= totalRounds; round++) {
    const roundOrder = [...members.map(m => m.name)]
    if (round % 2 === 0) {
      roundOrder.reverse() // Snake draft - reverse every other round
    }
    draftOrder.push(roundOrder)
  }

  // Process each round
  for (let round = 1; round <= totalRounds; round++) {
    const roundMembers = draftOrder[round - 1]
    
    for (let pickInRound = 0; pickInRound < roundMembers.length; pickInRound++) {
      const memberName = roundMembers[pickInRound]
      const member = members.find(m => m.name === memberName)
      
      if (!member) continue

      // Check if member loses this pick due to penalty
      if (memberLosesPick(member, round)) {
        // Skip this pick - member loses it due to keeper penalty
        continue
      }

      // Check if this pick is a keeper
      const keeperInfo = getKeeperForRoundAndMember(member, round, totalRounds)

      if (keeperInfo.isKeeper && keeperInfo.keeper) {
        // This is a keeper pick
        picks.push({
          round,
          pick: currentPick,
          keeper: true,
          member: memberName,
          player: keeperInfo.keeper.name || 'Unknown Player'
        })
      } else {
        // Regular draft pick - assign a placeholder player
        picks.push({
          round,
          pick: currentPick,
          keeper: false,
          member: memberName,
          player: `Available Player ${currentPick}` // Placeholder - in real app this would be user selected
        })
      }
      
      currentPick++
    }
  }

  return picks
}

function getKeeperForRoundAndMember(member: Member, round: number, totalRounds: number): { isKeeper: boolean, keeper: Keeper | null } {
  // Check first keeper
  if (member.firstKeeper?.id && member.firstKeeper?.name) {
    const keeperRound = getKeeperRound(member.firstKeeper, totalRounds)
    if (keeperRound === round) {
      return { isKeeper: true, keeper: member.firstKeeper }
    }
  }

  // Check second keeper
  if (member.secondKeeper?.id && member.secondKeeper?.name) {
    const keeperRound = getKeeperRound(member.secondKeeper, totalRounds)
    if (keeperRound === round) {
      return { isKeeper: true, keeper: member.secondKeeper }
    }
  }

  return { isKeeper: false, keeper: null }
}

function memberLosesPick(member: Member, round: number): boolean {
  // Check if member loses pick due to first keeper penalty
  if (member.firstKeeper?.id) {
    const penaltyRound = getPenaltyRound(member.firstKeeper)
    if (penaltyRound === round) {
      return true
    }
  }

  // Check if member loses pick due to second keeper penalty  
  if (member.secondKeeper?.id) {
    const penaltyRound = getPenaltyRound(member.secondKeeper)
    if (penaltyRound === round) {
      return true
    }
  }

  return false
}