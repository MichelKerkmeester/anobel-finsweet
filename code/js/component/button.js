// Button
// Arrow animation

const btnAnimation = () => {
  // Select elements
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((btn) => {
    // Create hover animation
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn.querySelector("#btn--hover"), {
        x: "200%",
        duration: 0.4,
        ease: "power2.out",
      });
    });

    // Create hover out animation
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn.querySelector("#btn--hover"), {
        x: "0%",
        duration: 0.4,
        ease: "power2.out",
      });
    });
  });
};
