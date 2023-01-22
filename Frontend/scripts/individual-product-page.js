const main = document.getElementById("main");
const product = JSON.parse(localStorage.getItem("abc"));

displayProducts(product);

function displayProducts(...data){

    main.innerHTML = null;

    data.forEach((el)=>{
        
    const div1 = document.createElement("div");
        

    const div2 = document.createElement("div");

    
    const image = document.createElement("img");
    image.setAttribute("src", el.image);
    div2.append(image);

    const addToCartBtn = document.createElement("button");
        addToCartBtn.innerText = "Add to Cart";

    const name = document.createElement("h2");
    name.innerText = el.name;

    const details = document.createElement("p");
    details.innerText = el.description;
   

    const price = document.createElement("h3");
    price.innerText = "₹"+el.price;

    const span = document.createElement("span");
    span.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 24 24" width="15"><path d="M0 0h24v24H0z" fill="none"/><path d="M0 0h24v24H0z" fill="none"/><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
    ${el.rating}`;


    div1.append(image, addToCartBtn);
    div2.append(name, span, price, details);
    main.append(div1, div2);

    });
}
