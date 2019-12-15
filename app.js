var express = require("express");
var mysql = require("mysql");
const bodyparser = require("body-parser");
var urlencoder = bodyparser.urlencoded({ extended: true });
var app = express();
var async = require("async");

const args = require("minimist")(process.argv.slice(2));
const port = args["port"];

var route = require("./routes/route");

var path = require("path");
var cors = require("cors");

app.use(express.static(__dirname + "/public"));

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "role"
});

conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected to mysql!");
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/public/index.html"));

    // conn.query("SELECT * from agent", function(err,result,field){
    //   if(!err){
    //     console.log(result);
    // }
    // })
});

app.post("/post/insert/agent/", cors(), urlencoder, function(req, res) {
    // var req_length = Object.keys(req.body).length;
    //console.log("Length="+req_length);
    console.log(req.body.agent_name);
    console.log(req.body.role);
    var role = req.body.role;
    var role_length = role.length;
    console.log("length is " + role_length);
    console.log(req.body);
    var agent_uid;

    var role_name = [];
    var agent_name = req.body.agent_name;
    for (var i = 0; i < role_length; i++) {
        role_name[i] = role[i];
    }
    var insert_agentname_query = "INSERT INTO agent_name(agent_name) values(?)";
    conn.query(insert_agentname_query, [agent_name], function(
        err,
        result,
        field
    ) {
        if (!err) {
            console.log(result);
            var select_uid_query = "SELECT UID from agent_name where agent_name = ?";
            conn.query(select_uid_query, [agent_name], function(err, result, field) {
                if (!err) {
                    console.log("The result id of agent is" + result[0].UID);
                    agent_uid = result[0].UID;

                    for (var i = 0; i < role_length; i++) {
                        var insert_role_query = "INSERT INTO agent_role(UID, Role) values(? , ?)";
                        console.log("agent uid is " + agent_uid);
                        conn.query(insert_role_query, [agent_uid, role_name[i]], function(
                            err,
                            result,
                            field
                        ) {
                            if (!err) {
                                console.log(result);
                                res.end("User Added");
                            } else {
                                console.log(err);
                                res.end("Couldn't add user");
                            }
                        });
                    }



                } else {
                    console.log("THIS IS ERROR REPORTED");

                    console.log(err);

                    console.log("");
                    console.log("");

                }

            });


        } else {
            console.log(err);
            res.send("The system has the user already.Please go to update section");
        }
    });


});

app.post("/post/insert/permission", cors(), urlencoder, function(req, res) {

    console.log(req.body.role_name);
    console.log("resources are=" + req.body.resource);
    console.log("permissions are= " + req.body.permission);

    var permission = req.body.permission;

    console.log("permission are in variable ==" + permission);
    var permission_length = permission.length;
    var resource = req.body.resource;
    var resource_length = resource.length;
    console.log("length is " + resource_length);
    console.log(req.body);
    var role_name = req.body.role_name;

    var permission_list = [];
    for (var i = 0; i < permission_length; i++) {
        permission_list[i] = permission[i];
    }

    var resource_list = [];
    for (var i = 0; i < resource_length; i++) {
        resource_list[i] = resource[i];
    }

    //the insertion loop in agent_role
    var permit = 0;
    for (var i = 0; i < permission_length; i++) {
        var insert_role_query =
            "INSERT INTO resource_permission (role_name, resource , permission) values(? , ? , ?)";
        console.log("role_name" + role_name);
        conn.query(
            insert_role_query, [role_name, resource_list[i], permission_list[i]],
            function(err, result, field) {
                if (!err) {
                    console.log(result);
                } else {
                    console.log(err);
                    res.end("Resource couldn't be added");
                }
            }
        );
    }

    res.end("Resource added with permission");
});



app.post("/post/find/userpermit/", cors(), urlencoder, function(res, req) {
    var permission_string;

    console.log("We are searching !!");
    var name = res.body.name;
    var resource = res.body.resource;
    var permission = res.body.permission;

    console.log(name);
    console.log(resource);
    console.log(permission);
    var select_uid_from_name = "SELECT UID from agent_name where agent_name = ?";
    conn.query(select_uid_from_name, [name], function(err, result_uid, field) {
        if (!err && result_uid.length > 0) {
            console.log(
                "UID OF THE AGENT from select uid from agent_name where agent_name" +
                result_uid[0].UID
            );

            var select_resource_permission =
                "SELECT role_name FROM resource_permission WHERE resource = ? AND permission = ? ";

            conn.query(select_resource_permission, [resource, permission], function(
                err,
                result_role_name,
                field
            ) {
                console.log("resource request is= " + resource);
                console.log("permission request is" + permission);
                console.log(
                    "lenght of rows for select role_name from res_perm where resource =? and permission=? " +
                    result_role_name.length
                );
                if (!err && result_role_name.length > 0) {


                    console.log("role_name" + result_role_name[0].role_name);
                    console.log(
                        "The uid of the select  uid from agent_name where agent_name=? == " +
                        result_uid[0].UID
                    );
                    var uid = result_uid[0].UID;
                    console.log(
                        "Query executed :: select role_name from resource permission where resource = ? and permission=?"
                    );



                    var select_uid_role =
                        "SELECT COUNT(UID) as Count from agent_role where uid =? and role = ?";
                    var num_rows = result_role_name.length;

                    console.log("numbers of rows to iterate" + num_rows);






                    async.forEachOf(result_role_name, function(dataElement, irr, inner_callback) {






                        console.log("Value of i =" + irr);
                        console.log(irr);
                        console.log(result_role_name[irr].role_name);
                        conn.query(
                            select_uid_role, [uid, result_role_name[irr].role_name],
                            function(err, result, field) {
                                console.log("value of i before err check =" + irr);
                                if (!err) {
                                    console.log("result is" + result);
                                    console.log("result count is" + result[0].Count);
                                    console.log("value of i inside if(!err)=" + irr);
                                    if (result[0].Count >= 1) {
                                        console.log("Entered if->if");
                                        console.log("value of i" + irr);
                                        console.log("Query approved");
                                        permission_string = "Permitted";

                                        console.log(permission_string);
                                        console.log('');
                                        console.log('');
                                        req.end(permission_string);
                                    } else {
                                        console.log("value of i=" + irr);
                                        console.log("Entered if->else");
                                        console.log("i before check is" + irr);
                                        if (irr == (result_role_name.length - 1)) {
                                            console.log("i is" + irr);
                                            console.log("even last role's wasn't permitted");
                                            req.end("NotPermitted");
                                        } else {
                                            permission_string = "Not Permitted";
                                            console.log(permission_string);
                                        }
                                        console.log('');
                                    }
                                } else {
                                    console.log(err);
                                }
                            }
                        );
                        console.log(" ");
                        console.log(" ");



                    })

                } else {
                    console.log(err);
                    req.end("Resource or permission not in the system");
                }
            });
        } else {
            req.end("Agent not present in the system!");
            console.log(err);
        }
    });
    console.log("permission_string is=" + permission_string);
});




