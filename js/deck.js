/* =========================================================
   deck.js  (Member 2)
   Builds the array of card pairs (not shuffled yet).
   ========================================================= */

function createDeck() {
  const deck = [];
  EMOJIS.forEach(function (emoji) {
    deck.push(emoji); // first card of the pair
    deck.push(emoji); // second card of the pair
  });
  return deck; // 12 values, e.g. ["🍎","🍎","🎵","🎵", ...]
}
