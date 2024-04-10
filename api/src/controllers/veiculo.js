const e = require('express');
const con = require('../connect/mysql');


const addVeiculo = (req, res) => {
    const { placa, modelo, marca, tipo, diaria } = req.body;

    if (placa != null && modelo != null && marca != null && tipo != null && diaria != null) {
        con.query('INSERT INTO Veiculo (placa, modelo, marca, tipo, diaria) VALUES (?, ?, ?, ?, ?)', [placa, modelo, marca, tipo, diaria], (err, result) => {
            if (err) {
                res.status(500).json('Erro ao adicionar Veículo');
            } else {
                req.body.id = placa; // Assuming placa is unique and can be used as ID
                res.status(201).json(req.body);
            }
        });
    } else {
        res.status(400).json('Favor enviar todos os campos obrigatórios');
    }
}


// CRUD - READ
const getVeiculo = (req, res) => {
    if (req.params.placa != null) {
        con.query('SELECT * FROM Veiculo WHERE placa = ?', req.params.placa, (err, result) => {
            if (err) {
                res.status(500).send('Erro ao buscar Veículo');
            } else {
                if (result.length === 0) {
                    res.status(404).send('Veículo não encontrado');
                } else {
                    res.json(result[0]);
                }
            }
        });
    } else {
        con.query('SELECT * FROM Veiculo', (err, result) => {
            if (err) {
                res.status(500).send('Erro ao listar Veículos');
            } else {
                res.json(result);
            }
        });
    }
}

// CRUD - UPDATE
const updateVeiculo = (req, res) => {
    const { placa, modelo, marca, tipo, diaria } = req.body;

    if (placa != null && modelo != null && marca != null && tipo != null && diaria != null) {
        con.query('UPDATE Veiculo SET modelo = ?, marca = ?, tipo = ?, diaria = ? WHERE placa = ?', [modelo, marca, tipo, diaria, placa], (err, result) => {
            if (err) {
                res.status(500).json('Erro ao atualizar Veículo');
            } else {
                if (result.affectedRows === 0) {
                    res.status(404).json('Veículo não encontrado');
                } else {
                    res.status(200).json(req.body);
                }
            }
        });
    } else {
        res.status(400).json('Favor enviar todos os campos obrigatórios');
    }
}

// CRUD - DELETE
const deleteVeiculo = (req, res) => {
    const { placa } = req.params;

    if (placa != null) {
        con.query('DELETE FROM Veiculo WHERE placa = ?', placa, (err, result) => {
            if (err) {
                res.status(500).json('Erro ao excluir Veículo');
            } else {
                if (result.affectedRows === 0) {
                    res.status(404).json('Veículo não encontrado');
                } else {
                    res.status(200).json('Veículo removido com sucesso');
                }
            }
        });
    } else {
        res.status(400).json('Favor enviar todos os campos obrigatórios');
    }
}



module.exports = {
    addVeiculo,
    getVeiculo,
    updateVeiculo,
    deleteVeiculo 
}