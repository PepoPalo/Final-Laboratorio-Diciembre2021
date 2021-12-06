import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProfesorDetail(){
    const history = useHistory()
    const { id } = useParams()
    const [lista, setLista] = useState([])
    const [profesor, setProfesor] = useState({
        id: 1,
        nombre: 'Santiago Antonini',
        desde: '01/03/2021',
        hasta: '28/06/2021',
    })

    useEffect(() => {
        // if (id) {
        //     axios.get(`http://localhost:5000/profesores/${id}`)
        //         .then(response => setProfesor(response.data))
        //         .catch(error => alert(error))
        // }
    }, [])

    function handleOnChange(event, campo) {
        setProfesor({
            ...profesor,
            [campo]: event.target.value
        })
    }

    function guardar(event) {

        event.preventDefault()
        event.stopPropagation()
        if (id) {
            axios.put(`http://localhost:5000/profesores/${id}`, profesor)
                .then(response => {
                    alert("se ha modificado el registro")
                    history.push("/profesores/")
                })
                .catch(error => alert(error))
        }
        else {
            axios.post("http://localhost:5000/profesores/", profesor)
                .then(response => {
                    alert("se ha agregado el registro")
                    history.push("/profesores/")
                }).catch(error => alert(error))
        }
    }

    return(
        <>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item"><a href="#">Profesores</a></li>
                <li class="breadcrumb-item active" aria-current="page">{profesor.nombre}</li>
            </ol>
        </nav>
        <div className="container card my-3">
            <div className="card-header row justify-content-between align-items-center">
                <h1 className="text-left col-md-4">{profesor.nombre}</h1>
                <div className="col-4">
                    <button onClick={() => history.push("/profesores/")} className="btn btn-outline-secondary mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-card-list mr-1" viewBox="0 0 18 18">
                            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                            <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
                        </svg>
                        Volver al listado
                    </button>
                    <Link to={"./" + profesor.id + "/edit"} className="btn btn-outline-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil mr-1" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                        </svg>
                        Editar
                    </Link>
                </div>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-3">
                        <label className="col-12 text-left">Título:</label>
                        <h5 className="col-12 text-left">Zapatero Profesional</h5>
                    </div>
                    <div className="col-5">
                        <label className="col-12 text-left">Dirección:</label>
                        <h5 className="col-12 text-left">25 de Mayo 280, Paraná, Entre Ríos</h5>
                    </div>
                </div>
                <table className="table mt-3">
                    <thead>
                        <tr className="table-active">
                            <th><h3>Cursos</h3></th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <thead className="table-secondary">
                        <tr>
                            <th className="pl-0" scope="col">ID</th>
                            <th className="text-center" scope="col">Nombre</th>
                            <th className="text-center" scope="col">Desde</th>
                            <th>Hasta</th>
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
                                    <td>{curso.desde}</td>
                                    <td>{curso.hasta}</td>
                                    <td className="text-center">
                                        <button className="btn btn-outline-danger mr-2" onClick={alert("Borrando")}>Dar Baja</button>
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