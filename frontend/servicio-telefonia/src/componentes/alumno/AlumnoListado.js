import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

var alumnos =[
    {
        id: 1,
        nombre: "Pedro Palomino",
    },
    {
        id: 2,
        nombre: "Milagros Pavón",
    },
    {
        id: 3,
        nombre: "Josué Main",
    }
]

export default function AlumnoListado() {
    const [lista, setLista] = useState([])

    useEffect(() => {
      getAlumnos()
    }, [ ])
  
    function getAlumnos() {
      axios.get("http://localhost:5000/Alumnos/")
        .then((response) => setLista(response.data))
        .catch((error) => alert(error))
     //   setLista(alumnos)
    }
  
  
    function borrar(id) {
      axios.put(`http://localhost:5000/Alumnos/baja/${id}`)
        .then((response) => {
          alert("Registro borrado correctamente")
          getAlumnos()
        })
        .catch(error => alert(error))
        
    }


    return (
        <>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item active" aria-current="page">Alumnos</li>
            </ol>
        </nav>
        <div className="container card my-3">
            <div className="card-header row justify-content-between">
                <h1 className="col-md-3">
                    Alumnos
                </h1>
                <Link to="/alumnos/crear" className="btn btn-outline-dark text-center align-middle btn-sm ml-5 my-3 col-md-1">
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
                        <th className="justify-content-start" scope="col">Libreta Estudiantil</th>
                        <th className="text-center" scope="col">Alumno</th>
                        <th className="text-center" scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.length > 0 && (
                            lista.map(alumno => (
                                <>
                                <tr key={alumno.id}>
                                    <th >{alumno.id}</th>
                                    <td className="text-center">{alumno.nombre}</td>
                                    <td className="text-center">
                                        <Link className="btn btn-outline-primary" to={"/alumnos/" + alumno.id}>DETALLE</Link> &nbsp;
                                        <button className="btn btn-outline-danger mr-2" onClick={() => borrar(alumno.id)}>Dar Baja</button>
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