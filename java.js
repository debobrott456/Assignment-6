const title = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      console.log(data); // check the API response

      // Access categories correctly (adjust if structure differs)
      const categories = data.categories;

      const div = document.getElementById("category");
      div.classList.add("bg-[#CFF0DC]","h-[500px]","flex","flex-col","gap-3","mr-8","rounded-2xl")
      categories.forEach((category) => {
        const btn = document.createElement("button");
        btn.classList.add("cat","hover:bg-green-300");
        btn.innerText = category.category_name;// depends on API shape
        div.appendChild(btn);
       

         btn.addEventListener("click", () => {
    filterCards(category.category_name,p3);
     const cats=div.querySelectorAll(".cat")
    cats.forEach(ca=> ca.classList.remove("bg-green-500", "text-white"))
    btn.classList.add("bg-green-500", "text-white")
   

    

  });
      });
    })
    // .catch((err) => console.error(err));
};

// Call the function once
title();
const card = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      console.log(data); // check the API response

      // Access categories correctly (adjust if structure differs)
      const plants = data.plants;

      const divs = document.getElementById("cards");
      divs.classList.add("grid","grid-cols-1","gap-2","md:grid-cols-3")
      plants.forEach((plant) => {
        const div = document.createElement("div");
        div.classList.add("rounded-xl","shadow-xl","p-4","card","w-[320px]")

        div.dataset.category=plant.category;
        const img=document.createElement("img");
        img.classList.add("w-72","h-65","rounded-2xl");

        img.src = plant.image;// depends on API shape
        div.appendChild(img);
        
        const h=document.createElement("h3")
        h.innerText=plant.name;
        h.classList.add("text-3xl","font-bold","mb-[10px]")
        h.addEventListener("click",()=>{
          const van=document.getElementById("modal")
          const van1=document.createElement("img")
          van1.classList.add("h-65");
          const van2=document.createElement("p")
          const van3=document.createElement("p")
          const van4=document.createElement("p")
          const van5=document.createElement("p")
          const van6=document.createElement("button")
          van6.innerText="Close"
          van6.classList.add("bg-green-500","rounded-2xl")
          
          van1.src=plant.image;
          van2.innerText=plant.name;
          van3.innerText="Category: "+plant.category;
          van4.innerText="Description: "+plant.description;
          van5.innerText="Price :"+ plant.price;
          van.innerHTML="";
          van.appendChild(van2);
          van.appendChild(van1);
          van.appendChild(van3);
          van.appendChild(van5);
          van.appendChild(van4);
          van.appendChild(van6);
          van.classList.remove("hidden")
          van6.addEventListener("click", () => {
  van.classList.add("hidden");
});

          });
        const p=document.createElement("p")
        p.innerText=plant.description;
        p.classList.add("mb-[10px]")
                const cons=document.createElement("div")
                cons.classList.add("flex","gap-40","mb-4")

        const con=document.createElement("div")
        con.innerText=plant.category;
        con.classList.add("p-1","border","border-green-400","text-green-400","rounded-2xl")
        const p2=document.createElement("p")
        p2.innerText=plant.price
        p2.classList.add("text-green-700")
        cons.appendChild(con)
        cons.appendChild(p2)

        
        const btn=document.createElement("button")

        btn.innerText="Add to Cart"
        btn.classList.add("bg-green-400","p-2","rounded-2xl","w-70","mx-3","btn-cart","hover:bg-amber-500")
         btn.addEventListener("click", () => {
    addToCart(plant.name,plant.price);
  });
        div.appendChild(h)
        div.appendChild(p)
        div.appendChild(cons)
        div.appendChild(btn)
        divs.appendChild(div)
        
      });
    })
    // .catch((err) => console.error(err));
};

// Call the function once
card();



const categoryContainer = document.getElementById("category");
const cardContainer = document.getElementById("cards");


function filterCards(category) {
  const allCards = cardContainer.querySelectorAll(".card");
  allCards.forEach(card => {
    if ( card.dataset.category === category) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
    
  });
}
 const p3=document.getElementById("all")
 p3.addEventListener("click",()=>{
   const allCards = cardContainer.querySelectorAll(".card");
    allCards.forEach (card => {
    
      card.classList.remove("hidden");})
      

    });

 


// function addToCart(name,price){
     
//     const div3=document.getElementById("add-cart")
//     const con=document.createElement("p")
//     con.innerText=name;
//     const con2=document.createElement("p")
//     con2.innerText=price
    
    
//     div3.appendChild(con)
//     div3.appendChild(con2)
//     div3.appendChild(con3)
  
// }
let jiun;
let total=0
function addToCart(name, price) {
  const cartContainer = document.getElementById("add-cart");

  // Create a wrapper div for each cart item
  const itemDiv = document.createElement("div");
  itemDiv.classList.add("flex", "justify-between", "items-center", "p-2","bg-[#CFF0DC]","ml-5","w-55");

  // Left: Name and Price
  const infoDiv = document.createElement("div");
  infoDiv.classList.add("flex", "flex-col");

  const nameP = document.createElement("p");
  nameP.innerText = name;
  nameP.classList.add("font-semibold");

  const priceP = document.createElement("p");
  priceP.innerText = `Price: $${price}`;
  priceP.classList.add("text-green-700");

  infoDiv.appendChild(nameP);
  infoDiv.appendChild(priceP);

  // Right: Total and Remove button
  const rightDiv = document.createElement("div");
  rightDiv.classList.add("flex", "items-center", "gap-4");

  
  total+=price
  rightDiv.innerText="Total :"+total;

  

  const removeBtn = document.createElement("button");
  removeBtn.innerText = "x"; // cross button
  removeBtn.classList.add("text-red-500", "font-bold", "text-xl");
  removeBtn.addEventListener("click", () => {
    cartContainer.removeChild(itemDiv); // remove this cart item
  });

 
  rightDiv.appendChild(removeBtn);

  // Append info and right divs to item wrapper
  itemDiv.appendChild(infoDiv);
  itemDiv.appendChild(rightDiv);

  // Add item to cart container
  cartContainer.appendChild(itemDiv);
}

// Example: button click
// addToCart("Mango Tree", 10);


