//sending credentials to server for creating customer session
$(document).ready(function(){ 

  var count_role=2;
  var count_permission = 2;
    
    $("#add_user").click(function () { //user clicks button
        console.log("Button signin is clicke");

        var agent_name = $('#agent_name').val();
        var $items = $('.role');
        var length = $items.length;
        console.log(length);
        var role =[];
        for (var i=0;i<length;i++){
          role[i] = $('#role'+(i+1)).val();
          console.log(role[i]);
          count_role =2;
        }

        $.ajax(  {
                url: "http://localhost:3000/post/insert/agent",
                headers:{
                "content-type": "application/x-www-form-urlencoded"
                },
                method: "POST",
                data: {
                    agent_name : agent_name,
                    role :role,
                }
                }).done(function (response) {
                console.log(response);
                });
        
        });

        $("#submit_privilege").click(function () { //user clicks button
          console.log("Button signin is clicke");
          count_role =2;
          var role_name = $('#role_name').val();
          var $permission = $('.permission');
          var $resoruce = $('.resource')
          var permission_length = $permission.length;
          console.log(permission_length);
          var permission =[];
          for (var i=0;i<permission_length;i++){
            permission[i] = $('#permission'+(i+1)).val();
            console.log(permission[i]);
          }
          var resource_length = $resoruce.length;
          console.log(resource_length);
          var resource =[];
          for (var i=0;i<resource_length;i++){
            resource[i] = $('#resource'+(i+1)).val();
            console.log(resource[i]);
          }

  
          $.ajax(  {
                  url: "http://localhost:3000/post/insert/permission",
                  headers:{
                  "content-type": "application/x-www-form-urlencoded"
                  },
                  method: "POST",
                  data: {
                      role_name : role_name,
                      resource :resource,
                      permission : permission
                  }
                  }).done(function (response) {
                  console.log(response);
                  });
          
          });
      

        $("#add_role").click(function (){
          var newInput = document.createElement("input");
          newInput.type="text";
          newInput.name= "role"+count_role;
          newInput.id = "role"+count_role;
          newInput.className = "role";
          count_role++;
          document.getElementById('main').appendChild(newInput);
        });

        $("#add_more_privilege").click(function(){
          var newPermission = document.createElement("input");
          newPermission.type = "text";
          newPermission.name = "permission"+count_permission;
          newPermission.id = "permission"+count_permission;
          newPermission.className = "permission";
          newPermission.placeholder = "Permission";

          var newResoruce = document.createElement("input");
          newResoruce.type = "text";
          newResoruce.name = "resource"+count_permission;
          newResoruce.id = "resource"+count_permission;
          newResoruce.className = "resource";
          newResoruce.placeholder = "Resource";

          count_permission++;
          console.log(count_permission);
          document.getElementById('main2').appendChild(newResoruce);
          document.getElementById('main2').appendChild(newPermission);

        });
      
        $("#sp").click(function () { //user clicks button
          console.log("Button signin is cliche");
  
          var search_agent_name = $('#search_agent_name').val();
          var search_permission = $('#search_permission').val();
          var search_resource = $('#search_resource').val();

  
          $.ajax(  {
                  url: "http://localhost:3000/post/find/userpermit",
                  headers:{
                  "content-type": "application/x-www-form-urlencoded"
                  },
                  method: "POST",
                  data: {
                      name : search_agent_name,
                      permission :search_permission,
                      resource: search_resource
                  }
                  }).done(function (response) {
                  console.log(response);
                  });
          
          });




    //    $("#button_login").click(function () { //user clicks button
      //      console.log("button login is clicked")
        //    var login_email = $('#login_email').val();
          //  var login_password = $('#login_password').val();
            //$.ajax(  {
              //  url: "http://localhost:3000/post/login/",
                //headers:{
                //"content-type": "application/x-www-form-urlencoded"
                //},
                //method: "POST",
                //data: {
                  //  login_email:login_email,
                    //login_password : login_password
                //}
                //}).done(function (response) {
                //console.log(response);
                //});
            //});
  });