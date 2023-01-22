const mtCart = document.createElement("h1");
const base_url = "http://localhost:8080";
const token = localStorage.getItem("token");
let cartDiv = document.querySelector("#cart1");

getProducts();

async function getProducts(){
    try {
        const res = await fetch(`${base_url}/cartproducts`, {
            headers:{
                Authorization: token
            }
        });
        const data = await res.json();
        displayProducts(data);
        console.log(data)
    } catch (error) {
        console.log(error);
    }
}


// if(cartData.length===0){
   
//     mtCart.setAttribute("id", "mtcart")
//     mtCart.innerHTML = "Your Bag is Empty";
//     document.body.append(mtCart);
//     document.querySelector("#re").style.visibility = "hidden";
//     document.querySelector("#order-summary").style.visibility = "hidden";
// } else {
//     mtCart.style.visibility = "hidden";
//     document.querySelector("#re").style.visibility = "visible";
//     document.querySelector("#order-summary").style.visibility = "visible";

// let div = document.querySelector("#cart1");
// let subtotal = document.querySelector("#subtotal");
// let total = document.querySelector("#total");

function displayProducts(data){


    let ship = document.querySelector("#ship")
ship.innerText = "₹50"

    let a = data.reduce((a, b)=>{
        return a + Number(b.price) * Number(b.quantity);
    }, 0);
    
    subtotal.innerText = "₹" + a

    total.innerText = "₹" + (a + 5);

    cartDiv.innerHTML = null;

    data.forEach((elem, i)=>{
        
    let div1 = document.createElement("div");

    let image = document.createElement("img");
    image.setAttribute("src", elem.image)

    let name = document.createElement("h2");
    name.innerText = elem.name;

    let details = document.createElement("p");
    details.innerText = elem.description;

    let price = document.createElement("h3");
    price.innerText = "₹"+elem.price;

    let spa = document.createElement("span");

    let minu = document.createElement("button");
    minu.innerText = "-";
    minu.addEventListener("click", ()=>{
        
        if(elem.quantity<=1){
            return;
        }else {
            elem.quantity--;
            qua.innerText = elem.quantity;
            getProducts();
   
        }
    
    });
    
    let plus = document.createElement("button");
    plus.innerText = "+";
    plus.addEventListener("click", ()=>{
        elem.quantity++;
        qua.innerText = elem.quantity;
       getProducts();
    });
    

    let qua = document.createElement("p");
    qua.innerText = elem.quantity;
    

    let bagbtn = document.createElement("button");
    bagbtn.innerText = "Remove from Cart";
    bagbtn.addEventListener("click", ()=>{
        removeEl(cartData, i);
    });

 
    spa.append(minu, qua, plus);
    div1.append(image, name, details, price, spa, bagbtn);
    cartDiv.append(div1);

    });
};





function removeEl(data, i){
    data.splice(i, 1);
    cartData=data;
    console.log(data);
    localStorage.setItem("cart-products", JSON.stringify(cartData));
    displayProducts(cartData);
};



let selectOpt = document.querySelector("#po");
let orderBtn = document.querySelector("#order");
orderBtn.addEventListener("click", ()=>{
    
    if(selectOpt.checked && cartData.length>=0){
        alert("Congratulations! Your Order has been placed Successfully.")
        localStorage.setItem("ordered-products", JSON.stringify(cartData));
    } else {
        alert("Select Payment Method");
    }

});