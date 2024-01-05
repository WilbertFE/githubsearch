
// ambil element yang dibutuhkan
const myBtn = document.querySelector('#my-btn');
const input = document.querySelector('#input-value');

const hero = document.querySelector('#hero');
const user = document.querySelector('#user');
const repo = document.querySelector('#repository');
const animation = document.querySelector('#animation');


// data dummy
(async function(){
    try{
    // hero dan user
    const dataUser = await getDataUser('wilbertfe');
    updateHero(dataUser);
    updateUser(dataUser);
    // repo
    const dataRepo = await getDataRepo('wilbertfe');
    updateRepo(dataRepo, dataUser);
    // tunjukkin repo section
    repo.classList.remove('hidden');
    } catch(err){
        alert(err);
        console.error(err);
    }
})();

// fetch data ketika tombol diklik
myBtn.addEventListener('click', async function(){
    // menonaktifkan setiap section
    hero.classList.add('hidden');
    user.classList.add('hidden');
    repo.classList.add('hidden');
    // mengaktifkan section animasi
    animation.classList.remove('hidden');
    // menampung nilai input
    const inputValue = input.value;
    try {
    // mengambil data user
    const dataUser = await getDataUser(inputValue);
    // update ui hero section
    updateHero(dataUser);
    // update ui user section
    updateUser(dataUser);
    // ambil data repo
    const dataRepo = await getDataRepo(inputValue);
    // updaste ui repo section
    updateRepo(dataRepo, dataUser); 
    } catch(err){
        alert(err);
        console.error(err);
    } finally{
        // reset input
        input.value = '';
        // menonaktifkan section animation
        animation.classList.add('hidden');
        // aktifkan setiap section
        hero.classList.remove('hidden');
        user.classList.remove('hidden');
        repo.classList.remove('hidden');
        console.log('ok');
    }
});

// sub-repo feature (event binding)
document.addEventListener('click', function(e) {
    if(e.target.classList.contains('nama-repo')){
        e.target.classList.toggle('judul-repo');
    }
});






function getDataUser(username){
    return fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if(response.ok === false || response.status === 404){
                throw new Error('User Tidak ditemukan');
            }
            return response.json();
        })
        .then(response => response);
}

function getDataRepo(username){
    return fetch(`https://api.github.com/users/${username}/repos`)
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
    hero.innerHTML = fragment;
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
    user.innerHTML = fragment;
}

function updateRepo(dataRepo, dataUser){
    let fragment = '';
    fragment += `
    <div class="my-4">
        <h1 class="text-dark font-medium"><span class="font-bold">Public_repos</span> : ${dataUser.public_repos}</h1>
    </div>
    `;
    for (let i = 0; i<dataRepo.length; i++){
        fragment += `
        <div class="flex flex-wrap my-4">
            <h1 class="text-dark font-medium">repo_${i+1} :</h1>
            <h3 class="nama-repo ml-2 text-blue-800 underline cursor-pointer truncate flex-1 overflow-hidden">${dataRepo[i].name}</h3>
            <ul class="hidden w-full list-inside list-disc sub-repo">
                <li class="text-sm">forks_count : ${dataRepo[i].forks_count}</li>
                <li class="text-sm">watchers_count: ${dataRepo[i].watchers_count}</li>
                <li class="text-sm">language : ${dataRepo[i].language}</li>
                <li class="text-sm truncate">url : <a href="${dataRepo[i].html_url}" target="_blank" class="text-blue-800 underline">${dataRepo[i].html_url}</a></li>
                <li class="text-sm">desc : ${dataRepo[i].description}</li>
            </ul>
        </div>
        `;
    }
    const repoCard = document.querySelector('#repo-card');
    repoCard.innerHTML = fragment;
}