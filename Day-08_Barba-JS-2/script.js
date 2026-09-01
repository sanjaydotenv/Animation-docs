import barba from "@barba/core";
import gsap from "gsap";

barba.init({
  transitions: [
    {
      leave(data) {
        gsap.to(data.current.container, {
          opacity: 0,
          duration: 2,
        });
      },
      enter(data) {
        gsap.from(data.next.container, {
          opacity: 0,
          duration: 2,
        });
      },
    },
  ],
});
