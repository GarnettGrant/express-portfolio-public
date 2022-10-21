/*
File name: contact.js 
Student’s Name: Garnett Akeele Grant
StudentID: 3011188923
Date: October 10th, 2022

Form Validation Credits: https://codepen.io/georgiostsirigos/pen/rWLaZJ
*/

function validateForm() {
    let n = document.getElementById('username').value;
    let p = document.getElementById('password').value;
    let onlyLetters =/^[a-zA-Z\s]*$/; 
    let onlyEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    
    if(n == "" || n == null){
        document.getElementById('usernameLabel').innerHTML = ('Please enter your username');
        document.getElementById('username').style.borderColor = "red";
        return false;
    }
       
  
    if (!n.match(onlyLetters)) {
        document.getElementById('usenameLabel').innerHTML = ('Please enter only letters');
        document.getElementById('username').style.borderColor = "red";
        return false;
    }

    if(p == "" || n == null){
        document.getElementById('passwordLabel').innerHTML = ('Please enter your password');
        document.getElementById('password').style.borderColor = "red";
        return false;
    }
       
  

    else{
          return true;
      }
      
}