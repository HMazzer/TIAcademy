import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import{Alert, Button, Container, Form, FormGroup, Input, Label, Spinner} from 'reactstrap';
import { api } from '../../../config';

export const Cadastrarpedido = ()=>{

    const[pedido, setPedido]= useState({
        ClienteId: '',
        ServicoId: '',
        valor: '',
        data: ''
    });

    const[status, setStatus] = useState({
        formSave:false,
        type:'',
        message:''
    });

    const valorInput = e => setPedido({
        ...pedido, [e.target.name]:e.target.value
    });

    const cadPedido = async e =>{
       e.preventDefault();

        setStatus({
            formSave:true
        });

        const headers ={
            'Content-Type':'application/json'
        };
    
        await axios.post(api + "/pedidos", pedido,{headers})
            .then((response) => {
                if(response.data.error){
                    setStatus({
                        formSave:false,
                        type: 'error',
                        message: response.data.message
                    });
                }else{
                    setStatus({
                        formSave:false,
                        type: 'sucess',
                        message: response.data.message
                    });
                }

                console.log(response.data.message);
            })
            .catch(() => {
                setStatus({
                    formSave:false,
                    type: 'error',
                    message: "Erro: Não foi possível se conectar a API"
                });
            });
         };


    return(
        <div>
            <Container>
            <div className="d-flex">
                <div className="mr-auto p-2">
                     <h1>Cadastrar Pedido</h1>
                 </div>
                      <div className="p-2">
                          <Link to="/visualizarpedido"
                             className= "btn btn-outline-primary btn-sm">
                              Listar
                 </Link>
                 </div>
            </div>
        
         <hr className="m-1"/>   

        {status.type === 'error' ? <Alert color="danger">
            {status.message}</Alert>:" "}

        {status.tye === 'sucess' ? <Alert color="sucess">
            {status.message}</Alert>:" "}

            <Form className="p-2" onSubmit={cadPedido}>
                <FormGroup className="p-2">
                    <Label>ClienteId</Label>
                    <Input type="text" name="ClienteId" placeholder="Nome do Cliente"
                        placeholder="Nome do Cliente" onChange={valorInput}/>
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>ServicoId</Label>
                    <Input type="text" name="ServicoId" placeholder="Serviço_Id"
                        placeholder="Serviço_Id" onChange={valorInput}/>
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>valor</Label>
                    <Input type="text" name="valor" placeholder="Valor do Pedido"
                        placeholder="Valor do Pedido" onChange={valorInput}/>
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Data</Label>
                    <Input type="text" name="data" placeholder="Data"
                        placeholder="Data" onChange={valorInput}/>
                </FormGroup>

               
        {status.formSave ?     
            <Button type="submit" outline color="info" disabled>Salvando...
                <Spinner size="sm" color="primary" /></Button>:
            <Button type="submit" outline color="info">Cadastrar</Button>}
            <Button type="reset" outline color="info">Reset</Button>

         </Form>

               </Container>
           
        </div>
    )
}