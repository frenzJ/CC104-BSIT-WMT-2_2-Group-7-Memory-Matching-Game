/* =========================================================
   reset.js  (Member 4)
   resetGame() restarts everything.
   startGame() connects all buttons and starts the first game.
   ========================================================= */

// ---------- Screens and popups ----------
function showScreen(name) {
  $("#start-screen").toggleClass("d-none", name !== "start");
  $("#game-screen").toggleClass("d-none", name !== "game");
  window.scrollTo(0, 0);
}

function openModal(id) {
  $("#" + id).removeClass("d-none");
}

function closeModal(id) {
  $("#" + id).addClass("d-none");
}

function closeAllModals() {
  $(".mm-overlay").addClass("d-none");
}

// ---------- Reset ----------
function resetGame() {
  // Cancel any waiting timers so old code cannot run after a restart.
  clearTimeout(flipTimeout);
  clearTimeout(winTimeout);
  clearTimeout(toastTimeout);
  flipTimeout = null;
  winTimeout = null;
  toastTimeout = null;

  // Reset the state variables.
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  attempts = 0;
  matchedPairs = 0;

  // New shuffled deck.
  cards = shuffle(createDeck());
  isMatched = cards.map(function () { return false; });

  // Hide the win popup, the toast, and the confetti.
  closeModal("modal-win");
  hideToast();
  $("#confetti").empty();

  // Redraw everything.
  renderBoard();
  updateScore();
  setStatus("idle", "Pick a card to begin", "Cards are shuffled with Fisher–Yates.");

  console.log("cards:", cards); // Checkpoint 1: see the shuffle in the console
}

// ---------- Start ----------
function startGame() {
  // Start screen and navigation
  $("#play-btn").on("click", function () {
    showScreen("game");
    resetGame();
  });
  $(".js-home").on("click", function () {
    closeAllModals();
    showScreen("start");
  });

  // Open popups
  $(".js-open-howto").on("click", function () { openModal("modal-howto"); });
  $(".js-open-works").on("click", function () { openModal("modal-works"); });
  $(".js-open-about").on("click", function () { openModal("modal-about"); });

  // Close popups: X / Close / Got it / Keep playing buttons, dark background, Esc key
  $(".js-close-modal").on("click", function () {
    $(this).closest(".mm-overlay").addClass("d-none");
  });
  $(".mm-overlay").on("click", function (e) {
    if (e.target === this) $(this).addClass("d-none");
  });
  $(document).on("keydown", function (e) {
    if (e.key === "Escape") closeAllModals();
  });

  // Restart (with confirm popup)
  $("#restart-btn").on("click", function () { openModal("modal-restart"); });
  $("#restart-yes").on("click", function () {
    closeModal("modal-restart");
    resetGame();
  });
  $("#play-again-btn").on("click", resetGame);

  // Cards: one handler for the whole board (works after every redraw)
  $("#board").on("click", ".memory-card", function () {
    handleCardClick(parseInt($(this).attr("data-index"), 10));
  });
  $("#board").on("keydown", ".memory-card", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick(parseInt($(this).attr("data-index"), 10));
    }
  });

  // Prepare the first game (the board is ready when Play Game is clicked)
  resetGame();
}

$(document).ready(startGame);
