
document.addEventListener("DOMContentLoaded", () => {
    let first_name = document.querySelector('#first_name');
    let last_name = document.querySelector('#last_name');
    let email = document.querySelector('#email');
    let username = document.querySelector('#username').innerHTML;
    let id = 0;

    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    // Define the 'request' function to handle interactions with the server
    function server_request(url, data={}, verb, callback) {

        // server_request('/protected', {}, 'POST', (response) => {
        //   if (response.message == 'Access granted') {
        //     location.replace('/login');
        //   }
        // });
        return fetch(url, {
          credentials: 'same-origin',
          method: verb,
          body: JSON.stringify(data),
          headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(response => {
          if(callback)
            callback(response);
        })
        .catch(error => console.error('Error:', error));
      }



    fetch("/users")
    .then(response => {
    return response.json();
    }).then(users => {
        console.log(username);
        console.log(users);
        for (i in users) {
            for (u in users[i]){
            console.log(users[i][u]);
            if(users[i][u].username == username){
                console.log("IN");
                first_name.innerHTML = `First Name: ${users[i][u].first_name}`;
                last_name.innerHTML = `Last Name: ${users[i][u].last_name}`;
                email.innerHTML = `Email: ${users[i][u].email}`;
                document.getElementById('fn').setAttribute('value', users[i][u].first_name);
                document.getElementById('ln').setAttribute('value', users[i][u].last_name);
                document.getElementById('sID').setAttribute('value', users[i][u].student_id);
                document.getElementById('em').setAttribute('value', users[i][u].email);
                document.getElementById('un').setAttribute('value', users[i][u].username);
                id = users[i][u].id;
            }
            }


        }
    });

    document.querySelector('.save_button').addEventListener('click', (event) => {

    let data = Object.fromEntries(new FormData(edit_user).entries());
    console.log(data);
      server_request(`/users/${id}`, data, 'PUT', function(response) {
        alert("Edit Successful!");
      });
    });

        // Handle logout POST request
        document.querySelector('.logout_menu').addEventListener('click', (event) => {
          // Submit the POST request
          server_request('/logout', {}, 'POST', (response) => {
            if (response.session_id == 0) {
              location.replace('/login');
            }
          });
    
      });
    


  });