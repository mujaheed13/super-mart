const main = document.getElementById("main");
const product = JSON.parse(localStorage.getItem("abc"));

displayProducts(product);

function displayProducts(...data){

    main.innerHTML = null;

    data.forEach((el)=>{
        
    const div1 = document.createElement("div");
        

    const div2 = document.createElement("div");

    div2.addEventListener("click", ()=>{
        localStorage.setItem("abc", JSON.stringify(el));
        window.location.href = "individual-product-page.html"
    });

    const image = document.createElement("img");
    image.setAttribute("src", el.image);

    const name = document.createElement("h2");
    name.innerText = el.name;

    const details = document.createElement("p");
    details.innerText = el.description;

    const div3 = document.createElement("div");

    div3.addEventListener("click", ()=>{
        localStorage.setItem("abc", JSON.stringify(el));
        window.location.href = "individual-product-page.html"
    });

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
    main.append(div1);

    });
}
