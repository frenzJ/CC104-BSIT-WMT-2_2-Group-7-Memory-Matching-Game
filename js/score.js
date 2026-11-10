/* =========================================================
   score.js  (Member 4)
   Score numbers, status card, toast messages, win check.
   ========================================================= */

// Update attempts, matched count, and the "pairs found" row.
function updateScore() {
  $("#attempts-count").text(attempts);
  $("#matched-count").text(matchedPairs + "/" + TOTAL_PAIRS);

  const $pairs = $("#pairs-found").empty();
  EMOJIS.forEach(function (emoji) {
    // This emoji is "found" when one of its cards is matched.
    const found = isMatched.some(function (matched, i) {
      return matched && cards[i] === emoji;
    });
    const $slot = $('<div class="pair-slot"></div>').text(found ? emoji : "?");
    if (found) $slot.addClass("found");
    $pairs.append($slot);
  });
}

// Change the STATUS card. kind: idle | pick | match | nomatch | win
function setStatus(kind, message, detail) {
  $("#status-dot").attr("class", "status-dot status-" + kind);
  $("#status-message").text(message);
  $("#status-detail").text(detail);
}

// Small message at the top. type: "warn" or "info"
function showToast(type, message) {
  clearTimeout(toastTimeout);
  const $toast = $("#toast");
  $toast.attr("class", "mm-toast toast-" + type);
  $toast.find(".toast-icon").text(type === "info" ? "ℹ️" : "⚠️");
  $toast.find(".toast-text").text(message);

  // Restart the fade-in animation.
  $toast[0].style.animation = "none";
  void $toast[0].offsetWidth;
  $toast[0].style.animation = "";

  toastTimeout = setTimeout(hideToast, TOAST_DURATION);
}

function hideToast() {
  $("#toast").addClass("d-none");
}

// If all pairs are found, show the win popup.
function checkWin() {
  if (matchedPairs !== TOTAL_PAIRS) return;

  setStatus("win", "All pairs found!", "Win popup opens next.");

  // Short delay so the last match animation is visible first.
  winTimeout = setTimeout(function () {
    $("#win-attempts").text(attempts);
    $("#win-message").text("You found all " + TOTAL_PAIRS + " pairs in " + attempts + " attempts.");
    openModal("modal-win");
    launchConfetti();
  }, WIN_POPUP_DELAY);
}

// Confetti pieces for the win popup (animation is in animations.css).
function launchConfetti() {
  const colors = ["#fbbf24", "#6366f1", "#22c55e", "#f87171", "#e879f9", "#38bdf8"];
  const $box = $("#confetti").empty();
  for (let i = 0; i < 40; i++) {
    const size = 10 + Math.random() * 14;
    const $piece = $('<span class="confetti-piece"></span>').css({
      left: Math.random() * 100 + "%",
      width: size + "px",
      height: size * (0.7 + Math.random() * 0.6) + "px",
      background: colors[Math.floor(Math.random() * colors.length)],
      animationDuration: 2.4 + Math.random() * 2.2 + "s",
      animationDelay: Math.random() * 1.2 + "s"
    });
    $box.append($piece);
  }
}
