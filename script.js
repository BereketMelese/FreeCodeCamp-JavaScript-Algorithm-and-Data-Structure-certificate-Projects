const btnEl = document.getElementById("convert-btn");
const outEl = document.getElementById("output");
const closeEl = document.querySelector(".fa-solid")
btnEl.addEventListener("click", ()=>{
    outEl.classList.toggle("hidden")
})
closeEl.addEventListener("click", ()=> {
    outEl.classList.toggle("hidden")
})