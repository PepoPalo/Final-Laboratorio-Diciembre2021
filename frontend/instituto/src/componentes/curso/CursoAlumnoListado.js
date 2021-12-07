import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

export default function CursoAlumnoListado() {
    const [lista, setLista] = useState([])
    const { id } = useParams()

    useEffect(() => {
      getAlumnos()
    }, [])
  
    function getAlumnos() {
      axios.get(`http://localhost:5000/Alumnos/buscar/${id}`)
        .then((response) => setLista(response.data))
        .catch()
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
                <table className="table">
                    <thead>
                        <tr className="table-active">
                            <th className="align-middle"><h3>Alumnos</h3></th>
                            <th></th>
                            <th>&nbsp;</th>
                            <th><Link to={"/cursos/" + id + "/inscribir"} className="btn btn-outline-dark btn-sm ml-5 my-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 20 20">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                                Inscribir alumno</Link><h6>Inscriptos: {lista.length}</h6></th>
                        </tr>
                    </thead>
                    <thead className=" table-secondary">
                        <tr>
                            <th scope="col">ID</th>
                            <th className="text-center" scope="col">Nombre</th>
                            <th className="text-center" scope="col"></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.length > 0 && (
                            lista.map(alumno => (
                                <>
                                <tr key={alumno.imei}>
                                    <th scope="row">{alumno.id}</th>
                                    <td className="text-center">{alumno.nombre}</td>
                                    <td></td>
                                    <td className="text-center">
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