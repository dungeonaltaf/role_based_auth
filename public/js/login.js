//sending credentials to server for creating customer session
$(document).ready(function() {

    var count_role = 2;
    var count_permission = 2;
    console.log("count_permission" + count_permission);
    var ip = window.location.origin;
    console.log("ip is" + ip);
    document.getElementById("remove_more_privilege").disabled = true;
    document.getElementById("remove_role").disabled = true;
    $('#ServerForm').hide();
    $('#AddUserForm').hide();
    $('#NewRoleForm').hide();
    $('#SearchRoleAgent').hide();
    $('#DeleteRoleAgentForm').hide();
    $('#GetRoleAgentForm').hide();
    $('#DeleteRoleRoleForm').hide();


    $("#add_user").click(function() {
        count_role = 2;
        //user clicks button
        console.log("Button signin is clicke");
        $('#res_server_add_user_list').empty();
        var agent_name = $('#agent_name').val();
        var $items = $('.role');
        var length = $items.length;
        console.log(length);
        var role = [];
        for (var i = 0; i < length; i++) {
            role[i] = $('#role' + (i + 1)).val();
            console.log(role[i]);

        }

        $.ajax({
            type: "POST",
            url: ip + "/post/insert/agent/",
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


        for (var i = 0; i < length; i++) {
            $('#role' + (i + 1)).val('');
        }

        function myFunction() {
            console.log("entered into timer function reset");
            location.reload(true);

        }
        document.getElementById("add_user").disabled = true;
        setTimeout(myFunction, 2000);
        setTimeout(console.log("the function is working fine"), 1);


    });

    $("#submit_privilege").click(function() { //user clicks button
        console.log("Button signin is clicke");
        count_permission = 2;
        $('#res_server_add_permission').empty();
        var role_name = $('#role_name').val();
        var $permission = $('.permission');
        var $resoruce = $('.resource')
        var permission_length = $permission.length;
        console.log("permission data length" + permission_length);
        var permission = [];
        for (var i = 0; i < permission_length; i++) {
            permission[i] = $('#permission' + (i + 1)).val();
            console.log("permission is=" + permission[i]);
        }
        var resource_length = $resoruce.length;
        console.log(resource_length);
        var resource = [];
        for (var i = 0; i < resource_length; i++) {
            resource[i] = $('#resource' + (i + 1)).val();
            console.log("resource is" + resource[i]);
        }


        $.ajax({
            type: "POST",
            url: ip + "/post/insert/permission",
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

        for (var i = 0; i < permission_length; i++) {
            $('#permission' + (i + 1)).val('');
            console.log("permission is=" + permission[i]);
        }
        var resource_length = $resoruce.length;
        console.log(resource_length);
        var resource = [];
        for (var i = 0; i < resource_length; i++) {
            $('#resource' + (i + 1)).val('');
            console.log("resource is" + resource[i]);
        }

        function myFunction() {
            console.log("entered into timer function reset");
            location.reload(true);

        }
        document.getElementById("submit_privilege").disabled = true;
        setTimeout(myFunction, 2000);

    });


    $("#add_role").click(function() {

        var label_role = document.createElement("label");
        label_role.innerText = "Role";



        var newInput = document.createElement("input");
        newInput.type = "text";
        newInput.name = "role" + count_role;
        newInput.id = "role" + count_role;
        newInput.className = "role";

        var span_role = document.createElement("span");
        span_role.innerText = "Enter the role you want to assign";

        var li3 = document.createElement("li");
        li3.id = "li3" + count_role;




        count_role++;

        console.log(li3.id);
        console.log(count_role);
        console.log(document.getElementById('add_user_list').appendChild(li3));
        console.log(document.getElementById(li3.id).appendChild(label_role));
        console.log(document.getElementById(li3.id).appendChild(newInput));
        console.log(document.getElementById(li3.id).appendChild(span_role));
        if (count_role > 2) {
            document.getElementById("remove_role").disabled = false;
        }

    });

    $("#remove_role").click(function() {

        var li3ID = "li3" + (count_role - 1);
        console.log("li id is" + li3ID);
        $("#" + li3ID).remove();


        count_role--;
        if (count_role == 2) {
            document.getElementById("remove_role").disabled = true;
        }


    });

    $("#add_more_privilege").click(function() {

        console.log("countpermission" + count_permission);
        var newPermission = document.createElement("input");
        newPermission.type = "text";
        newPermission.name = "permission" + count_permission;
        newPermission.id = "permission" + count_permission;
        console.log("newPermission id=" + newPermission.id);
        newPermission.className = "permission";


        var newResoruce = document.createElement("input");
        newResoruce.type = "text";
        newResoruce.name = "resource" + count_permission;
        newResoruce.id = "resource" + count_permission;
        console.log("newResource id=" + newResoruce.id);
        newResoruce.className = "resource";


        var li = document.createElement("li");
        li.id = "li" + count_permission;
        var li1 = document.createElement("li");
        li1.id = "li1" + count_permission;
        console.log("liID" + li.id);

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

        if (count_permission > 2) {
            document.getElementById("remove_more_privilege").disabled = false;
        }

    });

    $("#remove_more_privilege").click(function() {
        console.log("remove button is called");
        console.log("remove more privilege");
        console.log("count permission is" + count_permission - 1);

        var li1ID = "li1" + (count_permission - 1);
        console.log("li id is" + li1ID);
        $("#" + li1ID).remove();


        var liID = "li" + (count_permission - 1);
        console.log("li id is" + liID);
        $("#" + liID).remove();

        count_permission--;

        if (count_permission == 2) {
            document.getElementById("remove_more_privilege").disabled = true;
        }

    });

    $("#sp").click(function() { //user clicks button
        console.log("Button signin is cliche");
        $('#res_server_div').empty();
        var search_agent_name = $('#search_agent_name').val();
        var search_permission = $('#search_permission').val();
        var search_resource = $('#search_resource').val();

        console.log("search permission" + search_permission);
        console.log("search result is" + search_resource);

        $.ajax({
            type: "POST",
            url: ip + "/post/find/userpermit/",
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

        $('#search_permission').val('');
        $('#search_resource').val('');

    });

    $("#delete_role_agent_btn").click(function() { //user clicks button
        console.log("DELET ROLE AGENT IS CALLED");
        $('#res_server_del_div').empty();
        var agent_name = $('#delete_role_agent').val();
        var role = $('#delete_role_role').val();
        console.log("agent_name is " + agent_name);
        console.log("role to be deleted" + role);
        $.ajax({
            type: "POST",
            url: ip + "/delete/role/agent",
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
        $('#res_server_del_div').empty();
        var agent_name = $('#delete_role_agent').val();
        var role = $('#delete_role_role').val();
        console.log("agent_name is " + agent_name);
        console.log("role to be updated" + role);
        $.ajax({
            type: "POST",
            url: ip + "/update/agent/role",
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
        $('#res_server_get_roles_agent_div').empty();
        var get_agent_name = $('#get_agent_name').val();
        console.log("agent_name is " + get_agent_name);
        console.log("http://" + ip + "/get/agent/roles");

        $.ajax({
            type: "POST",
            url: ip + "/get/agent/roles",
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            data: {
                agent_name: get_agent_name,
            }
        }).done(function(response) {
            $.each(response, function(index, element) {
                console.log(element.Role);
                var res = document.createElement("p");
                res.innerHTML = element.Role;
                document.getElementById('res_server_get_roles_agent_div').appendChild(res);
            });
            console.log(response);
        });


    });

    $("#del_role_role").click(function() { //user clicks button

        console.log("DELETE  ROLE COMPLETELY IS CALLED");

        var del_role_role = $('#del_role_role_name').val();
        console.log("agent_name is " + del_role_role);
        console.log("http://" + ip + "/get/agent/roles");

        $.ajax({
            type: "POST",
            url: ip + "/delete/role/role",
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                role: del_role_role,
            }
        }).done(function(response) {
            var res = document.createElement("p");
            res.innerHTML = response;
            document.getElementById('res_server_del_role_role_div').appendChild(res);
            console.log(response);
        });
        $('#res_server_del_role_role_div').empty();

    });

    $("#menu_set_ip").click(function() {
        $('#ServerForm').hide();
        $('#AddUserForm').hide();
        $('#NewRoleForm').hide();
        $('#SearchRoleAgent').hide();
        $('#DeleteRoleAgentForm').hide();
        $('#GetRoleAgentForm').hide();
        $('#DeleteRoleRoleForm').hide();
        console.log("Showing IP Config");
        $('#ServerForm').show();
    });

    $("#add_user_show").click(function() {
        $('#ServerForm').hide();
        $('#AddUserForm').hide();
        $('#NewRoleForm').hide();
        $('#SearchRoleAgent').hide();
        $('#DeleteRoleAgentForm').hide();
        $('#GetRoleAgentForm').hide();
        $('#DeleteRoleRoleForm').hide();
        console.log("Showing User Added Form");
        $('#AddUserForm').show();
    });

    $("#add_role_show").click(function() {
        $('#ServerForm').hide();
        $('#AddUserForm').hide();
        $('#NewRoleForm').hide();
        $('#SearchRoleAgent').hide();
        $('#DeleteRoleAgentForm').hide();
        $('#GetRoleAgentForm').hide();
        $('#DeleteRoleRoleForm').hide();
        console.log("Showing Role Form");
        $('#NewRoleForm').show();
    });

    $("#delete_role_show").click(function() {
        $('#ServerForm').hide();
        $('#AddUserForm').hide();
        $('#NewRoleForm').hide();
        $('#SearchRoleAgent').hide();
        $('#DeleteRoleAgentForm').hide();
        $('#GetRoleAgentForm').hide();
        $('#DeleteRoleRoleForm').hide();
        console.log("Showing Role Delete Form");
        $('#DeleteRoleRoleForm').show();
    });
    $("#search_user_show").click(function() {
        $('#ServerForm').hide();
        $('#AddUserForm').hide();
        $('#NewRoleForm').hide();
        $('#SearchRoleAgent').hide();
        $('#DeleteRoleAgentForm').hide();
        $('#GetRoleAgentForm').hide();
        $('#DeleteRoleRoleForm').hide();
        console.log("Showing Get User Form");
        $('#SearchRoleAgent').show();
    });

    $("#delete_user_role_show").click(function() {
        $('#ServerForm').hide();
        $('#AddUserForm').hide();
        $('#NewRoleForm').hide();
        $('#SearchRoleAgent').hide();
        $('#DeleteRoleAgentForm').hide();
        $('#GetRoleAgentForm').hide();
        $('#DeleteRoleRoleForm').hide();
        console.log("Showing IP Config");
        $('#DeleteRoleAgentForm').show();
    });

    $("#get_user_role_show").click(function() {
        $('#ServerForm').hide();
        $('#AddUserForm').hide();
        $('#NewRoleForm').hide();
        $('#SearchRoleAgent').hide();
        $('#DeleteRoleAgentForm').hide();
        $('#GetRoleAgentForm').hide();
        $('#DeleteRoleRoleForm').hide();
        console.log("Showing IP Config");
        $('#GetRoleAgentForm').show();
    });





});