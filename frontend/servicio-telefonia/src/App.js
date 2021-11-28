import './App.css';
import { Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";

import ClienteForm from './componentes/cliente/ClienteForm';
import ClienteListado from './componentes/cliente/ClienteListado';

import EquipoForm from './componentes/equipo/EquipoForm';
import EquipoListado from './componentes/equipo/EquipoListado';

import LineaForm from './componentes/linea/LineaForm';
import LineaListado from './componentes/linea/LineaListado';

import PlanForm from './componentes/plan/PlanForm';
import PlanListado from './componentes/plan/PlanListado';
import ClienteFicha from './componentes/cliente/ClienteFicha';
import LepForm from './componentes/lep/LepForm';
import LepListado from './componentes/lep/LepListado';


export default function App() {
  return (
    <div className="container bg-transparent">
      <Router>
        <div className="App mt-3">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item rounded-top" id="fondo" role="presentation">
              <Link 
                className="nav-link active" 
                id="cliente-tab" 
                data-toggle="tab"
                role="tab" 
                aria-controls="cliente" 
                aria-selected="true" 
                to="/clientes">Clientes
              </Link>
            </li>
            <li className="nav-item rounded-top" id="fondo" role="presentation">
              <Link 
                className="nav-link" 
                id="equipo-tab" 
                data-toggle="tab"
                role="tab" 
                aria-controls="equipo" 
                aria-selected="false" 
                to="/equipos">Equipos
              </Link>
            </li>

            <li className="nav-item rounded-top" id="fondo" role="presentation">
              <Link 
                className="nav-link" 
                id="linea-tab" 
                data-toggle="tab"
                role="tab" 
                aria-controls="linea" 
                aria-selected="false" 
                to="/lineas">Lineas
              </Link>
            </li>

            <li className="nav-item rounded-top" id="fondo" role="presentation">
              <Link 
                className="nav-link" 
                id="plan-tab" 
                data-toggle="tab"
                role="tab" 
                aria-controls="plan" 
                aria-selected="false" 
                to="/planes">Planes
              </Link>
            </li>

          </ul>
        </div>

        <Switch>

          {/* Clientes */}
          <Route path="/clientes/nuevo" component={ClienteForm}></Route>
          <Route path="/clientes/ficha/:id" component={ClienteFicha}></Route>
          <Route path="/clientes/:id" component={ClienteForm}></Route>
          <Route path="/clientes" component={ClienteListado}></Route>

          {/* LEP */}
          <Route path="/lep/nuevo/:id" component={LepForm}></Route>
          <Route path="/lep/<int:cliente>/<int:id>" component={LepForm}></Route>
          <Route path="/leps/:id" component={LepListado} ></Route>

          {/* Equipos */}
          <Route path="/equipos/nuevo" component={EquipoForm}></Route>
          <Route path="/equipos/:imei" component={EquipoForm} ></Route>
          <Route path="/equipos" component={EquipoListado}></Route>

          {/* Linea */}
          <Route path="/lineas/nueva" component={LineaForm}></Route>
          <Route path="/lineas/:id" component={LineaForm}></Route>
          <Route path="/lineas/buscar/:desde/:hasta" component={LineaListado}></Route>
          <Route path="/lineas/buscar/:desde/:hasta/:mozo" component={LineaListado}></Route>
          <Route path="/lineas" component={LineaListado}></Route>

          {/* Planes */}
          <Route path="/planes/nuevo" component={PlanForm}></Route>
          <Route path="/planes/:id" component={PlanForm} ></Route>
          <Route path="/planes" component={PlanListado}></Route>

        </Switch>
      </Router >
    </div>
  );
}

