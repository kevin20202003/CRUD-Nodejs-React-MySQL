const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'empleados_crud'
});

app.post('/create', (req, res) => {
    const { nombre, edad, pais, cargo, anios } = req.body;

    db.query('INSERT INTO empleados (nombre, edad, pais, cargo, anios) VALUES (?,?,?,?,?)',
        [nombre, edad, pais, cargo, anios],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error inserting values");
            } else {
                res.send("Values Inserted");
            }
        });
});

app.get('/list', (req, res) => {
    db.query('SELECT * FROM empleados', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error fetching values");
        } else {
            res.send(result);
        }
    });
});

app.put('/update', (req, res) => {
    const { id, nombre, edad, pais, cargo, anios } = req.body;

    db.query('UPDATE empleados SET nombre=?, edad=?, pais=?, cargo=?, anios=? WHERE id=?',
        [nombre, edad, pais, cargo, anios, id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error inserting values");
            } else {
                res.send("Values Updated");
            }
        });
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
