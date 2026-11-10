/* =========================================================
   match.js  (Member 3)
   Compares the two picked cards.
   ========================================================= */

// Called after the second card is picked.
function checkMatch() {
  // Compare the VALUES of the two cards (the indexes are different).
  if (cards[firstCard] === cards[secondCard]) {
    handleMatch();
  } else {
    handleMismatch();
  }
}

function handleMatch() {
  isMatched[firstCard] = true;
  isMatched[secondCard] = true;
  matchedPairs++;

  [firstCard, secondCard].forEach(function (index) {
    getCardEl(index).removeClass("selected").addClass("matched");
  });

  setStatus("match", "It’s a match! 🎉", "Both cards stay open.");
  clearPicks();     // next turn can start right away
  updateScore();
  checkWin();
}

function handleMismatch() {
  const a = firstCard;
  const b = secondCard;

  getCardEl(a).addClass("mismatch");
  getCardEl(b).addClass("mismatch");
  setStatus("nomatch", "Not a match. Flipping back…", "🔒 Board locked for about 1 second.");

  // lockBoard stays true until the cards are back down.
  flipTimeout = setTimeout(function () {
    unflipCard(a);
    unflipCard(b);
    clearPicks();
    setStatus("idle", "Try again", "Pick any card.");
  }, FLIP_BACK_DELAY);
}

// Forget the two picks and unlock the board.
function clearPicks() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}
