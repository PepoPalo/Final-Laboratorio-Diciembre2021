import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

export default function EquipoListado() {
    const [lista, setLista] = useState([])
    useEffect(() => {
      getEquipos()
    }, [])
  
    function getEquipos() {
      axios.get("http://localhost:5000/equipos/")
        .then((response) => setLista(response.data))
        .catch((error) => alert(error))
    }
  
  
    function borrar(imei) {
      axios.put(`http://localhost:5000/equipos/baja/${imei}`)
        .then((response) => {
          alert("Registro borrado correctamente")
          getEquipos()
        })
        .catch(error => alert(error))
    }


    return (
        <>
            <div className="bg-white rounded-bottom rounded-right">
                <div>
                    <Link to="/equipos/nuevo" className="btn btn-primary my-3">Nuevo</Link>
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
                        <th scope="col">IMEI</th>
                        <th className="text-center" scope="col">Marca</th>
                        <th className="text-center" scope="col">Modelo</th>
                        <th className="text-center" scope="col">Estado</th>
                        <th className="text-center" scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.length > 0 && (
                            lista.map(equipo => (
                                <>
                                <tr key={equipo.imei}>
                                    <th scope="row">{equipo.imei}</th>
                                    <td className="text-center">{equipo.marca}</td>
                                    <td className="text-center">{equipo.modelo}</td>
                                    <td className="text-center">{equipo.estado}</td>
                                    <td className="text-center">
                                        <Link className="btn btn-outline-primary" to={"/equipos/" + equipo.imei}>Editar</Link> &nbsp;
                                        
                                        <button className="btn btn-outline-danger mr-2" onClick={() => borrar(equipo.imei)}>Dar Baja</button>
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