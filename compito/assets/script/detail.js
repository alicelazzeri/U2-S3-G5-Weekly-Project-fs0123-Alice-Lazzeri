const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MmQ4NmY4MWI0MjAwMTM5YjI3ZGUiLCJpYXQiOjE2ODY3MzUxOTQsImV4cCI6MTY4Nzk0NDc5NH0.8-i2kZ0313GRm6pZhNvK5QdFTxcHLomhtF_8kA-GgqU";

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

  col.innerHTML = `<div id="detail" class="card d-flex flex-column flex-sm-column flex-md-column flex-lg-row align-items-center px-3 py-4 my-5 border border-2 border-warning-subtle rounded-3 shadow-lg">
    <img class="img-fluid card-img-top p-3" style="object-fit: contain; object-position: top; height: 350px; border-radius: 20px;" src="${imgUrl}" alt="Card pic" />
    <div class="d-flex flex-column">
    <div class="card-body text-start px-3">
      <h5 class="card-title text-center text-sm-center text-md-center text-lg-start display-5 px-3 mb-4" style="font-family: 'Sansita Swashed', cursive">${name}</h5>
      <h4 class="card-text text-center text-sm-center text-md-center text-lg-start fw-lighter px-3 mb-4" style="font-family: 'Sansita Swashed', cursive">${brand}</h4>
      <p class="card-text text-center text-sm-center text-md-center text-lg-start fw-lighter px-3">${price}€</p>
      <p class="card-text text-center text-sm-center text-md-center text-lg-start fw-light px-3 mb-4">${description}</p>
    </div>
    <a class="btn btn-outline-warning border-1 w-75 mx-auto mb-3 mb-sm-3" href="index.html" role="button">Back to Homepage</a>
  </div>`;
};
