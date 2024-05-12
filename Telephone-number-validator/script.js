const inputEl = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const cleatBtn = document.getElementById("clear-btn");
const resultEl = document.getElementById("result-div");
const inputDivEl = document.getElementById("input-div");
const validCol = "#00FF00";
const invalidCol = "#FF0000";
const original = "#99d8be";

checkBtn.addEventListener("click", validatePhoneNumber(inputVal));
cleatBtn.addEventListener("click", clearResults);


function validatePhoneNumber()  {
    const phoneNumber = inputEl.value.trim();

    const phoneRegex = /^(1\s?)?(\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/;

    if (phoneNumber === '') {
        alert("Please provide a phone number");
        return;
    }

    resultEl.textContent = phoneRegex.test(phoneNumber) ? (`Valid US number: ${phoneNumber}`, inputDivEl.style.borderColor = validCol, resultEl.style.borderColor = validCol)  : (`Invalid US number: ${phoneNumber}`, inputDivEl.style.borderColor = invalidCol, resultEl.style.borderColor = invalidColvalidCol)
};

function clearResults() {
    resultEl.textContent = '';
    inputDivEl.style.borderColor = original;
    resultEl.style.borderColor = original;
};