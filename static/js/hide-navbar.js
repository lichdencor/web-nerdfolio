let lastScrollPosition = 0;

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".tui-navbar");

  if (!navbar) {
    console.error("Navbar element not found. Ensure it exists in the DOM.");
    return;
  }

  window.addEventListener("scroll", () => {
    const currentScrollPosition = window.scrollY;
    const isMobile = window.innerWidth <= 480; // Mobile screen check

    if (isMobile) {
      // On mobile devices, ensure the navbar is always visible
      navbar.classList.remove("hidden");
    } else {
      // On desktop, the navbar hides when scrolling down and shows when scrolling up
      if (currentScrollPosition > lastScrollPosition) {
        navbar.classList.add("hidden");
      } else {
        navbar.classList.remove("hidden");
      }
    }

    lastScrollPosition = currentScrollPosition;
  });
});
