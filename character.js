var urlParams = new URLSearchParams(window.location.search);
var charId = urlParams.get('charId');

var p = new Promise((sikeres, sikertelen) => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://rickandmortyapi.com/api/character/" + charId);
    xhr.onload = function(){
        if(xhr.status == 200 && xhr.readyState == 4){
            sikeres(JSON.parse(xhr.responseText));
        }
        else{
            sikertelen("Sikeretelen AJAX lekerdezes!");
        }
    };
    
    xhr.send(null);
});

p
.then((json) => {Feldolgozas(json)})
.catch((error) => {document.write(error)});

//==============================
function Feldolgozas(character){
    console.log(character);

    var charImg = document.getElementById("charImg");
    charImg.setAttribute("src", character.image);
    charImg.setAttribute("alt", character.name);
    charImg.setAttribute("title", character.name);

    var nev = document.getElementById("nev");
    var gender = document.getElementById("gender");
    var status = document.getElementById("status");
    var location = document.getElementById("location");
    var origin = document.getElementById("origin");

    nev.innerHTML = character.name;
    gender.innerHTML = character.gender;
    status.innerHTML = character.status;
    location.innerHTML = character.location.name;
    origin.innerHTML = character.origin.name;
}

var goBackGomb = document.getElementById("goBack");
goBackGomb.addEventListener("click", function(){
    window.history.back();
}, false);