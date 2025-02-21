var add = document.getElementById("add");
var pName = document.getElementById("productName");
var pPrice = document.getElementById("productPrice");
var pDesc = document.getElementById("productDesc");
var tbody = document.getElementById("tbody");

var products;
var currentIndex;

var nRegex = /^[A-Z][a-z 0-9]{4,}/;
var pRegex = /^[1-9][0-9]{2,}$/;
var dRegex = /[A-Za-z0-9 ]{20,}/;

pName.addEventListener("keyup", validateName);
pPrice.addEventListener("keyup", validatePrice);
pDesc.addEventListener("keyup", validateDesc);

function validateName() {
  if (nRegex.test(pName.value) == false) {
    pName.classList.add("is-invalid");
    pName.classList.remove("is-valid");
    return false;
  } else {
    pName.classList.add("is-valid");
    pName.classList.remove("is-invalid");
    return true;
  }
}
function validatePrice() {
  if (pRegex.test(pPrice.value) == false) {
    pPrice.classList.add("is-invalid");
    pPrice.classList.remove("is-valid");
    return false;
  } else {
    pPrice.classList.add("is-valid");
    pPrice.classList.remove("is-invalid");
    return true;
  }
}
function validateDesc() {
  if (dRegex.test(pDesc.value) == false) {
    pDesc.classList.add("is-invalid");
    pDesc.classList.remove("is-valid");
    return false;
  } else {
    pDesc.classList.add("is-valid");
    pDesc.classList.remove("is-invalid");
    return true;
  }
}

if (localStorage.getItem("products") == null) {
  products = [];
} else {
  products = JSON.parse(localStorage.getItem("products"));
  displayProduct(products);
}

add.addEventListener("click", function () {
  if (add.innerHTML == "Add") {
    addProduct();
  } else {
    updateProduct();
  }
});

function addProduct() {
  if (validateName() && validatePrice() && validateDesc()) {
    var product = {
      name: pName.value,
      price: pPrice.value,
      desc: pDesc.value,
    };
    products.push(product);
    saveToLocalStorage(products);
    displayProduct(products);
    clearProduct();
  }
}

function displayProduct(products) {
  var prod = "";
  for (var i = 0; i < products.length; i++) {
    prod += `<tr> 
                <td>${products[i].name}</td>
                <td>${products[i].price}</td>
                <td>${products[i].desc}</td>
                <td><button class="btn btn-success" onclick="showProduct(${i})">Update</button></td>
                <td><button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button></td>
            </tr>`;
  }

  tbody.innerHTML = prod;
}

function clearProduct() {
  pName.value = "";
  pPrice.value = "";
  pDesc.value = "";

  pName.classList.remove("is-valid", "is-invalid");
  pPrice.classList.remove("is-valid", "is-invalid");
  pDesc.classList.remove("is-valid", "is-invalid");
}

function search(term) {
  var searchedProduct = products.filter(function (product) {
    return product.name.toLowerCase().includes(term.trim().toLowerCase());
  });
  displayProduct(searchedProduct);
}

function deleteProduct(index) {
  products.splice(index, 1);
  saveToLocalStorage(products);
  displayProduct(products);
}

function saveToLocalStorage(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

function showProduct(index) {
  currentIndex = index;
  pName.value = products[index].name;
  pPrice.value = products[index].price;
  pDesc.value = products[index].desc;

  add.innerHTML = "Update";
}

function updateProduct() {
  if (!validateName() || !validatePrice() || !validateDesc()) return;

  var product = {
    name: pName.value,
    price: pPrice.value,
    desc: pDesc.value,
  };
  products[currentIndex] = product;

  saveToLocalStorage(products);
  displayProduct(products);
  clearProduct();

  add.innerHTML = "Add";
}
