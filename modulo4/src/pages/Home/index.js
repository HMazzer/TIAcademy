import{Container} from 'reactstrap';

export const Home = ()=>{
    return(
        <div>
            <Container>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h1>Página inicial</h1>
                    </div>
                        <div className="p-2">
                        <a href="/visualizarcliente" 
                        /*className="btn btn-primary btn-sm">Visualizar</a>---modo diferente do btn*/
                        className="btn btn-outline-primary btn-sm">Cliente</a>
                    </div>
                    <div className="p-2">
                        <a href="/visualizarservico" 
                        /*className="btn btn-primary btn-sm">Visualizar</a>---modo diferente do btn*/
                        className="btn btn-outline-primary btn-sm">Servico</a>
                    </div>
                    <div className="p-2">
                        <a href="/visualizarpedido" 
                        /*className="btn btn-primary btn-sm">Visualizar</a>---modo diferente do btn*/
                        className="btn btn-outline-primary btn-sm">Pedido</a>
                    </div>
                </div>        
            </Container>
        </div>
    )
}