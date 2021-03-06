import {BrowserRouter, Route, Switch} from 'react-router-dom';
import TodosAutores from './components/TodosAutores'
import NuevoAutor from './components/NuevoAutor'
import ActualizarAutor from './components/ActualizarAutor'
import Error from './components/Error'

const App =() => {
  return (
    <div className="container">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={() => <TodosAutores/> }/>
          <Route path="/nuevo" render={() => <NuevoAutor/> }/>
          <Route path="/autor/editar/:id" render={() => <ActualizarAutor/>}/>
          <Route path="/error" render={() => <Error/>}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
