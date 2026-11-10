/* =========================================================
   config.js  (Member 2)
   Emoji list, constants, and the game state variables.
   Every other file reads and changes these globals.
   ========================================================= */

// The 6 card faces. Each one is used twice, so 6 x 2 = 12 cards.
const EMOJIS = ["🍎", "🎵", "🐶", "⚽", "🚗", "⭐"];

// Constants
const TOTAL_PAIRS = EMOJIS.length;   // 6 pairs
const FLIP_BACK_DELAY = 1000;        // ms before a wrong pair flips back
const WIN_POPUP_DELAY = 700;         // ms before the win popup opens
const TOAST_DURATION = 1800;         // ms a toast message stays on screen

// Game state variables
let cards = [];                      // array of 12 emoji values (shuffled)
let isMatched = [];                  // array of 12 true/false, same positions as cards
let firstCard = null;                // index of the first picked card (or null)
let secondCard = null;               // index of the second picked card (or null)
let lockBoard = false;               // true while waiting, blocks extra clicks
let attempts = 0;                    // number of tries (each second pick)
let matchedPairs = 0;                // number of pairs found

// Timer ids, kept so reset can cancel them
let flipTimeout = null;
let winTimeout = null;
let toastTimeout = null;
