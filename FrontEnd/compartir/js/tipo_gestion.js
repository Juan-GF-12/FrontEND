function agregarTipoGestion(){
var tipo_gestion = document.getElementById("txt_tipo_gestion").value;


const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "nombre_tipo_gestion": tipo_gestion,
  "fecha_registro": "2025-04-28 15:14:00"
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://144.126.136.43/api/tipo_gestion", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}