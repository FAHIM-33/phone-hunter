let loadPhone = async () => {
    let res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
   let arr = await res.json();
   let phones = arr.data;
   handler(phones)
}
function handler(phones){
    const parent = document.getElementById('cards-container');
    phones.forEach(phone => {
        console.log(phone);
        let div = document.createElement('div');
        div.classList = `card flex flex-col items-center p-8 rounded-lg shadow-2xl`;
        div.innerHTML = `
        <figure>
        <img src=${phone.image} alt="">
    </figure>
    <h3 class="t-header my-5 text-center">${phone.phone_name}</h3>
    <p class="text-center mb-2 plain-text">There are many variations of passages of available, but the majority have suffered</p>
    <p class="t-header">$999</p>
    <button onclick="myFunction()" class="main-btn mt-4">Show Details</button>
        `
        parent.appendChild(div);
    })
}
function myFunction() {
    location.replace("https://www.youtube.com/shorts/SXHMnicI6Pg");
  }
loadPhone()