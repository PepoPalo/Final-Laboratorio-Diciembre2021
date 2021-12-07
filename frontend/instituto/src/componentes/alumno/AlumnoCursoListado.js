import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from "react-router-dom";
import axios from 'axios';

export default function AlumnoCursoListado() {
    const [lista, setLista] = useState([])
    const { id } = useParams()
    const history = useHistory()

    useEffect(() => {
      getCursos()
    }, [])
  
    function getCursos() {
      axios.get(`http://localhost:5000/Cursos/buscar/cursoalumno/${id}`)
        .then((response) => setLista(response.data))
        .catch()
    }
  
  
    function borrar(id_curso) {
      axios.put(`http://localhost:5000/AlumnoMateria/baja/alumno/${id}/${id_curso}`)
        .then((response) => {
            alert("Dado de baja del curso")
            history.push(`/alumnos/${id}`)
        })
        .catch(error => alert("No se pudo dar de baja"))
    }


    return (
        <>
            <div className="bg-white card">
                <table className="table">
                    <thead>
                        <tr className="table-active">
                            <th><h3>Cursos</h3></th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th><Link to={"/alumnos/" + id + "/inscribir"} className="btn btn-outline-dark btn-sm ml-5 my-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 20 20">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                                Inscribir a curso</Link></th>
                        </tr>
                    </thead>
                    <thead className=" table-secondary">
                        <tr>
                            <th scope="col">ID</th>
                            <th className="text-center" scope="col">Nombre</th>
                            <th className="text-center" scope="col">&nbsp;</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.length > 0 && (
                            lista.map(curso => (
                                <>
                                <tr key={curso.id}>
                                    <th scope="row">{curso.id}</th>
                                    <td className="text-center">{curso.nombre}</td>
                                    <td>&nbsp;</td>
                                    <td className="text-center">
                                        <Link to={"/alumnos/"+id+"/asistencia/"+curso.id} className="btn btn-outline-secondary mr-2">Asistencia</Link>
                                        <button className="btn btn-outline-danger mr-2" onClick={() => borrar(curso.id)}>Dar Baja</button>
                                    </td>
                                </tr>
                                
                            </>))
                        )}
                        {lista.length === 0 && (
                            <tr>
                            <td colSpan="3">
                                <h2>No hay cursos</h2>
                            </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
        </>
    )
}