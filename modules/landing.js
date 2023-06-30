class Chore {
    constructor(name, date, id, task) {
      this.name = name;
      this.date = date;
      this.id = id;
      this.task = task;
    }
  }
  
  //array to store Chore Objects
  let chores = []; 
  var myModal = new bootstrap.Modal(document.getElementById('myModal'),)
  
  //function to build the table rows
  function buildRow(table, chore)
  {
    let row = table.insertRow(1);
    row.setAttribute('id', `item-${chore.id}`)
    row.insertCell(0).innerHTML = chore.task;
    row.insertCell(1).innerHTML = chore.date;
    let action1 = row.insertCell(2);
    action1.appendChild(createRadioButton(chore.id, chore.name));
    row.insertCell(3).innerHTML = "";
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
      let body = tasker.querySelector('td').innerHTML;
      //console.log(body);
  
      //portion that sends the email
      Email.send({
        SecureToken : "8ecfb263-ab0a-4888-99c5-c2ab74f26991",
        To : 'patrick.f.corcoran@gmail.com',
        From : 'thenderman82@gmail.com',
        Subject : "Completed Task",
        Body : 'Person: ' + tasked + ' Task: ' + body
      }).then(
        message => myModal.show((document.getElementById("message").innerHTML = message))
      );
    });
      
    return radio;
  }
  
export {Chore, chores, myModal, buildRow, createRadioButton};