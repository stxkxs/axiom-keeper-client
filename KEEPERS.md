# Keeper League Rules

This document outlines the keeper rules implemented in the Axiom Fantasy Football League draft system.

## Basic Keeper Rules

### Maximum Keepers

- Each team may keep **up to 2 players** from the previous season
- Keeping players is **optional** - teams can keep 0, 1, or 2 players
- Teams cannot keep the same player in both keeper slots

### Years Kept Limit

- No player can be kept for more than **2 consecutive years**
- After 2 years, the player must be released back to the draft pool
- The years kept counter resets if a player is dropped and later re-acquired

## Keeper Penalties & Draft Position

### Drafted Players (Original Round System)

When keeping a player who was originally drafted:

- **Keeper Assignment**: Player is kept in their **original draft round**
- **Penalty**: Team **loses their pick 2 rounds later** than the original round
- **Example**: Keep a 5th round player → Keep in round 5, lose your 7th round pick

### Undrafted Players (Free Agents)

When keeping a player who was picked up as a free agent:

- **No Penalty**: No draft picks are forfeited
- **Round Assignment**: Automatically assigned to late rounds:
    - **1st Keeper Slot**: Round (total rounds - 1)
    - **2nd Keeper Slot**: Round (total rounds - 2)
- **Example**: In a 14-round draft, undrafted keepers go in rounds 13 and 12

### Penalty Limitations

- If the penalty round exceeds the total draft rounds, **no pick is lost**
- **Example**: Keep a 13th round player in 14-round draft → No penalty (would be round 15)

## Draft Order & Snake Format

### Snake Draft System

- **Round 1**: Teams draft in order 1-12
- **Round 2**: Teams draft in reverse order 12-1
- **Rounds 3+**: Continue alternating (1-12, 12-1, 1-12, etc.)

### Keeper Integration

- Keepers are automatically assigned to their designated rounds
- Teams with keepers skip regular picks in those rounds
- Penalty picks are automatically removed from the draft order
- Snake order continues normally around keeper assignments

## Examples

### Example 1: Drafted Player Keeper

- **Player**: Tee Higgins (originally drafted in Round 5)
- **Keeper Action**: Keep in Round 5
- **Penalty**: Lose Round 7 pick
- **Result**: Team gets Higgins in Round 5, misses Round 7 entirely

### Example 2: Free Agent Keeper

- **Player**: Bucky Irving (picked up during season)
- **Keeper Action**: Keep as undrafted free agent (14-round draft)
- **Round Assignment**: Round 13 (1st keeper slot)
- **Penalty**: None
- **Result**: Team gets Irving in Round 13, keeps all other picks

### Example 3: Two Keepers

- **Team has**: Jahmyr Gibbs (Round 2) + Puka Nacua (Round 10)
- **Keeper Actions**:
    - Keep Gibbs in Round 2 (lose Round 4 pick)
    - Keep Nacua in Round 10 (lose Round 12 pick)
- **Result**: Team has players in rounds 2 & 10, loses rounds 4 & 12

## Implementation Notes

### Validation Rules

- System prevents keeping the same player twice
- System enforces 2-year maximum keeper limit
- System validates that penalty rounds don't exceed total rounds

### Draft Generation

- All keeper assignments are calculated automatically
- Penalty picks are removed from the draft order
- Regular snake order continues for all non-keeper picks
- Final draft order shows keeper picks with [KEEPER] designation

### Data Tracking

- Original draft round is tracked for all players
- Years kept counter is maintained across seasons
- Free agent status is preserved for penalty calculations

---

*These rules ensure fair play while rewarding strategic player development and waiver wire activity throughout the
season.*