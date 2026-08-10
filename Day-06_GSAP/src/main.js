import { gsap } from "gsap";

const count = document.querySelector(".loader-count h1");

let obj = {
  value: 0,
};

const tl = gsap.timeline({ paused: true });
gsap.set([".heading h1", ".sub-heading p"], {
  yPercent: 110,
});

gsap.to(obj, {
  value: 100,
  duration: 1,
  ease: "linear",
  onUpdate: () => {
    count.textContent = `${Math.floor(obj.value)}%`;
  },
  onComplete: () => {
    tl.play();
  },
});
tl.to(count, {
  opacity: 0,
  duration: 0.8,
  onComplete: () => {
    tl.play();
  },
});
tl.to(
  ".loader",
  {
    yPercent: -100,
    duration: 1,
    ease: "power3.inOut",
  },
  "-=0.3",
);

tl.from(
  ".hero-bg img",
  {
    scale: 1.2,
  },
  
)
  .to(".heading h1", {
    yPercent: 0,
    duration: 0.8,
  }, "-=0.3")
  .to(
    ".sub-heading p",
    {
      yPercent: 0,
    },
    "-=0.6",
  );
