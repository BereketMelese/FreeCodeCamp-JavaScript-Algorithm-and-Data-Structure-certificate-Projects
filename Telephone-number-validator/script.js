const inputEl = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const cleatBtn = document.getElementById("clear-btn");
const resultEl = document.getElementById("results-div");
const inputDivEl = document.getElementById("input-div");
const bodyEl = document.querySelector(".main")
const validCol = "#00FF00";
const invalidCol = "#FF0000";
const original = "#99d8be";

checkBtn.addEventListener("click", () => {
    resultEl.classList.remove("hidden");
    validatePhoneNumber();
});
inputEl.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        resultEl.classList.remove("hidden");
        validatePhoneNumber();
    }
})
cleatBtn.addEventListener("click", clearResults);


function validatePhoneNumber()  {

    const phoneNumber = inputEl.value.trim();
    const phoneRegex = /^(1\s?)?(\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/;

    if (phoneNumber === '') {
        alert("Please provide a phone number");
        inputDivEl.style.borderColor = invalidCol;
        return;
    }

    phoneRegex.test(phoneNumber) ? (resultEl.textContent = `Valid US number: ${phoneNumber}`, inputDivEl.style.borderColor = validCol, resultEl.style.borderColor = validCol)  : (resultEl.textContent = `Invalid US number: ${phoneNumber}`, inputDivEl.style.borderColor = invalidCol, resultEl.style.borderColor = invalidCol)
};

function clearResults() {
    resultEl.textContent = '';
    inputEl.value = '';
    inputDivEl.style.borderColor = original;
    resultEl.classList.add("hidden");
    resultEl.style.borderColor = original;
};