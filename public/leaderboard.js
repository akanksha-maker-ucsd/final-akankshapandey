
document.addEventListener("DOMContentLoaded", () => {

    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
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

    
    var sections = [];
    var teams = [];
    var teamProducts = {};
    var scores = {};
    var res;


    const response = fetch("https://slidespace.icu/api/sections")
    .then(response => {
    return response.json();
    }).then(json => {
        sections = JSON.parse(json.sections);
        sections = Object.keys(sections);

        for( i in sections){
            fetch(`https://slidespace.icu/api/sections/${sections[i]}/teams`)
            .then(response => {
            return response.json();
            }).then(json => {
                
                let parse = JSON.parse(json.names); 
                res =(Object.keys(parse));
                
            }).then(() => {
                teams = teams.concat(res);
            });
            console.log(teams.length);
            
        }
        

        
    });

    teamsNum = 26;
    const node = document.querySelector(".ideaTemplate");
    const grid = document.querySelector(".grid");
    console.log(node);

    for (const x of Array.from({length: teamsNum}, (_, i) => i + 1)) {
        console.log(x);
        fetch(`https://slidespace.icu/api/teams/${x.toString()}`)
            .then(response => {
            return response.json();
            }).then(json => {
                const clone = node.cloneNode(true);
                
                
                
                let parse = JSON.parse(json.team); 
                clone.id = parse.id;
                let team = JSON.parse(parse.members);
                let str = "";
                for(i in team){
                    if(i < team.length-1){
                    str += team[i] + ", ";
                    }
                    else{
                        str += team[i] 
                    }

                }
                
                console.log(parse);

                fetch(`https://slidespace.icu/api/teams/${x.toString()}/scores`)
                .then(response => {
                return response.json();
                }).then(json => {
                // let scores = JSON.parse(json);
                // var numScores = Object.keys(scores).map(function(key){
                //     return scores[key];
                // });

                // console.log(scores);
                // console.log(numScores);
                scores = JSON.parse(json.scores);
                console.log(scores);
                var values = Object.keys(scores).map(function(key){
                    return Number(scores[key]);
                });
                console.log(values);

                let sum = 0;
                let avg = 0;

                for( i in values){
                    sum += values[i];
                }

                avg = sum/values.length;
                clone.id = parse.id;
                clone.innerHTML = `<div class ="mvpTitle">${parse.name}</div>
                Members: ${str} <br>
                Score: ${avg}<br><br><br>
                <span class='comment_button' id = "${parse.id}">Comment</span><br><br><br>`;

                
                clone.style.visibility = "visible";
                grid.insertBefore(clone, node);



                
                }).then(() => {


                });
                
            }).then(() => {

            });

        
    }

    


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