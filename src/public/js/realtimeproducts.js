const socket = io();

socket.on("realtimeproducts", (data) => {
  const productId = document.getElementById("product_id");
  productId.innerHTML = "";
  let contenidoHTML = "";

  data.forEach((item) => {
    contenidoHTML += `<div class="col-md-3">
        <div class="card text-center">
          <img
            src="${item.thumbnails[0]}"
            class="img-fluid"
            alt="${item.title}"
          />
          <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">$${item.price}</p>
          </div>
        </div>
      </div>`;

    agregarItemEliminarProducto(item);
  });

  contenidoHTML += "</ul>";
  document.getElementById("content").innerHTML = contenidoHTML;
});

const agregarProducto = () => {
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const code = document.getElementById("code");
  const price = document.getElementById("price");
  const category = document.getElementById("category");
  const image = document.getElementById("image");
  const product = {
    title: title.value,
    description: description.value,
    code: code.value,
    price: price.value,
    category: category.value,
    image: image.value,
  };
  socket.emit("nuevoProducto", product);
  title.value = "";
  description.value = "";
  code.value = "";
  price.value = "";
  category.value = "";
  image.value = "";
  document.getElementById(
    "producto_agregado"
  ).innerHTML = `<div class="alert alert-success" role="alert">
  Producto agregado con éxito!
</div>`;
};

const agregarItemEliminarProducto = (item) => {
  const productId = document.getElementById("product_id");
  let option = document.createElement("option");
  option.value = item._id;
  option.innerHTML = "Producto: " + item.title;
  productId.appendChild(option);
};

const eliminarProducto = () => {
  const product_id = document.getElementById("product_id").value;
  socket.emit("eliminarProducto", product_id);

  document.getElementById(
    "producto_eliminado"
  ).innerHTML = `<div class="alert alert-success" role="alert">
  Producto eliminado con éxito!
</div>`;
};
