import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

export default function CursoAlumnoListado() {
    const [lista, setLista] = useState([])
    // const [curso, setCurso] = useState({})
    const { id } = useParams()

    useEffect(() => {
      getAlumnos()
    }, [])
  
    function getAlumnos() {
      axios.get(`http://localhost:5000/Alumnos/buscar/${id}`)
        .then((response) => setLista(response.data))
        .catch((error) => alert(error))
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
                            <th><h3>Alumnos</h3></th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
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