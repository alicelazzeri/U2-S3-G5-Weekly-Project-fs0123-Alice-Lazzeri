const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MmQ4NmY4MWI0MjAwMTM5YjI3ZGUiLCJpYXQiOjE2NzkwNDM5NzUsImV4cCI6MTY4MDI1MzU3NX0.jL8vO3lkgbFRAK8hnvu1m2qUfL__P_hVOwtM7Z1gCd0";

const url = "https://striveschool-api.herokuapp.com/api/product/";
const URLParams = new URLSearchParams(window.location.search);
const selectedId = URLParams.get("id");

const endpoint = selectedId ? url + selectedId : url;
const method = selectedId ? "PUT" : "POST";

window.onload = () => {
  if (selectedId) {
    document.getElementById("title").innerText = "Edit Product";
    document.getElementById("edit").classList.remove("d-none");
    document.getElementById("reset").classList.remove("d-none");
    document.getElementById("delete").classList.remove("d-none");
    document.getElementById("create").classList.add("d-none");

    fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        const { name, description, brand, imageUrl, price } = data;
        document.getElementById("name").value = name;
        document.getElementById("description").value = description;
        document.getElementById("brand").value = brand;
        document.getElementById("imgUrl").value = imageUrl;
        document.getElementById("price").value = price;
      })
      .catch(error => console.log(error));
  }
};

const handleSub = event => {
  event.preventDefault();
  const newProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("imgUrl").value,
    price: document.getElementById("price").value,
  };
  fetch(endpoint, {
    method,
    body: JSON.stringify(newProduct),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).catch(error => console.log(error));
};

const editForm = () => {
  const acceptedEdit = confirm("Do you really want to edit the form of the product?");
  if (acceptedEdit) {
    fetch(endpoint, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    })
      .then(response => {
        if (response.ok) {
          alert("Form edited successfully");
          window.location.href = "index.html";
        } else {
          throw new Error("An error occurred while editing the form");
        }
      })
      .catch(err => {
        console.log(err);
        alert("An error occurred while editing the form");
      });
  }
};

const resetForm = () => {
  const acceptedReset = confirm("Do you really want to reset the form of the product?");
  if (acceptedReset) {
    fetch(endpoint, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (response.ok) {
          alert("Form resetted successfully");
          window.location.href = "index.html";
        } else {
          throw new Error("An error occurred while resetting the form");
        }
      })
      .catch(err => {
        console.log(err);
        alert("An error occurred while resetting the form");
      });
  }
};

const deleteProd = () => {
  const hasAccepted = confirm("Do you really want to delete this product?");
  if (hasAccepted) {
    fetch(endpoint, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (response.ok) {
          alert("Product deleted successfully");
          window.location.href = "index.html";
        } else {
          throw new Error("An error occurred during the deletion of the product");
        }
      })
      .catch(err => {
        console.log(err);
        alert("An error occurred during the deletion of the product");
      });
  }
};

const productCreated = () => {
  fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  }).then(response => {
    response = alert("Product created successfully");
    window.location.href = "index.html";
  });
};
