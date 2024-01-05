

const myBtn = document.querySelector('#my-btn');
const input = document.querySelector('#input-value');


myBtn.addEventListener('click', async function(){
    // mengambil data user
    const dataUser = await getDataUser(input.value);
    // update ui hero
    updateHero(dataUser);
    // update ui user
    updateUser(dataUser);
});







function getDataUser(username){
    return fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(response => response);
}

function updateHero(dataUser){
    let fragment = '';
    fragment += `
    <div class="container">
        <div class="flex flex-wrap mx-4">
            <div class="w-full">
                <img src="${dataUser.avatar_url}" alt="profile" class="w-[200px] h-[200px] block mx-auto my-6 rounded-full shadow-lg border"/>
                <h1 class="text-dark text-3xl font-bold text-center">${dataUser.name}</h1>
                <h3 class="text-dark text-lg font-light text-center"><span class="w-4 h-5 inline-block bg-cover bg-center mr-1" style="background-image: url(src/img/icon/maps-and-flags.png);"></span>${dataUser.location}</h3>
            </div>
        </div>
    </div>
    `;
    const hero = document.querySelector('#hero');
    hero.innerHTML = fragment;
    input.value = '';
}

function updateUser(dataUser){
    let fragment = '';
    fragment += `
    <div class="container">
            <div class="flex flex-wrap mx-4">
                <div class="w-full mb-12">
                    <h1 class="text-dark text-3xl text-center font-bold">Users Information</h1>
                    <p class="text-dark text-lg text-center font-light">general information</p>
                </div>
                <div class="w-full flex flex-wrap shadow-lg rounded-lg overflow-hidden">
                    <div class="w-full flex mb-4">
                        <div class="w-[100px] h-[100px] bg-cover bg-center shadow-lg rounded-sm m-4" style="background-image: url(${dataUser.avatar_url});"></div>
                        <div class="flex-1 p-4 overflow-hidden">
                            <h1 class="text-dark text-xl font-bold truncate">${dataUser.name}</h1>
                            <h3 class="text-dark font-light">${dataUser.login} | ${dataUser.type}</h3>
                        </div>
                    </div>
                    <div class="w-full p-4">
                        <h3 class="my-2 text-dark font-medium"><span class="font-bold">Username</span> : ${dataUser.login}</h3>
                        <h3 class="my-2 text-dark font-medium"><span class="font-bold">Name</span> : ${dataUser.name}</h3>
                        <h3 class="my-2 text-dark font-medium"><span class="font-bold">Id</span> : ${dataUser.id}</h3>
                        <h3 class="my-2 text-dark font-medium"><span class="font-bold">Email</span> : ${dataUser.email}</h3>
                        <h3 class="my-2 text-dark font-medium"><span class="font-bold">Type</span> : ${dataUser.type}</h3>
                        <h3 class="my-2 text-dark font-medium"><span class="font-bold">Location</span> : ${dataUser.location}</h3>
                        <h3 class="my-2 text-dark font-medium"><span class="font-bold">Company</span> : ${dataUser.company}</h3>
                        <h3 class="my-2 text-dark font-medium"><span class="font-bold">Followers</span> : ${dataUser.followers}</h3>
                        <h3 class="my-2 text-dark font-medium"><span class="font-bold">Following</span> : ${dataUser.following}</h3>
                        <div class="my-4">
                            <h3 class="my-2 text-dark text-center font-light line-through">bio</h3>
                            <p class="p-2 text-dark text-justify font-medium border">${dataUser.bio}</p>
                        </div>
                        <a href="${dataUser.html_url}" target="_blank"><button class="px-4 py-2 bg-dark text-white font-medium tracking-wide hover:bg-slate-700">Github</button></a>
                    </div>
                </div>
            </div>
        </div>
    `;
    const user = document.querySelector('#user');
    user.innerHTML = fragment;
}