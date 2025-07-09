document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let totalAmount = calculateTotal();
  renderDisplay();

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = expenseNameInput.value.trim();
    const expenseInput = parseFloat(expenseAmountInput.value);
    if (name && !isNaN(expenseInput) && expenseInput) {
      console.log(name, expenseInput);
      expenseAmountInput.value = "";
      expenseNameInput.value = "";

      let ex = {
        id: Date.now(),
        name,
        cost: expenseInput,
      };
      expenses.push(ex);
      saveExpensesTolocal();
      renderDisplay();
    }
  });

  function renderDisplay() {
    if (expenses.length) {
      expenseList.innerHTML = "";
      expenses.forEach((ex, idx) => {
        let li = document.createElement("li");
        li.classList.add("expense-list");
        li.innerHTML = `
        <span>${ex.name} - $${ex.cost}</span>
        <button data-id = ${ex.id}> Remove </button>
        `;
        expenseList.appendChild(li);
      });
    } else {
      expenseList.innerHTML = "";
    }

    totalAmountDisplay.textContent = updateCost();
  }
  expenseList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const exID = parseInt(e.target.getAttribute("data-id"));
      expenses = expenses.filter((e) => e.id !== exID);
      saveExpensesTolocal();
      renderDisplay();
    }
  });
  function updateCost() {
    totalAmount = calculateTotal();
    return totalAmount.toString();
  }

  function calculateTotal() {
    return expenses.reduce((sum, expense) => sum + expense.cost, 0);
  }

  function saveExpensesTolocal() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }
});
