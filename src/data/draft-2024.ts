export interface DraftPick2024 {
  round: number
  pick: number
  player: string
  position: string
  team: string
  owner: string
  ownerDisplayName: string
}

export interface KeeperSelection2025 {
  player: string
  position: string
  team: string
  originalRound?: number
  isFreeAgent?: boolean
}

export interface TeamKeepers2025 {
  ownerName: string
  displayName: string
  keepers: KeeperSelection2025[]
}

export const draft2024: DraftPick2024[] = [
  { round: 1, pick: 1, player: "Christian McCaffrey", position: "RB", team: "SF", owner: "Kevin", ownerDisplayName: "Fourth and Drunk" },
  { round: 1, pick: 2, player: "Tyreek Hill", position: "WR", team: "MIA", owner: "Scott", ownerDisplayName: "CommITment To ANether W" },
  { round: 1, pick: 3, player: "Amon-Ra St. Brown", position: "WR", team: "DET", owner: "Andrew", ownerDisplayName: "Drewminton FC" },
  { round: 1, pick: 4, player: "Breece Hall", position: "RB", team: "NYJ", owner: "jammie", ownerDisplayName: "Jammie Harrell" },
  { round: 1, pick: 5, player: "Justin Jefferson", position: "WR", team: "MIN", owner: "Rick", ownerDisplayName: "Straight Outta Tomlin" },
  { round: 1, pick: 6, player: "Jonathan Taylor", position: "RB", team: "IND", owner: "Dennis", ownerDisplayName: "Brad Attitude" },
  { round: 1, pick: 7, player: "Ja'Marr Chase", position: "WR", team: "CIN", owner: "Brent", ownerDisplayName: "TacoTime" },
  { round: 1, pick: 8, player: "A.J. Brown", position: "WR", team: "PHI", owner: "Michael", ownerDisplayName: "Punk" },
  { round: 1, pick: 9, player: "Bijan Robinson", position: "RB", team: "ATL", owner: "Erick", ownerDisplayName: "FlipperforPres" },
  { round: 1, pick: 10, player: "Saquon Barkley", position: "RB", team: "PHI", owner: "Joey", ownerDisplayName: "Team DONUT" },
  { round: 1, pick: 11, player: "Marvin Harrison Jr.", position: "WR", team: "ARI", owner: "Brandon", ownerDisplayName: "show me your tds" },
  { round: 1, pick: 12, player: "Isiah Pacheco", position: "RB", team: "KC", owner: "William", ownerDisplayName: "Lion On Yer Mom" },
  { round: 2, pick: 13, player: "Jahmyr Gibbs", position: "RB", team: "DET", owner: "William", ownerDisplayName: "Lion On Yer Mom" },
  { round: 2, pick: 14, player: "Jaylen Waddle", position: "WR", team: "MIA", owner: "Brandon", ownerDisplayName: "show me your tds" },
  { round: 2, pick: 15, player: "Chris Olave", position: "WR", team: "NO", owner: "Joey", ownerDisplayName: "Team DONUT" },
  { round: 2, pick: 16, player: "Davante Adams", position: "WR", team: "LAR", owner: "Erick", ownerDisplayName: "FlipperforPres" },
  { round: 2, pick: 17, player: "Derrick Henry", position: "RB", team: "BAL", owner: "Michael", ownerDisplayName: "Punk" },
  { round: 2, pick: 18, player: "Travis Etienne", position: "RB", team: "JAX", owner: "Brent", ownerDisplayName: "TacoTime" },
  { round: 2, pick: 19, player: "Kyren Williams", position: "RB", team: "LAR", owner: "Dennis", ownerDisplayName: "Brad Attitude" },
  { round: 2, pick: 20, player: "Brandon Aiyuk", position: "WR", team: "SF", owner: "Rick", ownerDisplayName: "Straight Outta Tomlin" },
  { round: 2, pick: 21, player: "De'Von Achane", position: "RB", team: "MIA", owner: "jammie", ownerDisplayName: "Jammie Harrell" },
  { round: 2, pick: 22, player: "Cooper Kupp", position: "WR", team: "SEA", owner: "Andrew", ownerDisplayName: "Drewminton FC" },
  { round: 2, pick: 23, player: "CeeDee Lamb", position: "WR", team: "DAL", owner: "Scott", ownerDisplayName: "CommITment To ANether W" },
  { round: 2, pick: 24, player: "James Cook", position: "RB", team: "BUF", owner: "Kevin", ownerDisplayName: "Fourth and Drunk" },
  // ... continuing with key picks and free agents
  { round: 5, pick: 66, player: "Tee Higgins", position: "WR", team: "CIN", owner: "Dennis", ownerDisplayName: "Brad Attitude" },
  { round: 7, pick: 88, player: "D'Andre Swift", position: "RB", team: "CHI", owner: "Dennis", ownerDisplayName: "Brad Attitude" },
  { round: 8, pick: 105, player: "Ladd McConkey", position: "WR", team: "LAC", owner: "Brandon", ownerDisplayName: "show me your tds" },
  { round: 9, pick: 115, player: "Brock Bowers", position: "TE", team: "LV", owner: "Scott", ownerDisplayName: "CommITment To ANether W" },
  { round: 9, pick: 123, player: "Trey McBride", position: "TE", team: "ARI", owner: "Joey", ownerDisplayName: "Team DONUT" },
  { round: 10, pick: 125, player: "Puka Nacua", position: "WR", team: "LAR", owner: "William", ownerDisplayName: "Lion On Yer Mom" },
  { round: 10, pick: 131, player: "Nico Collins", position: "WR", team: "HOU", owner: "Brent", ownerDisplayName: "TacoTime" },
  { round: 10, pick: 133, player: "Chase Brown", position: "RB", team: "CIN", owner: "Rick", ownerDisplayName: "Straight Outta Tomlin" },
  { round: 11, pick: 139, player: "Courtland Sutton", position: "WR", team: "DEN", owner: "Scott", ownerDisplayName: "CommITment To ANether W" },
  { round: 11, pick: 109, player: "T.J. Hockenson", position: "TE", team: "MIN", owner: "Brent", ownerDisplayName: "TacoTime" },
  { round: 12, pick: 92, player: "Jayden Daniels", position: "QB", team: "WAS", owner: "Scott", ownerDisplayName: "CommITment To ANether W" }
]

