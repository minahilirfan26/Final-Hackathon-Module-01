  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB0CO5E11neISvQNKdxqJSWOsvdCAncpIE",
    authDomain: "frontend-project-946bc.firebaseapp.com",
    projectId: "frontend-project-946bc",
    storageBucket: "frontend-project-946bc.appspot.com",
    messagingSenderId: "153562526705",
    appId: "1:153562526705:web:ac1e8b258c7b80f5350a50"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const container = document.querySelector(".container");
  const pwShowHide = document.querySelectorAll(".showHidePw");
  const pwFields = document.querySelectorAll(".password");
  const signUp = document.querySelector(".signup-link");
  const loginn = document.querySelector(".login-link");

//   js code to show/hide password and change icon
pwShowHide.forEach(eyeIcon =>{
    eyeIcon.addEventListener("click", ()=>{
        pwFields.forEach(pwField =>{
            if(pwField.type ==="password"){
                pwField.type = "text";

                pwShowHide.forEach(icon =>{
                    icon.classList.replace("uil-eye-slash", "uil-eye");
                })
            }else{
                pwField.type = "password";

                pwShowHide.forEach(icon =>{
                    icon.classList.replace("uil-eye", "uil-eye-slash");
                })
            }
        }) 
    })
})

// js code to appear signup and login form
signUp.addEventListener("click", ( )=>{
    container.classList.add("active");
});
loginn.addEventListener("click", ( )=>{
    container.classList.remove("active");
});

let spiner = document.getElementById("spiner");

onAuthStateChanged(auth, (user) => {
  if (user) {
   location.pathname = "/adminDetails/admin.html"
    const uid = user.uid;
  
  } else {
  
  }
});

//SignUp----->>>>>>>>
let signupBtn = document.getElementById("signupBtn")

const signup = ()=>{
let fullName = document.getElementById("fullName");
let fatherName = document.getElementById("fatherName")
let phone = document.getElementById("phone")
let email = document.getElementById("email")
let password = document.getElementById("password")
spiner.style.display = "flex";

createUserWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
   spiner.style.display = "none";
    const user = userCredential.user;
    console.log("user",user)
    Swal.fire(
      'Have a nice Day!',
      'You clicked the button!',
      'success'
    )
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    spiner.style.display = "none";
    console.log(errorMessage)
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: errorMessage
    })
  });
  fullName.innerHTML = "";
  fatherName.innerHTML = "";
  phone.innerHTML = "";
  email.innerHTML = "";
  password.innerHTML = "";
}

signupBtn && signupBtn.addEventListener("click", signup)


///Login------------>>>>>>>>>
let loginBtn = document.getElementById("signInBtn")

const login = ()=>{
  let email = document.getElementById("signInEmail")
  let password = document.getElementById("signInpassword")
  spiner.style.display = "flex";

try{
  signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    const user = userCredential.user;
    spiner.style.display = "none";
    console.log(user)
    Swal.fire(
      'Have a nice Day!',
      'You clicked the button!',
      'success'
    )
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    spiner.style.display = "none";
    console.log("error----->",errorMessage, errorCode)
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: errorMessage
    })
  });
  email.innerHTML = "";
  password.innerHTML = "";
} catch(err){
  console.log(err)
}
}

loginBtn && loginBtn.addEventListener("click", login)