import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

export default function LineaListado() {
    const [lista, setLista] = useState([])
    useEffect(() => {
      getLineas()
    }, [])
  
    function getLineas() {
      axios.get("http://localhost:5000/lineas/")
        .then((response) => setLista(response.data))
        .catch((error) => alert(error))
    }
  
  
    function borrar(id) {
      axios.put(`http://localhost:5000/lineas/baja/${id}`)
        .then((response) => {
          alert("Registro borrado correctamente")
          getLineas()
        })
        .catch(error => alert(error))
    }


    return (
        <>
            <div className="bg-white rounded-bottom rounded-right">
                <div>
                    <Link to='/lineas/nueva' className="btn btn-primary my-3">Nuevo</Link>
                </div>
                <table className="table table-hover">
                    <thead className="bg-info">
                        <tr>
                        <th className="text-center" scope="col">Número</th>
                        <th className="text-center" scope="col">Estado</th>
                        <th className="text-center" scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.length > 0 && (
                            lista.map(linea => (
                                <>
                                <tr key={linea.id}>
                                    <th className="text-center">{linea.numero}</th>
                                    <td className="text-center">{linea.estado}</td>
                                    <td className="text-center">
                                        <Link className="btn btn-outline-primary" to={"/lineas/" + linea.id}>Editar</Link> &nbsp;
                                        <button className="btn btn-outline-danger mr-2" onClick={() => borrar(linea.id)}>Dar Baja</button>
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