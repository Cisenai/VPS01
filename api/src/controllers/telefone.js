const con = require('../connect/mysql');

//CRUD - CREATE
const addTelefone = (req, res) => {
    const { cpf, numero } = req.body;

    if (cpf != null && numero != null) {
        con.query('INSERT INTO Telefone(cpf, numero) VALUES (?, ?)', [cpf, numero], (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(201).json(req.body);
            }
        });
    } else {
        res.status(400).json('Favor enviar todos os campos obrigatórios');
    }
}

///CRUD - READ
const getTelefone = (req, res) => {
    if (req.params.id != null) {
        con.query('SELECT * FROM Telefone WHERE cpf =' + req.params.cpf, (err, result) => {
            if (err) {
                res.status(500).send('Erro ao listar Usuarios');
            }
            res.json(result);
        });
    } else {
        con.query('SELECT * FROM Telefone', (err, result) => {
            if (err) {
                res.status(500).send('Erro ao listar Telefones');
            }
            res.json(result);
        });
    }
}

//CRUD - UPDATE
const updateTelefone = (req, res) => {
    if (req.body != null && req.body.cpf != null && req.body.numero != null) {
        const { cpf, numero} = req.body;
        con.query('UPDATE Telefone SET numero = ? WHERE cpf = ?', [cpf, numero], (err, result) => {
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

// //CRUD - DELETE
const deleteTelefone = (req, res) => {
    if (req.params != null && req.params.cpf != null) {
        const { cpf } = req.params;
        con.query('DELETE FROM Telefone WHERE cpf = ?', [cpf], (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else {
                if (result.affectedRows == 0) {
                    res.status(404).json('Telefone não encontrado');
                } else {
                    res.status(200).json('Telefone removido com sucesso');
                }
            }
        });
    } else {
        res.status(400).json('Favor enviar todos os campos obrigatórios');
    }
}

module.exports = {
    addTelefone,
    getTelefone,
    updateTelefone,
    deleteTelefone
}