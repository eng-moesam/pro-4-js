let firstname=document.querySelector("#firstname")
let lastname=document.querySelector("#lastname")
let email=document.querySelector("#email_register")
let password_register=document.querySelector("#password_register")

let registerSubmitBtn=document.querySelector("#registerSubmitBtn")

registerSubmitBtn.addEventListener("click",function(e){
    e.preventDefault()

    if(firstname.value=="" || lastname.value=="" || email.value=="" || password_register.value==""){
        alert("Please fill in all fields")
    }
     else{
        firstname.value=localStorage.setItem("firstname",firstname.value)
        lastname.value=localStorage.setItem("lastname",lastname.value)
        email.value=localStorage.setItem("email",email.value)
        password_register.value=localStorage.setItem("password",password_register.value)
        alert("Registration successful")

        setTimeout(() => {
            window.location="login.html";
        },1000)
     }
})
