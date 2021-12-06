import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import CursoAlumnoListado from './CursoAlumnoListado';

export default function CursoDetail(){
    const history = useHistory()
    const { id } = useParams()
    const [lista, setLista] = useState([])
    const [curso, setCurso] = useState({
        id: 1,
        nombre: 'Programación',
        desde: '01/03/2021',
        hasta: '28/06/2021',
    })

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/Cursos/${id}`)
                .then(response => setCurso(response.data))
                .catch(error => alert(error))
        }
    }, [])

    function handleOnChange(event, campo) {
        setCurso({
            ...curso,
            [campo]: event.target.value
        })
    }

    function guardar(event) {

        event.preventDefault()
        event.stopPropagation()
        if (id) {
            axios.put(`http://localhost:5000/cursos/${id}`, curso)
                .then(response => {
                    alert("se ha modificado el registro")
                    history.push("/cursos/")
                })
                .catch(error => alert(error))
        }
        else {
            axios.post("http://localhost:5000/cursos/", curso)
                .then(response => {
                    alert("se ha agregado el registro")
                    history.push("/cursos/")
                }).catch(error => alert(error))
        }
    }

    return(
        <>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item"><a href="#">Cursos</a></li>
                <li class="breadcrumb-item active" aria-current="page">{curso.nombre}</li>
            </ol>
        </nav>
        <div className="container card my-3">
            <div className="card-header row justify-content-between align-items-center">
                <h1 className="text-left col-md-4">{curso.nombre}</h1>
                <div className="col-4">
                    <button onClick={() => history.push("/cursos/")} className="btn btn-outline-secondary mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-card-list mr-1" viewBox="0 0 18 18">
                            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                            <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
                        </svg>
                        Volver al listado
                    </button>
                    <button type="submit" className="btn btn-outline-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil mr-1" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                        </svg>
                        Editar
                    </button>
                </div>
            </div>
            <div className="card-body">
                <div className="row mb-3">
                    <div className="col-3">
                        <label className="col-12 text-left">Profesor:</label>
                        <h5 className="col-12 text-left">Antonini, Santiago</h5>
                    </div>
                    <div className="col-3">
                        <label className="col-12 text-left">Profesor Auxiliar:</label>
                        <h5 className="col-12 text-left">Citera, Wenceslao</h5>
                    </div>
                    <div className="col-3">
                        <label className="col-12 text-left">Desde:</label>
                        <h5 className="col-12 text-left">01/03/2021</h5>
                    </div>
                    <div className="col-3">
                        <label className="col-12 text-left">Hasta:</label>
                        <h5 className="col-12 text-left">10/12/2021</h5>
                    </div>
                </div>
                <CursoAlumnoListado />
            </div>
        </div>
            
        </>
    )
}