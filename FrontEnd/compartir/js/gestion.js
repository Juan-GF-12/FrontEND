function agregarCliente() {
  var id_cliente = document.getElementById("txt_id_cliente").value;
  var dv = document.getElementById("txt_dv").value;
  var nombres = document.getElementById("txt_nombres").value;
  var apellidos = document.getElementById("txt_apellidos").value;
  var email = document.getElementById("txt_email").value;
  var celular = document.getElementById("txt_celular").value;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "id_cliente": id_cliente,
    "dv": dv,
    "nombres": nombres,
    "apellidos": apellidos,
    "email": email,
    "celular": celular,
    "fecha_registro": "2025-05-26 14:01:00"
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://144.126.136.43/api/cliente", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function listarClientes() {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://144.126.136.43/api/cliente", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
    })
    .catch((error) => console.error(error));
}

function completarFila(element) {
  document.querySelector("#tbl_cliente tbody").innerHTML +=
    `<tr>
      <td>${element.id_cliente}-${element.dv}</td>
      <td>${element.nombres}</td>
      <td>${element.apellidos}</td>
      <td>${element.email}</td>
      <td>${element.celular}</td>
      <td>${element.fecha_registro}</td>
      <td>
        <a href='actualizar.html?id=${element.id_cliente}' class='btn btn-warning btn-sm'>Actualizar</a>
        <a href='eliminar.html?id=${element.id_cliente}' class='btn btn-danger btn-sm'>Eliminar</a>
      </td>
    </tr>`;
}

function actualizarCliente() {
  var id_cliente = document.getElementById("txt_id_cliente").value;
  var dv = document.getElementById("txt_dv").value;
  var nombres = document.getElementById("txt_nombres").value;
  var apellidos = document.getElementById("txt_apellidos").value;
  var email = document.getElementById("txt_email").value;
  var celular = document.getElementById("txt_celular").value;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "id_cliente": id_cliente,
    "dv": dv,
    "nombres": nombres,
    "apellidos": apellidos,
    "email": email,
    "celular": celular
  });

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://144.126.136.43/api/cliente/" + id_cliente, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function obtenerIdActualizacion() {
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_cliente = parametros.get("id");
  obtenerDatosActualizacion(p_id_cliente);
}

function obtenerDatosActualizacion(id_cliente) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://144.126.136.43/api/cliente/" + id_cliente, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormulario))
    .catch((error) => console.error(error));
}

function completarFormulario(element) {
  document.getElementById("txt_id_cliente").value = element.id_cliente;
  document.getElementById("txt_dv").value = element.dv;
  document.getElementById("txt_nombres").value = element.nombres;
  document.getElementById("txt_apellidos").value = element.apellidos;
  document.getElementById("txt_email").value = element.email;
  document.getElementById("txt_celular").value = element.celular;
}
en el apartado de gestionar hay un mensaje qe dice que un cliente no se puede eliminar, con budstrap hay que hacer que diga ese mensaje pero bonito
