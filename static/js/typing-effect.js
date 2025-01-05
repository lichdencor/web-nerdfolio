// Typing effect function
function typeEffect(element, textLines) {
  let lineIndex = 0;
  let charIndex = 0;
  const typingSpeed = 5; // Speed of typing in milliseconds
  const lineDelay = 300; // Delay before starting the next line

  function typeLine() {
    if (lineIndex < textLines.length) {
      const line = textLines[lineIndex];
      if (charIndex < line.length) {
        element.innerHTML += line[charIndex]; // Append each character
        charIndex++;
        setTimeout(typeLine, typingSpeed);
      } else {
        // Add line break after the current line
        element.innerHTML += "<br>"; // Ensure line break
        charIndex = 0;
        lineIndex++;
        setTimeout(typeLine, lineDelay);
      }
    }
  }

  typeLine(); // Start typing effect
}

// Function to initialize textLines based on the current page
function initializeTextLines() {
  let textLines = [];
  const currentPage = window.location.pathname
    .split("/")
    .pop()
    .replace(/\/$/, ""); // Trim trailing slash if present

  console.log("Current Page:", currentPage); // Debugging log

  // Check if current page is 'home.html' or 'index.html' (for both homepage cases)
  if (
    currentPage === "home.html" ||
    currentPage === "index.html" ||
    currentPage === ""
  ) {
    textLines = [
      "Welcome!",
      "I'm a developer and systems administrator with a passion for creating highly robust and distributed systems.",
      "I have extensive knowledge of network-based systems, capable of automating and resolving remote incidents.",
    ];
  } else if (currentPage === "about.html") {
    textLines = [
      "Hi there! I'm a student at Universidad de Belgrano.",
      "My passion lies in networking and building applications for business,",
      "and I’m always looking for new challenges to solve.",
      "When I’m not coding, you can find me either gaming or training,",
      "staying sharp both mentally and physically.",
      "Right now, I’m expanding my skill set by exploring automation",
      "and learning about web protocols, taking my technical knowledge to the next level.",
    ];
  }

  // Debugging check to make sure textLines is initialized
  console.log("textLines initialized:", textLines);

  return textLines;
}

// Initialize typing effect after the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const typingElement = document.querySelector(".typing-effect");
  const textLines = initializeTextLines();

  if (typingElement && textLines.length > 0) {
    typeEffect(typingElement, textLines); // Call typeEffect only if textLines is valid
  } else {
    console.error(
      "textLines is not properly initialized. Current Page:",
      window.location.pathname
    );
  }
});
