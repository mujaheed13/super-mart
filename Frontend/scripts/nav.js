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
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const div = document.querySelector("#products");

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

  if(inputs[0].value=="admin@supermart.com" && inputs[1].value=="admin"){
    const path = window.location.origin;
    window.location.href = `${path}/Admin-Page/dashboard.html`;
  }

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

//------------ Search Functionality -------------//
searchBtn.addEventListener("click", async(e)=>{
  const val = searchInput.value;
  //   if(val){
  //    window.location.href = await "products.html";
  // }


  // searchInput.value = val;

  try {
    const res = await fetch(`${api_base_url}/products/?title=${val}`);
    const data = await res.json();
    console.log(data);
    displayProducts(data);
  } catch (error) {
    
  }
  

})

console.log(searchInput)


function displayProducts(data){

  div.innerHTML = null;

  data.forEach((el)=>{
      
  const div1 = document.createElement("div");

  const div2 = document.createElement("div");

  const image = document.createElement("img");
  image.setAttribute("src", el.image);

  const name = document.createElement("h2");
  name.innerText = el.name;

  const details = document.createElement("p");
  details.innerText = el.description;

  const div3 = document.createElement("div");

  const price = document.createElement("h3");
  price.innerText = "₹"+el.price;

  const span = document.createElement("span");
  span.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 24 24" width="15"><path d="M0 0h24v24H0z" fill="none"/><path d="M0 0h24v24H0z" fill="none"/><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
  ${el.rating}`;


  const div4 = document.createElement("div");

  const bagbtn = document.createElement("button");
  bagbtn.innerText = "ADD TO BAG";
  bagbtn.addEventListener("click", ()=>{
     
  });

  div2.append(image)
  div3.append(name,span, details);
  div4.append(price, bagbtn);
  div1.append(div2, div3, div4);
  div.append(div1);

  });
}