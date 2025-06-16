function agregarResultado() {
  //obtener el valor ingresado por el usuario
  var resultado = document.getElementById("txt_resultado").value;

  //Definir encabezados, específicamente el formato JSON
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  //Se definen los datos a enviar
  const raw = JSON.stringify({
    "nombre_resultado": resultado,
    "fecha_registro": "2025-04-28 14:29:00"
  });

  //Se configura la solicitud
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  //Se ejecuta la solicitud (request)
  fetch("http://144.126.136.43/api/resultado", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}