import type { TextStyle } from 'react-native';
import { font } from './palette';

/**
 * Sanctuary Modern text roles. Sizes/weights/tracking per design.md.
 * Color is applied per component — these carry shape only.
 */
export const text = {
  display: {
    fontFamily: font.familyExtraBold,
    fontSize: 40,
    lineHeight: 48,
    letterSpacing: -1.2, // -0.03em @ 40px
  },
  headlineLg: {
    fontFamily: font.familyBold,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.64,
  },
  headlineLgMobile: {
    fontFamily: font.familyBold,
    fontSize: 26,
    lineHeight: 34,
    letterSpacing: -0.52,
  },
  headlineMd: {
    fontFamily: font.familyBold,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: -0.33,
  },
  headlineSm: {
    fontFamily: font.familySemiBold,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.18,
  },
  bodyLg: {
    fontFamily: font.family,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.08,
  },
  bodyMd: {
    fontFamily: font.family,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },
  bodySm: {
    fontFamily: font.family,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.065,
  },
  labelLg: {
    fontFamily: font.familySemiBold,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.14,
  },
  labelMd: {
    fontFamily: font.familySemiBold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.24,
  },
  labelSm: {
    fontFamily: font.familyBold,
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.5,
  },
} satisfies Record<string, TextStyle>;
