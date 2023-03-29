document.addEventListener("DOMContentLoaded", () => {

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
  
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    // Handle Login POST Request
    let register_form = document.querySelector('form[name=register_form]');
      register_form.addEventListener('submit', (event) => {
        // Stop the default form behavior
        event.preventDefault();
  
        // Grab the needed form fields
        const action = register_form.getAttribute('action');
        const method = register_form.getAttribute('method');
        const data = Object.fromEntries(new FormData(register_form).entries());

        console.log(action);
        console.log(method);
        console.log(data);
  
        // Submit the POST request
        server_request(action, data, method, (response) => {
            alert("registration successful!");
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