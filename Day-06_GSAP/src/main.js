import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

gsap.to(".box", {
  x: 500,
  scrollTrigger: {
    trigger: ".box",
    markers: true,
    start: "top 50%",
    scrub: 1,
  },
});
