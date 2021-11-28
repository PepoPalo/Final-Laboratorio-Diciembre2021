import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

export default function LepForm(){
    const history = useHistory()
    const { id, idd } = useParams()
    const [lep, setLep] = useState({
        id: '',
        plan_id: '',
        linea_id: '',
        equipo_id: '',
        fecha_ini: '',
        fecha_fin: '',
        plan_costo: '',
    })
    const [equipos, setEquipos] = useState([])
    const [lineas, setLineas] = useState([])
    const [planes, setPlanes] = useState([])

    useEffect(() => {
        getEquipos()
        getPlanes()
        getLineas()

        if (idd) {
            axios.get(`http://localhost:5000/lineaequipoplan/${idd}`)
                .then(response => setLep(response.data))
                .catch(error => alert(error))
        }
    }, [])

    function getEquipos() {
        axios.get("http://localhost:5000/equipos/")
        .then((response) => setEquipos(response.data))
        .catch((error) => alert(error))
    }

    function getPlanes() {
        axios.get("http://localhost:5000/planes/")
          .then((response) => setPlanes(response.data))
          .catch((error) => alert(error))
    }

    function getLineas() {
        axios.get("http://localhost:5000/lineas/")
          .then((response) => setLineas(response.data))
          .catch((error) => alert(error))
    }

    function handleOnChange(event, campo) {
        setLep({
            ...lep,
            [campo]: event.target.value
        })
    }

    function guardar(event) {

        event.preventDefault()
        event.stopPropagation()
        if (idd) {
            axios.put(`http://localhost:5000/lineaequipoplanes/${id}`, lep)
                .then(response => {
                    alert("se ha modificado el registro")
                    history.push("/leps/")
                })
                .catch(error => alert(error))
        }
        else {
            lep.plan_costo = planes.find(pl => lep.plan_id == pl.id).costo_por_mes
            axios.post("http://localhost:5000/lineaequipoplan/", lep)
                .then(response => {
                    alert("se ha agregado el registro")
                    console.log(response.data)
                    axios.post("http://localhost:5000/clienteLEPs/", {cliente_id: parseInt(id), lep_id: response.data['id'], activo: true})
                    history.push(`/leps/${id}`)
                }).catch(error => alert(error))
        }
    }

    return(
        <>
            <div className="container bg-white py-3">

                {id && <h1>Editando lep</h1>}
                {!id && <h1 className="text-center">Nuevo lep</h1>}
                <form onSubmit={(event) => guardar(event)}>
                    <div className="form-row">
                        <label className="col-2 align-self-center">Equipo</label>
                        <select 
                            key={0} 
                            value={lep.equipo_id} 
                            className="form-control col-2" 
                            aria-label=".form-select-lg example" 
                            onChange={(event) => {handleOnChange(event, 'equipo_id') }}>
                                <option value=" "></option>
                            {equipos.map(item => (
                                <option key={item.imei} value={item.imei}>{item.marca + " " + item.modelo}</option>
                                ))
                            }
                        </select>
                        <label className="col-2 text-center align-self-center">Linea</label>
                        <select 
                            key={0} 
                            value={lep.linea_id} 
                            className="form-control col-2" 
                            aria-label=".form-select-lg example" 
                            onChange={(event) => {handleOnChange(event, 'linea_id') }}>
                                <option value=" "></option>
                            {lineas.map(item => (
                                <option key={item.id} value={item.id}>{item.numero}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-row mt-3">
                        <label className="col-2 align-self-center">Plan</label>
                        <select 
                            key={0} 
                            value={lep.plan_id} 
                            className="form-control col-2" 
                            aria-label=".form-select-lg example" 
                            onChange={(event) => {handleOnChange(event, 'plan_id') }}>
                                <option value=" "></option>
                            {planes.map(item => (
                                <option key={item.id} value={item.id}>{item.nombre}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-row mt-3">
                        <div className="col-2 align-self-center">
                            <label>Fecha inicio</label>
                        </div>
                        {id &&
                            <input 
                                className="form-control col-2"
                                type="date"
                                min="2018-01-01" 
                                max="2023-12-31" 
                                value={lep.fecha_ini}
                                onChange={(event) => handleOnChange(event, 'fecha_ini')}
                                >
                            </input>
                        }
                        {!id &&
                            <input 
                                className="form-control col-2"
                                type="date"
                                min="2018-01-01" 
                                max="2023-12-31" 
                                value={lep.fecha_ini}
                                onChange={(event) => handleOnChange(event, 'fecha_ini')}
                                >
                            </input>
                        }
                        <div className="col-2 text-center align-self-center">
                            <label>Fecha fin</label>
                        </div>
                        
                        <input 
                            className="form-control col-2"
                            type="date"
                            min="2018-01-01" 
                            max="2023-12-31" 
                            value={lep.fecha_fin}
                            onChange={(event) => handleOnChange(event, 'fecha_fin')}
                            >
                        </input>
                        
                        <div className="col-2"></div>
                        <div className="col-4 justify-content-end">
                            <button type="submit" className="btn btn-primary mr-2">Aceptar</button>
                            <button onClick={() => history.push("/leps/")} className="btn btn-danger">Cancelar</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}