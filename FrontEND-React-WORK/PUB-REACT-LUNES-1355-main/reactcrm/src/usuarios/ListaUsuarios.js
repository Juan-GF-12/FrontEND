import React , {useEffect,useState} from "react";
import axios from "axios";
function ListaUsuarios(){
    const [usuarios,setUsuarios] = useState([]);

    useEffect(() => {
        const fetchUsuarios  = async () => {
            try {
                const response = await axios.get('http://144.126.136.43/api/usuario');
                setUsuarios(response.data);
            }catch(error) {
                console.log(error);
            }
        };
        fetchUsuarios();

    },[]);
    return (
        <div className="container">
            <h1>Lista de Usuarios</h1>
            <hr></hr>
            <table className="table">
                <thead>
                    <th>ID USUARIO</th>
                    <th>NOMBRES</th>
                    <th>APELLIDOS</th>
                    <th>EMAIL</th>
                    <th>CELULAR</th>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr>
                            <td>{usuario.id_usuario}</td>
                            <td>{usuario.nombres}</td>
                            <td>{usuario.apellidos}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.celular}</td>
                        </tr>))}
                </tbody>
            </table>
        </div>
    );
}
export default ListaUsuarios;