export interface NFLTeam {
  id: string;
  name: string;
  abbreviation: string;
  primary: string;
  secondary: string;
  accent?: string;
}

export const nflTeams: NFLTeam[] = [
  { id: 'ari', name: 'Arizona Cardinals', abbreviation: 'ARI', primary: '#97233F', secondary: '#000000', accent: '#FFB612' },
  { id: 'atl', name: 'Atlanta Falcons', abbreviation: 'ATL', primary: '#A71930', secondary: '#000000', accent: '#A5ACAF' },
  { id: 'bal', name: 'Baltimore Ravens', abbreviation: 'BAL', primary: '#241773', secondary: '#000000', accent: '#9E7C0C' },
  { id: 'buf', name: 'Buffalo Bills', abbreviation: 'BUF', primary: '#00338D', secondary: '#C60C30', accent: '#FFFFFF' },
  { id: 'car', name: 'Carolina Panthers', abbreviation: 'CAR', primary: '#0085CA', secondary: '#101820', accent: '#BFC0BF' },
  { id: 'chi', name: 'Chicago Bears', abbreviation: 'CHI', primary: '#0B162A', secondary: '#C83803', accent: '#FFFFFF' },
  { id: 'cin', name: 'Cincinnati Bengals', abbreviation: 'CIN', primary: '#FB4F14', secondary: '#000000', accent: '#FFFFFF' },
  { id: 'cle', name: 'Cleveland Browns', abbreviation: 'CLE', primary: '#311D00', secondary: '#FF3C00', accent: '#FFFFFF' },
  { id: 'dal', name: 'Dallas Cowboys', abbreviation: 'DAL', primary: '#003594', secondary: '#869397', accent: '#FFFFFF' },
  { id: 'den', name: 'Denver Broncos', abbreviation: 'DEN', primary: '#FB4F14', secondary: '#002244', accent: '#FFFFFF' },
  { id: 'det', name: 'Detroit Lions', abbreviation: 'DET', primary: '#0076B6', secondary: '#B0B7BC', accent: '#000000' },
  { id: 'gb', name: 'Green Bay Packers', abbreviation: 'GB', primary: '#203731', secondary: '#FFB612', accent: '#FFFFFF' },
  { id: 'hou', name: 'Houston Texans', abbreviation: 'HOU', primary: '#03202F', secondary: '#A71930', accent: '#FFFFFF' },
  { id: 'ind', name: 'Indianapolis Colts', abbreviation: 'IND', primary: '#002C5F', secondary: '#A2AAAD', accent: '#FFFFFF' },
  { id: 'jax', name: 'Jacksonville Jaguars', abbreviation: 'JAX', primary: '#006778', secondary: '#D7A22A', accent: '#9F792C' },
  { id: 'kc', name: 'Kansas City Chiefs', abbreviation: 'KC', primary: '#E31837', secondary: '#FFB81C', accent: '#FFFFFF' },
  { id: 'lv', name: 'Las Vegas Raiders', abbreviation: 'LV', primary: '#000000', secondary: '#A5ACAF', accent: '#FFFFFF' },
  { id: 'lac', name: 'Los Angeles Chargers', abbreviation: 'LAC', primary: '#0080C6', secondary: '#FFC20E', accent: '#FFFFFF' },
  { id: 'lar', name: 'Los Angeles Rams', abbreviation: 'LAR', primary: '#003594', secondary: '#FFA300', accent: '#FF8200' },
  { id: 'mia', name: 'Miami Dolphins', abbreviation: 'MIA', primary: '#008080', secondary: '#FF8C00', accent: '#005778' },
  { id: 'min', name: 'Minnesota Vikings', abbreviation: 'MIN', primary: '#4F2683', secondary: '#FFC62F', accent: '#FFFFFF' },
  { id: 'ne', name: 'New England Patriots', abbreviation: 'NE', primary: '#002244', secondary: '#C60C30', accent: '#B0B7BC' },
  { id: 'no', name: 'New Orleans Saints', abbreviation: 'NO', primary: '#D3BC8D', secondary: '#101820', accent: '#FFFFFF' },
  { id: 'nyg', name: 'New York Giants', abbreviation: 'NYG', primary: '#0B2265', secondary: '#A71930', accent: '#A5ACAF' },
  { id: 'nyj', name: 'New York Jets', abbreviation: 'NYJ', primary: '#125740', secondary: '#000000', accent: '#FFFFFF' },
  { id: 'phi', name: 'Philadelphia Eagles', abbreviation: 'PHI', primary: '#004C54', secondary: '#A5ACAF', accent: '#ACC0C6' },
  { id: 'pit', name: 'Pittsburgh Steelers', abbreviation: 'PIT', primary: '#FFB612', secondary: '#101820', accent: '#FFFFFF' },
  { id: 'sf', name: 'San Francisco 49ers', abbreviation: 'SF', primary: '#AA0000', secondary: '#B3995D', accent: '#FFFFFF' },
  { id: 'sea', name: 'Seattle Seahawks', abbreviation: 'SEA', primary: '#002244', secondary: '#69BE28', accent: '#A5ACAF' },
  { id: 'tb', name: 'Tampa Bay Buccaneers', abbreviation: 'TB', primary: '#D50A0A', secondary: '#FF7900', accent: '#0A0A08' },
  { id: 'ten', name: 'Tennessee Titans', abbreviation: 'TEN', primary: '#0C2340', secondary: '#4B92DB', accent: '#C8102E' },
  { id: 'was', name: 'Washington Commanders', abbreviation: 'WAS', primary: '#5A1414', secondary: '#FFB612', accent: '#FFFFFF' }
];

