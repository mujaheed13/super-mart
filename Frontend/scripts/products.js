const api_base_url = "http://localhost:8080";
const div = document.querySelector("#products");
const filterByCategory = document.getElementById("filter-by-category");
const sortByPrice = document.getElementById("sort-by-price")
// import { navbar } from "./navbar.js";
// const nav = document.querySelector("nav");
// nav.innerHTML = navbar;
// console.log(navbar);

getProducts();

async function getProducts(){
    try {
        const res = await fetch(`${api_base_url}/products`);
        const data = await res.json();
        displayProducts(data);
    } catch (error) {
        console.log(error);
    }
}


function displayProducts(data){

    div.innerHTML = null;

    data.forEach((el)=>{
        
    const div1 = document.createElement("div");

    const image = document.createElement("img");
    image.setAttribute("src", el.image);

    const name = document.createElement("h2");
    name.innerText = el.name;

    const details = document.createElement("p");
    details.innerText = el.description;

    const price = document.createElement("h3");
    price.innerText = "₹"+el.price;

    const span = document.createElement("span");
    span.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M0 0h24v24H0z" fill="none"/><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M0 0h24v24H0z" fill="none"/><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M0 0h24v24H0z" fill="none"/><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M0 0h24v24H0z" fill="none"/><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M0 0h24v24H0z" fill="none"/><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;

    const rating = document.createElement("p");
    rating.innerText = el.rating;

    const bagbtn = document.createElement("button");
    bagbtn.innerText = "ADD TO BAG";
    bagbtn.addEventListener("click", ()=>{
       
    });

    span.append(rating);
    div1.append(image, name, details, price, span, bagbtn);
    div.append(div1);

    });
}

filterByCategory.addEventListener("change", async()=>{
    if(sortByPrice.value=="" && filterByCategory.value==""){
        const res = await fetch(`${api_base_url}/products`);
        const data = await res.json();
        displayProducts(data);
    } else if(sortByPrice.value=="htl" && filterByCategory.value!=""){
        const res = await fetch(`${api_base_url}/products/?sort=dsc&category=${filterByCategory.value}`);
        const data = await res.json();
        displayProducts(data);
    } else if(sortByPrice.value=="lth" && filterByCategory.value!=""){
        const res = await fetch(`${api_base_url}/products/?sort=asc&category=${filterByCategory.value}`);
        const data = await res.json();
        displayProducts(data);
    } else if(filterByCategory!=""){
        const res = await fetch(`${api_base_url}/products/?category=${filterByCategory.value}`);
        const data = await res.json();
        displayProducts(data);
    }
  
  
});

sortByPrice.addEventListener("change", async()=>{
    if(sortByPrice.value=="" && filterByCategory.value==""){
        const res = await fetch(`${api_base_url}/products`);
        const data = await res.json();
        displayProducts(data);
    } else if(sortByPrice.value=="htl" && filterByCategory.value!=""){
        const res = await fetch(`${api_base_url}/products/?sort=dsc&category=${filterByCategory.value}`);
        const data = await res.json();
        displayProducts(data);
    } else if(sortByPrice.value=="lth" && filterByCategory.value!=""){
        const res = await fetch(`${api_base_url}/products/?sort=asc&category=${filterByCategory.value}`);
        const data = await res.json();
        displayProducts(data);
    } else if(sortByPrice.value==""){
        const res = await fetch(`${api_base_url}/products`);
        const data = await res.json();
        displayProducts(data);
    } else if(sortByPrice.value=="htl"){
        const res = await fetch(`${api_base_url}/products/?sort=dsc`);
        const data = await res.json();
        displayProducts(data);
    } else if(sortByPrice.value=="lth"){
        const res = await fetch(`${api_base_url}/products/?sort=asc`);
        const data = await res.json();
        displayProducts(data);
    }
})