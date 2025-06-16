function agregarTipoGestion(){
  //Obtenemos el valor ingresado por el usuario
var tipo_gestion = document.getElementById("txt_tipo_gestion").value;


//definir encabezados, especificamente en formato JSON
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

//define datos que se van a einviar
const raw = JSON.stringify({
  "nombre_tipo_gestion": tipo_gestion,
  "fecha_registro": "2025-04-28 15:14:00"
});

//Se configura la solicitud
const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

//Se ejecuta la solicitud (request)
fetch("http://144.126.136.43/api/tipo_gestion", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}