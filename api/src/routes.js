const express = require('express');
const routes = express.Router();

const Usuario = require('./controllers/cliente');
const Tarefa = require('./controllers/telefone');

routes.get('/', (req, res) => {
    res.json("API Tarefas 1.0")
});

routes.post('/cliente/login', Cliente.login);
routes.post('/cliente', Cliente.addCliente);
routes.get('/cliente', Cliente.getCliente);
routes.get('/cliente/:cpf', Cliente.getCliente);
routes.put('/cliente', Cliente.updateCliente);
routes.delete('/cliente/:cpf', Cliente.deleteCliente);

routes.post('/telefone', Telefone.addTelefone);
routes.get('/telefone', Telefone.getTelefone);
routes.put('/telefone', Telefone.updateTelefone);
routes.delete('/telefone/:cpf', Telefone.deleteTelefone);

routes.post('/veiculo', Veiculo.addVeiculo);
routes.get('/veiculo', Veiculo.getVeiculo);
routes.put('/veiculo',  Veiculo.updateVeiculo);
routes.delete('/veiculo/:placa', Veiculo.deleteVeiculo);

routes.post('/aluguel', Aluguel.addAluguel);
routes.get('/aluguel', Aluguel.getAluguel);
routes.put('/aluguel',  Aluguel.updateAluguel);
routes.delete('/aluguel/:id', Aluguel.deleteAluguel);

module.exports = routes;