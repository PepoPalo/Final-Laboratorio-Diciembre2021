import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
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
]

var cursos = [
    {
        id: 1,
        nombre: "Programación",
        profesor: {
            id: 1,
            nombre: "Santiago Antonini"
        }
    },
    {
        id: 2,
        nombre: "Higiene y Seguridad",
        profesor: {
            id: 2,
            nombre: "Wenceslao Citera"
        }
    },
]

export default function CursoAlumnoListado() {
    const [lista, setLista] = useState([])
    const [curso, setCurso] = useState({})
    const { id } = useParams()

    useEffect(() => {
      getAlumnos()
      setCurso(cursos[(id - 1)])
    }, [])
  
    function getAlumnos() {
    //   axios.get("http://localhost:5000/alumnos/")
    //     .then((response) => setLista(response.data))
    //     .catch((error) => alert(error))
        setLista(alumnos)
    }
  
  
    function borrar(imei) {
    //   axios.put(`http://localhost:5000/alumnos/baja/${imei}`)
    //     .then((response) => {
          alert("Registro borrado correctamente")
        //   getAlumnos()
        // })
        // .catch(error => alert(error))
    }


    return (
        <>
            <div className="bg-white card">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Cursos</a></li>
                        <li class="breadcrumb-item active" aria-current="page">{curso.nombre}</li>
                        <li class="breadcrumb-item active" aria-current="page">Alumnos</li>
                    </ol>
                </nav>
                <h1 className="card-header">{curso.nombre}</h1>
                <div>
                    <Link to="/cursos/" className="btn btn-primary m-3">Volver al listado</Link>
                </div>
                <table className="table">
                    <thead className=" table-secondary">
                        <tr>
                        <th scope="col">ID</th>
                        <th className="text-center" scope="col">Nombre</th>
                        <th className="text-center" scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.length > 0 && (
                            lista.map(alumno => (
                                <>
                                <tr key={alumno.imei}>
                                    <th scope="row">{alumno.id}</th>
                                    <td className="text-center">{alumno.nombre}</td>
                                    <td className="text-center">
                                        <Link className="btn btn-outline-primary" to={"/alumnos/" + alumno.id}>Detalle</Link> &nbsp;
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