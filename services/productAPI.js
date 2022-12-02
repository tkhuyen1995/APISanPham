function apiGetProduct(searchTerm) {
  return axios({
    url: "https://6384b1203fa7acb14ffd8ae4.mockapi.io/products",
    method: "GET",
    params: {
      name: searchTerm,
    },
  });
}

function apiAddProduct(product) {
  return axios({
    url: "https://6384b1203fa7acb14ffd8ae4.mockapi.io/products",
    method: "POST",
    // method POST cần thêm key data
    data: product,
  });
}

function apiDeleteProduct(productId) {
  return axios({
    url: `https://6384b1203fa7acb14ffd8ae4.mockapi.io/products/${productId}`,
    method: "DELETE",
  });
}

function apiGetProductById(productId) {
  return axios({
    url: `https://6384b1203fa7acb14ffd8ae4.mockapi.io/products/${productId}`,
    method: "GET",
  });
}

function apiUpdateProduct(productId, product) {
  return axios({
    url: `https://6384b1203fa7acb14ffd8ae4.mockapi.io/products/${productId}`,
    method: "PUT",
    data: product,
  });
}
