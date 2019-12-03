var express = require('express');
var mysql = require('mysql');
const bodyparser = require('body-parser');
var urlencoder = bodyparser.urlencoded({extended:true});
var app = express();
const port = 80;
var route = require('./routes/route');
var path = require('path');

app.use(express.static(__dirname+'/public'));

var conn = mysql.createConnection({
    host:'localhost',
    user : 'root',
    password: '',
    database : 'role'
});

conn.connect(function(err){
    if (err) 
        throw err;
    console.log("Connected to mysql!");
});

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname + '/public/index.html'));
   
    // conn.query("SELECT * from agent", function(err,result,field){
     //   if(!err){
       //     console.log(result);
       // }
   // })
    
});

app.post('/post/insert/agent',urlencoder,function(req,res){
  // var req_length = Object.keys(req.body).length;
    //console.log("Length="+req_length);
    console.log(req.body.agent_name);
    console.log(req.body.role);
    var role = req.body.role;
     var role_length = role.length;
     console.log("length is "+role_length);
     console.log(req.body);
     var agent_uid;

    var role_name = [];
    var agent_name = req.body.agent_name;
    for (var i=0;i<role_length;i++){
         role_name[i] = role[i];
    }
    var insert_agentname_query = "INSERT INTO agent_name(agent_name) values(?)";
    conn.query(insert_agentname_query,[agent_name],function(err,result,field){

        if (!err){
            console.log(result);
        }
        else{
            console.log(err);
        }
    });

    var select_uid_query = "SELECT UID from agent_name where agent_name = ?";
    conn.query(select_uid_query,[agent_name], function (err,result,field){
        if (!err){
            console.log("The result id of agent is"+result[0].UID);
            agent_uid = result[0].UID;
        }
        else{
            console.log(err);
        }

        //the insertion loop in agent_role
        for (var i=0;i<role_length;i++){
            var insert_role_query = "INSERT INTO agent_role(UID, Role) values(? , ?)";
            console.log("agent uid is "+agent_uid);
            conn.query(insert_role_query, [agent_uid, role_name[i]], function(err,result,field){
                if  (!err){
                    console.log(result);
                }
                else{
                    console.log(err);
                }
            })
        }
    });
    

});

app.post('/post/insert/permission', urlencoder , function(req,res){
    console.log(req.body.role_name);
    console.log("resources are="+req.body.resource);
    console.log("permissions are= "+req.body.permission);

    var permission = req.body.permission;

    console.log("permission are in variable =="+permission);
     var permission_length = permission.length;
     var resource = req.body.resource;
     var resource_length = resource.length;
     console.log("length is "+resource_length);
     console.log(req.body);
     var role_name = req.body.role_name;
  
     var permission_list = [];
    for (var i=0;i<permission_length;i++){
         permission_list[i] = permission[i];
    };

    var resource_list = [];
    for (var i=0;i<resource_length;i++){
         resource_list[i] = resource[i];
    };



        //the insertion loop in agent_role
        for (var i=0;i<permission_length;i++){
            var insert_role_query = "INSERT INTO resource_permission (role_name, resource , permission) values(? , ? , ?)";
            console.log("role_name"+role_name);
            conn.query(insert_role_query, [role_name, resource_list[i], permission_list[i]], function(err,result,field){
                if  (!err){
                    console.log(result);
                }
                else{
                    console.log(err);
                }
            })
        }
    });


app.post('/post/find/userpermit/', urlencoder,function(res,req){

    console.log("We are searching !!");
    var name = res.body.name;
    var resource = res.body.resource;
    var permission = res.body.permission;

    console.log(name);
    console.log(resource);
    console.log(permission);
    var uid;
    var select_uid_from_name = "SELECT UID from agent_name where agent_name = ?"
    conn.query(select_uid_from_name, [name], function(err,result_uid,field){
        if (!err){
            console.log(result_uid[0].UID);
        }
        else{
            console.log(err);
        }
   

    var select_resource_permission = "SELECT role_name FROM resource_permission WHERE resource = ? AND permission = ? ";

    conn.query(select_resource_permission, [resource, permission], function(err,result_role_name,field){
        console.log("resource inputed is= "+ resource);
        console.log("permission inputed is"+ permission);
        if (!err){
            console.log(result_role_name[0].role_name);
            console.log("The uid of the agent is again = "+ result_uid[0].UID);
            var uid = result_uid[0].UID;
            console.log("Query executed");
           var select_uid_role = "SELECT COUNT(UID) as Count from agent_role where uid =? and role = ?";
            var num_rows = result_role_name.length;
            for (var i=0;i<num_rows;i++){
                conn.query(select_uid_role, [uid, result_role_name[i].role_name], function(err,result,field){
                    if (!err){
                        console.log(result);
                        console.log(result[0].Count);
                        if (result[0].Count>=1){
                            console.log("Query approved");
                            req.send("You have the permission!");
                            
                        } 
                        else {
                            req.send("You don't have the permission");
                        }
                    }
                    else{
                        console.log(err);
                    }

                });
            }

        }
        else{
            console.log(err);
        }
    });
    });
   
});

app.post('/delete/role/role', urlencoder, function(res,req){

    var role = res.body.role;

    var delete_role_from_permission_query = "DELETE FROM resource_permission where role_name = ?";
    conn.query(delete_role_from_permission_query, [role], function(err,result,field){
        if (!err){
            console.log(result);
        }
        else{
            console.log(err);
        }

    });

    var delete_role_from_agent_query = "DELETE FROM agent_role where Role= ?";
    conn.query(delete_role_from_agent_query, [role], function(err,result,field){

        if (!err){
            console.log(result);
        }
        else{
            console.log(err);
        }
    })


});

app.post('/delete/role/agent', urlencoder, function(res,req){
    console.log("Incoming delete request");
    var agent_name = res.body.agent_name;
    var role = res.body.role;

    var select_UID = "SELECT UID from agent_name where agent_name =?";

    conn.query(select_UID,[agent_name],function(err,result,field){

        if (!err){
            console.log(result);

        }
        else{
            console.log(err);
        }
    var UID    = result[0].UID;
    var delete_agent_role_query = "DELETE FROM agent_role where Role=? and UID = ?";

    conn.query(delete_agent_role_query, [role, UID], function(err,result,field){
            if (!err){
                console.log(result);
            }
            else{
                console.log(err);
            }      
    });
});


});
app.use('/api', route);
app.listen(port, function(){
    console.log("Connected on port"+port);
});


module.exports = conn;