//creates the User class Objects
class User {
    constructor(name, pw, id) {
      this.name = name;
      this.pw = pw;
      this.id = id;
    
    }
  }
//function to add new user to class
  function addUser() {
    // Get form values
    const name = document.getElementById("new-user").value;
    const pw = document.getElementById("new-password").value;

    // Create new Chore object
    const person = new User(name, pw);
  
    //push to Api
    postApi(person);
  
    //refresh page to clear existing tables
    location.reload();
  }

//declare array to store api data  
let users = [];

//function to post to the Api
function postApi(person){
    let uname = person.name;
    let upw = person.pw;
    
      $.post("https://6489d1fc5fa58521cab04f75.mockapi.io/logins", 
              { 
                      "name": uname,
                      "password": upw,  
              }
      );
  }

//function to get from Api
function getApi(){
  $.get('https://6489d1fc5fa58521cab04f75.mockapi.io/logins', (data) =>{
    //console.log(data);
    
    for(let i=0; i < data.length; i++ ){
        // Get api values
        
    const name = data[i].name;
    const pw = data[i].password;
    const id = data[i].id;
    
  
    // Create new Chore object
    const user = new User(name, pw, id);
  
    // Add chore to the array of chores
    users.push(user);
    buildRow(user);
    }
  
  })
  };

  //function to build the table rows
function buildRow(user)
{
  let table = document.getElementById('u-list');
  let row = table.insertRow(1);
  row.setAttribute('id', `item-${user.id}`)
  row.insertCell(0).innerHTML = user.name;
  row.insertCell(1).innerHTML = user.id;
  row.insertCell(2).innerHTML = user.pw;
  //button to launch update modal
  let button = $('<button/>', {
    'type': 'button',
    'class': 'btn btn-primary',
    'data-bs-toggle': 'modal',
    'data-bs-target': '#myModal',
    'text': 'Update'
  });
  let action1 = row.insertCell(3);
  $(action1).append(button, createDeleteButton(user.id));
 
}

//function to create the delete button
function createDeleteButton(id){
  let btn= document.createElement('button');
  btn.className = 'btn btn-danger';
  btn.id = id;
  btn.innerHTML = 'Delete';
  btn.onclick = () =>{
      //console.log(`Deleting row with id: item-${id}`);
      let elementToDelete = document.getElementById(`item-${id}`);
      elementToDelete.parentNode.removeChild(elementToDelete);
      //delete from Api        
      $.ajax({type: "DELETE", url: `https://6489d1fc5fa58521cab04f75.mockapi.io/logins/${id}`});
        
  };
  
  return btn;
  location.reload();
}



//function to update the Api
function updateUser(){
  let uid = document.getElementById("id").value;
  let uname = document.getElementById("user").value;
  let upw = document.getElementById("password").value;
  
    //send data to Api
    $.ajax(`https://6489d1fc5fa58521cab04f75.mockapi.io/logins/${uid}`, {
      method: 'PUT',
      data: {
        name: uname,
        password: upw,
      },
    })

  
 
}

//redraw the page after closing the modal
function closeModal(){
  getApi();
  location.reload();
  
}

//populate api data
getApi();

//event listeners
document.getElementById('add').addEventListener('click', addUser);
document.getElementById('update').addEventListener('click', updateUser);
document.getElementById('close').addEventListener('click', closeModal);