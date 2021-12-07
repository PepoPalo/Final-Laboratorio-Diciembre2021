import './App.css';
import { Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";

import AlumnoDetail from './componentes/alumno/AlumnoDetail';
import AlumnoForm from './componentes/alumno/AlumnoForm';
import AlumnoListado from './componentes/alumno/AlumnoListado';

import AlumnoCursoForm from './componentes/alumnocurso/AlumnoCursoForm';

import CursoAlumnoListado from './componentes/curso/CursoAlumnoListado';
import CursoDetail from './componentes/curso/CursoDetail';
import CursoForm from './componentes/curso/CursoForm';
import CursoListado from './componentes/curso/CursoListado';

import ProfesorDetail from './componentes/profesor/ProfesorDetail';
import ProfesorForm from './componentes/profesor/ProfesorForm';
import ProfesorListado from './componentes/profesor/ProfesorListado';


export default function App() {
  return (
    <main className="App" role="main">
      <Router>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <h4 class="navbar-brand">Instituto</h4>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link className="nav-link" id="id-alumnos-tab" 
                aria-selected="false" to="/alumnos">Alumnos
              </Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" id="id-profesores-tab" 
                aria-selected="false" to="/profesores">Profesores
              </Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" id="id-cursos-tab" 
                aria-selected="false" to="/cursos">Cursos
              </Link>
            </li>
          </ul>
        </div>
      </nav>
          <Switch>

            {/* Alumnos */}
            <Route path="/alumnos/create" component={AlumnoForm}></Route>
            <Route path="/alumnos/:id/inscribir" component={AlumnoCursoForm}></Route>
            <Route path="/alumnos/:id/edit" component={AlumnoForm}></Route>
            <Route path="/alumnos/:id/" component={AlumnoDetail}></Route>
            <Route path="/alumnos" component={AlumnoListado}></Route>

            {/* Equipos */}
            <Route path="/cursos/create/" component={CursoForm}></Route>
            <Route path="/cursos/:id/edit/" component={CursoForm}></Route>
            <Route path="/cursos/:id/" component={CursoDetail}></Route>
            <Route path="/cursos/" component={CursoListado}></Route>

            {/* Linea */}
            <Route path="/profesores/create/" component={ProfesorForm}></Route>
            <Route path="/profesores/:id/edit" component={ProfesorForm}></Route>
            <Route path="/profesores/:id/" component={ProfesorDetail}></Route>
            <Route path="/profesores" component={ProfesorListado}></Route>

          </Switch>

      </Router >
    </main>
  );
}