app.post("/delete/role/role", cors(), urlencoder, function(req, res) {
    var role = req.body.role;
    console.log(req.body);
    console.log("role is" + role);
    var delete_role_from_permission_query =
        "DELETE FROM resource_permission where role_name = ?";
    conn.query(delete_role_from_permission_query, [role], function(err, result, field) {
        if (!err) {
            console.log("delete result from resource" + result);
        } else {
            console.log(err);
        }
    });

    var delete_role_from_agent_query = "DELETE FROM agent_role where Role= ?";
    conn.query(delete_role_from_agent_query, [role], function(
        err,
        result,
        field
    ) {
        if (!err) {
            console.log(result);
            if (result.affectedRows > 0) {
                res.end("Role Deleted");
            } else {
                res.end("There is no such Role");
            }
        } else {
            console.log(err);
        }
    });
});

app.post("/delete/role/agent", cors(), urlencoder, function(res, req) {
    console.log("");
    console.log("");
    console.log("Incoming delete request");
    var agent_name = res.body.agent_name;
    var role = res.body.role;

    console.log("agent_name=" + agent_name);
    console.log("role is" + role);

    var select_UID = "SELECT UID from agent_name where agent_name =?";

    conn.query(select_UID, [agent_name], function(err, result, field) {
        if (!err && result.length > 0) {
            console.log("succesuful query uid of agent is =" + result);

            var UID = result[0].UID;
            console.log("UID of the AGENT IS=" + UID);
            if (UID) {
                var delete_agent_role_query =
                    "DELETE FROM agent_role where Role=? and UID = ?";

                conn.query(delete_agent_role_query, [role, UID], function(
                    err,
                    result_del,
                    field
                ) {
                    if (!err) {
                        console.log("Deletion successful" + result_del);
                        console.log(
                            "Number of records deleted: " + result_del.affectedRows
                        );
                        if (result_del.affectedRows > 0) {
                            req.end("Deletion Successful");
                        } else {
                            req.end("Role is not assigned to user before");
                        }
                    } else {
                        console.log(err);
                    }
                });
            } else {
                console.log(err);
            }
        } else {
            req.end("No such user");
        }
    });
});

app.post("/get/agent/roles", cors(), urlencoder, function(req, res) {
    console.log("Retrieving agent's Roles");
    var agent_name = req.body.agent_name;
    var select_agent_uid = "SELECT UID from agent_name where agent_name  = ?";
    console.log("agent name is" + agent_name);

    conn.query(select_agent_uid, [agent_name], function(err, result, field) {

        console.log("result length is" + result.length);

        if (!err) {
            if (result.length > 0) {
                console.log("result is" + result);
                var UID = result[0].UID;
                console.log("UID" + UID);
                var select_role = "SELECT Role from agent_role where UID =?";
                conn.query(select_role, [UID], function(err, result, field) {
                    if (!err) {
                        console.log("");
                        console.log("");
                        console.log("RESULT-->");
                        console.log(result);

                        res.json(result);
                    } else {
                        console.log(err);
                    }
                });
            } else {
                var response = [{ Role: 'Agent Not in the System' }];
                console.log(response);
                res.json(response);

            }
        } else {
            console.log(err);
        }




    });
});

app.post("/update/agent/role", urlencoder, function(req, res) {
    console.log("Incoming update agent request");
    var update_agent_name = req.body.update_agent_name;
    var add_role = req.body.add_role;

    var SELECT_UID_QUERY = "SELECT UID from agent_name where agent_name =? ";
    conn.query(SELECT_UID_QUERY, [update_agent_name], function(
        err,
        result,
        field
    ) {
        if (!err) {

            var UID = result[0].UID;
            console.log("UID of agent is" + UID);

            if (UID) {
                var add_role_query = "INSERT INTO agent_role(UID, Role) VALUES(?,?)";
                conn.query(add_role_query, [UID, add_role], function(err, result, field) {
                    if (!err) {
                        res.end("Role has been added");
                    }
                });
            } else {
                res.end("Please create a user first!");
            }
        } else {
            console.log(err);
        }
    });
});





app.use("/api", route);

app.listen(port, function() {
    console.log("Connected on port" + port);
});

module.exports = conn;