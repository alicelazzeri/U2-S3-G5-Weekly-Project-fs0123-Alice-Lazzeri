const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MmQ4NmY4MWI0MjAwMTM5YjI3ZGUiLCJpYXQiOjE2NzkwNDM5NzUsImV4cCI6MTY4MDI1MzU3NX0.jL8vO3lkgbFRAK8hnvu1m2qUfL__P_hVOwtM7Z1gCd0";

const url = "https://striveschool-api.herokuapp.com/api/product/";

const awaitSpinner = document.querySelector(".spinner-border");

fetch(url, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then(res => res.json())
  .then(data => {
    const row = document.querySelector("#riga");
    row.innerHTML = "";
    awaitSpinner.style.display = "none";
    const products = data;
    for (const product of products) {
      createCard(product.name, product.brand, product.imageUrl, product.price, product._id);
    }
  })
  .catch(err => console.log(err));

const createCard = (name, brand, imgUrl, price, id) => {
  const row = document.querySelector("#riga");
  const col = document.createElement("div");
  col.setAttribute("class", "col");
  row.appendChild(col);

  col.innerHTML = `<div class="card-shadow">
            <img class="img-fluid card-img-top" style="object-fit: cover; object-position: center; height: 200px;" src="${imgUrl}" alt="Card pic" />
            <div class="card-body text-center">
              <h5 class="card-title">${name}</h5>
              <p class="card-text">${brand}</p>
              <p class="card-text">${price}</p>
              <div class="d-flex justify-content-center gap-2">
                <a href="detail.html?id=${id}" class="btn btn-primary text-nowrap">Discover more</a>
                <a href="backoffice.html?id=${id}" class="btn btn-outline-primary">Edit</a>
              </div>
            </div>
          </div>`;
};
