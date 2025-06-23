function listarGestiones() {
    console.log("Iniciando listarGestiones...");
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "query": "select ges.id_gestion, CONCAT(cli.nombres,' ',cli.apellidos) as nombre_cliente, CONCAT(usu.nombres,' ',usu.apellidos) as nombre_usuario, ges.nombre_resultado, ges.nombre_tipo_gestion, ges.comentarios, ges.fecha_registro from gestion ges join cliente cli on ges.id_cliente = cli.id_cliente join usuario usu on ges.id_usuario = usu.id_usuario"
    });

    console.log("Query enviada:", raw);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    // Limpiar la tabla antes
    document.querySelector("#tbl_gestion tbody").innerHTML = "";

    fetch("http://144.126.136.43/dynamic", requestOptions)
    .then((response) => {
        console.log("Status de respuesta:", response.status);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((json) => {
        console.log("Respuesta del servidor:", json);
        
        // Verificar si la respuesta es un array
        if (Array.isArray(json)) {
            json.forEach(completarFila);
            new DataTable('#tbl_gestion');
            console.log("Tabla creada exitosamente");
        } else {
            console.error("La respuesta no es un array:", json);
            alert("Error: La respuesta del servidor no es válida");
        }
    })
    .catch((error) => {
        console.error('Error completo:', error);
        alert('Error al cargar los datos: ' + error.message);
    });
}

function completarFila(element, index, arr) {
    console.log("Completando fila con elemento:", element);
    
    document.querySelector("#tbl_gestion tbody").innerHTML +=
    `<tr>
        <td>${element.id_gestion}</td>
        <td>${element.nombre_cliente}</td>
        <td>${element.nombre_usuario}</td>
        <td>${element.nombre_resultado}</td>
        <td>${element.nombre_tipo_gestion}</td>
        <td>${element.comentarios}</td>
        <td>${element.fecha_registro}</td>
        <td>
            <a href='actualizar.html?id=${element.id_gestion}' class='btn btn-warning btn-sm me-1'>
                Actualizar
            </a>
            <a href='eliminar.html?id=${element.id_gestion}' class='btn btn-danger btn-sm'>
                Eliminar
            </a>
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
