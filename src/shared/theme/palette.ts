/**
 * Sanctuary Modern palette — imported from Stitch project 12494852605889163655.
 * Dark-first. See design.md for token roles and rules.
 */
export const palette = {
  // canvas + surfaces
  bg: '#121212',
  surface1: '#181818',
  surface2: '#242424',
  surface3: '#2A2A2A',
  acrylic: 'rgba(36,36,36,0.75)',
  acrylicHigh: 'rgba(40,40,40,0.85)',
  hairline: 'rgba(255,255,255,0.08)',
  hairlineHot: 'rgba(255,255,255,0.15)',

  // accents
  grace: '#1DB954',
  sacred: '#E5B25D',
  royal: '#3B82F6',
  tithe: '#F59E0B',
  building: '#10B981',
  mission: '#F43F5E',

  // text
  textPrimary: '#FFFFFF',
  textSecondary: '#B3B3B3',
  textMuted: '#727272',

  // status
  danger: '#F43F5E',
  warning: '#F59E0B',
  success: '#1DB954',
} as const;

export const font = {
  family: 'PlusJakartaSans-Regular',
  familyMedium: 'PlusJakartaSans-Medium',
  familySemiBold: 'PlusJakartaSans-SemiBold',
  familyBold: 'PlusJakartaSans-Bold',
  familyExtraBold: 'PlusJakartaSans-ExtraBold',
} as const;
