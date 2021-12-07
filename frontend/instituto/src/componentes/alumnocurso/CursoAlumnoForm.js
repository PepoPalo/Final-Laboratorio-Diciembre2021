import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from 'axios';

export default function CursoAlumnoForm() {
    const { id } = useParams();
    const [alumnoCurso, setAlumnoCurso] = useState({
        curso_id: id,
        alumno_id: null,
    });
    const [curso, setCurso] = useState({});
    const [alumnos, setAlumnos] = useState([])
    const history = useHistory();

    useEffect(() => {
        GetAlumnos();
    }, [])

    function GetAlumnos() {
        axios.get(`http://localhost:5000/Alumnos/`)
            .then(response => setAlumnos(response.data))
            .catch(error => alert(error))
        if (id) {
            axios.get(`http://localhost:5000/Cursos/${id}`)
            .then(response => setCurso(response.data))
            .catch(error => alert(error))
        }
    }

    function guardar(event) {
        event.preventDefault()
        event.stopPropagation()

        axios.post("http://localhost:5000/AlumnoMateria/", alumnoCurso)
            .then(response => {
                alert("Inscripto con éxito!!!")
                history.push(`/cursos/${id}`)
            }).catch(error => alert("No se eligió el alumno"))
    }

    function handleOnChange(event, campo) {
        setAlumnoCurso({
            ...alumnoCurso,
            [campo]: event.target.value
        })
    }

    return(
        <>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item"><Link to="/cursos/">Cursos</Link></li>
                <li class="breadcrumb-item active" aria-current="page">{curso.nombre}</li>
                <li class="breadcrumb-item active" aria-current="page">Inscripción</li>
            </ol>
        </nav>
        <div className="container card my-3">
            <div className="card-body">
                <form onSubmit={(event) => guardar(event)}>
                    <div className="row justify-content-center">
                        <div className="col-3">
                            <label className="col-12 text-left">Alumno:  <small class="text-muted">(requerido)</small></label>
                            <select 
                                key={0} 
                                value={alumnoCurso.alumno_id} 
                                className="form-control" 
                                aria-label=".form-select-lg example" 
                                onChange={(event) => {handleOnChange(event, 'alumno_id') }}>
                                    <option key={-1} value="">Seleccione una opción</option>
                                    {alumnos.map(item => (
                                        <option key={item.id} value={item.id}>{item.nombre}</option>
                                        ))
                                    }
                            </select>
                        </div>
                    </div>
                    <div className="row ml-2 mt-4 justify-content-center">
                        <button onClick={() => history.push("/cursos/")} className="btn btn-outline-secondary mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-card-list mr-1" viewBox="0 0 18 18">
                                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                                <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
                            </svg>
                            Volver al listado
                        </button>
                        {id && (
                            <>
                            <button onClick={() => history.push(`/cursos/${id}`)} className="btn btn-outline-danger mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-card-list mr-1" viewBox="0 0 18 18">
                                <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                                </svg>
                                Cancelar
                            </button>
                            </>
                        )}
                        <button type="submit" className="btn btn-outline-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil mr-1" viewBox="0 0 16 16">
                            <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
                            </svg>
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
            
        </>
    )
}