let email_login = document.querySelector("#email_login")
let password_login = document.querySelector("#password_login")
let loginSubmitBtn = document.querySelector("#loginSubmitBtn")

let storedEmail = localStorage.getItem("email")
let storedPassword = localStorage.getItem("password")

loginSubmitBtn.addEventListener("click", function (e) {
    
    e.preventDefault()

    if(email_login.value=="" || password_login.value==""){
        alert("Please fill in all fields")
    }
    else if(email_login.value&&email_login.value.trim()===storedEmail&&password_login.value&&password_login.value.trim()===storedPassword){
        alert("Login successful")
        setTimeout(() => {
            window.location="index.html";
        },1000)
    }
    else{
        alert("Invalid email or password")
    }

})