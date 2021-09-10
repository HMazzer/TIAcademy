const express = require('express');
const cors = require('cors');

const models = require('./models');


const app = express();
app.use(cors());
app.use(express.json());

let cliente = models.Cliente;
let servico = models.Servico;
let pedido = models.Pedido;

app.get('/', function (req, res) {
    res.send('Olá Mundo!');
});

/*app.get('/cliente', async(req,res)=>{
    let create = await cliente.create({
        nome: 'Helen Mazzer',
        endereco: 'Rua Santos Dumond',
        cidade: 'Maringá',
        uf:'PR',
        nascimento: '1992-03-02'
    })
    res.send('CLIENTE ADICIONADO!');
}); ---- Versão de inserção literal direta no código*/


// Esta versão abaixo permite a inserção de clientes via json (Postman)
app.post('/clientes', async (req, res) => {
    let create = await cliente.create(
        req.body

    );
    res.send('CLIENTE ADICIONADO!');
});


/*app.get('/pedido', function(req,res){
    res.send('PEDIDO!');
});   ----- Versão que só mostra uma mensagem na pagina de Pedido*/

app.post('/pedidos', async (req, res) => {
    let create = await pedido.create(
        req.body
    );

    res.send('PEDIDO ADICIONADO!');
});

app.post('/servicos', async (req, res) => {

    await servico.create(
        req.body
    )
    res.send('SERVIÇO ADICIONADO!');

    await aguardar(3000);

    function aguardar(ms){
        return new Promise((resolve)=>{
            setTimeout(resolve.ms);
        });
    };
    
});
//------------------30/08--------------------------
app.get('/lista de servicos', async (req, res) => {
    await servico.findAll({
        order: [['nome', 'DESC']]
    }).then(function (servicos) {
        res.json({ servicos });
    });
});

app.get('/ofertas', async (req, res) => {
    await servico.count('id')
        .then(function (servicos) {
            res.json({ servicos });
        });
});

app.get('/servico/:id', async (req, res) => {
    await servico.findByPk(req.params.id)
        .then(servico => {
            return res.json({
                error: false, servico
            });
        }).catch(function (erro) {
            return res.status(400).json({ /* 400 cod.erro - 200 cod acerto*/
                error: true,
                message: "Código não cadastrado"
            })
        })
});

//atividade da aula
app.post('/clientes', async (req, res) => {
    let create = await cliente.create({
        nome: 'Antonio Carniel',
        endereço: 'Avenida Herval',
        cidade: 'Maringá',
        uf: 'PR',
        nascimento: '1942-12-15',
    });
});

app.post('/pedidos', async (req, res) => {
    let create = await servico.create({
        ClienteId: '1',
        ServicoId: '1',
        valor: '65000,23',
        data: '2021-08-29',
    });

    res.send('Novo pedido inserido');
});




//-------------Início da Aula 30/08/2021----------------------


app.get('/listaservicos', async (req, res) => {
    await servico.findAll({
        //        raw:true  // listando desordenadamente...
        order: [['nome', 'DESC']]
    }).then(function (servicos) {
        res.json({ servicos })
    });
});

// ------------ EXERCÍCIOS DE 30/08/2021 ---------------------
//
//
// Exercicio 1: Lista todos os clientes
app.get('/listaclientes1', async (req, res) => {
    await cliente.findAll({
        //        raw:true  // listando desordenadamente...
        order: [['nome', 'ASC']]
    }).then(function (clientes) {
        res.json({ clientes })
    });
});

// Exercicio 2: Lista clientes por ordem de antiguidade
app.get('/lclipornasc', async (req, res) => {
    await cliente.findAll({
        //        raw:true  // listando desordenadamente...
        order: [['nascimento', 'DESC']]
    }).then(function (clientes) {
        res.json({ clientes })
    });
});

// Exercicio 3: Lista todos os pedidos
app.get('/listapedidos', async (req, res) => {
    await pedido.findAll({
        raw: true  // listando desordenadamente...
        //          order: [['nome','DESC']]
    }).then(function (pedidos) {
        res.json({ pedidos })
    });
});

// Exercicio 4: Lista pedidos por ordem de maior para menor valor
app.get('/lpedidos', async (req, res) => {
    await pedido.findAll({
        order: [['valor', 'DESC']]
    }).then(function (pedidos) {
        res.json({ pedidos })
    });
});

// Exercicio 5: Quantidade de clientes
app.get('/qtdecli', async (req, res) => {
    await cliente.count('id').then(function (cliente) {
        res.json({ cliente })
    });
});

// Exercicio 6: Quantidade de pedidos
app.get('/qtdepedidos', async (req, res) => {
    await pedido.count('id').then(function (pedido) {
        res.json({ pedido })
    });
});
//
//
// ----------------------------- FIM DOS EXERCICIOS DE 30/08/2021 --------------


//-------------------Desafio-30/08------------------------------
//Calcular o gasto por cliente
/*app.get('/pedido/:id', async (req, res) => {
    await pedido.sum('valor', { where: { ClienteId: req.params.id } })
        .then((pedido) => {
            return res.json({
                pedido
            });
        })
});*/
//--------------------31/08-------------------------------------------

