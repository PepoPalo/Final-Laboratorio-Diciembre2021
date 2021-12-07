import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

export default function CursoListado() {
    const [lista, setLista] = useState([])
    useEffect(() => {
      getCursos()
    }, [])
  
    function getCursos() {
      axios.get("http://localhost:5000/Cursos/")
        .then((response) => setLista(response.data))
        .catch((error) => alert(error))
        // setLista(cursos)
    }
  
  
    function borrar(id) {
      axios.put(`http://localhost:5000/Cursos/baja/${id}`)
        .then((response) => {
          alert("Registro borrado correctamente")
          getCursos()
        })
        .catch(error => alert(error))
    }


    return (
        <>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item active" aria-current="page">Cursos</li>
            </ol>
        </nav>
        <div className="container card my-3">
            <div className="card-header row justify-content-between">
                <h1 className="col-md-2">
                    Cursos
                </h1>
                <Link to="/cursos/create" className="btn btn-outline-dark text-center align-middle btn-sm ml-5 my-3 col-md-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 20 20">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                    Crear</Link>
            </div>
            <div className="bg-white card-body p-0 row">
                <table className="table">
                    <thead className="table-secondary">
                        <tr>
                        <th scope="col">ID</th>
                        <th className="text-center" scope="col">Nombre</th>
                        <th className="text-center" scope="col">Desde</th>
                        <th className="text-center" scope="col">Hasta</th>
                        <th className="text-center" scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.length > 0 && (
                            lista.map(curso => (
                                <>
                                <tr key={curso.imei}>
                                    <th scope="row">{curso.id}</th>
                                    <td className="text-center">{curso.nombre}</td>
                                    <td className="text-center">{curso.fecha_ini}</td>
                                    <td className="text-center">{curso.fecha_fin}</td>
                                    <td className="text-center">
                                        <Link className="btn btn-outline-primary" to={"/cursos/" + curso.id}>DETALLE</Link> &nbsp;
                                        <Link className="btn btn-outline-primary mr-2" to={"/cursos/" + curso.id + "/alumnos"}>Alumnos</Link>
                                        <button className="btn btn-outline-danger mr-2" onClick={() => borrar(curso.id)}>Dar Baja</button>
                                    </td>
                                </tr>
                                
                            </>))
                        )}
                        {lista.length === 0 && (
                            <tr>
                            <td colSpan="3">
                                <h2>No hay datos</h2>
                            </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}