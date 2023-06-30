class User {
    constructor(name, pw) {
      this.name = name;
      this.pw = pw;
    
    }
  }

var myModal = new bootstrap.Modal(document.getElementById('myModal'),{ 
keyboard: true,
focus: true
});  

//array to store Api Data
let logins = [];

//pull from Api
function getApi(){
  $.get('https://6489d1fc5fa58521cab04f75.mockapi.io/logins', (data) =>{
    //loop to iterate through the api data
    for(let i=0; i < data.length; i++ ){
        //creating array of api objects
        const name = data[i].name;
        const pw = data[i].password;
        const person = new User(name, pw);
        logins.push(person);
        
    }
});
};

//Main function to check entered values versus logins
function login(e){
  e.preventDefault();

    //get values from form
    let uname = document.getElementById('username').value;
    let upw = document.getElementById('password').value;
   
    //set object from form data
    const user = new User (uname, upw);

      // Compare the user object with the existing user array
    let match = logins.find(function(existingUser) {
    return existingUser.name === user.name && existingUser.password === user.password;
    
  });
  
  if (match) {
    // Call a function if a match is found
    pageLogin(match);
  } else {
    // Call a different function if no match is found
    pageLogin("fail");
  }
  
  // Reset the form
  document.getElementById("loginForm").reset();

};


//function to determine which page to log into
function pageLogin(attempt){
console.log(attempt.name);

switch(attempt.name){
  case "Admin":
    window.location.href='./pages/admin.html'
  break;
  case "Ayla":
    window.location.href='./pages/alist.html'
  break;
  case "Braiden":
    window.location.href='./pages/blist.html'
  break;
  case "Callan":
    window.location.href='./pages/clist.html'
  break;
  case "Delaney":
    window.location.href='./pages/dlist.html'
  break;
  //default for bad Username / Password Combo
  default:
    //alert("Username or Password Not Found");
    myModal.show();
    //location.reload();
    
}
};


//call to populate array from api
getApi();

//event listener
document.getElementById('login').addEventListener('click', login);