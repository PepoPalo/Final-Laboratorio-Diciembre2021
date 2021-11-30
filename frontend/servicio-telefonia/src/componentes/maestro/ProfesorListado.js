import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

var profesores =[
    {
        id: 1,
        nombre: "Santiago Antonini",
    },
    {
        id: 2,
        nombre: "Wenceslao Citera",
    },
]

export default function ProfesorListado() {
    const [lista, setLista] = useState([])
    useEffect(() => {
      getProfesores()
    }, [])
  
    function getProfesores() {
    //   axios.get("http://localhost:5000/profesores/")
    //     .then((response) => setLista(response.data))
    //     .catch((error) => alert(error))
        setLista(profesores)
    }
  
  
    function borrar(id) {
    //   axios.put(`http://localhost:5000/profesores/baja/${id}`)
    //     .then((response) => {
          alert("Registro borrado correctamente")
        //   getProfesores()
        // })
        // .catch(error => alert(error))
    }


    return (
        <>
            <div className="bg-white rounded-bottom rounded-right">
                <div>
                    <Link to="/profesores/nuevo" className="btn btn-primary my-3">Nuevo</Link>
                    <form >
                    {/* <div className="row"> */}
                        <label htmlFor="start">Desde:</label>
                        <input 
                            type="date"
                            min="2018-01-01" 
                            max="2023-12-31" 
                            // onChange={(event) => handleOnChange(event, 'desde')}
                        >
                        </input>

                        <label htmlFor="start">Hasta:</label>
                        <input 
                            type="date"
                            min="2018-01-01" 
                            max="2023-12-31" 
                            // onChange={(event) => handleOnChange(event, 'hasta')}
                            >
                        </input>
                        
                        {/* <button onClick={(event) => getFiltradas(event)}> BUSCAR</button> */}
                    {/* </div> */}
                </form>
                </div>
                <table className="table table-hover">
                    <thead className="bg-info">
                        <tr>
                        <th scope="col">#</th>
                        <th className="text-center" scope="col">Nombre</th>
                        <th className="text-center" scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.length > 0 && (
                            lista.map(profesor => (
                                <>
                                <tr key={profesor.id}>
                                    <th scope="row">{profesor.id}</th>
                                    <td className="text-center">{profesor.nombre}</td>
                                    <td className="text-center">
                                        <Link 
                                            className="btn btn-outline-primary mr-2" 
                                            to={"/profesores/ficha/" + profesor.id}
                                            data-toggle="tooltip" data-placement="bottom" title="Ficha del profesor"
                                            >Ver
                                        </Link>
                                        <Link 
                                            className="btn btn btn-outline-warning mr-2" 
                                            to={"/profesores/" + profesor.id}
                                            data-toggle="tooltip" data-placement="bottom" title="Editar información personal"
                                            >Editar
                                        </Link>
                                        <button className="btn btn-outline-danger mr-2" onClick={() => borrar(profesor.id)}>Dar Baja</button>
                                        <Link 
                                            className="btn btn btn-outline-info mr-2" 
                                            to={"/leps/" + profesor.id}
                                            >Administrar Lineas
                                        </Link>
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