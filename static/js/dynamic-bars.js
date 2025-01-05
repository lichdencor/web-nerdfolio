// Function to animate a single progress bar
function animateProgressBar(barId, value, duration = 1000) {
  const bar = document.getElementById(barId);
  if (bar) {
    const innerBar = bar.querySelector("div");
    let currentWidth = 0;

    const interval = setInterval(() => {
      currentWidth += 1;
      if (innerBar) {
        innerBar.style.width = `${currentWidth}%`;
      }
      if (currentWidth >= value) {
        clearInterval(interval);
      }
    }, duration / value); // Increment based on duration
  }
}

// Animate all progress bars dynamically on page load
document.addEventListener("DOMContentLoaded", () => {
  const progressBars = document.querySelectorAll(".progress-bar");
  progressBars.forEach((bar) => {
    const value = parseInt(bar.getAttribute("data-value"), 10) || 0;
    animateProgressBar(bar.id, value, 2000);
  });
});
