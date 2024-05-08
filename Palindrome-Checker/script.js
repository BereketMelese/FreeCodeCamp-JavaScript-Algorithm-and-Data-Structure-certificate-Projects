const put = document.getElementById('text-input');
const button = document.getElementById('check-btn');
const palin = document.getElementById('response');

const checkPalindrome = txt => {
    const response = txt;
    if (txt === '') {
        alert('Please input a value');
        return;
    }

    const step1 = txt.replace(/[^A-Za-z0-9]/g,'').toLowerCase();
    let mess = `${response} ${
        step1 === [...step1].reverse().join('') ? "is" : "is not" 
    } a palindrome.`

    palin.innerHTML = mess;

}

button.addEventListener("click", ()=> {
    checkPalindrome(put.value);
    put.value = '';
})