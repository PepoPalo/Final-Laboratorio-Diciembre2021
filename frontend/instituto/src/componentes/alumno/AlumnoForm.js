import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from 'axios';

export default function AlumnoForm() {
    const [alumno, setAlumno] = useState({
        id: null,
        nombre: null,
        direccion: null,
        edad: null,
        sexo: null,
    });
    const sexos = [
        "M",
        "F",
    ]
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        GetAlumno();
    }, [])

    function GetAlumno() {
        if (id) {
            axios.get(`http://localhost:5000/Alumnos/${id}`)
                .then(response => setAlumno(response.data))
                .catch(error => alert(error))
        }
    }

    function guardar(event) {
        event.preventDefault()
        event.stopPropagation()

        if (id) {
            axios.put(`http://localhost:5000/Alumnos/${id}`, alumno)
                .then(response => {
                    alert("Se editó a " + alumno.nombre)
                    history.push(`/alumnos/${id}`)
                })
                .catch(error => alert(error))
        }
        else {
            axios.post("http://localhost:5000/Alumnos/", alumno)
                .then(response => {
                    alert("Nuevo alumno/a agregado!!!!!!!!")
                    console.log(response.data)
                    history.push(`/alumnos/${id}`)
                }).catch(error => alert("Hay campos sin completar!!!!!!!!"))
        }
    }

    function handleOnChange(event, campo) {
        setAlumno({
            ...alumno,
            [campo]: event.target.value
        })
    }

    return(
        <>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item"><Link to="/alumnos/">Alumnos</Link></li>
                {id && <li class="breadcrumb-item active" aria-current="page">{alumno.nombre}(Editando)</li>}
                {!id && <li class="breadcrumb-item active" aria-current="page">Nuevo</li>}
            </ol>
        </nav>
        <div className="container card my-3">
            <div className="card-body">
                <form onSubmit={(event) => guardar(event)}>
                    <div className="row justify-content-center">
                        <div className="col-5">
                            <label className="col-12 text-left" htmlFor="id_nombre">Nombre:  <small class="text-muted">(requerido)</small></label>
                            <input type="text" id="id_nombre" className="form-control mb-3 col-12"
                            value={alumno.nombre} onChange={(event) => handleOnChange(event, 'nombre')} 
                            placeholder="Nombre"/>
                            
                        </div>
                        <div className="col-3">
                            <label className="col-12 text-left">Sexo:  <small class="text-muted">(requerido)</small></label>
                            <select 
                                key={0} 
                                value={alumno.sexo} 
                                className="form-control" 
                                aria-label=".form-select-lg example" 
                                onChange={(event) => {handleOnChange(event, 'sexo') }}>
                                    <option key={-1} value="">Seleccione una opción</option>
                                    {sexos.map(item => (
                                        <option key={item} value={item}>{item}</option>
                                        ))
                                    }
                            </select>
                        </div>
                    </div>
                    <div className="row mb-3 justify-content-center">
                        <div className="col-6">
                            <label className="col-12 text-left" htmlFor="id_nombre">Dirección:  <small class="text-muted">(requerido)</small></label>
                            <input type="text" id="id_nombre" className="form-control mb-3 col-12"
                            value={alumno.direccion} onChange={(event) => handleOnChange(event, 'direccion')} 
                            placeholder="Dirección"/>
                        </div>
                        <div className="col-2">
                            <label className="col-12 text-left" htmlFor="id_cupo">Edad:  <small class="text-muted">(requerido)</small></label>
                            <input type="number" id="id_cupo" className="form-control col-12"
                            value={alumno.edad} onChange={(event) => handleOnChange(event, 'edad')} 
                            placeholder="0"/>
                        </div>
                    </div>
                    <div className="row ml-2 mt-4 justify-content-center">
                        <button onClick={() => history.push("/alumnos/")} className="btn btn-outline-secondary mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-card-list mr-1" viewBox="0 0 18 18">
                                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                                <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
                            </svg>
                            Volver al listado
                        </button>
                        {id && (
                            <>
                            <button onClick={() => history.push(`/alumnos/${id}`)} className="btn btn-outline-danger mr-2">
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