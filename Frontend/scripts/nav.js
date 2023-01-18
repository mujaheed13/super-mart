const api_base_url = "http://localhost:8080";
const logo = document.getElementById("logo");
const loginBtn = document.getElementById("login-btn");
const profile_popup = document.getElementById("profile-popup");
const login_popup_closebtn = document.getElementById("login-popup-closebtn");
const login_popup = document.getElementById("login-popup");
const log_link = document.querySelector("#register-form a");
const register_popup = document.getElementById("register-popup");
const reg_link = document.querySelector("#login-form a");
const register_popup_closebtn = document.getElementById("register-popup-closebtn");
const si_link = document.querySelector("#profile-popup>p>a");
const register_form = document.getElementById("register-form");
const login_form = document.getElementById("login-form");

logo.addEventListener("click", () => {
  window.location.href = "index.html";
});

//--------------
loginBtn.addEventListener("mouseover", () => {
  profile_popup.style.visibility = "visible";
});
loginBtn.addEventListener("mouseout", () => {
  profile_popup.style.visibility = "hidden";
});
profile_popup.addEventListener("mouseover", () => {
  profile_popup.style.visibility = "visible";
});
profile_popup.addEventListener("mouseout", () => {
  profile_popup.style.visibility = "hidden";
});

loginBtn.addEventListener("click", () => {
  login_popup.style.visibility = "visible";
});

login_popup_closebtn.addEventListener("click", () => {
  login_popup.style.visibility = "hidden";
});

log_link.addEventListener("click", (e) => {
  e.preventDefault();
  register_popup.style.visibility = "hidden";
  login_popup.style.visibility = "visible";
});

//----------------------
reg_link.addEventListener("click", (e) => {
  e.preventDefault();
  register_popup.style.visibility = "visible";
  login_popup.style.visibility = "hidden";
});

register_popup_closebtn.addEventListener("click", () => {
  register_popup.style.visibility = "hidden";
});

si_link.addEventListener("click", (e) => {
  e.preventDefault();
  register_popup.style.visibility = "visible";
});

//***************** Register Functionality *******************

register_form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const inputs = document.querySelectorAll("#register-form input");
  const userDetails = [];

  for (let i = 0; i < inputs.length - 1; i++) {
    userDetails.push(inputs[i].value);
  }

  const userObj = {
    name: userDetails[0],
    email: userDetails[1],
    phone: userDetails[2],
    password: userDetails[3],
  };

  console.table(userObj);

  try {
    let res = await fetch(`${api_base_url}/user/register`, {
      method: "POST",
      body: JSON.stringify(userObj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      swal({
        title: "Account has been created.",
        text: "You can login now.",
        icon: "success",
        button: "OK",
      });
    } else {
      console.log(res);
      swal("Internal server error");
    }
  } catch (error) {
    console.log(error);
    swal("Some error occurred");
  }
});

//***************** Login Functionality *******************

login_form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const inputs = document.querySelectorAll("#login-form input");

  try {
    let res = await fetch(`${api_base_url}/user/login`, {
      method: "POST",
      body: JSON.stringify({
        email: inputs[0].value,
        password: inputs[1].value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    localStorage.setItem("token", data.token);
    console.log(data);
    if (res.ok) {
      swal({
        title: "Login Successfull",
        text: "Welcome",
        icon: "success",
        button: "OK",
      });
    } else {
      console.log(res);
      if (res.status == 404) {
        swal("User Not found");
      } else {
        swal("Wrong Credentials");
      }
    }
  } catch (error) {
    console.log(error);
    swal("Some error occurred");
  }
});
