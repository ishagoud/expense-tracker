// DOM Elements
const form = document.getElementById("transaction-form");
const descEl = document.getElementById("desc");
const amountEl = document.getElementById("amount");
const typeEl = document.getElementById("type");
const categoryEl = document.getElementById("category");
const dateEl = document.getElementById("date");

const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const balanceEl = document.getElementById("balance");
const listEl = document.getElementById("transaction-list");

// State
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Event: Add Transaction
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const desc = descEl.value.trim();
  const amount = parseFloat(amountEl.value);
  const category = categoryEl.value;
  const type = typeEl.value;
  const date = dateEl.value;

  if (!desc || !amount || !category || !date) {
    alert("Please fill all fields correctly.");
    return;
  }

  const transaction = {
    id: Date.now(),
    desc,
    amount,
    category,
    type,
    date
  };

  transactions.push(transaction);
  updateApp();
  form.reset();
});

// Update Everything
function updateApp() {
  renderList();
  updateSummary();
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Render Transaction List
function renderList() {
  listEl.innerHTML = "";

  transactions.forEach(tx => {
    const item = document.createElement("li");
    item.className = `transaction-item ${tx.type}`;
    item.innerHTML = `
      ${tx.date} | ${tx.desc} - ₹${tx.amount} 
      <span>(${tx.category})</span>
      <button class="delete-btn" onclick="deleteTransaction(${tx.id})">X</button>
    `;
    listEl.appendChild(item);
  });
}

// Summary Calculation
function updateSummary() {
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  incomeEl.textContent = income.toFixed(2);
  expenseEl.textContent = expense.toFixed(2);
  balanceEl.textContent = (income - expense).toFixed(2);
}

// Delete Transaction
function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  updateApp();
}

// Init
updateApp();
