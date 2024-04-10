const e = require('express');
const con = require('../connect/mysql');

//Login
const login = (req, res) => {
    if (req.body != null && req.body.cpf != null && req.body.nome_cliente != null) {
        const { cpf, nome_cliente } = req.body;
        con.query('SELECT * FROM Cliente WHERE cpf = ? AND nome_cliente = ?', [cpf, nome_cliente], (err, result) => {
            if (err) {
                res.status(500).json('Erro ao fazer login');
            } else {
                if (result.length > 0) {
                    const { id, nome, email } = result[0];
                    res.status(200).json({id, nome, email});
                } else {
                    res.status(404).json('Cliente ou senha inválidos');
                }
            }
        });
    } else {
        res.status(400).json('Favor enviar todos os campos obrigatórios');
    }
}

// CRUD - CREATE
const addCliente = (req, res) => {
    if (req.body != null && req.body.cpf != null && req.body.nome_cliente != null) {
        const { cpf, nome_cliente} = req.body;
        con.query('INSERT INTO Cliente (cpf, nome_cliente) VALUES (?, ?, ?)', [cpf, nome_cliente], (err, result) => {
            if (err) {
                res.status(500).json('Erro ao adicionar Cliente');
            } else {
                req.body.id = result.insertId;
                res.status(201).json(req.body);
            }
        });
    } else {
        res.status(400).json('Favor enviar todos os campos obrigatórios');
    }
}

//CRUD - READ
const getCliente = (req, res) => {
    if (req.params.id != null) {
        con.query('SELECT * FROM Cliente WHERE cpf =' + req.params.id, (err, result) => {
            if (err) {
                res.status(500).send('Erro ao listar Usuarios');
            }
            res.json(result);
        });
    } else {
        con.query('SELECT * FROM Cliente', (err, result) => {
            if (err) {
                res.status(500).send('Erro ao listar Clientes');
            }
            res.json(result);
        });
    }
}

//CRUD - UPDATE
const updateCliente = (req, res) => {
    if (req.body != null && req.body.cpf != null && req.body.nome_cliente != null) {
        const { cpf, nome_cliente} = req.body;
        con.query('UPDATE Cliente SET nome_cliente = ? WHERE cpf = ?', [cpf, nome_cliente], (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(req.body);
            }
        });
    } else {
        res.status(400).json('Favor enviar todos os campos obrigatórios');
    }
}

//CRUD - DELETE
const deleteCliente = (req, res) => {
    if (req.params != null && req.params.cpf != null) {
        const { cpf } = req.params;
        con.query('DELETE FROM Cliente WHERE cpf = ?', [cpf], (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else {
                if (result.affectedRows == 0) {
                    res.status(404).json('Cliente não encontrado');
                } else {
                    res.status(200).json('Cliente removido com sucesso');
                }
            }
        });
    } else {
        res.status(400).json('Favor enviar todos os campos obrigatórios');
    }
}


module.exports = {
    login,
    addCliente,
    getCliente,
    updateCliente,
    deleteCliente
}