import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

var cursos = [
    {
        id: 1,
        nombre: "Programación",
        desde: "12/01/2021",
        hasta: "28/06/2022"
    },
    {
        id: 2,
        nombre: "Higiene y Seguridad",
        desde: "02/02/2022",
        hasta: "28/11/2022"
    }
]

export default function CursoListado() {
    const [lista, setLista] = useState([])
    useEffect(() => {
      getCursos()
    }, [])
  
    function getCursos() {
    //   axios.get("http://localhost:5000/cursos/")
    //     .then((response) => setLista(response.data))
    //     .catch((error) => alert(error))
        setLista(cursos)
    }
  
  
    function borrar(imei) {
    //   axios.put(`http://localhost:5000/cursos/baja/${imei}`)
    //     .then((response) => {
          alert("Registro borrado correctamente")
        //   getCursos()
        // })
        // .catch(error => alert(error))
    }


    return (
        <>
            <div className="bg-white row">
                <nav className="col-md-12 px-0 mb-0" aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item active" aria-current="page">Cursos</li>
                    </ol>
                </nav>
                <h1 className="card-header col-md-12">
                    Cursos
                    <Link to="/cursos/nuevo" className="btn btn-outline-dark btn-sm ml-5 col-md-1">Crear</Link>
                </h1>
            </div>
            <div className="bg-white row">
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
                                    <td className="text-center">{curso.desde}</td>
                                    <td className="text-center">{curso.hasta}</td>
                                    <td className="text-center">
                                        <Link className="btn btn-outline-primary" to={"/cursos/" + curso.id}>Editar</Link> &nbsp;
                                        <Link className="btn btn-outline-primary" to={"/cursos/" + curso.id + "/alumnos/"}>Alumnos</Link> &nbsp;
                                        <Link className="btn btn-outline-primary" to={"/profesores/" + curso.id + "/profesores/"}>Profesores</Link> &nbsp;
                                        <button className="btn btn-outline-danger mr-2" onClick={() => borrar(curso.imei)}>Dar Baja</button>
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