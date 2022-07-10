const { Router } = require('express');
const router = Router();
var path = require('path');
const bodyParser = require('body-parser');
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
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

    mysqlConnection.query(query, [id, name, status],(err, rows, fields)=>{
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

router.get('/metrics/:id',(req,res) => {

    const {id} = req.params;
    const query = `CALL metricsRepos(?);`;

    mysqlConnection.query(query, [id],(err, rows, fields)=>{
        if (!err && rows[0] != 0) {
            res.json(rows[0]);
        }
        else if(rows[0] == 0){
            res.json({Status:'La tribu no se encuentra registrada'});
        }
        else {
            console.log(err);
        }
    });

});


router.get('/csv/:id',(req,res) => {

    const {id} = req.params;
    const query = `CALL metricsRepos(?);`;

    mysqlConnection.query(query, [id],(err, rows, fields)=>{
        if (!err && rows[0] != 0) {
            
            const csvFields = rows[0].setHeader;
            const json2csvParser = new Json2csvParser({ csvFields });
            const csv = json2csvParser.parse(rows[0]);

            res.setHeader("Content-Type", "text/csv");
            res.setHeader("Content-Disposition", "attachment; filename=repos.csv");
        
            res.status(200).end(csv);
        }
        else {
            console.log(err);
        }
    });
});
module.exports = router;