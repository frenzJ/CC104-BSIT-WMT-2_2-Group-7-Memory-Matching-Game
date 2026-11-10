/* =========================================================
   render.js  (Member 3)
   Draws the cards on screen and small helpers to change
   how one card looks.
   ========================================================= */

// Find the card element for a given index.
function getCardEl(index) {
  return $('#board .memory-card[data-index="' + index + '"]');
}

// Draw all 12 cards (all face down).
function renderBoard() {
  const $board = $("#board").empty();

  cards.forEach(function (value, index) {
    const $col = $('<div class="col"></div>');

    const $card = $('<div class="memory-card" role="button" tabindex="0"></div>')
      .attr("data-index", index)
      .attr("aria-label", "Card " + (index + 1));

    const $inner = $('<div class="card-inner"></div>');
    const $front = $('<div class="card-face card-front"></div>').text("?");
    const $back = $('<div class="card-face card-back"></div>');

    $back.append($('<span class="card-emoji"></span>').text(value));
    $back.append($('<span class="check">✓</span>'));

    $inner.append($front, $back);
    $card.append($inner);
    $col.append($card);
    $board.append($col);
  });
}

// Show a card face up.
function flipCard(index) {
  getCardEl(index).addClass("flipped");
}

// Turn a card face down and clear its colors.
function unflipCard(index) {
  getCardEl(index).removeClass("flipped selected mismatch");
}
