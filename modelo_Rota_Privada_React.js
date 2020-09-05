import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Painel from './pages/Painel';
import { autenticado } from './auth'; //criado em auth.js

//criar uma rota privada
/* "após 'component: Component,' "const privateRoute recebe conforme abaixo exact path="/painel" component={Painel} atribuido a uma
    variavel nomeada de ...rest ,como se fosse: 'componente: Component, exact path="/painel" component={Painel}' ficando tudo dentro
    de ...rest
*/
const PrivateRoute = ({ component: Component, ...rest}) => (
    <Route {...rest} render={props =>( // verifica se esta autenticado
        autenticado() ? (
            <Component {...props}/>   // '?' sim ou não ':'
        ) : (
            <Redirect to={{pathname: '/', state:{from: props.location}}}/>//state:{from: props.location = para não perder o histórico de navegação
        )

    )} />
);

const Routes = () =>{
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}/>
                <PrivateRoute exact path="/painel" component={Painel}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;