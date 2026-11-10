/* =========================================================
   click.js  (Member 3)
   Runs when a card is clicked. Blocks the invalid clicks.
   ========================================================= */

function handleCardClick(index) {
  // 1. A third card while two are open (or while waiting to flip back)
  if (lockBoard) {
    showToast("warn", "Wait! The cards are flipping back.");
    return;
  }

  // 2. A card that is already matched
  if (isMatched[index]) {
    showToast("info", "That pair is already matched.");
    return;
  }

  // 3. The same card clicked twice
  if (index === firstCard) {
    showToast("warn", "Pick a different card.");
    return;
  }

  flipCard(index);

  // First card of the turn
  if (firstCard === null) {
    firstCard = index;
    getCardEl(index).addClass("selected");
    setStatus("pick", "Pick a second card", "firstCard is saved. Click a different card.");
    return;
  }

  // Second card of the turn
  secondCard = index;
  lockBoard = true;      // block clicks until we finish checking
  attempts++;            // one attempt = two cards picked
  updateScore();
  checkMatch();
}
