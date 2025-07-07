import React, { useEffect, useState } from "react";
import axios from "axios";

function ListaGestiones() {
  const [gestiones, setGestiones] = useState([]);
  
  useEffect(() => {
    obtenerGestiones();
  }, []);

  const obtenerGestiones = async () => {
    try {
      const query = `SELECT g.id_gestion as id,c.id_cliente,CONCAT(c.nombres,' ',c.apellidos) as clientes,
        u.username,r.nombre_resultado,tg.nombre_tipo_gestion,g.fecha_registro,g.comentarios
        FROM gestion g,tipo_gestion tg,usuario u , resultado r,cliente c
        where 
        g.id_cliente=c.id_cliente and
        g.id_usuario = u.id_usuario and
        g.id_resultado=r.id_resultado and
        g.id_tipo_gestion = tg.id_tipo_gestion`;
      
      const response = await axios.post('http://144.126.136.43/dynamic', {
        query
      });

      setGestiones(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Gestiones</h1>
      <hr></hr>
      <table className="table">
        <thead>
          <tr>
            <th>ID Cliente</th>
            <th>Cliente</th>
            <th>Usuario</th>
            <th>Resultado</th>
            <th>Tipo Gestión</th>
            <th>Fecha Registro</th>
            <th>Comentarios</th>
          </tr>
        </thead>
        <tbody>
        {gestiones.map((gestion) => (
            <tr key={gestion.id}>
              <td>{gestion.id_cliente}</td>
              <td>{gestion.clientes}</td>
              <td>{gestion.username}</td>
              <td>{gestion.nombre_resultado}</td>
              <td>{gestion.nombre_tipo_gestion}</td>
              <td>{gestion.fecha_registro}</td>
              <td>{gestion.comentarios}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaGestiones;
