let box = document.querySelector(".box");

let rect = box.getBoundingClientRect();

console.log(rect);

const items = document.querySelectorAll(".items");

// items.forEach((item) => {
//   item.addEventListener("click", () => {
//     item.style.backgroundColor = "red";
//   });
// });

const itemParent = document.querySelector(".list");

itemParent.addEventListener("click" , (e) => {
    if (e.target.classList.contains("items")){
       e.target.style.backgroundColor = "red"
    }
})


const moveDiv = document.querySelector(".move")

let px = 0
const animateFnc = () => {
    px += 2
    moveDiv.style.transform = `translateX(${px}px)`
    requestAnimationFrame(animateFnc)
}
animateFnc()
// setInterval(animateFnc, 30);