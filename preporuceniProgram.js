document.getElementById("formaPreporucenogTreninga").addEventListener("submit", ispisRezultata);
function vezbeZaTrening() {
    var vezbeZaGrudi = ["Bench press", "Kosi bench press", "Obrnuto kosi bench press", "Sklekovi", "Dizanje bućica sa obe ruke", "Razvlačenje"];
    var vezbeZaBiceps = ["Dizanje jednoručnog tega", "Dizanje dvoručnog tega sa Skotove klupe", "Dizanje dvoručnog tega iz stojećeg položaja", "Povlačenje sa kross mašine"];
    var vezbeZaTriceps = ["Dizanje dvoručnog tega iz ležeceg položaja", "Dizanje bućice iz ležeceg položaja", "Povlačenje na cross mašini", "Dizanje jednoručnog tega iz stojećeg položaja"];
    var vezbeZaLedja = ["Povlačenje na lat mašini na grudi", "Veslanje", "Dizanje jednoručnog tega iz naklona", "Dizanje dvoručnog tega iz naklona", "Dizanje tela iz ležeceg položaja unazad"];
    var vezbeZaRamena = ["Letenje", "Potisak iz sedećeg položaja na gore", "Dizanje tega iz sedećeg položaja na gore", "Dizanje jednoručnih tegova ispred sebe", "Povlačenje na lat mašini iza glave"];
    var vezbeZaNoge1 = ["Čučanj", "Potisak napred", "Potisak nogama"];
    var vezbeZaNoge2 = ["Iskorak", "Potisak nazad", "Listovi"];
    var kardio = ["Trcanje", "Nordijsko skijanje", "Vožnja bicikle"];
    var vezbe = [vezbeZaGrudi, vezbeZaBiceps, vezbeZaTriceps, vezbeZaLedja, vezbeZaRamena, vezbeZaNoge1, vezbeZaNoge2, kardio];
    return vezbe;
}
function podelaMisicaNaGrupe() {
    var vezbe = vezbeZaTrening();
    var brojDana = nadjiIzabranuVrednost();

    if (brojDana == 1) {
        var vezbeZaDan = [
            [], [vezbe[0], vezbe[1], vezbe[2], vezbe[3], vezbe[4], vezbe[5], vezbe[6]]
        ]
    }
    else if (brojDana == 2) {
        var vezbeZaDan = [[vezbe[0], vezbe[1], vezbe[2]], [vezbe[3], vezbe[4], vezbe[5], vezbe[6]]];
    }
    else if (brojDana == 3) {
        var vezbeZaDan = [[vezbe[0], vezbe[1]], [vezbe[2], vezbe[3]], [vezbe[4], vezbe[5], vezbe[6]]];
    }
    else if (brojDana == 4) {
        var vezbeZaDan = [[vezbe[0], vezbe[1], vezbe[2]], [vezbe[3], vezbe[4], vezbe[5], vezbe[6]]];
    }
    else if (brojDana == 5) {
        var vezbeZaDan = [[vezbe[0], vezbe[1]], [vezbe[2], vezbe[3]], [vezbe[4], vezbe[5], vezbe[6]]];
    }
    else if (brojDana == 6) {
        var vezbeZaDan = [[vezbe[0], vezbe[1]], [vezbe[2], vezbe[3]], [vezbe[4], vezbe[5], vezbe[6]]];
    }
    else if (brojDana == 7) {
        var vezbeZaDan = [[vezbe[0], vezbe[1]], [vezbe[2], vezbe[3]], [vezbe[4], vezbe[5], vezbe[6]], [vezbe[7]]];
    }
    return vezbeZaDan;
}
function daniKojimaSeVezba() {
    var daniUNedelji = [1, 2, 3, 4, 5, 6, 7];
    var brojDana = nadjiIzabranuVrednost();
    if (brojDana == 1) {
        var daniKojimaSeVezba = [daniUNedelji[5]];
    }
    else if (brojDana == 2) {
        var daniKojimaSeVezba = [daniUNedelji[2], daniUNedelji[5]];
    }
    else if (brojDana == 3) {
        var daniKojimaSeVezba = [daniUNedelji[1], daniUNedelji[3], daniUNedelji[5]];
    }
    else if (brojDana == 4) {
        var daniKojimaSeVezba = [daniUNedelji[0], daniUNedelji[1], daniUNedelji[4], daniUNedelji[5]];
    }
    else if (brojDana == 5) {
        var daniKojimaSeVezba = [daniUNedelji[0], daniUNedelji[1], daniUNedelji[3], daniUNedelji[4], daniUNedelji[5]];
    }
    else if (brojDana == 6) {
        var daniKojimaSeVezba = [daniUNedelji[0], daniUNedelji[1], daniUNedelji[2], daniUNedelji[3], daniUNedelji[4], daniUNedelji[5]];
    }
    else if (brojDana == 7) {
        var daniKojimaSeVezba = [daniUNedelji[0], daniUNedelji[1], daniUNedelji[2], daniUNedelji[3], daniUNedelji[4], daniUNedelji[5], daniUNedelji[6]];
    }
    return daniKojimaSeVezba;
}
function izborNasumicnogBroja(x) {
    var broj = Math.floor(Math.random() * x);
    return broj
}
function racunanjePrograma() {
    var dani = daniKojimaSeVezba();
    var vezbeZaDan = podelaMisicaNaGrupe();
    var zaIspis = "<table>";
    var serijeIPonavljanja =  brojSerijaPonavljanja();
    var serije=serijeIPonavljanja[0];
    var ponavljanja=serijeIPonavljanja[1];
    var i = 1;
    while (i < 8) {
        var program = programZaDan(i);
        for (var j = 0; j < dani.length; j++) {
            if (i == dani[j]) {
                zaIspis += "<tr><th colspan='3'>DAN " + i + ".</th></tr>";
                zaIspis+="<tr style=' background:rgb(181,211,52)' ><td>Vežba</td><td>Broj serija</td><td>Broj ponavljanja</td></tr>";
                for (var q = 0; q < vezbeZaDan[program].length; q++) {
                    var brojX = izborNasumicnogBroja(vezbeZaDan[program][q].length);
                    var brojY = izborNasumicnogBroja(vezbeZaDan[program][q].length);
                    while (brojX === brojY) {
                        brojY = izborNasumicnogBroja(vezbeZaDan[program][q].length);
                    }
                    zaIspis += "<tr><td>" + vezbeZaDan[program][q][brojX] + "</td><td>"+serije+"</td><td>"+ponavljanja+"</td></tr>";
                    zaIspis += "<tr><td>" + vezbeZaDan[program][q][brojY] + "</td><td>"+serije+"</td><td>"+ponavljanja+"</td></tr>";
                }
            }
        }
        i++;
    }
    zaIspis += "</table>";
    return zaIspis;
}
function programZaDan(x) {
    var brojDana = nadjiIzabranuVrednost();
    var danDanas = x - 1;
    if (brojDana == 1) {
        var opcije = ['x', 'x', 'x', 'x', 'x', 1, 'x'];
    }
    else if (brojDana == 2) {
        var opcije = ['x', 'x', 0, 'x', 'x', 1, 'x'];
    }
    else if (brojDana == 3) {
        var opcije = ['x', 0, 'x', 1, 'x', 2, 'x',];
    }
    else if (brojDana == 4) {
        var opcije = [0, 1, 'x', 'x', 0, 1, 'x'];
    }
    else if (brojDana == 5) {
        var opcije = [0, 1, 'x', 2, 0, 1, 'x'];
    }
    else if (brojDana == 6) {
        var opcije = [0, 1, 2, 0, 1, 2, 'x'];
    }
    else if (brojDana == 7) {

        var opcije = [0, 1, 2, 0, 1, 2, 3];
    }
    var programKojiPrimenjujemo = opcije[danDanas];
    return programKojiPrimenjujemo;
}
function ispisRezultata(event) {
    event.preventDefault();
    document.getElementById("tabelaSaPrepProgramom").innerHTML = racunanjePrograma();
}
function nadjiIzabranuVrednost(){
    var izabranaVrednost=document.getElementById("odabirBrojaTreningaNedeljno").value;
    return izabranaVrednost;
}
function izborModulaTreninga(){
    var izabraniModul=document.getElementById("modelTreninga").value;
    return izabraniModul;
}
function brojSerijaPonavljanja(){
    var izabraniModul=izborModulaTreninga();
    var serije;
    var ponavljanja;
    if(izabraniModul=="snaga"){
        serije = 3;
        ponavljanja=3;
    }else if(izabraniModul=="masa"){
        serije = 4;
        ponavljanja=6;
    }else if(izabraniModul=="definicija"){
        serije = 5;
        ponavljanja=10;
    }
    var trening=[serije,ponavljanja];
    return trening;
}