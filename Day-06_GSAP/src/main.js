import "./style.css";
import { gsap } from "gsap";

const tl = gsap.timeline();

tl.to(".box1", {
  x: 500,
  duration: 1,
})
  .to(".box2", {
    x: 500,
    duration: 1,
  })
  .to(
    ".box3",
    {
      x: 500,
      duration: 1,
    },
    "-=0.9",
  )
  .to(".box4", {
    x: 500,
    duration: 1,
  })
  .to(".box5", {
    x: 500,
    duration: 1,
  });