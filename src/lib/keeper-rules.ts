import { Keeper } from '@/types'

/**
 * Keeper Rules:
 * - Max 2 keepers per team, but not mandatory to keep any
 * - Undrafted players: No penalty, keeper gets picked at round (maxRounds-1) or (maxRounds-2)  
 * - Drafted players: Penalty = lose pick 2 rounds after original draft round
 * - Cannot keep a player for more than 2 years
 */

export function getKeeperRound(keeper: Keeper, totalRounds: number): number {
  // Undrafted player (originalRound is 0, null, or undefined)
  if (!keeper.originalRound || keeper.originalRound === 0) {
    // First undrafted keeper goes in round (totalRounds - 1)
    // Second undrafted keeper goes in round (totalRounds - 2)
    return keeper.keeperSlot === 2 ? totalRounds - 2 : totalRounds - 1
  }
  
  // Drafted player - keeper gets picked in their original round
  return keeper.originalRound
}

export function getPenaltyRound(keeper: Keeper): number | null {
  // No penalty for undrafted players
  if (!keeper.originalRound || keeper.originalRound === 0) {
    return null
  }
  
  // Drafted players: lose pick 2 rounds after original draft round
  return keeper.originalRound + 2
}

export function canKeepPlayer(keeper: Keeper): boolean {
  // Cannot keep a player for more than 2 years
  const yearsKept = keeper.yearsKept || 0
  return yearsKept < 2
}

export function validateKeepers(firstKeeper?: Keeper, secondKeeper?: Keeper): string[] {
  const errors: string[] = []
  
  // Check years kept limits
  if (firstKeeper?.id && !canKeepPlayer(firstKeeper)) {
    errors.push('First keeper has been kept for maximum 2 years already')
  }
  
  if (secondKeeper?.id && !canKeepPlayer(secondKeeper)) {
    errors.push('Second keeper has been kept for maximum 2 years already')
  }
  
  // Check for duplicate keepers
  if (firstKeeper?.id && secondKeeper?.id && firstKeeper.id === secondKeeper.id) {
    errors.push('Cannot keep the same player twice')
  }
  
  return errors
}

export function createEmptyKeeper(): Keeper {
  return {
    id: null,
    name: null,
    originalRound: null,
    yearsKept: 0,
    keeperSlot: 1,
    penaltyRound: null
  }
}