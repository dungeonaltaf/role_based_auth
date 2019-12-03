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
                type: "POST",
                url: "http://52.66.196.67/post/insert/agent/",
                headers:{
                "content-type": "application/x-www-form-urlencoded"
                },
                
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
                  type: "POST",
                  url: "http://52.66.196.67/post/insert/permission",
                  headers:{
                  "content-type": "application/x-www-form-urlencoded"
                  },
                  
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
          var li3 = document.createElement("li");
          li3.id = "li3"+count_role;

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

        $("#add_more_privilege").click(function(){
          var newPermission = document.createElement("input");
          newPermission.type = "text";
          newPermission.name = "permission"+count_permission;
          newPermission.id = "permission"+count_permission;
          newPermission.className = "permission";
        

          var newResoruce = document.createElement("input");
          newResoruce.type = "text";
          newResoruce.name = "resource"+count_permission;
          newResoruce.id = "resource"+count_permission;
          newResoruce.className = "resource";
    

          var li = document.createElement("li");
          li.id = "li"+count_permission;
          var li1 = document.createElement("li");
          li1.id = "li1"+count_permission;

          var label_resource = document.createElement("label");
          label_resource.innerText = "Resource";
          var label_permission = document.createElement("label");
          label_permission.innerText= "Permission";

          var span_permission =document.createElement("span");
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
      
        $("#sp").click(function () { //user clicks button
          console.log("Button signin is cliche");
  
          var search_agent_name = $('#search_agent_name').val();
          var search_permission = $('#search_permission').val();
          var search_resource = $('#search_resource').val();

          console.log("search permission"+search_permission);
          console.log("search result is"+ search_resource);
  
          $.ajax(  {
                  type: "POST",
                  url: "http://52.66.196.67/post/find/userpermit/",
                  headers:{
                  "content-type": "application/x-www-form-urlencoded"
                  },
                  
                  data: {
                      name : search_agent_name,
                      permission :search_permission,
                      resource: search_resource
                  }
                  }).done(function (response) {
                  console.log(response);
                  });
          
          });

          $("#delete_role_agent_btn").click(function () { //user clicks button
            console.log("DELET ROLE AGENT IS CALLED");
    
            var agent_name = $('#delete_role_agent').val();
            var role = $('#delete_role_role').val();

            $.ajax(  {
                    type: "POST",
                    url: "http://52.66.196.67/delete/role/agent",
                    headers:{
                    "content-type": "application/x-www-form-urlencoded"
                    },
                    
                    data: {

                      agent_name : agent_name,
                      role: role
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