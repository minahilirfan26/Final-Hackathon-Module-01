  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
  import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, addDoc, serverTimestamp, query, where, getDocs,
    deleteDoc , deleteField, onSnapshot } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
    import { getStorage, ref, uploadBytes,uploadBytesResumable, getDownloadURL, deleteObject, getMetadata } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-storage.js";
    

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
  const storage = getStorage();

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
      location.href = "/admin/index.html"
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
  location.href = "/admin/index.html"
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
  spiner.style.display = "none"
 
}
}

loginBtn && loginBtn.addEventListener("click", login)
/*let signBtn2 = document.getElementById("signInBtn")
signBtn2 && signBtn2.addEventListener("click", ()=>{
    location.href = "/admin/index.html"
})*/

  ///LogOut---->>>>>>>>
  const LogOutBtn = document.getElementById("logout");

  const signOutUser = ()=>{
    spiner.style.display = "flex"
  signOut(auth).then(() => {
    spiner.style.display = "none";
    location.href = "/LoginSignUp/index.html"
  }).catch((error) => {
    spiner.style.display = "none"
  });
  }
  
  LogOutBtn && LogOutBtn.addEventListener("click", signOutUser);


  //Curd Admin Details-------->>>>>>
  let fullName = document.getElementById("fullname");
  let fathername = document.getElementById("fathername");
  let rollno = document.getElementById("rollno");
  let course = document.getElementById("course");
  let phone = document.getElementById("phone");
  let cnic = document.getElementById("cnic");
  let fileInput = document.getElementById("fileInput")
  let userImg = document.getElementById("userImg");
  
  
  ///curd adminBtns---->>>>>
  let createBtn = document.getElementById("createBtn");


  //Create

  const uploadFile = (file)=>{
    return new Promise((resolve, reject) => {
        const mountainsRef = ref(storage, 'images/${file.name}');

    const uploadTask = uploadBytesResumable(mountainsRef, file);
         uploadTask.on('state_changed', 
      (snapshot) => {
       
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        reject(error)
      }, 
      () => {
       
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
           resolve(downloadURL);
        });
      }
    );
    })
  }
  fileInput && fileInput.addEventListener("change", async(e)=>{
    
    userImg.src = URL.createObjectURL(e.target.files[0])
    const res  = await uploadFile(fileInput.files[0])
    userImg.src = res;
    console.log(res)
})

const createData = async () =>{
    spiner.style.display = "flex"
    let fileInput = document.getElementById("fileInput")
    let profileUrl = await uploadFile(fileInput.files[0])
    console.log(profileUrl)
    console.log(profileUrl)
    let ref = doc(db,"Admin", rollno.value);
    const docRef = await setDoc(
        ref,{
            fullName: fullName.value,
            fathername: fathername.value,
            rollno: rollno.value,
            course: course.value,
            phone: phone.value,
            cnic: cnic.value,
            profileUrl: profileUrl
        }
    ).then(()=>{
        spiner.style.display = "none"
        Swal.fire(
            'Data Created!',
            'You clicked the button!',
            'success'
          )
         setTimeout(location.href = "/data/index.html",120000)
    }).catch((error)=>{
        console.log(error)
        spiner.style.display = "none"
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Wrong',
            footer: '<a href="">Why do I have this issue?</a>'
          })
    })
}
createBtn && createBtn.addEventListener("click", createData)



  let updateBtn = document.getElementById("editBtn")
  let deleteBtn = document.getElementById("deleteBtn");
  let readBtn = document.getElementById("readBtn") 

//READADminDetails
const readAdmin = async ()=>{
    spiner.style.display = "flex"
    let ref = doc(db,"Admin", rollno.value);
    const docSnap =  await getDoc(ref);

    if(docSnap.exists){
        fullName.value = docSnap.data().fullName,
        fathername.value = docSnap.data().fathername,
        phone.value = docSnap.data().phone,
        cnic.value = docSnap.data().cnic,
       course.value = docSnap.data().course
       spiner.style.display = "none"
       }
}
readBtn && readBtn.addEventListener("click", readAdmin)

