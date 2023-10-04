let initUserArr = [{ id: 1, email: "admin@admin.com", password: "admin" }];
let initProductData = [
  {
    id: 1,
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 549,
    thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
  },
  {
    id: 2,
    title: "iPhone X",
    description:
      "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    price: 899,
    thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
  },
  {
    id: 3,
    title: "Samsung Universe 9",
    description:
      "Samsung's new variant which goes beyond Galaxy to the Universe",
    price: 1249,
    thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
  },
  {
    id: 4,
    title: "OPPOF19",
    description: "OPPO F19 is officially announced on April 2021.",
    price: 280,
    thumbnail: "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
  },
  {
    id: 5,
    title: "Huawei P30",
    description:
      "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
    price: 499,
    thumbnail: "https://i.dummyjson.com/data/products/5/thumbnail.jpg",
  },

  {
    id: 6,
    title: "MacBook Pro",
    description:
      "MacBook Pro 2021 with mini-LED display may launch between September, November",
    price: 1749,
    thumbnail: "https://i.dummyjson.com/data/products/6/thumbnail.png",
  },
  {
    id: 7,
    title: "Samsung Galaxy Book",
    description:
      "Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
    price: 1499,
    thumbnail: "https://i.dummyjson.com/data/products/7/thumbnail.jpg",
  },
  {
    id: 8,
    title: "Microsoft Surface Laptop 4",
    description:
      "Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.",
    price: 1499,
    thumbnail: "https://i.dummyjson.com/data/products/8/thumbnail.jpg",
  },
  {
    id: 9,
    title: "Infinix INBOOK",
    description:
      "Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty",
    price: 1099,
    thumbnail: "https://i.dummyjson.com/data/products/9/thumbnail.jpg",
  },
  {
    id: 10,
    title: "HP Pavilion 15-DK1056WM",
    description:
      "HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10",
    price: 1099,
    thumbnail: "https://i.dummyjson.com/data/products/10/thumbnail.jpeg",
  },
];
// let productCategory = [
//   { id: 101, name: "mobile" },
//   { id: 102, name: "laptop" },
// ];

window.addEventListener("load", () => {
  console.log("connected")
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(initUserArr));
  }

  if (!localStorage.getItem("productData")) {
    localStorage.setItem("productData", JSON.stringify(initProductData));
  }

  if (!localStorage.getItem("category")) {
    localStorage.setItem("category", JSON.stringify(productCategory));
  }

  if (location.pathname === "/pages/admin/admin.html") {
    loadAdminTable();
  }
  if (location.pathname === "/pages/admin/orders.html") {
    loadAdminOrderPage();
  }
  if (location.pathname === "/pages/user.html") {
    loadUserPage();
  }
  if (location.pathname === "/pages/cart.html") {
    loadCart();
  }
  if (location.pathname === "/pages/user-orders.html") {
    loadCheckOutPage();
  }
  if (location.pathname === "/pages/admin/addproduct.html") {
    loadAddProducts();
  }
  if (location.pathname === `/pages/admin/addproduct.html`) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    if (id) {
      editMode(id);
    }
  }
});

// random num generator
let randomnum = (n = 1000) => {
  return Math.floor(n * Math.random());
};

//unique userID
let userId = (userdata = "users") => {
  let userJson = JSON.parse(localStorage.getItem(userdata));
  const rannum = randomnum();
  const idin = userJson.find((data) => data.id === rannum);
  if (!idin) {
    return rannum;
  } else {
    userId();
  }
};

// SIGN-UP

let signUp = () => {
  let emailRef = document.getElementById("email");
  let passwordRef = document.getElementById("password");
  let confirmPasswordRef = document.getElementById("confirmPassword");
  let userArr = JSON.parse(localStorage.getItem("users"));
  let errorMessageRef = document.getElementById("error");
  emailcheck = userArr.find((data) => data.email === emailRef.value);

  if (emailRef.value.length > 0 && passwordRef.value.length > 0) {
    if (!emailcheck) {
      if (passwordRef.value === confirmPasswordRef.value) {
        userArr.push({
          id: userId(),
          email: emailRef.value,
          password: passwordRef.value,
        });
        localStorage.setItem("users", JSON.stringify(userArr));
        errorMessageRef.innerText = `Success Please Sign in`;
        emailRef.value = "";
        passwordRef.value = "";
        confirmPasswordRef.value = "";
      } else {
        errorMessageRef.innerText = "Passowrds doesn't match";
      }
    } else {
      errorMessageRef.innerText = "email id already exists";
    }
  } else {
    errorMessageRef.innerText = "Please fill out all the feild";
  }
};

// SIGN-IN

