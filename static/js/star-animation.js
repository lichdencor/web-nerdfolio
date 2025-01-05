// Save the current animation state before leaving the page
window.addEventListener("beforeunload", () => {
  const stars = document.querySelectorAll(".star");
  const starDelays = [];

  stars.forEach((star) => {
    const fallDelay =
      getComputedStyle(star).getPropertyValue("animation-delay");
    starDelays.push(fallDelay);
  });

  // Store the star animation delays in localStorage
  localStorage.setItem("starAnimationDelays", JSON.stringify(starDelays));
});

// Retrieve the saved state when the page loads
window.addEventListener("load", () => {
  const starDelays = JSON.parse(localStorage.getItem("starAnimationDelays"));

  if (starDelays) {
    const stars = document.querySelectorAll(".star");
    stars.forEach((star, index) => {
      if (starDelays[index]) {
        // Apply the stored animation delay value
        star.style.animationDelay = starDelays[index];
      }
    });
  }
});
