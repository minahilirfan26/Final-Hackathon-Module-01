  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
  import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, addDoc, serverTimestamp, query, where, getDocs,
    deleteDoc , deleteField } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
    import { getStorage, ref, uploadBytes,uploadBytesResumable, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-storage.js";

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
  const db = getFirestore(app);

  let flag = true;

/* onAuthStateChanged(auth, (user) => {
    if (user) {
        if(location.pathname !=='/admin.html'  && flag){
            location.href = "admin.html"
        }
      // ...
    } else {
        if(location.pathname !=='/signup.html'){
            location.href = "signup.html"
        }
    }
  });
  */

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
signUp && signUp.addEventListener("click", ( )=>{
    container.classList.add("active");
});
loginn && loginn.addEventListener("click", ( )=>{
    container.classList.remove("active");
});

let spiner = document.getElementById("spiner");



//SignUp----->>>>>>>>
let signupBtn = document.getElementById("signupBtn")

const signup = ()=>{
let fullName = document.getElementById("fullName");
let fatherName = document.getElementById("fatherName")
let phone = document.getElementById("phone")
let email = document.getElementById("email")
let password = document.getElementById("password")
spiner.style.display = "flex";
flag = false
try{
    createUserWithEmailAndPassword(auth, email.value, password.value)
  .then(async(userCredential) => {
   spiner.style.display = "none";
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
      name: fullName.value,
      fatherName: fatherName.value,
      phone: phone.value,
      email: email.value,
      password: password.value
      });
      flag = true;
      location.href = "admin.html"
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
} catch(err){
    console.log("err---->", err)
}
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
let signBtn2 = document.getElementById("signInBtn")
signBtn2 && signBtn2.addEventListener("click", ()=>{
    location.href = "admin.html"
})

  ///LogOut---->>>>>>>>
  const LogOutBtn = document.getElementById("logout");

  const signOutUser = ()=>{
  signOut(auth).then(() => {
    
  }).catch((error) => {
    
  });
  }
  
  LogOutBtn && LogOutBtn.addEventListener("click", signOutUser);


  //Curd Admin Details-------->>>>>>
  let clssTyimngs = document.getElementById("classTiming");
  let schedule = document.getElementById("schedule");
  let teacherName = document.getElementById("teacherName");
  let sectionName = document.getElementById("sectionName");
  let courseName = document.getElementById("courseName");
  let batchNumber = document.getElementById("batchNumber");

  ///curd adminBtns---->>>>>
  let createBtn = document.getElementById("createBtn");
  let viewBtn = document.getElementById("viewBtn")
  let updateBtn = document.getElementById("updateBtn")
  let deleteBtn = document.getElementById("deleteBtn");

  //Add
  const createData = async ()=>{
    spiner.style.display = "flex"
    const docRef = await addDoc(collection(db, "classData"), {
      clssTyimngs: clssTyimngs.value,
      schedule: schedule.value,
      teacherName: teacherName.value,
      sectionName: sectionName.value,
      courseName: courseName.value,
      batchNumber: batchNumber.value
      })
      spiner.style.display = "none"
      Swal.fire(
        'Data Created!',
        'You clicked the button!',
        'success'
      )
     /* .then((res)=>{
        Swal.fire(
            'Data Created!',
            'You clicked the button!',
            'success'
          )
      }).catch((err)=>{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: errorMessage
          })
      })*/
      console.log("Document written with ID: ", docRef.id);
  }
  createBtn && createBtn.addEventListener("click", createData)

//Update
  const upadteData = async()=>{
    spiner.style.display = "flex"
   try{
    const docRef = await setDoc(doc(db, "classData", batchNumber.value), {
        clssTyimngs: clssTyimngs.value,
        schedule: schedule.value,
        teacherName: teacherName.value,
        sectionName: sectionName.value,
        courseName: courseName.value,
      });
      spiner.style.display = "none"
      Swal.fire(
        'Data Updated!',
        'You clicked the button!',
        'success'
      )
   } catch(err){
    console.log("err---->>>", err)
    spiner.style.display = "none"
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage
      })
   }
  }
  updateBtn && updateBtn.addEventListener("click", upadteData)
  

  //Read
const getData = async()=>{
    const ref = doc(db, "classData", batchNumber.value);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
     clssTyimngs.value = docSnap.data().clssTyimngs;
     schedule.value = docSnap.data().schedule,
     teacherName.value = docSnap.data().teacherName;
     sectionName.value = docSnap.data().sectionName;
     courseName.value = docSnap.data().courseName;

    } else {
      console.log("No such document!");
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage
      })
    }
};
viewBtn && viewBtn.addEventListener("click", getData)

 //deleted data
 async function deleteData(){
    try{
    const cityRef = doc(db, 'classData', batchNumber.value);
    await updateDoc(cityRef, {
        clssTyimngs: deleteField(),
        teacherName: deleteField(),
        schedule: deleteField(),
        batchNumber : deleteField(),
        sectionName: deleteField(),
        courseName: deleteField()
    });
    Swal.fire(
        'Data Deleted!',
        'You clicked the button!',
        'success'
      )
    document.getElementById("name").value = "";
 document.getElementById("fname").value = "";
 document.getElementById("email").value = "";
 document.getElementById("password").value = "";
 document.getElementById("number").value = "";
 document.getElementById("rollno").value = "";
} catch(err){
    console.log("errr>>>>>>>", err)
}
 }
 deleteBtn && deleteBtn.addEventListener("click", deleteData)


 //Profile

 
 
 