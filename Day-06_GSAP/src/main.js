import "./style.css";
import { gsap } from "gsap";

const btns = document.querySelectorAll(".btn");

btns.forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    if (btn.classList[1] === "btn-scale") {
      gsap.to(btn, {
        scale: 1.15,
        duration: 0.3,
      });
    } else if (btn.classList[1] === "btn-bounce") {
      gsap.to(btn, {
        y: -10,
        ease: "back.out(7)",
      });
    } else {
      gsap.to(btn, {
        backgroundColor: "green",
        fontFamily: "apple",
        fontSize: "50px",
        transformOrigin: "bottom",
      });
    }
  });
  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, {
      scale: 1,
    });
    gsap.to(btn, {
      y: 0,
      ease: "bounce.out",
    });
  });
});
