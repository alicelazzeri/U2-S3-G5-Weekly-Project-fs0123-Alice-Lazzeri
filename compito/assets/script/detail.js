const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MmQ4NmY4MWI0MjAwMTM5YjI3ZGUiLCJpYXQiOjE2NzkwNDM5NzUsImV4cCI6MTY4MDI1MzU3NX0.jL8vO3lkgbFRAK8hnvu1m2qUfL__P_hVOwtM7Z1gCd0";

const url = "https://striveschool-api.herokuapp.com/api/product/";
const URLParams = new URLSearchParams(window.location.search);
const selectedId = URLParams.get("id");
const endpoint = url + selectedId;
const awaitSpinner = document.querySelector(".spinner-border");

fetch(endpoint, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then(response => response.json())
  .then(data => {
    awaitSpinner.style.display = "none";
    const row = document.querySelector("#riga");
    row.innerHTML = "";
    const product = data;
    createCard(product.name, product.brand, product.imageUrl, product.price, product.description);
    document.querySelector("#edit").href = `backoffice.html?id=${product._id}`;
  })
  .catch(error => console.log(error));

const createCard = (name, brand, imgUrl, price, description) => {
  const row = document.querySelector("#riga");
  const col = document.createElement("div");
  col.setAttribute("class", "col");
  row.appendChild(col);

  col.innerHTML = `<div class="card d-flex flex-row align-items-center px-3 py-4">
    <img class="img-fluid card-img-top p-3" style="object-fit: contain; object-position: top; height: 350px;" src="${imgUrl}" alt="Card pic" />
    <div class="d-flex flex-column">
    <div class="card-body text-start px-3">
      <h5 class="card-title text-start display-5 px-3">${name}</h5>
      <h4 class="card-text text-start px-3">${brand}</h4>
      <p class="card-text text-start px-3">${price}€</p>
      <p class="card-text text-start px-3">${description}</p>
    </div>
    <a class="btn btn-outline-warning w-75 mx-auto" href="index.html" role="button">Back to Homepage</a>
  </div>`;
};
