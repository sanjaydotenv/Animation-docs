import barba from "@barba/core";
import gsap from "gsap";

barba.init({
  transitions: [
    {
      name: "page transition",
      leave() {
       return gsap.to(".transition", {
          scaleY: 1,
          transformOrigin: "bottom",
          duration: 1.2,
          ease: "circ.inOut",
        });
      },
      enter() {
        return gsap.to(".transition", {
          scaleY: 0,
          transformOrigin: "top",
          duration: 1.2,
          ease: "circ.inOut",
        });
      },
    },
  ],
});
