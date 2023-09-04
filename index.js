let price = 5;
loadPhone()
document.getElementById('input-field').value = '';
document.getElementById('input-field').addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        inputHandler();
    }
})
async function loadPhone(searchText = 'iphone',isShowAll) {
    document.getElementById('cards-container').innerHTML = ``;
    loaded(false)
    let res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    let arr = await res.json();
    let phones = arr.data;
    let base = phones.length;
    if(!isShowAll){
        base = 4;
    }
    handler(phones, base)
}
function handler(phones, range) {

    if(phones.length === range){
        document.getElementById('show-all').style.display = 'none';
    }
    else{
        document.getElementById('show-all').style.display = 'block';
    }
    phones = phones.slice(0, range);

    const parent = document.getElementById('cards-container');
    phones.forEach(phone => {
        let div = document.createElement('div');
        div.classList = `card flex flex-col items-center p-8 rounded-lg shadow-2xl`;
        div.innerHTML = `
        <figure onclick="rickroll()">
        <img src=${phone.image} alt="">
    </figure>
    <h3 class="t-header my-5 text-center">${phone.phone_name}</h3>
    <p class="text-center mb-2 plain-text">There are many variations for this phone. Click to check details.</p>
    <p class="t-header">$<span>${price}</span>99</p>
    <button onclick="rickroll()" class="main-btn mt-4">Show Details</button>
        `;
        // onclick="showDetails('${phone.slug}')"
        parent.appendChild(div);
        price++;
    })
    loaded(true)

}
function inputHandler(isShowAll = false) {
    let searchText = document.getElementById('input-field').value;
    if(searchText == ''){
        searchText = undefined;
    }
    document.getElementById('cards-container').innerHTML = ``;
    loadPhone(searchText, isShowAll)
}
function loaded(isLoaded) {
    if (isLoaded) {
        document.getElementById('load').classList.add('hidden')
    }
    else {
        document.getElementById('load').classList.remove('hidden')
    }
}
function showAll(){
    inputHandler(true);
}

async function showDetails(id){
    let res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    arr = await res.json();
    let phone = arr.data;
    console.log(phone.mainFeatures.sensors);
    let parent = document.getElementById('modal');
    let div = document.createElement('div');
    div.innerHTML = `
    <p>Name:${phone.name}<br>
Release Date:${phone?.releaseDate} <br>
GPS:${phone.others.GPS}<br>
chipset:${phone?.mainFeatures?.chipSet}<br>
Sensors:${phone?.mainFeatures?.sensors}<br>
<br>



</p>
    `
    parent.appendChild(div);

}

function rickroll(){
    let container = document.getElementById('myModal');
    container.style.top = '0';
    let vid = document.getElementById('theVideo');
    vid.play();
    setTimeout(()=>{document.getElementById('closeModal').style.display = 'block';
},2000)
}
function troll(){
    document.getElementById('trolling').style.display = 'block';
}
