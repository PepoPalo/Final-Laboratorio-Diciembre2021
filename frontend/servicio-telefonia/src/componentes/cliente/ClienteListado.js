import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

export default function ClienteListado() {
    const [lista, setLista] = useState([])
    useEffect(() => {
      getClientes()
    }, [])
  
    function getClientes() {
      axios.get("http://localhost:5000/clientes/")
        .then((response) => setLista(response.data))
        .catch((error) => alert(error))
        // setLista(clientes)
    }
  
  
    function borrar(id) {
      axios.put(`http://localhost:5000/clientes/baja/${id}`)
        .then((response) => {
          alert("Registro borrado correctamente")
          getClientes()
        })
        .catch(error => alert(error))
    }


    return (
        <>
            <div className="bg-white rounded-bottom rounded-right">
                <div>
                    <Link to="/clientes/nuevo" className="btn btn-primary my-3">Nuevo</Link>
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
                            lista.map(cliente => (
                                <>
                                <tr key={cliente.id}>
                                    <th scope="row">{cliente.id}</th>
                                    <td className="text-center">{cliente.nombre}</td>
                                    <td className="text-center">
                                        <Link 
                                            className="btn btn-outline-primary mr-2" 
                                            to={"/clientes/ficha/" + cliente.id}
                                            data-toggle="tooltip" data-placement="bottom" title="Ficha del cliente"
                                            >Ver
                                        </Link>
                                        <Link 
                                            className="btn btn btn-outline-warning mr-2" 
                                            to={"/clientes/" + cliente.id}
                                            data-toggle="tooltip" data-placement="bottom" title="Editar información personal"
                                            >Editar
                                        </Link>
                                        <button className="btn btn-outline-danger mr-2" onClick={() => borrar(cliente.id)}>Dar Baja</button>
                                        <Link 
                                            className="btn btn btn-outline-info mr-2" 
                                            to={"/leps/" + cliente.id}
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