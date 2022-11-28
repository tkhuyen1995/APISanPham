function apiGetProduct() {
  return axios({
    url: "https://6384b1203fa7acb14ffd8ae4.mockapi.io/products",
    method: "GET",
  });
}
