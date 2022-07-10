const { Router } = require('express');
const router = Router();

const mysqlConnection = require = require ('../database');

router.get('/repostaus',(req,res) => {
    mysqlConnection.query('select id_repository,state from repository',(err, rows,fiels)=>{
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.post('/add', (req,res) =>{
    const{id, name, status} = req.body;
    console.log(req.body)
    const query = `
        CALL createEditOrganization(?, ?, ?);
    `;
    mysqlConnection.query(query, [id, name, status],(err,rows, fields)=>{
        if (!err) {
            res.json({Staus:'Organización creada con éxito!!'});
        } else {
            console.log(err);
        }
    });
});

router.put('/up/:id', (req,res)=>{
    const {name, status} = req.body;
    const {id} = req.params;
    const query = `CALL createEditOrganization(?, ?, ?);`;

    mysqlConnection.query(query, [id, name, status],(err,rows, fields)=>{
        if (!err) {
            res.json({Staus:'Organización actualizada con éxito!!'});
        } else {
            console.log(err);
        }
    });
});

router.get('/',(req,res) => {
    mysqlConnection.query('select * from organization',(err, rows,fiels)=>{
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.delete('/del/:id', (req, res)=>{
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM organization WHERE id_organization = ?', [id],(err,rows,fields)=>{
        if (!err) {
            res.json({Staus:'Organización eliminada con éxito!!'});
        } else {
            console.log(err);
        }
    });
});

module.exports = router;