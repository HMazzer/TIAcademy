import './App.css';
import  {BrowserRouter as Router, Switch, Route} from 'react-router-dom' 
//as-utilizado para mudar o nome do BrowserRouter
import {Home} from './pages/Home/';
//para cada página criada um import novo
import {VisualizarCliente} from './pages/Cliente/VisualizarCliente';
import { Menu } from './componentes/Menu';
import { VisualizarServico } from './pages/Servico/VisualizarServico';
import { Servico } from './pages/Servico/Servico';
import { Cliente } from './pages/Cliente/Cliente';
import { VisualizarPedido } from './pages/Pedido/VisualizarPedido';
import { Pedido } from './pages/Pedido/Pedido';
import { Cadastrar } from './pages/Servico/Cadastrar';
import { Cadastrarcliente } from './pages/Cliente/Cadastrar';
import { Cadastrarpedido } from './pages/Pedido/Cadastrar';
import { Editar } from './pages/Servico/Editar';
import { Editarcliente } from './pages/Cliente/Editar';
import { Editarpedido } from './pages/Pedido/Editar/Index';

function App() {
  return (
    <div>
      <Menu/>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/visualizarcliente" component={VisualizarCliente}/>
          <Route path="/visualizarservico" component={VisualizarServico}/>
          <Route path="/visualizarpedido" component={VisualizarPedido}/>
          <Route path="/cadastrarservico" component={Cadastrar}/>
          <Route path="/cadastrarcliente" component={Cadastrarcliente}/>
          <Route path="/cadastrarpedido" component={Cadastrarpedido}/>
          <Route path="/servico/:id" component={Servico}/>
          <Route path="/cliente/:id" component={Cliente}/>
          <Route path="/pedido/:id" component={Pedido}/>
          <Route path="/editarservico/:id" component={Editar}/>
          <Route path="/editarcliente/:id" component={Editarcliente}/>
          <Route path="/editarpedido/:id" component={Editarpedido}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
