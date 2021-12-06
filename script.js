var detail;
var amount;

// holds all transactions
var transactions = [];

//load transactions data from localStorage when page reloads
document.body.onload = loadData()

// get values from inputs
function getInputValues() {
  detail = document.getElementById("detail").value;
  amount = Number(document.getElementById("amount").value);
}

// validate inputs
function isValid() {
  if (!detail || !amount) {
    alert("Detail and Amount are both required");
    return false;
  }
  return true;
}

// populate the table
function displayTable() {
  const tableBody = document.getElementById("tableBody");

  tableBody.innerHTML = "";

  for (let i = 0; i < transactions.length; i++) {
    tableBody.innerHTML += `
        <tr>
                <th>${transactions[i].type}</th>
                <th>${transactions[i].detail}</th>
                <th>${transactions[i].amount}</th>
            </tr>
        `;
  }
}


function getResults () {
    const incomeTotal = document.getElementById("incomeTotal");
    const expenseTotal = document.getElementById("expenseTotal");
    const amountTotal = document.getElementById("amountTotal");

    let income = 0;
    let expense = 0;
    let amount = 0;

   for (let i = 0; i < transactions.length; i++) {

    if (transactions[i].type === "Income") {
        income += transactions[i].amount;
    }

    if (transactions[i].type === "Expense") {
        expense += transactions[i].amount;
    }
       
   }

   incomeTotal.innerHTML = income;
   expenseTotal.innerHTML = expense;
   amountTotal.innerHTML = income - expense;
}


function calc(type) {
  getInputValues();

  if (!isValid()) return;

  transactions.push({type, detail, amount })
  saveToLocal(transactions)
  getResults();
  displayTable();
  
  //1. clear input after successfully adding information
  document.getElementById("detail").value = '';
  document.getElementById("amount").value = '';
}



//2. Create a button that will reset/clear all the data
//set the localStorage transactions to empty
function reset() {
  transactions = [];
  localStorage.transactions = '[]';
  displayTable();
  getResults();
  console.log(localStorage.transactions)
}


//save the updated transactions array to localStorage
function saveToLocal(array) {
  localStorage.transactions = JSON.stringify(array)
  console.log(localStorage.transactions)
}


//3. On each refresh, the data should not be lost
function loadData() {
  if(localStorage.transactions) {
    transactions = JSON.parse(localStorage.transactions);
    getResults();
    displayTable();
  } else {
    console.log("localStorage.transactions is empty");
    transactions = [];
  }
  console.log(localStorage.transactions)
}