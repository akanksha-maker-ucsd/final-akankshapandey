document.addEventListener("DOMContentLoaded", () => {

      // Define the 'request' function to handle interactions with the server
  function server_request(url, data={}, verb, callback) {
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

    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
        content.style.display = "none";
        } else {
        content.style.display = "block";
        }
    });
    }

        // Handle logout POST request
        document.querySelector('.logout_menu').addEventListener('click', (event) => {
            console.log("HERE");
            // Submit the POST request
            server_request('/logout', {}, 'POST', (response) => {
              if (response.session_id == 0) {
                location.replace('/login');
              }
            });
      
        });


  
});