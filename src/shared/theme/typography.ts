import type { TextStyle } from 'react-native';
import { font } from './palette';

/**
 * Role-based text styles. Sizes, weights and tracking follow design.md.
 * Color is applied per component — these styles carry shape only.
 */
export const text = {
  screenTitle: {
    fontFamily: font.familyBold,
    fontSize: 24,
    lineHeight: 31,
    letterSpacing: -0.5,
  },
  sectionHeader: {
    fontFamily: font.familyBold,
    fontSize: 18,
    lineHeight: 23,
    letterSpacing: -0.3,
  },
  cardTitle: {
    fontFamily: font.familyMedium,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.2,
  },
  body: {
    fontFamily: font.family,
    fontSize: 14,
    lineHeight: 21,
  },
  secondary: {
    fontFamily: font.family,
    fontSize: 13,
    lineHeight: 19,
  },
  caption: {
    fontFamily: font.familyMedium,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.5,
  },
} satisfies Record<string, TextStyle>;
