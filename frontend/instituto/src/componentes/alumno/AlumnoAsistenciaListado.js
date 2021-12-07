import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from "react-router-dom";
import axios from 'axios';

export default function AlumnoAsistenciaListado() {
    let query = useQuery();
    const { id, curso_id} = useParams()
    const [lista, setLista] = useState([])
    const [alumno, setAlumno] = useState({})
    const [curso, setCurso] = useState({})
    const [fechas, setFechas] = useState({
        desde: new Date().toISOString().slice(0, 10),
        hasta: new Date().toISOString().slice(0, 10)
    })

    useEffect(() => {
      getAlumnos()
    }, [ ])
  
    function getAlumnos() {
      axios.get(`http://localhost:5000/Alumnos/${id}`)
        .then((response) => setAlumno(response.data))
        .catch((error) => alert(error))
        axios.get(`http://localhost:5000/Cursos/${curso_id}`)
        .then((response) => setCurso(response.data))
        .catch((error) => alert(error))
        if (query.get("desde") != null){
            setFechas({
                desde: query.get("desde"),
                hasta: query.get("hasta")
            })
            console.log(`http://localhost:5000/Asistencias/buscar/alumnocurso/${query.get("desde")}/${query.get("hasta")}/${id}/${curso_id}`)
            axios.get(`http://localhost:5000/Asistencias/buscar/alumnocurso/${query.get("desde")}/${query.get("hasta")}/${id}/${curso_id}`)
            .then((response) => setLista(response.data))
            .catch()
        }else{
            axios.get(`http://localhost:5000/Asistencias/buscar/alumnocurso/${fechas.desde}/${fechas.hasta}/${id}/${curso_id}`)
            .then((response) => setLista(response.data))
            .catch()
        }
    }

    function handleOnChange(event, campo) {
        setFechas({
            ...fechas,
            [campo]: event.target.value
        })
    }

    return (
        <>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item"><Link to="/alumnos">Alumnos</Link></li>
                <li class="breadcrumb-item active" aria-current="page">{alumno.nombre}</li>
                <li class="breadcrumb-item active" aria-current="page">{curso.nombre}</li>
                <li class="breadcrumb-item active" aria-current="page">Asistencia</li>
            </ol>
        </nav>
        <div className="container card my-3">
            <div className="card-header row justify-content-between">
                <h1 className="col-md-6">
                    {curso.nombre} - Asistencia
                </h1>
            </div>
            <div className="row card-body">
                <div className="col-3">
                    <label className="col-12 text-left">Desde:</label>
                    <input className="form-control col-12" type="date"
                    value={fechas.desde} onChange={(event) => handleOnChange(event, 'desde')} />
                </div>
                <div className="col-3">
                    <label className="col-12 text-left">Hasta:</label>
                    <input className="form-control col-12" type="date"
                    value={fechas.hasta} onChange={(event) => handleOnChange(event, 'hasta')} />
                </div>
                <div className="col-3">
                    <Link to={"/alumnos/"+id+"/asistencia/"+curso_id+"?desde="+fechas.desde+"&hasta="+fechas.hasta} className="btn btn-primary align-middle">Buscar</Link>
                </div>
            </div>
            <div className="bg-white card-body p-0 row">
                <table className="table">
                    <thead className="table-secondary">
                        <tr>
                        <th className="justify-content-start" scope="col">Fecha</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.length > 0 && (
                            lista.map(item => (
                                <>
                                <tr key={item.id}>
                                    <td className="text-center">{item.fecha}</td>
                                    <td className="text-center">Asistió</td>
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

function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
}