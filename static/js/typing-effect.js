let textLines = [];
const currentPage = window.location.pathname.split("/").pop();

console.log("Current Page:", currentPage); // Debugging log

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

if (!textLines.length) {
  console.error(
    "textLines is not properly initialized. Current Page:",
    currentPage
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const typingElement = document.querySelector(".typing-effect");
  if (typingElement && textLines.length > 0) {
    typeEffect(typingElement, textLines);
  }
});
