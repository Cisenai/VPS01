const e = require('express');
const con = require('../connect/mysql');


const addAluguel = (req, res) => {
    const { placa, cpf, reserva, retirada, devolucao, subtotal } = req.body;

    if (placa != null && cpf != null && reserva != null && subtotal != null) {
        con.query('INSERT INTO Aluguel (placa, cpf, reserva, retirada, devolucao, subtotal) VALUES (?, ?, ?, ?, ?, ?)', [placa, cpf, reserva, retirada, devolucao, subtotal], (err, result) => {
            if (err) {
                res.status(500).json('Erro ao adicionar Aluguel');
            } else {
                req.body.id = result.insertId;
                res.status(201).json(req.body);
            }
        });
    } else {
        res.status(400).json('Favor enviar todos os campos obrigatórios');
    }
}



// CRUD - READ
const getAluguel = (req, res) => {
    if (req.params.id != null) {
        con.query('SELECT * FROM Aluguel WHERE id = ?', req.params.id, (err, result) => {
            if (err) {
                res.status(500).send('Erro ao buscar Aluguel');
            } else {
                if (result.length === 0) {
                    res.status(404).send('Aluguel não encontrado');
                } else {
                    res.json(result[0]);
                }
            }
        });
    } else {
        con.query('SELECT * FROM Aluguel', (err, result) => {
            if (err) {
                res.status(500).send('Erro ao listar Aluguéis');
            } else {
                res.json(result);
            }
        });
    }

// Rota para mostrar os veículos alugados
app.get('/veiculos/alugados', (req, res) => {
    con.query('SELECT * FROM Veiculos_Alugados', (err, result) => {
        if (err) {
            res.status(500).send('Erro ao buscar veículos alugados');
        } else {
            res.json(result);
        }
    });
});

// Rota para mostrar o relatório completo de todos os aluguéis
app.get('/alugueis/relatorio', (req, res) => {
    con.query('SELECT * FROM Relatorio_Alugueis', (err, result) => {
        if (err) {
            res.status(500).send('Erro ao buscar relatório de aluguéis');
        } else {
            res.json(result);
        }
    });
});
}

// CRUD - UPDATE
const updateAluguel = (req, res) => {
    const { id, placa, cpf, reserva, retirada, devolucao, subtotal } = req.body;

    if (id != null && placa != null && cpf != null && reserva != null && subtotal != null) {
        con.query('UPDATE Aluguel SET placa = ?, cpf = ?, reserva = ?, retirada = ?, devolucao = ?, subtotal = ? WHERE id = ?', [placa, cpf, reserva, retirada, devolucao, subtotal, id], (err, result) => {
            if (err) {
                res.status(500).json('Erro ao atualizar Aluguel');
            } else {
                if (result.affectedRows === 0) {
                    res.status(404).json('Aluguel não encontrado');
                } else {
                    res.status(200).json(req.body);
                }
            }
        });
    } else {
        res.status(400).json('Favor enviar todos os campos obrigatórios');
    }
}
const deleteAluguel = (req, res) => {
    const { id } = req.params;

    if (id != null) {
        con.query('DELETE FROM Aluguel WHERE id = ?', id, (err, result) => {
            if (err) {
                res.status(500).json('Erro ao excluir Aluguel');
            } else {
                if (result.affectedRows === 0) {
                    res.status(404).json('Aluguel não encontrado');
                } else {
                    res.status(200).json('Aluguel removido com sucesso');
                }
            }
        });
    } else {
        res.status(400).json('Favor enviar todos os campos obrigatórios');
    }
}




module.exports = {
    addAluguel,
    getAluguel,
    updateAluguel,
    deleteAluguel 
}