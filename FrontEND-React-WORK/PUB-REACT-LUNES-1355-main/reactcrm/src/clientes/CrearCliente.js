import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function CrearCliente(){
    const [id_cliente,setIdCliente] = useState("");
    const [dv,setDv] = useState("");
    const [nombres,setNombres] = useState("");
    const [ApellidoPaterno,setApellidoPaterno] = useState("");
    const [ApellidoMaterno,setApellidoMaterno] = useState("");
    const [email,setEmail] = useState("");
    const [celular,setCelular] = useState("");
    const [success, setSuccess] = useState(false); // <-- Agregado aquí
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const fecha_registro = new Date().toISOString().slice(0, 19).replace('T', ' ');
            await axios.post('http://144.126.136.43/api/cliente', {
                id_cliente,
                dv,
                nombres,
                ApellidoPaterno,
                ApellidoMaterno,
                email,
                celular,
                fecha_registro
            });
            setSuccess(true); // Mostrar mensaje de éxito
            setTimeout(() => {
                navigate("/clientes"); // Redirigir después de 2 segundos
            }, 2000);
        }catch(error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <h1>Crear Cliente</h1>
            <hr></hr>
            {success && (
                <div className="alert alert-success" role="alert">
                    Cliente creado exitosamente. Redirigiendo...
                </div>
            )}
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Rut</label>
                    <input type="number" className="form-control" value={id_cliente} onChange={(e) => setIdCliente(e.target.value)} placeholder="Ingrese su RUT"></input>
                </div>
                <div className="form-group">
                    <label>Dv</label>
                    <input type="number" className="form-control" value={dv} onChange={(e) => setDv(e.target.value)} placeholder="Ingrese digido verificador"></input>
                </div>
                <div className="form-group">
                    <label>Nombres</label>
                    <input type="text" className="form-control" value={nombres} onChange={(e) => setNombres(e.target.value)} placeholder="Ingrese sus nombres"></input>
                </div>
                <div className="form-group">
                    <label>Apellido paterno</label>
                    <input type="text" className="form-control" value={ApellidoPaterno} onChange={(e) => setApellidoPaterno(e.target.value)} placeholder="Ingrese apellido paterno"></input>
                </div>
                <div className="form-group">
                    <label>Apellido materno</label>
                    <input type="text" className="form-control" value={ApellidoMaterno} onChange={(e) => setApellidoMaterno(e.target.value)} placeholder="Ingrese apellido materno"></input>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="EjemploEmail@Ejemplo.com"></input>
                </div>
                <div className="form-group">
                    <label>Celular</label>
                    <input type="number" className="form-control" value={celular} onChange={(e) => setCelular(e.target.value)} placeholder="Ingrese su numero telefonico" ></input>
                </div>
                <button type="submit" className="btn btn-primary">Crear Cliente</button>
            </form>
        </div>
    );
}
export default CrearCliente;
