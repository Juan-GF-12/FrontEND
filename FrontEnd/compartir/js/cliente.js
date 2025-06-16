var g_id_cliente = ""
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
    "fecha_registro": "2025-05-12 15:00:00"
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  // Corrección: Tu URL tenía .136.43, la del profesor en la captura 1 es .196.43
  fetch("http://144.126.196.43/api/cliente", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

// Corrección: Tu función se llamaba listarCliente, la del profesor es listarClientes (plural)
function listarClientes() {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  // Corrección: Tu URL tenía .136.43, la del profesor en la captura 2 es .196.43
  fetch("http://144.126.196.43/api/cliente", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
} // Nota: El cierre de esta función estaba al final de completarFila en tu código. Se movió aquí.

function completarFila(element, index, arr) {
  // Corrección: El profesor usa document.querySelector("#tbl_cliente tbody").innerHTML
  // y no asigna a arr[index]. Tu código tenía "#tbl_clientes".
  var row = document.querySelector("#tbl_cliente tbody").innerHTML +=
    `<tr>
      <td>${element.id_cliente}</td> <td>${element.nombres}</td> <td>${element.apellidos}</td> <td>${element.email}</td>
      <td>${element.celular}</td>
      <td>${element.fecha_registro}</td> <td>
        <a href='actualizar.html?id=${element.id_cliente}' class='btn btn-warning btn-sm'>Actualizar</a>
        <a href='eliminar.html?id=${element.id_cliente}' class='btn btn-danger btn-sm'>Eliminar</a>
      </td>
    </tr>`;
}

// Funciones de actualización y obtención de datos del cliente (del profesor)
function actualizarCliente() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "email": "mallo@gmail.com" 
  });

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  // Corrección: URL del profesor con .196.43 y un ID específico para el PATCH
  fetch("http://144.126.196.43/api/cliente/"+g_id_cliente, requestOptions)
    .then(response => {
      //Verificamos si nos entrega codigo 200
      if (response.status == 200){
        //alert("Actulizado");
        //Redireccionamos a la lista de clientes
        window.location.href = "listas.html"
      }
    }
  )
    .then(result => console.log(result))
    .catch(error => console.error(error));
}

function obtenerIdEliminacion() {
 
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_cliente = parametros.get("id");
  obtenerDatosActualizacion(p_id_cliente);
}
function obtenerDatosEliminacion(id_cliente) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
}

function obtenerIdActualizacion() {
  //Obtenemos los parámetros desde la URL
  const queryString = window.location.search;
  //Extracción de datos desde la sección de parámetros
  const parametros = new URLSearchParams(queryString);
  //Extracción de id_cliente
  const p_id_cliente = parametros.get("id");
  //Obtenemos los datos desde API
  obtenerDatosActualizacion(p_id_cliente);
}

function obtenerDatosActualizacion(id_cliente) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://144.126.196.43/api/cliente/" + id_cliente, requestOptions)
    .then((response => response.json()))
    .then((json) => json.forEach(completarNombreCliente))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function completarFormulario(element, index, arr) {
  var nombresCliente = element.nombres;
  document.getElementById("txt_nombres").value = nombresCliente;
  var apellidosCliente = element.apellidos;
  document.getElementById("txt_apellidos").value = apellidosCliente;
}