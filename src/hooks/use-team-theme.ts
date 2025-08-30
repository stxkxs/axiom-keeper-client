"use client"

import { useState, useEffect, useCallback } from "react"
import { useTheme } from "next-themes"
import { nflTeams, generateTeamTheme, generateDarkTeamTheme, type NFLTeam } from "@/config/nfl-themes"

export function useTeamTheme() {
  const { resolvedTheme } = useTheme()
  const [currentTeam, setCurrentTeam] = useState<NFLTeam | null>(null)

  const setTeamTheme = useCallback((team: NFLTeam | null) => {
    setCurrentTeam(team)
    
    if (team) {
      const theme = resolvedTheme === 'dark' ? generateDarkTeamTheme(team) : generateTeamTheme(team)
      
      // Apply theme colors to CSS custom properties
      Object.entries(theme).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--${key}`, value)
      })
      
      // Store team preference
      localStorage.setItem('team-theme', team.id)
    } else {
      // Reset to default theme
      const defaultTheme = resolvedTheme === 'dark' ? {
        background: 'oklch(0.145 0 0)',
        foreground: 'oklch(0.985 0 0)',
        card: 'oklch(0.205 0 0)',
        'card-foreground': 'oklch(0.985 0 0)',
        popover: 'oklch(0.205 0 0)',
        'popover-foreground': 'oklch(0.985 0 0)',
        primary: 'oklch(0.922 0 0)',
        'primary-foreground': 'oklch(0.205 0 0)',
        secondary: 'oklch(0.269 0 0)',
        'secondary-foreground': 'oklch(0.985 0 0)',
        muted: 'oklch(0.269 0 0)',
        'muted-foreground': 'oklch(0.708 0 0)',
        accent: 'oklch(0.269 0 0)',
        'accent-foreground': 'oklch(0.985 0 0)',
        destructive: 'oklch(0.704 0.191 22.216)',
        'destructive-foreground': 'oklch(0.985 0 0)',
        border: 'oklch(1 0 0 / 10%)',
        input: 'oklch(1 0 0 / 15%)',
        ring: 'oklch(0.556 0 0)'
      } : {
        background: 'oklch(1 0 0)',
        foreground: 'oklch(0.145 0 0)',
        card: 'oklch(1 0 0)',
        'card-foreground': 'oklch(0.145 0 0)',
        popover: 'oklch(1 0 0)',
        'popover-foreground': 'oklch(0.145 0 0)',
        primary: 'oklch(0.205 0 0)',
        'primary-foreground': 'oklch(0.985 0 0)',
        secondary: 'oklch(0.97 0 0)',
        'secondary-foreground': 'oklch(0.205 0 0)',
        muted: 'oklch(0.97 0 0)',
        'muted-foreground': 'oklch(0.556 0 0)',
        accent: 'oklch(0.97 0 0)',
        'accent-foreground': 'oklch(0.205 0 0)',
        destructive: 'oklch(0.577 0.245 27.325)',
        'destructive-foreground': 'oklch(0.985 0 0)',
        border: 'oklch(0.922 0 0)',
        input: 'oklch(0.922 0 0)',
        ring: 'oklch(0.708 0 0)'
      }

      Object.entries(defaultTheme).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--${key}`, value)
      })
      
      localStorage.removeItem('team-theme')
    }
  }, [resolvedTheme])

  // Load saved team preference on mount
  useEffect(() => {
    const savedTeamId = localStorage.getItem('team-theme')
    if (savedTeamId) {
      const team = nflTeams.find(t => t.id === savedTeamId)
      if (team) {
        setCurrentTeam(team)
        const theme = resolvedTheme === 'dark' ? generateDarkTeamTheme(team) : generateTeamTheme(team)
        
        Object.entries(theme).forEach(([key, value]) => {
          document.documentElement.style.setProperty(`--${key}`, value)
        })
      }
    }
  }, [resolvedTheme])

  // Update theme when light/dark mode changes
  useEffect(() => {
    if (currentTeam) {
      setTeamTheme(currentTeam)
    }
  }, [resolvedTheme, currentTeam, setTeamTheme])

  return {
    currentTeam,
    setTeamTheme
  }
}