export function generateTeamTheme(team: NFLTeam) {
  // Check contrast and use fallback if needed
  const headerColor = hasGoodContrast(team.primary, '#FFFFFF') ? team.primary : team.secondary;
  const borderColor = hasGoodContrast(team.primary, '#FFFFFF') ? team.primary : team.secondary;
  
  return {
    primary: team.primary, // Team color for buttons
    'primary-foreground': '#FFFFFF',
    secondary: 'oklch(0.97 0 0)', // Keep original light gray
    'secondary-foreground': 'oklch(0.205 0 0)', // Keep original dark
    accent: 'oklch(0.97 0 0)', // Keep original
    'accent-foreground': 'oklch(0.205 0 0)', // Keep original
    background: 'oklch(1 0 0)', // Keep original white
    foreground: headerColor, // Team color for headers (with contrast check)
    card: 'oklch(1 0 0)', // Keep original white cards
    'card-foreground': 'oklch(0.145 0 0)', // Keep original dark text
    popover: 'oklch(1 0 0)', // Keep original
    'popover-foreground': 'oklch(0.145 0 0)', // Keep original
    muted: 'oklch(0.97 0 0)', // Keep original light gray
    'muted-foreground': 'oklch(0.556 0 0)', // Keep original medium gray
    border: `${borderColor}85`, // Team color borders (with contrast check)
    input: 'oklch(0.922 0 0)', // Keep original light border
    ring: borderColor, // Team color for focus rings
    destructive: 'oklch(0.577 0.245 27.325)', // Keep original
    'destructive-foreground': 'oklch(0.985 0 0)' // Keep original
  };
}

export function generateDarkTeamTheme(team: NFLTeam) {
  // Check contrast and use fallback if needed
  const darkBg = '#25293B'; // Approximate dark background
  const headerColor = hasGoodContrast(team.secondary, darkBg) ? team.secondary : team.primary;
  const borderColor = hasGoodContrast(team.primary, darkBg) ? team.primary : team.secondary;
  
  return {
    primary: team.primary, // Team color for buttons
    'primary-foreground': '#FFFFFF',
    secondary: 'oklch(0.269 0 0)', // Keep original dark gray
    'secondary-foreground': 'oklch(0.985 0 0)', // Keep original light
    accent: 'oklch(0.269 0 0)', // Keep original
    'accent-foreground': 'oklch(0.985 0 0)', // Keep original
    background: 'oklch(0.145 0 0)', // Keep original dark background
    foreground: headerColor, // Team color for headers (with contrast check)
    card: 'oklch(0.205 0 0)', // Keep original dark cards
    'card-foreground': 'oklch(0.985 0 0)', // Keep original light text
    popover: 'oklch(0.205 0 0)', // Keep original
    'popover-foreground': 'oklch(0.985 0 0)', // Keep original
    muted: 'oklch(0.269 0 0)', // Keep original dark gray
    'muted-foreground': 'oklch(0.708 0 0)', // Keep original medium gray
    border: `${borderColor}90`, // Team color borders (with contrast check)
    input: 'oklch(1 0 0 / 15%)', // Keep original dark input
    ring: borderColor, // Team color for focus rings
    destructive: 'oklch(0.704 0.191 22.216)', // Keep original
    'destructive-foreground': 'oklch(0.985 0 0)' // Keep original
  };
}

// Helper functions for color manipulation

function hasGoodContrast(color: string, background: string): boolean {
  const colorLuminance = getLuminance(color);
  const bgLuminance = getLuminance(background);
  const ratio = colorLuminance > bgLuminance 
    ? (colorLuminance + 0.05) / (bgLuminance + 0.05)
    : (bgLuminance + 0.05) / (colorLuminance + 0.05);
  
  return ratio >= 3.5; // WCAG AA standard for text
}

function getLuminance(color: string): number {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  const toLinear = (c: number) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}