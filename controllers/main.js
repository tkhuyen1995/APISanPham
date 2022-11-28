getProducts();

// Viết function getProducts request API để lấy danh sách sản phẩm
function getProducts() {
  apiGetProduct()
    .then((response) => {
      //   response.data là dữ liệu trả về từ API
      console.log("API products: ", response.data);
      // duyệt qua danh sách sản phẩm và tạo các đối tượng Product
      let products = response.data.map((product) => {
        return new Product(
          product.id,
          product.name,
          product.image,
          product.price,
          product.type
        );
      });
      //  hiển thị danh sách ra giao diện
      display(products);
    })
    .catch((error) => {
      console.log(error);
    });
}

// ===============================================================
function display(products) {
  let html = products.reduce((result, product) => {
    return (
      result +
      `
        <tr>
            <td>${product.id}</td>        
            <td>${product.name}</td>        
            <td>${product.price}</td>        
            <td>
                <img src="${product.image}" width = "50px" height = "50px"/>
            </td>        
            <td>${product.type}</td>        
        </tr>
        `
    );
  }, "");

  dom("#tblDanhSachSP").innerHTML = html;
}

function dom(selector) {
  return document.querySelector(selector);
}
