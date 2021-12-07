import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

export default function CursoAlumnoListado() {
    const { id } = useParams()
    const [lista, setLista] = useState([])
    const [curso, setCurso] = useState({})
    const [asistencia, setAsistencia] = useState({
        alumno_id: null,
        curso_id: id,
        fecha: new Date().toISOString().slice(0, 10),
        presente: true
    })

    useEffect(() => {
      getAlumnos()
    }, [])
  
    function getAlumnos() {
        axios.get(`http://localhost:5000/Alumnos/buscar/${id}`)
            .then((response) => setLista(response.data))
            .catch()
        axios.get(`http://localhost:5000/Cursos/${id}`)
            .then((response) => setCurso(response.data))
            .catch()
    }
  
  
    function borrar(id) {
    //   axios.put(`http://localhost:5000/alumnos/baja/${imei}`)
    //     .then((response) => {
          alert("Registro borrado correctamente")
        //   getAlumnos()
        // })
        // .catch(error => alert(error))
    }

    function asistio(id) {
        setAsistencia({
            ...asistencia,
            alumno_id: id,
        })
        axios.post(`http://localhost:5000/Asistencias/`, asistencia)
            .then((response) => {
              alert("Asistencia registrada!!")
            })
            .catch((error) => alert("Ya se registró la asistencia de este alumno"))
            .finally(() => {
                var btnasistir = document.getElementById("asistir_"+id)
                btnasistir.setAttribute("disabled", "")
            })
        
    }


    return (
        <>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item"><Link to="/cursos/">Cursos</Link></li>
                <li class="breadcrumb-item active" aria-current="page">{curso.nombre}</li>
                <li class="breadcrumb-item active" aria-current="page">Alumnos</li>
            </ol>
        </nav>
        <div className="container card my-3">
            <div className="card-header row justify-content-between align-items-center">
                <h1 className="text-left col-md-4">{curso.nombre}</h1>
                <div className="col-4">
                    <Link to="/cursos/" className="btn btn-outline-secondary mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-card-list mr-1" viewBox="0 0 18 18">
                            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                            <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
                        </svg>
                        Volver al listado
                    </Link>
                    <Link to={"/cursos/"+id+"/edit"} className="btn btn-outline-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil mr-1" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                        </svg>
                        Editar
                    </Link>
                </div>
            </div>
            <div className="bg-white card-body">
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
                                    <td className="text-right">
                                        <button className="btn btn-outline-success mr-4" id={"asistir_"+alumno.id} onClick={() => asistio(alumno.id)}>Asistió</button>
                                        <button className="btn btn-outline-danger mr-2" onClick={() => borrar(alumno.id)}>Baja del curso</button>
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