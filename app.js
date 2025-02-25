const add = document.getElementById("add");
const pName = document.getElementById("productName");
const pPrice = document.getElementById("productPrice");
const pDesc = document.getElementById("productDesc");
const tbody = document.getElementById("tbody");

let products;
let currentIndex;

const nRegex = /^[A-Z][a-z 0-9]{4,}/;
const pRegex = /^[1-9][0-9]{2,}$/;
const dRegex = /[A-Za-z0-9 ]{20,}/;

const validateName = () => {
  if (nRegex.test(pName.value) == false) {
    pName.classList.add("is-invalid");
    pName.classList.remove("is-valid");
    return false;
  } else {
    pName.classList.add("is-valid");
    pName.classList.remove("is-invalid");
    return true;
  }
};

pName.addEventListener("keyup", validateName);

const validatePrice = () => {
  if (pRegex.test(pPrice.value) == false) {
    pPrice.classList.add("is-invalid");
    pPrice.classList.remove("is-valid");
    return false;
  } else {
    pPrice.classList.add("is-valid");
    pPrice.classList.remove("is-invalid");
    return true;
  }
};

pPrice.addEventListener("keyup", validatePrice);

const validateDesc = () => {
  if (dRegex.test(pDesc.value) == false) {
    pDesc.classList.add("is-invalid");
    pDesc.classList.remove("is-valid");
    return false;
  } else {
    pDesc.classList.add("is-valid");
    pDesc.classList.remove("is-invalid");
    return true;
  }
};

pDesc.addEventListener("keyup", validateDesc);

const displayProduct = (products) => {
  let prod = "";
  for (let i = 0; i < products.length; i++) {
    prod += `<tr> 
                <td>${products[i].name}</td>
                <td>${products[i].price}</td>
                <td>${products[i].desc}</td>
                <td><button class="btn btn-success" onclick="showProduct(${i})">Update</button></td>
                <td><button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button></td>
            </tr>`;
  }

  tbody.innerHTML = prod;
};

if (localStorage.getItem("products") == null) {
  products = [];
} else {
  products = JSON.parse(localStorage.getItem("products"));
  displayProduct(products);
}

add.addEventListener("click", () => {
  if (add.innerHTML == "Add") {
    addProduct();
  } else {
    updateProduct();
  }
});

const addProduct = () => {
  if (validateName() && validatePrice() && validateDesc()) {
    const product = {
      name: pName.value,
      price: pPrice.value,
      desc: pDesc.value,
    };
    products.push(product);
    saveToLocalStorage(products);
    displayProduct(products);
    clearProduct();
  }
};

const clearProduct = () => {
  pName.value = "";
  pPrice.value = "";
  pDesc.value = "";

  pName.classList.remove("is-valid", "is-invalid");
  pPrice.classList.remove("is-valid", "is-invalid");
  pDesc.classList.remove("is-valid", "is-invalid");
};

const search = (term) => {
  const searchedProduct = products.filter((product) => {
    return product.name.toLowerCase().includes(term.trim().toLowerCase());
  });
  displayProduct(searchedProduct);
};

const deleteProduct = (index) => {
  products.splice(index, 1);
  saveToLocalStorage(products);
  displayProduct(products);
};

const saveToLocalStorage = (products) => {
  localStorage.setItem("products", JSON.stringify(products));
};

const showProduct = (index) => {
  currentIndex = index;
  pName.value = products[index].name;
  pPrice.value = products[index].price;
  pDesc.value = products[index].desc;

  add.innerHTML = "Update";
};

const updateProduct = () => {
  if (!validateName() || !validatePrice() || !validateDesc()) return;

  const product = {
    name: pName.value,
    price: pPrice.value,
    desc: pDesc.value,
  };
  products[currentIndex] = product;

  saveToLocalStorage(products);
  displayProduct(products);
  clearProduct();

  add.innerHTML = "Add";
};
