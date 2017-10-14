<<<<<<< HEAD
function validate() {
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  if ( username == 'you' && password == 'tube') {
    alert('Login successfully');
    window.location = 'inventory'; // Redirecting to other page.  
    return false;
    } else {
    alert('Login failed');
    return flase;
    }
  }
=======
function validate() {
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  if ( username == 'you' && password == 'tube') {
    alert('Login successfully');
    window.location = 'inventory'; // Redirecting to other page.
    return false;
    } else {
    alert('Login failed');
    return flase;
    }
  }
>>>>>>> 54c00cf894df0546cf280031018f1ced6fb023eb
