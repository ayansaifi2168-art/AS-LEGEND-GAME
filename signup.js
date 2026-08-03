function signup(){

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if(name == "" || email == "" || password == ""){
        alert("Please fill all details");
    }
    else{
        alert("Signup successful!");
        
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);

        window.location.href = "login.html";
    }

}