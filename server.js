const bodyParser = require('body-parser')
const express = require('express')
const mysql = require('mysql')
const bodyparser = require('body-parser')
const cors = require('cors')

const db =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"wlt"
});

const app = express()
app.use(bodyparser.json())
app.use(cors())
app.use(express.static(__dirname))
app.use(bodyparser.urlencoded({extended : true}));
app.set('view engine','ejs');

db.connect(function(error){
    if(error){
        console.log("DB not connected");
    }
    else{
        console.log("DB connected");
    }
})
app.get('/',function(req,res){
    res.sendFile(__dirname+'index.html');
})

app.post('/',function(req,res){
        var fname=req.body.fname;
        var reg=req.body.reg;
        var dob=req.body.dob;
        var age=req.body.age;
        var address=req.body.address;
        var mail=req.body.mail;
        var phone=req.body.phone;
    var sql = "INSERT INTO student(fname,reg,dob,age,address,mail,phone) VALUES(?,?,?,?,?,?,?);";
    db.query(sql , [fname,reg,dob,age,address,mail,phone] , function(error){
        if(error){
            res.status(200).send({message : "Student Details Not updated.."});
        }
        else{
            res.status(200).send({message : "Student Details updated.."});
        }
    })
})

app.get('/students',function(req,res){
    var sql = "SELECT * FROM student;"
    db.query(sql,function(error,result){
        if(error){
            console.log(error);
        }
        else{
            // res.sendFile(__dirname + '/students.ejs',{ data : result});
            res.render(__dirname+'/views/students.ejs',{data:result});
        }
    })
})

app.delete('/:id',function(req,res){
    var id = req.params.id;
    var sql = "DELETE FROM student WHERE id="+id;
    db.query(sql,function(error){
        
    })
})

app.listen(3000);
