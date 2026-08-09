import "./style.css";
import { gsap } from "gsap";


gsap.to(".box" , {
  x: 500,
  duration: 3,
  delay: 0.5,
  stagger: -0.2
})