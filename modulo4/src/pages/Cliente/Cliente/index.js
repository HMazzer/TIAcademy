import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import { api } from "../../../config";

export const Cliente = (props) => {
    console.log(props.match.params.id)
    const [data, setData] = useState([]);
    const [id, setID] = useState(props.match.params.id);

    useEffect(() => {
        const getCliente = async () => {
            await axios.get(api + "/cliente/" +id)
                .then((response) => {
                    setData(response.data.cliente);
                })
                .catch(() => {
                    console.log("erro: nao foi possivel conectar a Api")
                })
        }
        getCliente();
    }, [id]);

    return (
        <div>
            <Container>
                
                    <div className="mr-auto p-2">
                        <h1>informaçao do servidor</h1>

                    </div>
                    <div className="p-2">
                        <Link to="/visualizarcliente"
                            className="btn btn-outline-primary btn-sm">Cliente</Link>
                    </div>
                    <dl className="row">
                        <dt className="col-sm-3">Nome</dt>
                        <dd className="col-sm-9">{data.nome}</dd>
                    </dl>
                    <dl className="row">
                        <dt className="col-sm-3">Endereço</dt>
                        <dd className="col-sm-9">{data.endereco}</dd>
                    </dl>
                    <dl className="row">
                        <dt className="col-sm-3">Cidade</dt>
                        <dd className="col-sm-9">{data.cidade}</dd>
                    </dl>
                    <dl className="row">
                        <dt className="col-sm-3">UF</dt>
                        <dd className="col-sm-9">{data.uf}</dd>
                    </dl>
                    <dl className="row">
                        <dt className="col-sm-3">Nascimento</dt>
                        <dd className="col-sm-9">{data.nascimento}</dd>
                    </dl>

                
            </Container>
        </div>

    )
}