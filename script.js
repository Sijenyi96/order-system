
let customers = [];
let products = [];
let orders = [];

function addCustomer() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const customer = { id: Date.now(), firstName, lastName, email };
  customers.push(customer);
  updateCustomerSelect();
  
}

function addProduct() {
  const productName = document.getElementById("productName").value;
  const price = parseFloat(document.getElementById("price").value);
  const product = { id: Date.now(), productName, price };
  products.push(product);
  updateProductSelect();
}

function updateCustomerSelect() {
  const select = document.getElementById("selectCustomer");
  select.innerHTML = "";
  customers.forEach(c => {
    const option = document.createElement("option");
    option.value = c.id;
    option.textContent = `${c.firstName} ${c.lastName}`;
    select.appendChild(option);
  });
}

function updateProductSelect() {
  const select = document.getElementById("selectProduct");
  select.innerHTML = "";
  products.forEach(p => {
    const option = document.createElement("option");
    option.value = p.id;
    option.textContent = `${p.productName} ($${p.price})`;
    select.appendChild(option);
  });
}

function createOrder() {
  const customerId = parseInt(document.getElementById("selectCustomer").value);
  const productId = parseInt(document.getElementById("selectProduct").value);
  const quantity = parseInt(document.getElementById("orderQuantity").value);
  const product = products.find(p => p.id === productId);
  const total = quantity * product.price;

  const order = {
    id: Date.now(),
    customerId,
    productId,
    quantity,
    total
  };

  orders.push(order);
}

function generateReport() {
  const output = document.getElementById("reportOutput");
  output.innerHTML = "";

  customers.forEach(c => {
    const customerOrders = orders.filter(o => o.customerId === c.id);
    const totalSpent = customerOrders.reduce((sum, o) => sum + o.total, 0);

    const report = document.createElement("div");
    report.innerHTML = `<strong>${c.firstName} ${c.lastName}</strong>: ${customerOrders.length} order(s), $${totalSpent.toFixed(2)} total`;
    output.appendChild(report);
  });
}
