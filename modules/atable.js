import {Chore, chores, buildRow} from "../modules/landing.js";


  //function to get from Api
  function getApi(){
  $.get('https://6489d1fc5fa58521cab04f75.mockapi.io/ChoreDb', (data) =>{
      //console.log(data);
    
      
      for(let i=0; i < data.length; i++ ){
        // Get api values
        
    const name = data[i].name;
    const date = data[i].date;
    const id = data[i].id;
    const task = data[i].task;
  
    // Create new Chore object
    const chore = new Chore(name, date, id, task);
  
    // Add chore to the array of chores
    chores.push(chore);
    if(chore.name === 'Ayla') {
        let table = document.getElementById('a-list');
        buildRow(table, chore);
      } else {
        continue;
      }
    }
  
  })
  };

  //initial call to fill tables with data from Api
  getApi();
  