//UpdateAdminDetails

const updateAdmin = async()=>{
    spiner.style.display = "flex";
  try{
 const washingtonRef = doc(db, "Admin", rollno.value);

// Set the "capital" field of the city 'DC'
await updateDoc(washingtonRef,  {
    fullName: fullName.value,
    fathername: fathername.value,
    course: course.value,
    phone: phone.value,
    cnic: cnic.value,
   
});

spiner.style.display = "none"    
Swal.fire(
    'Data Upadated!',
    'You clicked the button!',
    'success'
  )
  }catch(err){
    spiner.style.display = "none"
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Updated Failed',
        footer: '<a href="">Why do I have this issue?</a>'
      })
  }
}
updateBtn && updateBtn.addEventListener("click", updateAdmin)

//AmminDeleteData
const deletdAdmin = async()=>{
    spiner.style.display = "flex";
const ref = doc(db,"Admin", rollno.value);
const docSnap = await getDoc(ref);
if(!docSnap.exists()){
    spiner.style.display = 'none'
    Swal.fire(
        'Data Deleted!',
        'You clicked the button!',
        'success'
      )
    
}
await deleteDoc(ref)
.then(()=>{
    spiner.style.display = 'none'
    Swal.fire(
      'Data Deleted!',
      'You clicked the button!',
      'success'
    )
    
}).catch((err)=>{
    spiner.style.display = 'none'
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'no such document',
        footer: '<a href="">Why do I have this issue?</a>'
      })
})
       fullName = document.getElementById("fullname").innerHTML = "";
      fathername = document.getElementById("fathername").innerHTML = "";
       rollno = document.getElementById("rollno").innerHTML = "";
       course = document.getElementById("course").innerHTML = "";
       phone = document.getElementById("phone").innerHTML = "";
       cnic = document.getElementById("cnic").innerHTML = "";
      }



deleteBtn && deleteBtn.addEventListener("click", deletdAdmin)

let nextPAge = document.getElementById("next-page")
nextPAge && nextPAge.addEventListener("click", ()=>{
    location.href = "/data/index.html"
})

//Select Crud details==========
let clssTyimngs = document.getElementById("classTiming");
let schedule = document.getElementById("schedule");
let teacherName = document.getElementById("teacherName");
let sectionName = document.getElementById("sectionName");
let batchNumber = document.getElementById("batchNumber");
let submitBtn  = document.getElementById("submitBtn")
/*
///markAttendace
let attendenceMArked = document.getElementById("attendenceMArked");
const rollNumberInput = document.getElementById('rollNumberInput');
let markAttendace = document.getElementById("markAttendace")
const attendanceStatus = document.getElementById('attendanceStatus');
markAttendace && markAttendace.addEventListener("click", ()=>{
attendanceStatus.style.display = "none"
})
// Add event listener for form submission
markAttendace && markAttendace.addEventListener('submit', function (e) {
    e.preventDefault();

    const rollNumber = rollNumberInput.value;
    const status = attendanceStatus.value;
 console.log(`Roll Number: ${rollNumber}, Status: ${status}`);
})
*/
const submitData = async () =>{
    spiner.style.display = "flex"
  
    try{
        let ref = doc(db,"StudenDetails", batchNumber.value);
    const docRef = await setDoc(
        ref,{
            clssTyimngs: clssTyimngs.value,
            schedule: schedule.value,
            teacherName: teacherName.value,
            sectionName: sectionName.value,
            batchNumber: batchNumber.value
        }
    ).then(()=>{
        spiner.style.display = "none"
        Swal.fire(
            'Data Created!',
            'You clicked the button!',
            'success'
          )
          attendenceMArked.style.display = "flex"
         
    }).catch((error)=>{
        console.log(error)
        spiner.style.display = "none"
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Wrong',
            footer: '<a href="">Why do I have this issue?</a>'
          })
    })
    }catch(err){
        console.log(err)
    }
}
submitBtn && submitBtn.addEventListener("click", submitData)




