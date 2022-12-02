getProducts();

// Viết function getProducts request API để lấy danh sách sản phẩm
function getProducts(searchTerm) {
  apiGetProduct(searchTerm)
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

// Viết function addProduct request API để thêm sản phẩm
function addProduct(product) {
  apiAddProduct(product)
    .then(() => {
      getProducts();
    })
    .catch((error) => {
      console.log(error);
    });
  display(product);
}

// Viết function deleteProduct request API để xóa sản phẩm
function deleteProduct(productId) {
  apiDeleteProduct(productId)
    .then(() => {
      getProducts();
    })
    .catch((error) => {
      console.log(error);
    });
}

// Viết function updateProduct request API để update sản phẩm
function updateProduct(productId, product) {
  apiUpdateProduct(productId, product)
    .then(() => {
      getProducts();
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
            <td>
              <button
                class="btn btn-success"
                data-id="${product.id}"
                data-type="edit"
                data-toggle = modal
                data-target= "#myModal"
                >Edit
              </button>
              <button
                class="btn btn-danger"
                data-id="${product.id}"
                data-type="delete"
                >Delete
              </button>
            </td>
                  
        </tr>
        `
    );
  }, "");

  dom("#tblDanhSachSP").innerHTML = html;
}

function dom(selector) {
  return document.querySelector(selector);
}

function resetForm() {
  dom("#MaSP").value = "";
  dom("#TenSP").value = "";
  dom("#GiaSP").value = "";
  dom("#HinhSP").value = "";
  dom("#loaiSP").value = "";
}

// Thay đổi heading và footer của modal thông qua sự kiện nút Thêm mới
dom("#btnThemSP").addEventListener("click", () => {
  dom(".modal-title").innerHTML = "Thêm Sản phẩm";
  dom(".modal-footer").innerHTML = `
    <button class="btn btn-secondary" data-dismiss="modal">Hủy</button>
    <button class="btn btn-primary" data-type="add">Thêm</button>
  `;

  // reset form
  resetForm();
});

// Lắng nghe sự kiện click vào button Thêm/Update ở thẻ modal-footer
// Sự kiện (event) có 1 tính chất gọi là event bubbling
dom(".modal-footer").addEventListener("click", (evt) => {
  let elementalType = evt.target.getAttribute("data-type");

  // DOM các input để lấy dữ liệu
  let id = dom("#MaSP").value;
  let name = dom("#TenSP").value;
  let price = +dom("#GiaSP").value;
  let image = dom("#HinhSP").value;
  let type = dom("#loaiSP").value;

  // Tạo object product từ lớp đối tượng Product đã tạo
  let product = new Product(null, name, image, price, type);

  if (elementalType === "add") {
    addProduct(product);
  } else if (elementalType === "update") {
    updateProduct(id, product);
  }
});

// Lắng nghe sự kiện click của nút button Delete/Edit cho thẻ tbody
dom("#tblDanhSachSP").addEventListener("click", (evt) => {
  let id = evt.target.getAttribute("data-id");
  let elType = evt.target.getAttribute("data-type");
  if (elType === "delete") {
    deleteProduct(id);
  } else if (elType === "edit") {
    dom(".modal-title").innerHTML = "Cập Nhật Sản phẩm";
    dom(".modal-footer").innerHTML = `
        <button class="btn btn-secondary" data-dismiss="modal">Hủy</button>
        <button class="btn btn-primary" data-type="update">Cập Nhập</button>
      `;
  }

  // Ta cần lấy ra chi tiết của 1 sản phẩm bằng ID dựa vào call API
  apiGetProductById(id)
    .then((response) => {
      let product = response.data;
      dom("#MaSP").value = product.id; //Hidden Input
      dom("#TenSP").value = product.name;
      dom("#GiaSP").value = product.price;
      dom("#HinhSP").value = product.image;
      dom("#loaiSP").value = product.type;
    })
    .catch((error) => {
      console.log(error);
    });
});

// Láng nghe sự kiện keydown của input search
dom(".form-control").addEventListener("keydown", (evt) => {
  if (evt.key !== "Enter") return;

  getProducts(evt.target.value);
});
