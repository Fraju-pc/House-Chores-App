class Chore {
  constructor(name, date, id, task) {
    this.name = name;
    this.date = date;
    this.id = id;
    this.task = task;
  }

}

//Global Variable
var myModal = new bootstrap.Modal(document.getElementById('myModal'),)
counter = 0;
//array to store Chore Objects
let chores = []; 

//function to create Chore class object
function addChore() {
  // Get form values
  const name = document.getElementById("assigned-person").value;
  const date = document.getElementById("date-assigned").value;
  const id = (chores.length + 1);
  const task = document.getElementById("assigned-task").value;

  // Create new Chore object
  const chore = new Chore(name, date, id, task);

  // Add chore to the array of chores
  //chores.push(chore);

  //push to Api
  postApi(chore);

  //pull from api
  getApi();  

  //refresh page to clear existing tables
  location.reload();
}

//function to get from Api
function getApi(){
$.get('https://6489d1fc5fa58521cab04f75.mockapi.io/ChoreDb', (data) =>{
	console.log(data);
  
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
  buildTable(chore);
  }

})
};

//function to post to Api
function postApi(chore){
  
  let cname = chore.name;
	let cdate = chore.date;
	//let cid = chore.id;
  let ctask = chore.task;
  
	$.post("https://6489d1fc5fa58521cab04f75.mockapi.io/ChoreDb", 
			{ 
					"name": cname,
					"date": cdate,
					"task": ctask    
			}
	);

}

//function to create table
function buildTable(chore) {
 //Conditional to check which table should be written too
 if(chore.name === 'Ayla') {
  let table = document.getElementById('a-list');
  buildRow(table, chore);
} else if(chore.name === 'Braiden'){
  let table = document.getElementById('b-list');
  buildRow(table, chore);
} else if(chore.name === 'Callan'){
  let table = document.getElementById('c-list');
  buildRow(table, chore);
} else if(chore.name === 'Delaney'){
  let table = document.getElementById('d-list');
  buildRow(table, chore);
}
};

//function to build the table rows
function buildRow(table, chore)
{
  let row = table.insertRow(1);
  row.setAttribute('id', `item-${chore.id}`)
  row.insertCell(0).innerHTML = chore.task;
  row.insertCell(1).innerHTML = chore.date;
  let action1 = row.insertCell(2);
  action1.appendChild(createRadioButton(chore.id, chore.name));
  let action2 = row.insertCell(3);
  action2.appendChild(createDeleteButton(chore.id));
  document.getElementById('assigned-task').value = '';
}

//function to create the completed task button, which sends an email to the admin
function createRadioButton(id, tasked){
  let radio = document.createElement('button');
  radio.className = 'btn btn-primary'
  radio.id = `task-${id}`;
  radio.innerHTML = 'Task Complete?';
  radio.type = 'submit';
  radio.addEventListener('click', () =>{
    let tasker = document.getElementById(`item-${id}`);
    //console.log(tasker);
    body = tasker.querySelector('td').innerHTML;
    //console.log(body);

    //portion that sends the email
    Email.send({
      SecureToken : "8ecfb263-ab0a-4888-99c5-c2ab74f26991",
      To : 'patrick.f.corcoran@gmail.com',
      From : 'thenderman82@gmail.com',
      Subject : "Completed Task",
      Body : 'Person: ' + tasked + ' Task: ' + body
    }).then(
    //message => alert(message)
      message => myModal.show((document.getElementById("message").innerHTML = message)) 
    );
  });
    
  return radio;
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
        $.ajax({type: "DELETE", url: `https://6489d1fc5fa58521cab04f75.mockapi.io/ChoreDb/${id}`});
          
    };
    
    return btn;
    location.reload();
}

//Event Listener for Create Button, checks for which person task is being created for
document.getElementById('add').addEventListener('click', addChore);

//initial call to fill tables with data from Api
getApi();
