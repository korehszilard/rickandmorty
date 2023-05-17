var urlParams = new URLSearchParams(window.location.search);
var page = urlParams.get('page');

var p = new Promise((sikeres, sikertelen) => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://rickandmortyapi.com/api/location?page=" + page);
    xhr.onload = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            //console.log(JSON.parse(xhr.responseText));
            sikeres(JSON.parse(xhr.responseText));
        }
        else{
            sikertelen("Sikertelen AJAX kiolvasas!");
        }
    }
    xhr.send(null);
});

p
.then((json) => {Feldolgozas(json)})
.catch((hiba) => {document.write(hiba)});

//===================================
function Feldolgozas(locations){
    //gombok generalasa
    var gombok = document.getElementById("gombok");

    var liGombokElott = document.createElement("li");
    var aGombokElott = document.createElement("a");
    var spanGombokElott = document.createElement("span");

    liGombokElott.setAttribute("class", "page-item");
    aGombokElott.setAttribute("class", "page-link");
    aGombokElott.setAttribute("href", "locations.html?page=1");
    aGombokElott.setAttribute("aria-label", "First");
    aGombokElott.setAttribute("style", "color: green");
    spanGombokElott.setAttribute("aria-hidden", "true");
    spanGombokElott.appendChild(document.createTextNode("First"));

    aGombokElott.appendChild(spanGombokElott);
    liGombokElott.appendChild(aGombokElott);
    gombok.appendChild(liGombokElott);

    var ah, fh;

    if(Number(page) == 0 && locations.info.pages >= 3){
        //nem jott parameterul page ertek
        ah = 1;
        fh = 3;
    }
    else if(Number(page) == 0 && locations.info.pages < 3){
        ah = 1;
        fh = locations.info.pages;
    }
    else{
        ah = Number(page) - 1;
        fh = Number(page) + 1;
    
        if(ah < 1){
            ah = 1
            fh++;
        }
    
        if(fh > locations.info.pages){
            fh = locations.info.pages;
            ah--;
        }
    }

    for(var i = ah; i <= fh; i++){
        var li = document.createElement("li");
        var a = document.createElement("a");

        li.setAttribute("class", "page-item");

        a.appendChild(document.createTextNode(i));
        a.setAttribute("class", "page-link");
        a.setAttribute("href", "locations.html?page=" + i);
        a.setAttribute("style", "color: black");

        li.appendChild(a);
        gombok.appendChild(li);
    }
    
    var liGombokUtan = document.createElement("li");
    var aGombokUtan = document.createElement("a");
    var spanGombokUtan = document.createElement("span");

    liGombokUtan.setAttribute("class", "page-item");
    aGombokUtan.setAttribute("class", "page-link");
    aGombokUtan.setAttribute("href", "locations.html?page=" + locations.info.pages);
    aGombokUtan.setAttribute("aria-label", "First");
    aGombokUtan.setAttribute("style", "color: green");
    spanGombokUtan.setAttribute("aria-hidden", "true");
    spanGombokUtan.appendChild(document.createTextNode("Last"));

    aGombokUtan.appendChild(spanGombokUtan);
    liGombokUtan.appendChild(aGombokUtan);
    gombok.appendChild(liGombokUtan);
    
    //tablazat osszerakas
    var torzs = document.getElementById("torzs");

    for(var i = 0; i < locations.results.length; i++)
    {
        console.log();
        var tr = document.createElement("tr");

        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");

        td1.appendChild(document.createTextNode(locations.results[i].name));
        td2.appendChild(document.createTextNode(locations.results[i].type));
        td3.appendChild(document.createTextNode(locations.results[i].dimension));
        td4.appendChild(document.createTextNode(locations.results[i].residents.length));

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        torzs.appendChild(tr);
    }
}