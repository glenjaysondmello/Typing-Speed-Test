const typingText = document.querySelector(".typing-text p");
const input = document.querySelector(".wrapper .input-field");
const time = document.querySelector(".time span b");
const mistakes = document.querySelector(".mistake span");
const wpm = document.querySelector(".wpm span");
const cpm = document.querySelector(".cpm span");
const btn = document.querySelector("button");

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraph() {
  const paragraph = [
    "The quick brown fox jumps over the lazy dog.",
    "She sells seashells by the seashore.",
    "A journey of a thousand miles begins with a single step.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold.",
    "Beauty is in the eye of the beholder.",
    "The pen is mightier than the sword.",
    "When in Rome, do as the Romans do.",
    "Actions speak louder than words.",
    "Every cloud has a silver lining.",
  ];

  const randomIndex = Math.floor(Math.random() * paragraph.length);
  typingText.innerHTML = "";
  btn.addEventListener("click", () => {
    typingText.innerHTML = "";
    for (const char of paragraph[randomIndex]) {
      typingText.innerHTML += `<span>${char}</span>`;
    }
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => input.focus());
    typingText.addEventListener("click", input.focus());
  });
}

function initTyping(e) {
  const char = typingText.querySelectorAll("span");
  const typedChar = input.value.charAt(charIndex);

  if (e.inputType === "deleteContentBackward" && charIndex > 0) {
    charIndex--;
    if (char[charIndex].classList.contains("incorrect")) {
      mistake--;
    }
    char[charIndex].classList.remove("correct", "incorrect", "active");
    char[charIndex].classList.add("active");
    mistakes.innerHTML = mistake;
    cpm.innerHTML = charIndex - mistake;
    return;
  }

  if (charIndex < char.length && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTime, 1000);
      isTyping = true;
    }

    if (char[charIndex].innerHTML === typedChar) {
      char[charIndex].classList.add("correct");
    } else {
      mistake++;
      char[charIndex].classList.add("incorrect");
    }
    charIndex++;
    mistakes.innerHTML = mistake;
    cpm.innerText = charIndex - mistake;

    if (charIndex < char.length) {
      char[charIndex].classList.add("active");
    }
    if (charIndex === char.length) {
      clearInterval(timer);
      typingText.disabled = true;
    }
  }
}

function initTime() {
  if (timeLeft > 0) {
    timeLeft--;
    time.innerText = timeLeft;
    let wpmVal = Math.round(
      ((charIndex - mistake) / 5 / (maxTime - timeLeft)) * 60
    );
    wpm.innerText = wpmVal;
  } else {
    clearInterval(timer);
  }
}

function reset() {
  loadParagraph();
  clearInterval(timer);
  timeLeft = maxTime;
  time.innerText = timeLeft;
  input.value = "";
  charIndex = 0;
  mistake = 0;
  isTyping = false;
  wpm.innerText = 0;
  cpm.innerText = 0;
  mistakes.innerText = 0;
  typingText.disabled = false;
  btn.innerHTML = "Start Over";
}

input.addEventListener("input", initTyping);
btn.addEventListener("click", reset);

loadParagraph();
