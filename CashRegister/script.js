let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const priceElement = document.getElementById("price");
const cashInput = document.getElementById("cash");
const purchaseButton = document.getElementById("purchase-btn");
const changeDueDisplay = document.getElementById("change-due");
const moneyLeftElement = document.getElementById("money-left");

priceElement.innerHTML = price;

const displayResults = (stat, change) => {
  changeDueDisplay.innerHTML = `<p>Status: ${stat}</p>`;
  change.forEach(([denomination, amount]) => {
    changeDueDisplay.innerHTML += `<p>${denomination}: $${amount.toFixed(2)}</p>`;
  });
};

const calculateChange = () => {
  let customerCash = parseFloat(cashInput.value);

  if (customerCash < price) {
    alert("Customer does not have enough money to purchase the item");
    cashInput.value = "";
    return;
  }

  if (customerCash === price) {
    changeDueDisplay.innerHTML = "<p>No change due - customer paid with exact cash</p>";
    cashInput.value = "";
    return;
  }

  let changeToGive = parseFloat((customerCash - price).toFixed(2));
  const totalCashInDrawer = parseFloat(cid.reduce((acc, [_, amount]) => acc + amount, 0).toFixed(2));
  const denominations = [
    { name: 'ONE HUNDRED', value: 100 },
    { name: 'TWENTY', value: 20 },
    { name: 'TEN', value: 10 },
    { name: 'FIVE', value: 5 },
    { name: 'ONE', value: 1 },
    { name: 'QUARTER', value: 0.25 },
    { name: 'DIME', value: 0.1 },
    { name: 'NICKEL', value: 0.05 },
    { name: 'PENNY', value: 0.01 }
  ];

  if (totalCashInDrawer < changeToGive) {
    changeDueDisplay.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
    return;
  }

  let change = [];
  let originalCID = JSON.parse(JSON.stringify(cid)); // Backup the original cid

  for (let i = 0; i < denominations.length; i++) {
    const { name, value } = denominations[i];
    let amountInDrawer = cid.find(([denomination]) => denomination === name)[1];

    if (changeToGive >= value && amountInDrawer > 0) {
      let amountToReturn = 0;

      while (changeToGive >= value && amountInDrawer > 0) {
        amountToReturn += value;
        changeToGive = parseFloat((changeToGive - value).toFixed(2));
        amountInDrawer -= value;
      }

      if (amountToReturn > 0) {
        change.push([name, amountToReturn]);
        cid.find(([denomination]) => denomination === name)[1] = amountInDrawer;
      }
    }
  }

  if (changeToGive > 0) {
    changeDueDisplay.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
    cid = originalCID; // Restore original cid
    return;
  }

  let remainingCashInDrawer = parseFloat(cid.reduce((acc, [_, amount]) => acc + amount, 0).toFixed(2));

  if (remainingCashInDrawer === 0) {
    displayResults("CLOSED", change);
  } else {
    displayResults("OPEN", change);
  }

  updateCashDrawer(change);
};

const updateCashDrawer = change => {
  change.forEach(([denomination, amount]) => {
    const cashInDrawer = cid.find(([name]) => name === denomination);
    cashInDrawer[1] = parseFloat((cashInDrawer[1] - amount).toFixed(2));
  });

  cashInput.value = "";
  moneyLeftElement.innerHTML = "<p><strong>Cash in drawer:</strong></p>";
  cid.forEach(([denomination, amount]) => {
    moneyLeftElement.innerHTML += `<p>${denomination}: $${amount.toFixed(2)}</p>`;
  });
};

purchaseButton.addEventListener("click", calculateChange);

cashInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    calculateChange();
  }
});

updateCashDrawer([]);

