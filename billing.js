// Set default date on page load
document.addEventListener("DOMContentLoaded", function () {
  let invDateInput = document.getElementById('invDate');
  if (invDateInput) {
    invDateInput.valueAsDate = new Date();
  }
});

function calculateTotal() {
  let prices = document.querySelectorAll('.item-price');
  let total = 0;
  prices.forEach(input => {
    let val = parseFloat(input.value) || 0;
    total += val;
  });
  document.getElementById('grandTotal').innerText = total.toFixed(2);
}

function addItem() {
  let table = document.getElementById('itemsTable');
  let rowCount = table.rows.length + 1;
  let tr = document.createElement('tr');

  tr.innerHTML = `
    <td class="item-no">${rowCount}</td>
    <td><input type="text" class="table-input item-desc" placeholder="Service Name"></td>
    <td><input type="number" class="table-input item-price" value="0" oninput="calculateTotal()"></td>
    <td>
      <button class="delete-btn" onclick="deleteRow(this)">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
      </button>
    </td>
  `;
  table.appendChild(tr);
}

function deleteRow(btn) {
  let row = btn.closest('tr');
  row.remove();
  updateItemNumbers();
  calculateTotal();
}

function updateItemNumbers() {
  let rows = document.querySelectorAll('#itemsTable tr');
  rows.forEach((row, index) => {
    row.querySelector('.item-no').innerText = index + 1;
  });
}

function sendWhatsApp() {
  let name = document.getElementById('custName').value || "Customer";
  let mobile = document.getElementById('custMobile').value;
  let total = document.getElementById('grandTotal').innerText;

  if (!mobile) {
    alert("Please enter Customer Mobile Number!");
    return;
  }

  let message = `Hello ${name},\nThank you for choosing Tirumala Washing Machine Repair Services.\n\nTotal Bill: ₹${total}\nDate: ${document.getElementById('invDate').value}`;
  let encodedMsg = encodeURIComponent(message);
  window.open(`https://wa.me/91${mobile}?text=${encodedMsg}`, '_blank');
}