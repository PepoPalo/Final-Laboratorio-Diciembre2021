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
    //   axios.get("http://localhost:5000/alumnos/")
    //     .then((response) => setLista(response.data))
    //     .catch((error) => alert(error))
        setLista(alumnos)
    }
  
  
    function borrar(id) {
    //   axios.put(`http://localhost:5000/alumnos/baja/${id}`)
    //     .then((response) => {
    //       alert("Registro borrado correctamente")
    //       getAlumnos()
    //     })
    //     .catch(error => alert(error))
        alert("Borro un alumno")
    }


    return (
        <>
            <div className="bg-white row">
                <nav className="col-md-12 px-0 mb-0" aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item active" aria-current="page">Alumnos</li>
                    </ol>
                </nav>
                <h1 className="card-header col-md-12">
                    Alumnos
                    <Link to="/alumnos/crear" className="btn btn-outline-dark btn-sm ml-5 col-md-1">Crear</Link>
                </h1>
            </div>
            <div className="bg-white row">
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
                                        <Link className="btn btn-outline-primary" to={"/alumnos/" + alumno.id}>Editar</Link> &nbsp;
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
        </>
    )
}