let signIn = () => {
  let signInEmailRef = document.getElementById("signInEmail");
  let signInPasswordRef = document.getElementById("signInPassword");
  let signInErrorRef = document.getElementById("signInError");
  let userArr = JSON.parse(localStorage.getItem("users"));

  signInverify = userArr.find(
    (data) =>
      data.email === signInEmailRef.value &&
      data.password === signInPasswordRef.value
  );

  if (signInEmailRef.value.length > 0 && signInPasswordRef.value.length > 0) {
    if (signInverify) {
      sessionStorage.setItem("user", signInverify.id);
      if (signInEmailRef.value === "admin@admin.com") {
        location.replace("/pages/admin/admin.html");
      } else {
        location.replace("/pages/user.html");
      }
    } else {
      signInErrorRef.innerText = "Password or Email Doesn't Match";
    }
  } else {
    signInErrorRef.innerText = "Feilds Empty";
  }
};

//LOAD ADMIN TABLE

let loadAdminTable = () => {
  let tableDataRef = document.getElementById("products");
  let productData = JSON.parse(localStorage.getItem("productData"));

  let tbody = "";
  for (let entry of productData) {
    tbody += `<tr>
    <th scope="row"><img src="${
      entry.thumbnail
    }" alt="Image" style="width:100px;height:50px;"></th>
    <td>${entry.title}</td>
    <td>${entry.description.substring(0, 30)}...</td>
    <td>$${entry.price}</td>
    <td><button class="btn me-2" onclick = "productEdit(${
      entry.id
    })"> Edit </button><button class="btn btn-danger" onclick = "productDelete(${
      entry.id
    })"> Delete </button></td>
  </tr>`;
  }
  tableDataRef.innerHTML = tbody;
};

//CATEGORY-SELECTOR
// let loadAddProducts = () => {
//   let categoryRef = document.getElementById("categorySelector");
//   let category = JSON.parse(localStorage.getItem("category"));
//   let selBody = "";
//   for (let cat of category) {
//     selBody += `<option value="${parseInt(cat.id)}">${cat.name}</option>`;
//   }
//   categoryRef.innerHTML = selBody;
// };

//ADD PRODUCTS

let productAdd = () => {
  let nameRef = document.getElementById("productName");
  let priceRef = document.getElementById("productPrice");
  let descriptionRef = document.getElementById("productDescription");
  let thumbnailRef = document.getElementById("productThumbnail");
  let productData = JSON.parse(localStorage.getItem("productData"));

  toast;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");

  console.log(id);

  if (!id) {
    productData.push({
      id: userId(),
      title: nameRef.value,
      description: descriptionRef.value,
      price: priceRef.value,
      thumbnail: thumbnailRef.value,
    });
  } else {
    localStorage.removeItem("editData");
    productData = productData.map((product) => {
      if (product.id === parseInt(id)) {
        return {
          ...product,
          title: nameRef.value,
          price: priceRef.value,
          description: descriptionRef.value,
          thumbnail: thumbnailRef.value,
        };
      } else {
        return product;
      }
    });
  }
  localStorage.setItem("productData", JSON.stringify(productData));
  location.href = "/pages/admin/admin.html";
};

//DELETE FROM ADMIN TABLE

let productDelete = (id) => {
  const productData = JSON.parse(localStorage.getItem("productData"));
  const productFilter = productData.filter((entry) => entry.id !== id);
  localStorage.setItem("productData", JSON.stringify(productFilter));
  loadAdminTable();
};

//EDIT FROM ADMIN TABLE
let productEdit = (id) => {
  let productData = JSON.parse(localStorage.getItem("productData"));
  const currProduct = productData.find(
    (product) => product.id === parseInt(id)
  );
  location.href = `/pages/admin/addproduct.html?id=${id}`;
  localStorage.setItem("editData", JSON.stringify(currProduct));
};

//EDIT MODE
let editMode = () => {
  let editData = JSON.parse(localStorage.getItem("editData"));
  let nameRef = document.getElementById("productName");
  let priceRef = document.getElementById("productPrice");
  let descriptionRef = document.getElementById("productDescription");
  let thumbnailRef = document.getElementById("productThumbnail");
  let pageTitleRef = document.getElementById("editTittle");
  let editButtonRef = document.getElementById("editButton");

  nameRef.value = editData.title;
  priceRef.value = editData.price;
  descriptionRef.value = editData.description;
  thumbnailRef.value = editData.thumbnail;
  pageTitleRef.innerText = "Edit-Product";
  editButtonRef.innerText = "Edit";
};

//LOAD USER PAGE