app.get('/atualizaservico', async (req, res) => {
    await servico.findByPk(1)
        .then(servico => {
            servico.nome = 'HTML/CSS/JS';
            servico.descricao = 'Páginas estáticas e dinâmicas estilizadas';
            servico.save();
            return res.json({ servico });
        });
});

//comando de fazer atualização
app.put('/editarservico', (req, res) => {
    servico.update(req.body, {
        where: { id: req.body.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Serviço alterado com suceso."
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do serviço."
        });
    });
});

app.put('/editarpedido', (req, res) => {
    pedido.update(req.body, {
        where: { ServicoId: req.body.ServicoId }
    }).then(function () {
        return res.json({
            error: false,
            message: "Pedido modificado com sucesso."
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Não foi possível modificar o pedido."
        });
    });
});


app.get('/servicospedidos', async (req, res) => {
    await servico.findByPk(1, {
        include: [{ all: true }]
    }).then(servico => {
        return res.json({ servico });
    });
});

//------------------------Atividade 31/08----------------------------------------
//-----Exercicio 1--------------------------------------------------------------
/*
app.get('/buscacliente', async (req, res) => {
    await pedido.findAll({
        where: {
            ClienteId: req.body.ClienteId
        }
    }).then((pedido) => {
        return res.json( {pedido} )
    }).catch((erro) => {
        return res.status(400).json({
            error: false,
            message: "Erro ao atualizar"
        })
    })
});
------------------------------------------------------------------------------------
app.get('/buscaservico', async(req,res)=>{
    await cliente.findByPk(1, {
        include: [{all:true}]
    }).then(servico =>{
        return res.json({servico});
    });
});
*/
//----------------------------------------------------------------(Grupo)---------
app.get('/servicocliente', async (req, res) => {
    //    pedido.findAll({  // Traz todos os pedidos deste cliente
    pedido.findOne({    // Traz o primeiro pedido deste cliente
        where: { ClienteId: { [Op.eq]: req.body.ClienteId } }
    }).then(pedidos => {
        return res.json({
            error: false,
            pedidos
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Cliente não está cadastrado"
        });
    });
});


//--------Exercício 2-------------------------------------------------------------

app.put('/editarcliente', (req, res) => {
    cliente.update(req.body, {
        where: { id: req.body.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Cliente foi alterado com sucesso."
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do serviço."
        });
    });
});

//-------Exercício 3-----------------------------------------------------------

app.put('/editarpedido', (req, res) => {
    pedido.update(req.body, {
        where: { id: req.body.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Serviço foi alterado com sucesso."
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do serviço."
        });
    });
});

//---------Exercicio em Sala--------------------

app.get('/excluircliente', async (req, res) => {
    cliente.destroy({
        where: { id: 5 }
    });
});

app.delete('/apagarservico/:id', (req, res) => {
    servico.destroy({
        where: { id: req.params.id }
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Não foi possível excluir o cliente"
        });
    });
});

app.delete('/apagarpedido/:id',(req,res)=>{
    pedido.destroy({
        where:{id: req.params.id}
    }).then(function(){
        return res.json({
            error:false,
            message:'foi deletada com sucesso'
        });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message:'nao foi possivel'
        });
    });
});

//-------------------Desafio-31/08------------------------------

//----------Nova rota -Listar todos os pedidos de um cliente---------
app.get('/pedidocliente_td', async (req, res) => {
    pedido.findAll({  // Traz todos os pedidos deste cliente
        where: { ClienteId: { [Op.eq]: req.body.ClienteId } }
    }).then(pedidos => {
        return res.json({
            error: false,
            pedidos
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Cliente não está cadastrado"
        });
    });
});

//--------------Nova rota -Alterar pedido via ClienteId---------
app.put('/alt_pedido_cliente', (req, res) => {
    pedido.update(req.body, {
        where: { ClienteId: req.body.ClienteId }
    }).then(function () {
        return res.json({
            error: false,
            message: "Pedido MODIFICADO com SUCESSO."
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Não foi possível modificar o pedido."
        });
    });
});


app.get('/servicospedidos', async (req, res) => {
    await servico.findByPk(1, {
        include: [{ all: true }]
    }).then(servico => {
        return res.json({ servico });
    });
});

//----------------Desafio----03/09--------------------------------

app.get('/cliente/:id', async (req, res) => {
    cliente.findByPk(req.params.id)
        .then(cliente => {
            return res.json({
                error: false,
                cliente
            });
        }).catch(function (erro) {
            return res.status(400).json({
                error: true,
                message: "codigo nao esta cadastrado"
            });
        });
});

app.get('/listaclientes',async(req,res)=>{
    await cliente.findAll({
        raw:true
    }).then(function(clientes){
        res.json({clientes})
    });
});

app.get ('/pedido/:id',async(req,res)=>{
    pedido.findByPk(req.params.id)
    .then(pedido =>{
        return res.json({
            error:false,
            pedido
        });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message:"codigo nao esta cadastrado"
        });
    });
});

let port = process.env.PORT || 3001;

app.listen(port, (req, res) => {
    console.log('Servico esta ativo');
});