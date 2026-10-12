/**
 * Children shown before the "show more" button is pressed. Mirrored by the
 * `.collapsed-grid` rule in globals.css (`:nth-child(n + 9)`). Lives in a
 * plain module because a `"use client"` file's exports reach server
 * components as client references, not values.
 */
export const SHOW_MORE_INITIAL = 8;