let loadUserPage = () => {
  let userPageRef = document.getElementById("userHomePage");
  let pageData = JSON.parse(localStorage.getItem("productData"));

  let pageBody = "";

  for (let entry of pageData) {
    pageBody += `<div class="card" style="width: 18rem">
    <img src="${
      entry.thumbnail
    }" class="card-img-top" alt="..." style="width:200px;height:"200px;" />
    <div class="card-body">
      <h5 class="card-title">${entry.title}</h5>
      <p class="card-text">
        ${entry.description.substring(0, 30)}...
      </p>
      <div class="d-flex justify-content-between align-items-center">
        <p class="mt-3">$${entry.price}</p>
        <button href="#" class="btn btn-primary" onclick="addProduct(${
          entry.id
        })">Add to Cart</button>
      </div>
    </div>
  </div>`;
  }
  userPageRef.innerHTML = pageBody;
};

// Move to Add-Product page

let addProduct = (id) => {
  let productData = JSON.parse(localStorage.getItem("productData"));
  let currProduct = productData.find((product) => id === product.id);
  let userId = parseInt(sessionStorage.getItem("user"));
  let cart = [];
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  let itemCheck = cart.find((product) => product.id === id);
  count = 1;
  console.log(itemCheck);
  if (itemCheck) {
    cart = cart.map((item) => {
      if (item.id === itemCheck.id) {
        return { ...item, quantity: item.quantity + 1 };
      } else {
        return item;
      }
    });
  } else {
    cart.push({
      user: userId,
      id: currProduct.id,
      title: currProduct.title,
      quantity: 1,
      price: currProduct.price,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

//Load Cart

let loadCart = () => {
  let tableRef = document.getElementById("cartTableBody");
  let currUser = parseInt(sessionStorage.getItem("user"));
  let cartData = JSON.parse(localStorage.getItem("cart"));
  let footRef = document.getElementById("tableFooter");

  cartData = cartData.filter((data) => data.user === currUser);

  let tbody = "";
  let total = 0;
  let sn = 0;
  for (let item of cartData) {
    sn += 1;
    total = total + item.quantity * item.price;
    tbody += `<tr>
    <th scope="row">${sn}</th>
    <td>${item.title}</td>
    <td>${item.quantity}</td>
    <td>$${item.price * item.quantity}</td>
    </tr>`;
  }
  footRef.innerHTML = `<td colspan = "3" class="text-end">Total =</td> <td>$${total}</td>`;
  tableRef.innerHTML = tbody;
};

//Check-Out

let checkOut = () => {
  let cartData = JSON.parse(localStorage.getItem("cart"));
  let order = [];
  let currUser = parseInt(sessionStorage.getItem("user"));
  let email = JSON.parse(localStorage.getItem("users")).find(
    (user) => user.id === currUser
  ).email;
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;

  for (let product of cartData) {
    order.push({
      id: product.id,
      title: product.title,
      status: "Processing",
      date: currentDate,
      email: email,
      price: product.price,
    });
  }
  localStorage.setItem("orders", JSON.stringify(order));
  localStorage.removeItem("cart");
};

let loadCheckOutPage = () => {
  let orderTableRef = document.getElementById("orderTable");
  order = JSON.parse(localStorage.getItem("orders"));
  tbody = "";
  for (let product of order) {
    tbody += `<tr>
    <th scope="row">${product.id}</th>
    <td>${product.title}</td>
    <td>${product.status}</td>
  </tr>`;
  }
  orderTableRef.innerHTML = tbody;
};

// Admin Orders
let loadAdminOrderPage = () => {
  let adminOrderTableRef = document.getElementById("adminOrderTable");
  order = JSON.parse(localStorage.getItem("orders"));
  tbody = "";
  for (let product of order) {
    tbody += `<tr>
    <th scope="row">${product.id}</th>
    <td>${product.date}</td>
    <td>${product.email}</td>
    <td>${product.title}</td>
    <td>${product.price}</td>
    <td><button class="btn btn-primary" onclick = "deliver(${product.id})" id = "deliver">Deliver</button></td>
  </tr>`;
  }
  adminOrderTableRef.innerHTML = tbody;
};

//Delivery-Status

let deliver = (id) => {
  order = JSON.parse(localStorage.getItem("orders"));
  order = order.map((product) => {
    if (product.id === id) {
      return {
        ...product,
        status: "Shipped",
      };
    } else {
      return product;
    }
  });
  console.log(order.status);
  localStorage.setItem("orders", JSON.stringify(order));
  let deliverBtnRef = document.getElementById("deliver");
  deliverBtnRef.innerHTML = `<button class="btn btn-primary" id = "deliver" disable>Delivered</button>`;
};

//Log-OUt

const logout = () => {
  sessionStorage.removeItem("user");
  location.replace("/pages/index.html");
};
