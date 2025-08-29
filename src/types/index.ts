export interface Player {
  id: number
  name: string
}

export interface Keeper {
  id: number | null
  name: string | null
  originalRound?: number | null  // Round they were originally drafted (0 or null = undrafted)
  yearsKept?: number            // How many years this player has been kept (max 2)
  keeperSlot?: 1 | 2           // Which keeper slot (1st or 2nd) for undrafted players
  penaltyRound?: number | null  // Round where owner loses pick (originalRound + 2)
}

export interface Member {
  name: string
  firstKeeper?: Keeper
  secondKeeper?: Keeper
}

export interface League {
  totalRounds: number
  members: Member[]
}

export interface Pick {
  round: number
  pick: number
  keeper: boolean
  member: string
  player: string
}