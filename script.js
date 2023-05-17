//Gombra feliratkozas
document.getElementById("nevKereses").addEventListener("click", function(){
    window.location.href = "/characters/index.html?name=" + document.getElementById("nev").value;
}, false);

//console.log("Kiss Lajos".includes("aj"));
//console.log("Kiss Lajos".startsWith("Ki"));
//console.log("Kiss Lajos".endsWith("os"));

//============================================================================

//URL parameterek keresese
var urlParams = new URLSearchParams(window.location.search);
var page = urlParams.get('page');
var cname = urlParams.get('name');

//Api adatkinyeres
var apiUrl;

if(page != null && cname != null){
    apiUrl = "https://rickandmortyapi.com/api/character?page=" + page + "&name=" + cname;
}
else if(page != null){
    apiUrl = "https://rickandmortyapi.com/api/character?page=" + page;
}
else if (cname != null){
    apiUrl = "https://rickandmortyapi.com/api/character?name=" + cname;
}
else{
    apiUrl = "https://rickandmortyapi.com/api/character";
}

//console.log(apiUrl);

var p = new Promise((sikeres, sikertelen) => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", apiUrl);
    xhr.onload = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            sikeres(JSON.parse(xhr.responseText));
        }
        else{
            sikertelen("Sikeretelen AJAX lekerdezes!");
        }
    };
    
    xhr.send(null);
});

p
.then((json) => {feldolgozo(json)})
.catch((error) => {document.write(error)});

//Feldolgozas
function feldolgozo(szereplokKomplett){
    //console.log(szereplokKomplett);

    //gombok generalasa
    var gombok = document.getElementById("gombok");

    var liGombokElott = document.createElement("li");
    var aGombokElott = document.createElement("a");
    var spanGombokElott = document.createElement("span");

    liGombokElott.setAttribute("class", "page-item");
    aGombokElott.setAttribute("class", "page-link");

    var aGombokElottUrl = "/characters/index.html?page=1";
    if(cname != null){
        aGombokElottUrl += "&name=" + cname;
    }
    aGombokElott.setAttribute("href", aGombokElottUrl);

    aGombokElott.setAttribute("aria-label", "First");
    aGombokElott.setAttribute("style", "color: green");
    spanGombokElott.setAttribute("aria-hidden", "true");
    spanGombokElott.appendChild(document.createTextNode("First"));

    aGombokElott.appendChild(spanGombokElott);
    liGombokElott.appendChild(aGombokElott);
    gombok.appendChild(liGombokElott);

    var ah, fh;

    if(Number(page) == 0 && szereplokKomplett.info.pages >= 3){
        //nem jott parameterul page ertek
        ah = 1;
        fh = 3;
    }
    else if(Number(page) == 0 && szereplokKomplett.info.pages < 3){
        ah = 1;
        fh = szereplokKomplett.info.pages;
    }
    else{
        ah = Number(page) - 1;
        fh = Number(page) + 1;
    
        if(ah < 1){
            ah = 1
            fh++;
        }
    
        if(fh > szereplokKomplett.info.pages){
            fh = szereplokKomplett.info.pages;
            ah--;
        }
    }

    for(var i = ah; i <= fh; i++){
        var li = document.createElement("li");
        var a = document.createElement("a");

        li.setAttribute("class", "page-item");

        a.appendChild(document.createTextNode(i));
        a.setAttribute("class", "page-link");

        var aUrl = "/characters/index.html?page=" + i;
        if(cname != null){
            aUrl += "&name=" + cname;
        }
        a.setAttribute("href", aUrl);

        a.setAttribute("style", "color: black");

        li.appendChild(a);
        gombok.appendChild(li);
    }
    
    var liGombokUtan = document.createElement("li");
    var aGombokUtan = document.createElement("a");
    var spanGombokUtan = document.createElement("span");

    liGombokUtan.setAttribute("class", "page-item");
    aGombokUtan.setAttribute("class", "page-link");

    var aGombokUtanUrl = "/characters/index.html?page=" + szereplokKomplett.info.pages;
    if(cname != null){
        aGombokUtanUrl += "&name=" + cname;
    }
    aGombokUtan.setAttribute("href", aGombokUtanUrl);

    aGombokUtan.setAttribute("aria-label", "First");
    aGombokUtan.setAttribute("style", "color: green");
    spanGombokUtan.setAttribute("aria-hidden", "true");
    spanGombokUtan.appendChild(document.createTextNode("Last"));

    aGombokUtan.appendChild(spanGombokUtan);
    liGombokUtan.appendChild(aGombokUtan);
    gombok.appendChild(liGombokUtan);

    //kartyak generalasa
    var szereplok = szereplokKomplett.results;
    var sor = document.getElementById("sor");

    for(var i = 0; i < szereplok.length; i++){
        //console.log(szereplok[i]);

        var col = document.createElement("div");
        col.setAttribute("class", "col-12 col-md-6 col-lg-4 col-xl-3 my-3");

        var a = document.createElement("a");
        a.setAttribute("class", "btn btn-success w-100");
        a.setAttribute("href", "/character/index.html?charId=" + szereplok[i].id);
        a.appendChild(document.createTextNode("More information..."));

        var cardDiv = document.createElement("div");
        cardDiv.setAttribute("class", "card h-100 w-100");
        cardDiv.setAttribute("style", "width: 18rem; padding: 0");

        var img = document.createElement("img");
        img.setAttribute("class", "card-img-top w-100");
        img.setAttribute("src", szereplok[i].image);
        img.setAttribute("alt", szereplok[i].name);
        img.setAttribute("title", szereplok[i].name);

        var cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");

        /*
        A karakterek jelenjenek meg BS kartyakon.
        (name, status, species, type, gender, location, image, episode)
        */

        var h5 = document.createElement("h5");
        h5.appendChild(document.createTextNode(szereplok[i].name));

        var ul = document.createElement("ul");
        var li1 = document.createElement("li");
        var li2 = document.createElement("li");
        var li3 = document.createElement("li");
        var li4 = document.createElement("li");
        var li5 = document.createElement("li");
        var li6 = document.createElement("li");

        li1.appendChild(document.createTextNode(szereplok[i].status));
        li2.appendChild(document.createTextNode(szereplok[i].species));
        li3.appendChild(document.createTextNode((szereplok[i].type == "") ? "-" : szereplok[i].type));
        li4.appendChild(document.createTextNode(szereplok[i].gender));
        li5.appendChild(document.createTextNode(szereplok[i].location.name));
        
        var szin;

        switch(szereplok[i].status){
            case "Alive":
                szin = "green";
                break;

            case "Dead":
                szin = "red";
                break;

            case "unknown":
                szin = "black";
                break;
        }

        li1.setAttribute("style", "color: " + szin);

        var xhr2 = new XMLHttpRequest();
        xhr2.open("GET", szereplok[i].episode[0], false);
        xhr2.onreadystatechange = function(){
            if(xhr2.readyState == 4 && xhr2.status == 200){
                //console.log(JSON.parse(xhr2.responseText).name);
                li6.appendChild(document.createTextNode(JSON.parse(xhr2.responseText).name));
            }
        };

        xhr2.send(null);

        ul.appendChild(li1);
        ul.appendChild(li2);
        ul.appendChild(li3);
        ul.appendChild(li4);
        ul.appendChild(li5);
        ul.appendChild(li6);

        cardBody.appendChild(h5);
        cardBody.appendChild(ul);
        cardBody.appendChild(a);

        cardDiv.appendChild(img);
        cardDiv.appendChild(cardBody);

        col.appendChild(cardDiv);

        sor.appendChild(col);
    }
}