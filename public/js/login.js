//sending credentials to server for creating customer session
$(document).ready(function() {

    var count_role = 2;
    var count_permission = 2;
    var ip;

    $("#addIP").click(function() {
        ip = $('#ip').val();
        console.log("IP IS" + ip);
    })


    $("#add_user").click(function() { //user clicks button
        console.log("Button signin is clicke");

        var agent_name = $('#agent_name').val();
        var $items = $('.role');
        var length = $items.length;
        console.log(length);
        var role = [];
        for (var i = 0; i < length; i++) {
            role[i] = $('#role' + (i + 1)).val();
            console.log(role[i]);
            count_role = 2;
        }

        $.ajax({
            type: "POST",
            url: "http://" + ip + "/post/insert/agent/",
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },

            data: {
                agent_name: agent_name,
                role: role,
            }
        }).done(function(response) {
            var insert_agent = document.createElement("p");
            insert_agent.innerHTML = response;
            document.getElementById('res_server_add_user_list').appendChild(insert_agent);
            console.log(response);
        });

    });

    $("#submit_privilege").click(function() { //user clicks button
        console.log("Button signin is clicke");
        count_role = 2;
        var role_name = $('#role_name').val();
        var $permission = $('.permission');
        var $resoruce = $('.resource')
        var permission_length = $permission.length;
        console.log(permission_length);
        var permission = [];
        for (var i = 0; i < permission_length; i++) {
            permission[i] = $('#permission' + (i + 1)).val();
            console.log(permission[i]);
        }
        var resource_length = $resoruce.length;
        console.log(resource_length);
        var resource = [];
        for (var i = 0; i < resource_length; i++) {
            resource[i] = $('#resource' + (i + 1)).val();
            console.log(resource[i]);
        }


        $.ajax({
            type: "POST",
            url: "http://" + ip + "/post/insert/permission",
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },

            data: {
                role_name: role_name,
                resource: resource,
                permission: permission
            }
        }).done(function(response) {
            var insert_permit = document.createElement("p");
            insert_permit.innerHTML = response;
            document.getElementById('res_server_add_permission').appendChild(insert_permit);
            console.log(response);
        });

    });


    $("#add_role").click(function() {
        var newInput = document.createElement("input");
        newInput.type = "text";
        newInput.name = "role" + count_role;
        newInput.id = "role" + count_role;
        newInput.className = "role";
        var li3 = document.createElement("li");
        li3.id = "li3" + count_role;

        var label_role = document.createElement("label");
        label_role.innerText = "Role";

        var span_role = document.createElement("span");
        span_role.innerText = "Enter the role you want to assign";
        count_role++;

        document.getElementById('add_user_list').appendChild(li3);
        document.getElementById(li3.id).appendChild(label_role);
        document.getElementById(li3.id).appendChild(newInput);
        document.getElementById(li3.id).appendChild(span_role);

    });

    $("#add_more_privilege").click(function() {
        var newPermission = document.createElement("input");
        newPermission.type = "text";
        newPermission.name = "permission" + count_permission;
        newPermission.id = "permission" + count_permission;
        newPermission.className = "permission";


        var newResoruce = document.createElement("input");
        newResoruce.type = "text";
        newResoruce.name = "resource" + count_permission;
        newResoruce.id = "resource" + count_permission;
        newResoruce.className = "resource";


        var li = document.createElement("li");
        li.id = "li" + count_permission;
        var li1 = document.createElement("li");
        li1.id = "li1" + count_permission;

        var label_resource = document.createElement("label");
        label_resource.innerText = "Resource";
        var label_permission = document.createElement("label");
        label_permission.innerText = "Permission";

        var span_permission = document.createElement("span");
        span_permission.innerText = "Add Permission to it";

        var span_resource = document.createElement("span");
        span_resource.innerText = "Add Resource to it";

        count_permission++;
        console.log(count_permission);
        document.getElementById('add_res_list').appendChild(li);
        document.getElementById('add_res_list').appendChild(li1);
        document.getElementById(li.id).appendChild(label_resource);
        document.getElementById(li1.id).appendChild(label_permission);
        document.getElementById(li.id).appendChild(newResoruce);
        document.getElementById(li1.id).appendChild(newPermission);
        document.getElementById(li.id).appendChild(span_resource);
        document.getElementById(li1.id).appendChild(span_permission);


    });

    $("#sp").click(function() { //user clicks button
        console.log("Button signin is cliche");

        var search_agent_name = $('#search_agent_name').val();
        var search_permission = $('#search_permission').val();
        var search_resource = $('#search_resource').val();

        console.log("search permission" + search_permission);
        console.log("search result is" + search_resource);

        $.ajax({
            type: "POST",
            url: "http://" + ip + "/post/find/userpermit/",
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },

            data: {
                name: search_agent_name,
                permission: search_permission,
                resource: search_resource
            }
        }).done(function(response) {
            var res = document.createElement("p");
            res.innerHTML = response;
            document.getElementById('res_server_div').appendChild(res);
            console.log(response);
        });

    });

    $("#delete_role_agent_btn").click(function() { //user clicks button
        console.log("DELET ROLE AGENT IS CALLED");

        var agent_name = $('#delete_role_agent').val();
        var role = $('#delete_role_role').val();
        console.log("agent_name is " + agent_name);
        console.log("role to be deleted" + role);
        $.ajax({
            type: "POST",
            url: "http://" + ip + "/delete/role/agent",
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },

            data: {

                agent_name: agent_name,
                role: role
            }
        }).done(function(response) {
            var res = document.createElement("p");
            res.innerHTML = response;
            document.getElementById('res_server_del_div').appendChild(res);
            console.log(response);
        });

    });

    $("#update_agent_role_btn").click(function() { //user clicks button
        console.log("Update ROLE AGENT IS CALLED");

        var agent_name = $('#delete_role_agent').val();
        var role = $('#delete_role_role').val();
        console.log("agent_name is " + agent_name);
        console.log("role to be updated" + role);
        $.ajax({
            type: "POST",
            url: "http://" + ip + "/update/agent/role",
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },

            data: {

                update_agent_name: agent_name,
                add_role: role
            }
        }).done(function(response) {
            var res = document.createElement("p");
            res.innerHTML = response;
            document.getElementById('res_server_del_div').appendChild(res);
            console.log(response);
        });

    });

    $("#get_role_agent").click(function() { //user clicks button
        console.log("GET USER'S ROLE IS CALLED");

        var get_agent_name = $('#get_agent_name').val();
        console.log("agent_name is " + get_agent_name);
        console.log("http://" + ip + "/get/agent/roles");

        $.ajax({
            type: "POST",
            url: "http://" + ip + "/get/agent/roles",
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            data: {
                agent_name: get_agent_name,
            }
        }).done(function(response) {
            var res = document.createElement("p");
            res.innerHTML = response;
            document.getElementById('res_server_del_div').appendChild(res);
            console.log(response);
        });

        console.log(response);
    });

    $("#del_role_role").click(function() { //user clicks button
        console.log("DELETE  ROLE COMPLETELY IS CALLED");

        var del_role_role = $('#del_role_role_name').val();
        console.log("agent_name is " + del_role_role);
        console.log("http://" + ip + "/get/agent/roles");

        $.ajax({
            type: "POST",
            url: "http://" + ip + "/delete/role/role",
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                role: del_role_role,
            }
        }).done(function(response) {

            console.log(response);
        });

    });


});