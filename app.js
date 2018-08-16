var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var sql = require('mssql');
var mysql = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'student'
// });

// connection.connect();
// connection.query('SELECT * FROM hocsinh', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', typeof(results));
//   console.log('The solution is: ', results[0]);
//   console.log('The solution is: ', typeof(results[0]));
//   console.log(results[0].Id);
// });
// connection.end();
//-----------------------------------

const Sequelize = require('sequelize');
const sequelize = new Sequelize('student', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: false
});
var ghilode = sequelize.define('ghilode', {
        tenkhachhang: { type: Sequelize.STRING, allowNull: true },
        soghi: { type: Sequelize.INTEGER, allowNull: true }
    }, { timestamps: false, tableName: 'ghilode' });
    // ghilode.findAll({where:{soghi:12}}).then(data => { 
    //     console.log(typeof(data)); 
    //     console.log(data[0].dataValues);
    // });    
// var hocsinh = sequelize.define('hocsinh', {
//     name: { type: Sequelize.STRING, allowNull: true },
//     diachi: { type: Sequelize.STRING, allowNull: true },
//     vo: { type: Sequelize.STRING, allowNull: true }
// }, { timestamps: false, tableName: 'hocsinh' });
// //   hocsinh.create({name: 'Khoi Nguyen',diachi:'Phu Tho',vo:'MN'}).then(()=> {console.log("Da them")});
// const Op = Sequelize.Op;
// hocsinh.findAll({
//     where: {
//         Id: {
//             [Op.gt]: 1
//         }
//     }
// }).then(data => { console.log(data) });



var json = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });


app.use("/laycss", express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.post('/loginjson', json, function (req, res) {
    res.send('Ok men');
    console.log(req.body.firstname);
})
app.post('/login', urlencodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(400)
    res.send('welcome, ' + req.body.nguoidung)
})

app.post('/',urlencodedParser,function(req, res){
    console.log(req.body.tenkhachhang);
    console.log(req.body.soghi);
    ghilode.create({tenkhachhang:req.body.tenkhachhang,soghi:req.body.soghi}).then(()=> console.log('Da them'))
    .then(()=> res.render("index"));
})
app.post('/khachtrungde',urlencodedParser, function(req,res){
    console.log(req.body.sode);
    // ghilode.findAll({where:{soghi:req.body.sode}}).then(data => { console.log(data) });
    ghilode.findAll({where:{soghi:req.body.sode}}).then(data => { 
        console.log(typeof(data)); 
        console.log(data[0].dataValues);
        console.log(typeof(data[0].dataValues));
        res.json(data);
    });    
})
app.get("/", function (req, res) {
    res.render("index");
})


// app.get("/api", function (req, res) {
//     var obj = {
//         name: "Nguyen Khoi Nguyen",
//         age: 24
//     };
//     res.json(obj);
// })
// app.get("/nguyen", function (req, res) {
//     res.render("index", { ID: 4 });
// })

// app.get("/khoi", function (req, res) {
//     var user = {
//         name: "Khoi Nguyen",
//         age: 24
//     };
//     res.render("user", { a: user });
// })
app.listen(port, function () {
    console.log("Lang nghe tren 3k");
});



















