"use client"

import { useState } from "react"
import { nflTeams, type NFLTeam } from "@/config/nfl-themes"
import { Button } from "@/components/ui/button"
import { useTeamTheme } from "@/hooks/use-team-theme"

export const TeamSelector = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { currentTeam, setTeamTheme } = useTeamTheme()

  const handleTeamSelect = (team: NFLTeam) => {
    setTeamTheme(team)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="h-8 w-8 p-0 cursor-pointer"
        aria-label="Select NFL team theme"
      >
        <div 
          className="h-4 w-4 rounded-full border border-border"
          style={{ 
            backgroundColor: currentTeam?.primary || 'transparent',
            borderColor: currentTeam?.secondary || 'currentColor'
          }}
        />
      </Button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 z-50 min-w-[280px] rounded-md border bg-popover p-3 shadow-md">
          <div className="grid grid-cols-8 gap-1">
            {nflTeams.map((team) => (
              <button
                key={team.id}
                onClick={() => handleTeamSelect(team)}
                className="group relative h-7 w-7 rounded border border-border hover:scale-110 transition-transform cursor-pointer"
                style={{ backgroundColor: team.primary }}
                title={team.name}
                aria-label={`Select ${team.name} theme`}
              >
                <div
                  className="absolute inset-0.5 rounded-sm"
                  style={{ backgroundColor: team.secondary }}
                />
                <div
                  className="absolute inset-1 rounded-sm flex items-center justify-center"
                  style={{ backgroundColor: team.primary }}
                >
                  <span 
                    className="text-xs font-bold leading-none"
                    style={{ color: team.secondary }}
                  >
                    {team.abbreviation.slice(0, 2)}
                  </span>
                </div>
                {currentTeam?.id === team.id && (
                  <div className="absolute -inset-0.5 rounded border-2 border-ring" />
                )}
              </button>
            ))}
          </div>
          <div className="mt-3 pt-2 border-t">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setTeamTheme(null)
                setIsOpen(false)
              }}
              className="w-full text-xs cursor-pointer"
            >
              Reset to Default
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}