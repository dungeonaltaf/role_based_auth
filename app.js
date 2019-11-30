var express = require('express');
var mysql = require('mysql');
const bodyparser = require('body-parser');
var urlencoder = bodyparser.urlencoded({extended:false});
var app = express();
const port = 3000;
var route = require('./routes/route');

app.use(express.static(__dirname+'/public'));

var conn = mysql.createConnection({
    host:'localhost',
    user : 'root',
    password: '',
    database : 'role_auth'
});

conn.connect(function(err){
    if (err) 
        throw err;
    console.log("Connected to mysql!");
});

app.get('/',function(req,res){
   res.send("You have come to right place mortal");
   
    // conn.query("SELECT * from agent", function(err,result,field){
     //   if(!err){
       //     console.log(result);
       // }
   // })
    
});

app.post('/post/insert/agent',urlencoder,function(req,res){
    var length = Object.keys(req.body).length;
    console.log("Length="+length);
    console.log(req.body.agent);
    console.log(req.body.role1);
    
    var name = req.body.agent;
    var role1 = req.body.role1;
    var role2 = req.body.role2;
    var role3 = req.body.role3;

    if (length==2){
    var query = "INSERT INTO role (AgentName , Role1) values(?,?)";
    conn.query(query,[name, role1],function(err,result,field){
        if(!err){
            console.log("Query Successful");
            console.log(result);
        }

    });
    }
    else if (length==3){
        var query = "INSERT INTO role (AgentName , Role1 ,Role2) values(?,?,?)";
        conn.query(query,[name, role1,role2],function(err,result,field){
            if(!err){
                console.log("Query Successful");
                console.log(result);
            }
    
        });
        }
        else if (length==4){
            var query = "INSERT INTO role (AgentName , Role1,Role2, Role3) values(?,?,?,?)";
            conn.query(query,[name, role1, role2, role3],function(err,result,field){
                if(!err){
                    console.log("Query Successful");
                    console.log(result);
                }
        
            });
            }


});

app.post('/post/insert/permission', urlencoder , function(req,res){
    var role = req.body.role;
    var resource = req.body.resource;
    var permission = req.body.permit;
    console.log(role);
    console.log(resource);
    console.log(permission);

    var query1 = "INSERT INTO permission (Role,Resoruces,Permission) values(?,?,?)";

    conn.query(query1,[role,resource,permission],function(err , result , field){
        if(!err){
            console.log(result);
        }
        else{
            console.log(err);
        }

    })

});

app.post('/post/find/userpermit/', urlencoder,function(res,req){

    var name = res.body.name;
    var resoruce = res.body.resource;
    var permission = res.body.permission;

    console.log(name);
    console.log(resoruce);
    console.log(permission);

    var query = "SELECT  Role1  from role where AgentName = ?";
    var query1 = "SELECT Role2 from role where AgentName = ?";
    var query2 = "SELECT Role3 from role where AgentName = ?";

    conn.query(query, [name], function(err,result,field){

        if (!err){

            console.log(result);
            console.log("Query executed");
            console.log(result[0].Role1);
            if (result[0].Role1!=''){
                var query11 = "SELECT COUNT(Permission) as Count from permission where role =? and Resoruces =? and Permission = ?";
                conn.query(query11, [result[0].Role1, resoruce, permission],function(err, result11, field){
                    if(!err){
                        console.log(result11[0].Count);
                    }

                } );
            }
        }
        else{
            console.log(err);
        }
    });

   
});

app.use('/api', route);
app.listen(port, function(){
    console.log("Connected on port"+port);
});

module.exports = conn;