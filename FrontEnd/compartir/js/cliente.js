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

  fetch("http://144.126.196.43/api/cliente", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function listarClientes(){
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://144.126.136.43/api/cliente", requestOptions)
        .then((response) => response.json())
        .then((json) =>{
            json.forEach(completarFila);
        })
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}

function completarFila(element,index,arr){
    arr[index] = document.querySelector("#tbl_cliente tbody").innerHTML +=
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

function actualizarCliente(){
    var nombres = document.getElementById("txt_nombres").value;
    var apellidos = document.getElementById("txt_apellidos").value;
    var email = document.getElementById("txt_email").value;
    var celular = document.getElementById("txt_celular").value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
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

    fetch("http://144.126.136.43/api/cliente/"+g_id_cliente, requestOptions)
    .then((response) => {
        //Verificamos si nos entrega código 200
        if(response.status == 200){
            //alert('Actualizado');
            //Redireccionamos a la lista de clientes
            window.location.href = "listar.html";
        }
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function obtenerIdActualizacion(){
    //Obtenemos los parámetros desde la URL
    const queryString = window.location.search;
    //Extracción de datos desde la sección de parámetros
    const parametros = new URLSearchParams(queryString);
    //Extracción de id_cliente
    const p_id_cliente = parametros.get("id");
    g_id_cliente = p_id_cliente;
    //Obtenemos los datos desde API
    obtenerDatosActualizacion(p_id_cliente);
}

function obtenerDatosActualizacion(id_cliente){
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://144.126.136.43/api/cliente/"+id_cliente, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormulario))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function completarFormulario(element, index, arr) {
    //Nombre del elemento
    var nombresCliente = element.nombres;
    document.getElementById("txt_nombres").value = nombresCliente;
    var apellidosCliente = element.apellidos;
    document.getElementById("txt_apellidos").value = apellidosCliente;
    //Completar con los demás atributos del cliente
    var idCliente = element.id_cliente;
    document.getElementById("txt_id_cliente").value = idCliente;
    var dv = element.dv;
    document.getElementById("txt_dv").value = dv;
    var email = element.email;
    document.getElementById("txt_email").value = email;
    var celular = element.celular;
    document.getElementById("txt_celular").value = celular;
}

function obtenerIdEliminacion(){
    const queryString = window.location.search;
    const parametros = new URLSearchParams(queryString);
    const p_id_cliente = parametros.get("id");
    g_id_cliente = p_id_cliente;
    obtenerDatosEliminacion(p_id_cliente);
}

function obtenerDatosEliminacion(id_cliente){
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://144.126.136.43/api/cliente/"+id_cliente, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarNombreCliente))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function completarNombreCliente(element, index, arr) {
    var nombresCliente = element.nombres;
    var apellidosCliente = element.apellidos;
    document.getElementById("lbl_nombres_cliente").innerHTML = "<b>" + nombresCliente + " " + apellidosCliente + "</b>";
}

function eliminarCliente(){
    const requestOptions = {
        method: "DELETE",
        redirect: "follow"
    };

    fetch("http://144.126.136.43/api/cliente/"+g_id_cliente, requestOptions)
    .then((response) => {
        if(response.status == 200){
            window.location.href ="listar.html";
        }else{
            alert("No se puede eliminar. Registro es utilizado actualmente en otras tablas.")
        }
    })
}