// Free agents picked up during the season (assign to late rounds)
export const freeAgents2024: { player: string, position: string, team: string, owner: string, ownerDisplayName: string }[] = [
  { player: "Bucky Irving", position: "RB", team: "TB", owner: "Brandon", ownerDisplayName: "show me your tds" }
]

// 2025 Draft Order (based on 2024 standings)
export const draftOrder2025 = [
  "Brad Attitude",           // 1
  "Lion On Yer Mom",         // 2  
  "TacoTime",                // 3
  "Drewminton FC",           // 4
  "Sundays R Brent's Day-da-loss", // 5
  "Fourth and Drunk",        // 6
  "Team DONUT",              // 7
  "FlipperforPres",          // 8
  "Jammie Harrell",          // 9
  "Unsolicited Dak Pics",    // 10
  "Straight Outta Tomlin",   // 11
  "show me your tds"         // 12
]

export const keepers2025: TeamKeepers2025[] = [
  {
    ownerName: "Dennis",
    displayName: "Brad Attitude", 
    keepers: [
      { player: "Tee Higgins", position: "WR", team: "CIN", originalRound: 5 },
      { player: "D'Andre Swift", position: "RB", team: "CHI", originalRound: 7 }
    ]
  },
  {
    ownerName: "William",
    displayName: "Lion On Yer Mom", 
    keepers: [
      { player: "Jahmyr Gibbs", position: "RB", team: "DET", originalRound: 2 },
      { player: "Puka Nacua", position: "WR", team: "LAR", originalRound: 10 }
    ]
  },
  {
    ownerName: "Brent", 
    displayName: "TacoTime",
    keepers: [
      { player: "Nico Collins", position: "WR", team: "HOU", originalRound: 10 },
      { player: "T.J. Hockenson", position: "TE", team: "MIN", originalRound: 11 }
    ]
  },
  {
    ownerName: "Andrew",
    displayName: "Drewminton FC",
    keepers: []
  },
  {
    ownerName: "Scott",
    displayName: "Sundays R Brent's Day-da-loss",
    keepers: [
      { player: "Brock Bowers", position: "TE", team: "LV", originalRound: 9 },
      { player: "Jayden Daniels", position: "QB", team: "WAS", originalRound: 12 }
    ]
  },
  {
    ownerName: "Kevin",
    displayName: "Fourth and Drunk",
    keepers: []
  },
  {
    ownerName: "Joey", 
    displayName: "Team DONUT",
    keepers: [
      { player: "Trey McBride", position: "TE", team: "ARI", originalRound: 9 },
      { player: "Saquon Barkley", position: "RB", team: "PHI", originalRound: 1 }
    ]
  },
  {
    ownerName: "Erick",
    displayName: "FlipperforPres", 
    keepers: []
  },
  {
    ownerName: "jammie",
    displayName: "Jammie Harrell", 
    keepers: []
  },
  {
    ownerName: "Alex",
    displayName: "Unsolicited Dak Pics",
    keepers: []
  },
  {
    ownerName: "Rick",
    displayName: "Straight Outta Tomlin",
    keepers: [
      { player: "Chase Brown", position: "RB", team: "CIN", originalRound: 10 },
      { player: "Courtland Sutton", position: "WR", team: "DEN", originalRound: 11 }
    ]
  },
  {
    ownerName: "Brandon",
    displayName: "show me your tds",
    keepers: [
      { player: "Ladd McConkey", position: "WR", team: "LAC", originalRound: 8 },
      { player: "Bucky Irving", position: "RB", team: "TB", isFreeAgent: true }
    ]
  }
]