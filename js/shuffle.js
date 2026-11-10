/* =========================================================
   shuffle.js  (Member 2)
   Fisher-Yates shuffle: a fair (unbiased) way to mix a list.
   ========================================================= */

function shuffle(array) {
  // Start at the last card and walk back to the second card.
  for (let i = array.length - 1; i > 0; i--) {
    // Pick a random spot from 0 up to i (including i).
    const j = Math.floor(Math.random() * (i + 1));
    // Swap the two cards.
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
