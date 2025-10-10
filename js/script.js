// DOM elements
const button = document.getElementById("useless-button");
const counterDiv = document.getElementById("counter");
const clickSound = document.getElementById("click-sound");
const quoteDiv = document.getElementById("quote");

// Disable tab navigation for counter
counterDiv.setAttribute("tabindex", "-1");

// State
let clicks = 0;
const messages = [
  "You are a legend… in another universe.",
  "Clicking skills: unparalleled.",
  "You could be a professional nothing-doer.",
  "Your dedication to nothing is inspiring.",
  "Almost… there… keep clicking!",
];

// Funny useless quotes
const quotes = [
  "The button is mightier than the sword.",
  "You just wasted 0.3 calories. Congrats!",
  "This button has no purpose, and neither does this quote.",
  "Keep clicking, maybe it’ll do something… someday.",
  "Legend says, after 10,000 clicks, enlightenment is achieved.",
  "Warning: excessive clicking may lead to existential thoughts.",
  "Relax, you’re doing nothing perfectly.",
  "This is fine. Everything is fine.",
  "Achievement unlocked: nothing accomplished!",
];

// Function: get random quote
function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

// Helper function: change quote with fade animation
function updateQuote() {
  quoteDiv.classList.add("fade-out");

  // Wait for fade-out before changing text
  setTimeout(() => {
    quoteDiv.textContent = `"${getRandomQuote()}"`;
    quoteDiv.classList.remove("fade-out");
    quoteDiv.classList.add("fade-in");

    // remove fade-in class after animation to reset state
    setTimeout(() => {
      quoteDiv.classList.remove("fade-in");
    }, 600);
  }, 600);
}

// Show a random quote on page load
window.addEventListener("load", () => {
  updateQuote();
});

let isCheating = false; // flag to track cheat message state

// Utility: random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// --- Detect Tab-focus (cheating attempt) ---
button.addEventListener("focus", (event) => {
  if (event.detail === 0) {
    // Focus via keyboard, not mouse
    isCheating = true;
    counterDiv.textContent =
      "You're cheating! Try clicking with your mouse 😜 try again you can do it ";
    button.blur(); // remove focus immediately
  }
});

// --- Restore counter text when mouse moves again ---
document.addEventListener("mousemove", () => {
  if (isCheating) {
    counterDiv.textContent = `Clicks: ${clicks}`;
    isCheating = false;
  }
});

// --- Button click handler ---
button.addEventListener("click", () => {
  clicks++;
  counterDiv.textContent = `Clicks: ${clicks}`;

  // Random motivational message every 5 clicks
  if (clicks % 5 === 0) {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    counterDiv.textContent += ` — ${randomMessage}`;
    // Update random funny quote every few clicks
    quoteDiv.textContent = `"${getRandomQuote()}"`;
    updateQuote();
  }

  // Random button color
  button.style.backgroundColor = getRandomColor();

  // Tiny scale animation
  button.style.transform = "scale(1.2)";
  setTimeout(() => {
    button.style.transform = "scale(1)";
  }, 100);

  // Play click sound
  clickSound.currentTime = 0;
  clickSound.play();
});

// --- Button dodge behavior ---
button.addEventListener("mouseover", () => {
  // --- Create smoke/particle trail ---
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement("span");
    particle.classList.add("particle");

    // Random position around the button
    const offsetX = (Math.random() - 0.5) * button.offsetWidth;
    const offsetY = (Math.random() - 0.5) * button.offsetHeight;

    particle.style.left = `${button.offsetLeft + button.offsetWidth / 2 + offsetX}px`;
    particle.style.top = `${button.offsetTop + button.offsetHeight / 2 + offsetY}px`;

    document.body.appendChild(particle);

    // Remove after animation
    setTimeout(() => {
      particle.remove();
    }, 1000);
  }

  // --- Random button move ---
  const maxX = window.innerWidth - button.offsetWidth;
  const maxY = window.innerHeight - button.offsetHeight;
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  button.style.position = "absolute";
  button.style.left = `${randomX}px`;
  button.style.top = `${randomY}px`;
});


// --- Random background color changer ---
function changeBackgroundColor() {
  const color = getRandomColor(); // reuse your existing getRandomColor() function
  document.body.style.backgroundColor = color;
}

// Change every 5 seconds (adjust as you like)
setInterval(changeBackgroundColor, 5000);

// --- Time Spent Doing Nothing Timer ---
const timerDiv = document.getElementById("timer");
let seconds = 0;

function formatTime(sec) {
  const mins = Math.floor(sec / 60);
  const secs = sec % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

function updateTimer() {
  seconds++;
  timerDiv.textContent = `Time spent doing nothing: ${formatTime(seconds)}`;
  // optional little blink effect every 5s for fun
  if (seconds % 5 === 0) {
    timerDiv.classList.add("fade");
    setTimeout(() => timerDiv.classList.remove("fade"), 400);
  }
}

// start timer on page load
window.addEventListener("load", () => {
  setInterval(updateTimer, 1000);
});
