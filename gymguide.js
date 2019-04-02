document.getElementById("registrujSe").addEventListener("click", klikNaLink);
document.getElementById("loginLink").addEventListener("click", klikNaLink);
document.getElementById("linkZaboravljenaSifra").addEventListener("click", klikNaLink);
document.getElementById("pokaziProgramZaDanas").addEventListener("click", racunanjeIPrikazProgramaZaDanas)
document.getElementById("promenaSifre").addEventListener("submit", promeniSifru);
document.getElementById("urediProfil").addEventListener("click", urediMojProfil);
document.getElementById("zaboravljenaSifra").addEventListener("submit", zaboravljenaSifra);
document.getElementById("register").addEventListener("submit", dodajKorisnika);
document.getElementById("login").addEventListener("submit", proveriKorisnika);
document.getElementById("logoutLink").addEventListener("click", stranicaZaLogout);
document.getElementById("pocetna").addEventListener("click", prikaziMojProfil);
document.getElementById("zaDa").addEventListener("click", izlogujGa);
document.getElementById("zaNe").addEventListener("click", prikaziMojProfil);
document.getElementById("promeniSifru").addEventListener("click", idiNaPromenuSifre);
document.getElementById("pokaziProgramZaSedmicu").addEventListener("click", racunanjeIPrikazProgramaZaSedmicu);
document.getElementById("izmeniProfil").addEventListener("submit", promenaPodataka);
document.getElementById("prikazStatistike").addEventListener("click", prikaziStatistiku);
function klikNaLink(event) {
    event.preventDefault();
    var id = event.target.id;
    document.getElementById("register").style.display = id == 'registrujSe' ? 'block' : 'none';
    document.getElementById("login").style.display = id == 'loginLink' ? 'block' : 'none';
    document.getElementById("zaboravljenaSifra").style.display = id == 'linkZaboravljenaSifra' ? 'block' : 'none';
}
function prikaziMojProfil() {
    document.body.style.backgroundImage = "url('./slike/pozadina-1.jpg')";
    document.body.style.backgroundColor = "#f3f3f3";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
    document.getElementById("mojProfil").style.display = 'block';
    document.getElementById("home").style.display = 'block';
    document.getElementById("ispisOsnovnihPodataka").style.display = "block";
    hideDivs(["izmeniProfil", "login", "program", "statistika", "programZaSedmicu", "daLiSiSiguran", "register", "promenaSifre", "logout"]);
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    console.log(korisnik);
    var tezineKorisnika = preporuceniModulTreninga();
    document.getElementById("imeUlogovanogKorisnika").innerHTML = korisnik.ime;
    document.getElementById("izabranoImeKorisnika").innerHTML = ime;
    document.getElementById("polUlogovanogKorisnika").innerHTML = korisnik.pol;
    document.getElementById("visinaUlogovanogKorisnika").innerHTML = korisnik.visina;
    document.getElementById("tezinaUlogovanogKorisnika").innerHTML = korisnik.tezina;
    document.getElementById("idealnaTezinaUlogovanogKorisnika").innerHTML = tezineKorisnika[0];
    document.getElementById("razlikaTezinaUlogovanogKorisnika").innerHTML = tezineKorisnika[1];
    document.getElementById("godineUlogovanogKorisnika").innerHTML = korisnik.godine;
    document.getElementById("procenatMastiUlogovanogKorisnika").innerHTML = racunanjeProcentaMasti();
    document.getElementById("modulUlogovanogKorisnika").innerHTML = korisnik.modulTreninga;
    document.getElementById("treningaNedeljno").innerHTML = korisnik.brojTreningaNedeljno;
}

window.onload = function () {
    var ulogovan = localStorage.getItem('ulogovaniKorisnik');
    if (ulogovan !== null) {
        prikaziMojProfil(ulogovan);
    }
}
function idiNaPromenuSifre(event) {
    event.preventDefault();
    document.getElementById("promenaSifre").style.display = "block";
    document.body.style.background = 'url("./slike/pozaadina-4.jpg")';
    document.body.style.backgroundColor = "#f3f3f3";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
    hideDivs(["home", "program", "statistika", "programZaSedmicu", "ispisOsnovnihPodataka", "register", "izmeniProfil", "logout","daLiSiSiguran"]);
}
function zaboravljenaSifra() {
    var user = document.getElementById("user2").value;
    var userIzBaze = proveraImena(user);
    if (userIzBaze !== false) {
        var odgovor = prompt(userIzBaze.secquestion);
        if (odgovor === userIzBaze.answer) {
            alert("pass je:" + userIzBaze.pass);
        } else {
            alert("Pogrešan odgovor");
        }
    } else {
        alert('User ne postoji');
    }
}
function sviKorisnici() {
    var korisnici = localStorage.getItem('korisnik');
    if (korisnici === null) {
        return [];
    } else {
        return JSON.parse(korisnici);
    }
}

function urediMojProfil() {
    document.getElementById("izmeniProfil").style.display = "block";
    document.body.style.backgroundImage = "url('./slike/pozadina-2.jpg')";
    document.body.style.backgroundColor = "#f3f3f3";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
    hideDivs(["home", "program", "statistika", "programZaSedmicu", "ispisOsnovnihPodataka", "register", "promenaSifre", "logout","daLiSiSiguran"]);
}
function promeniSifru(event) {
    event.preventDefault();
    var stara = document.getElementById("staraSifra").value;
    var nova = document.getElementById("novaSifra").value;
    var potvrda = document.getElementById("potvrdaSifre").value;
    var user = proveraImena(localStorage.getItem('ulogovaniKorisnik'));
    if (stara == user.pass) {
        if (nova == potvrda) {
            var korisnici = sviKorisnici();
            for (var index = 0; index < korisnici.length; index++) {
                var korisnik = korisnici[index];
                if (user.user == korisnik.user) {
                    korisnici[index].pass = nova;
                }
            }
            localStorage.setItem('korisnik', JSON.stringify(korisnici));
            alert("vasa nova sifra je" + nova);
            prikaziMojProfil();
        } else {
            alert('šifre se ne podudaraju');
        }
    } else {
        alert('pogrešna šifra');
    }
}

function hideDivs(divs) {
    for (var i = 0; i < divs.length; i++) {
        document.getElementById(divs[i]).style.display = 'none';
    }
}
function prikazPrograma() {
    document.getElementById("program").style.display = "block";
    document.body.style.background = 'url("./slike/pozaadina-4.jpg")';
    document.body.style.backgroundColor = "#f3f3f3";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
    hideDivs(["home", "izmeniProfil", "login", "statistika", "programZaSedmicu", "daLiSiSiguran", "register", "promenaSifre", "logout"]);
    var datum = new Date();
    var daLiDanasImamTrening = daLiDanasVezbam(datum);
    var tabela = "<table>";
    if (daLiDanasImamTrening == false) {
        return document.getElementById("tabelaNaDan").innerHTML = "Danas je dan za odmor. Pogledajte nedeljnu tabelu";
    }
    tabela += danasnjaTabela();
    tabela += "</table>";
    document.getElementById("tabelaNaDan").innerHTML = tabela;
}

function racunanjePrograma(datum, n) {
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    var korisnici = sviKorisnici();
    var vezbe = podelaMisicaNaGrupe();
    var trening = racunanjeOptimalnogTreninga();
    var brojSerijaVezbe = trening.serije;
    var brojPonavljanjaUSeriji = trening.ponavljanja;
    var danUProgramu = programZaDan(datum);
    var povecavanjePonavljanja = trening.povecavanjePonavljanja;
    var povecavanjeSerija = trening.povecavanjeSerija;
    var daLiPovecati = daLiJeVremeZaPovecavanje();
    var odradjeniTreninzi = korisnik.odradjeniTreninzi;
    var brojTreningaKorisnika;
    var zadnjiTrening = odradjeniTreninzi[odradjeniTreninzi.length - 1];
    //zadnji trening je undefined ukoliko nije bilo treninga pre
    if (daLiPovecati == true) {
        if (brojSerijaVezbe < 6) {
            brojSerijaVezbe += povecavanjeSerija;
        }
        if (brojPonavljanjaUSeriji < 15) {
            brojPonavljanjaUSeriji += povecavanjePonavljanja;
        }
    }
    if (zadnjiTrening != undefined) {
        brojTreningaKorisnika = zadnjiTrening[1];
    } else {
        brojTreningaKorisnika = 0;
    }
    if (danUProgramu != "x") {
        var podaciZaStatistiku = [];
        podaciZaStatistiku.push(n);
        brojTreningaKorisnika += 1;
        podaciZaStatistiku.push(brojTreningaKorisnika);
        var q = vezbe[danUProgramu].length;
        for (var z = 0; z < q; z++) {
            var x = izborNasumicnogBroja(vezbe[danUProgramu][z].length);
            var y = izborNasumicnogBroja(vezbe[danUProgramu][z].length);
            while (y === x) {
                y = izborNasumicnogBroja(vezbe[danUProgramu][z].length);
            }
            var tezina1 = racunanjeOpterecenja(vezbe[danUProgramu][z][x]);
            if(vezbeBezTegova(vezbe[danUProgramu][z][x])==false){
                tezina1=0;
            }
            var tezina2 = racunanjeOpterecenja(vezbe[danUProgramu][z][y]);
             if(vezbeBezTegova(vezbe[danUProgramu][z][y])==false){
                tezina2=0;
            }
            podaciZaStatistiku.push(vezbe[danUProgramu][z][x]);
            podaciZaStatistiku.push(brojSerijaVezbe);
            podaciZaStatistiku.push(brojPonavljanjaUSeriji);
            podaciZaStatistiku.push(tezina1);
            podaciZaStatistiku.push(vezbe[danUProgramu][z][y]);
            podaciZaStatistiku.push(brojSerijaVezbe);
            podaciZaStatistiku.push(brojPonavljanjaUSeriji);
            podaciZaStatistiku.push(tezina2);
        }
        odradjeniTreninzi.push(podaciZaStatistiku);
    }
    for (var index = 0; index < korisnici.length; index++) {
        var user = korisnici[index];
        if (korisnik.user == user.user) {
            korisnici[index].odradjeniTreninzi = odradjeniTreninzi;
        }
    }
    localStorage.setItem('korisnik', JSON.stringify(korisnici));
    terminusPovecavanja();
}
function vezbeBezTegova(vezbaX){
    if(vezbaX=="Sklekovi")return false;
    if(vezbaX=="Dizanje tela iz ležećeg položaja unazad")return false;
    if(vezbaX=="Čučanj")return false;
    if(vezbaX=="Trcanje")return false;
    if(vezbaX=="Nordijsko skijanje")return false;
    if(vezbaX=="Voznja bicikle")return false;
return true;
}
function stampa(zaStampu) {
    var printContents = document.getElementById(zaStampu).innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}
function racunanjeIPrikazProgramaZaSedmicu() {
    brisanjeSuvisnihTreninga();
    racunanjeProgramaZaSedmicu();
    prikazProgramaZaSedmicu()
}
function prikazProgramaZaSedmicu() {
    document.getElementById("programZaSedmicu").style.display = "block";
    document.body.style.backgroundColor = "#f3f3f3";
    document.body.style.background = 'url("./slike/pozadina.jpg")';
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
    hideDivs(["home", "izmeniProfil", "login", "program", "statistika", "daLiSiSiguran", "register", "promenaSifre", "logout"]);
    var daniUNedelji = ["ponedeljak", "utorak", "sreda", "cetvrtak", "petak", "subota", "nedelja"];
    var ime = koJeUlogovan();
    var korisnik = proveraImena(ime);
    var datum = new Date();
    var danUSedmici = datum.getDay();
    if (danUSedmici == 0) {
        danUSedmici = 7
    }
    var brojDana = parseInt(korisnik.brojTreningaNedeljno);
    var udaljenostDoNedelje = 7 - danUSedmici;
    datum.setDate(datum.getDate() + udaljenostDoNedelje - 6);
    var tabela = "<table>";
    tabela += "<thead><tr><th colspan='6'>Dan i program</th></thead>";
    var counter = 0;
    var counter2 = 0;
    for (var i = 7; i > 0; i--) {
        var prethodniTreninzi = korisnik.odradjeniTreninzi;
        var dan = datum.getDate();
        var mesec = datum.getMonth() + 1;
        var godina = datum.getFullYear();
        var danZaTabelu = dan.toString() + "." + mesec.toString() + "." + godina.toString() + ".";
        tabela += "<tr><th colspan='6'>" + danZaTabelu + "</th></tr>";
        tabela += "<tr><th colspan='6'>" + daniUNedelji[counter] + "</th></tr>";
        tabela += "<thead><tr><th>Vezba</th><th>Broj serija</th><th>Ponavljanje</th><th>Tezina</th></tr></thead>";
        var t = 0;
        var s = 200;
        var danUProgramu = programZaDan(datum);
        if (danUProgramu != "x") {
            var zadnjiTrening = prethodniTreninzi[prethodniTreninzi.length - brojDana + counter2];
            var potrebniTrening = trazenjePotrebnogTreninga(prethodniTreninzi,danZaTabelu);
            var zaProslediti = prethodniTreninzi.length - brojDana + counter2;
            if (potrebniTrening != undefined) {
                var duzinaNizaNaDan = potrebniTrening.length - 2;
                var brojVezbi = (duzinaNizaNaDan) / 4;
                var y = 2;
                for (var index = 0; index < brojVezbi; index++) {
                    tabela += "<tr>";
                    for (var index2 = 0; index2 < 4; index2++) {
                        tabela += "<td >" + potrebniTrening[y] + "</td>";
                        y++;
                    }
                    t++;
                    s++;
                    tabela += "<td class='tabSaStrelicom'><input type='button'class='strelice'  value='&#x25B2;' id=" + t + " onclick=' var y=" + y + ";var privremeno=" + zadnjiTrening[y - 1] + "; var zaProslediti=" + zaProslediti + "; povecavanjeTezineUSedmicnojTabeli(privremeno,y,zaProslediti)'></td><td class='tabSaStrelicom'><input type='button'class='strelice'  id=" + s + " value='&#x25BC;'  onclick='var y=" + y + "; var privremeno=" + zadnjiTrening[y - 1] + ";var smanjiZa=" + zaProslediti + ";smanjivanjeTezineUSedmicnojTabeli(privremeno,y,smanjiZa)'></td>";
                    tabela += "</tr>";
                }
            }else{
                tabela += "<tr><td>-----</td></tr>";
            }
            counter2++;
        } else {
            tabela += "<tr><td>Dan za odmor</td></tr>";
        }
        counter++;
        udaljenostDoNedelje--;
        datum.setDate(datum.getDate() + 1);
    }
    tabela += "</table>";
    document.getElementById("tabelaZaSedmicu").innerHTML = tabela;
}
function trazenjePotrebnogTreninga(proslednjeniNiz,danZaTabelu){   
    for(var i=proslednjeniNiz.length-1; i>=0; i--){
        if(proslednjeniNiz[i][0]==danZaTabelu){                  
            return proslednjeniNiz[i];
        }
    }
}
//funkcija koja racuna program za celu nedelju
function racunanjeProgramaZaSedmicu() {
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    var odradjeniTreninzi = korisnik.odradjeniTreninzi;
    var zadnjiTrening = odradjeniTreninzi[odradjeniTreninzi.length - 1];
    var datum = new Date();
    if (zadnjiTrening == undefined) {
        zadnjiTrening = [];
    }
    var danUSedmici = datum.getDay();
    if (danUSedmici == 0) {
        danUSedmici = 7;
    }
    var udaljenostDoNedelje = 7 - danUSedmici;
    datum.setDate(datum.getDate() + udaljenostDoNedelje - 6);
    for (var i = 1; i <= 7; i++) {
        var dan = datum.getDate();
        var mesec = datum.getMonth() + 1;
        var godina = datum.getFullYear();
        var datumZaTabelu = dan.toString() + "." + mesec.toString() + "." + godina.toString() + ".";
        if (i >= danUSedmici) {
            racunanjePrograma(datum, datumZaTabelu);          
        } 
        datum.setDate(datum.getDate() + 1);
    }
}
function brisanjeSuvisnihTreninga() {
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    var korisnici = sviKorisnici();
    var sviTreninzi=korisnik.odradjeniTreninzi;
    var datum = new Date();
    var dan = datum.getDate();
    var mesec = datum.getMonth() + 1;
    var godina = datum.getFullYear();
    var datumZaTabelu = dan.toString() + "." + mesec.toString() + "." + godina.toString() + ".";
   for(var j=0; j<sviTreninzi.length; j++){
        if(sviTreninzi[j][0]==datumZaTabelu){           
          sviTreninzi.length=j;       
             for (var index = 0; index < korisnici.length; index++) {
                var user = korisnici[index];
                if (korisnik.user == user.user) {
                    korisnici[index].odradjeniTreninzi = sviTreninzi;
                }
            }
           localStorage.setItem('korisnik', JSON.stringify(korisnici));
            return;
        }
        
    }
}

function izborNasumicnogBroja(x) {
    var broj = Math.floor(Math.random() * x);
    return broj
}

//prikaz prethodnih treninga
function prikaziStatistiku() {
    document.getElementById("statistika").style.display = "block";
    document.body.style.backgroundColor = "#f3f3f3";
    document.body.style.background = 'url("./slike/pozadina8.jpg")';
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
    hideDivs(["home", "izmeniProfil", "logout", "programZaSedmicu", "register", "promenaSifre", "program","daLiSiSiguran"]);
    var ime = koJeUlogovan();;
    var korisnik = proveraImena(ime);
    var prethodniTreninzi = korisnik.odradjeniTreninzi;
    var tabela = "<table>";
    for (var i = 0; i < prethodniTreninzi.length; i++) {
        tabela += "<tr>";
        tabela += "<th colspan='4'>" + prethodniTreninzi[i][0] + "</th></tr>";
        var n = (prethodniTreninzi[i].length - 2) / 4;
        var y = 2;
        for (var z = 1; z <= n; z++) {
            tabela += "<tr>";
            for (var w = 0; w <= 3; w++) {
                tabela += "<td >" + prethodniTreninzi[i][y] + "</td>";;
                y++;
            }
            tabela += "</tr>";
        }
    }
    tabela += "</table>";
    document.getElementById("podaciOPrethodnimTreninzima").innerHTML = tabela;
    return tabela;
}
function koJeUlogovan() {
    var ime = localStorage.getItem('ulogovaniKorisnik');
    return ime;
}
function racunanjeIPrikazProgramaZaDanas(){
    racunanjeProgramaZaSedmicu();
    prikazPrograma()
}
//cela naredna funkcija uzima program za odredjeni dan koji se nalazi u storage pod "odradjeni treninzi"
function danasnjaTabela() {
    var ime = koJeUlogovan();
    var korisnik = proveraImena(ime);
    var prethodniTreninzi = korisnik.odradjeniTreninzi;
    var datum = new Date();
    var dan = datum.getDate();
    var mesec = datum.getMonth() + 1;
    var godina = datum.getFullYear();
    var danZaTabelu = dan.toString() + "." + mesec.toString() + "." + godina.toString() + ".";
    for (var redniBrojTreninga = 0; redniBrojTreninga < prethodniTreninzi.length; redniBrojTreninga++) {
        //ova linija koda proverava da li je datum u tabeli isti kao i datum u local storage
        if (danZaTabelu == prethodniTreninzi[redniBrojTreninga][0]) {
            var zadnjiTrening = prethodniTreninzi[redniBrojTreninga];
            var tabela = "";
            tabela += "<tr><th colspan='6'>" + zadnjiTrening[0] + "</th></tr>";
            var duzina = (zadnjiTrening.length - 2) / 4;
            var counter = 2;
            var t = 0;
            var s = 200;
            for (var i = 0; i < duzina; i++) {
                tabela += "<tr>";
                for (var index = 0; index < 4; index++) {
                    tabela += "<td >" + zadnjiTrening[counter] + "</td>";
                    counter++;
                }
                t++;
                s++;
                tabela += "<td><input type='button' class='strelice' value='&#x25B2;' id=" + t + " onclick=' var y=" + counter + "; var redniBrojTreninga=" + redniBrojTreninga + "; var privremeno=" + zadnjiTrening[counter - 1] + "; povecavanjeTezine(privremeno,y,redniBrojTreninga)'></td><td><input type='button' id=" + s + " value='&#x25BC;' class='strelice'  onclick='var y=" + counter + ";  var redniBrojTreninga=" + redniBrojTreninga + ";var privremeno=" + zadnjiTrening[counter - 1] + ";smanjivanjeTezine(privremeno,y,redniBrojTreninga)'></td>";
                tabela += "</tr>";
            }
        }
    }
    return tabela;
}

function promenaPodataka(event) {
    event.preventDefault();
    var user = proveraImena(localStorage.getItem('ulogovaniKorisnik'));
    var korisnici = sviKorisnici();
    var ime = document.getElementById("pravoImeKorisnika").value;
    var tezina = document.getElementById("tezina").value;
    var modulTreninga = odredjivanjeModulaPromena();
    var visina = document.getElementById("visina").value;
    var godine = document.getElementById("godine").value;
    var procenatMasti = racunanjeProcentaMasti();
    var brojTreningaNedeljno = odabirBrojaTreningaPromena();
    for (var index = 0; index < korisnici.length; index++) {
        var korisnik = korisnici[index];
        if (korisnik.user == user.user) {
            if (ime != "") { korisnici[index].ime = ime; }
            if (visina != "") { korisnici[index].visina = visina; }
            if (tezina != "") { korisnici[index].tezina = tezina; }
            if (godine != "") { korisnici[index].godine = godine; }
            if (procenatMasti != "") { korisnici[index].procenatMasti = procenatMasti; }
            if (modulTreninga != "") { korisnici[index].modulTreninga = modulTreninga; }
            if (brojTreningaNedeljno != "") { korisnici[index].brojTreningaNedeljno = brojTreningaNedeljno; }
            localStorage.setItem('korisnik', JSON.stringify(korisnici));
        }
    }
    racunanjeProgramaZaSedmicu();
    location.reload();
}
function odredjivanjePola() {
    var polovi = document.getElementsByName("gender");
    if (polovi[0].checked) {
        var odabraniPol = polovi[0].value;
    }
    else {
        var odabraniPol = polovi[1].value;
    }
    return odabraniPol;
}
function odredjivanjeModulaTreninga() {
    var moduli = document.getElementsByName("modul");
    if (moduli[0].checked) {
        var odabraniModul = moduli[0].value;
    }
    else if (moduli[1].checked) {
        var odabraniModul = moduli[1].value;
    }
    else if (moduli[2].checked) {
        var odabraniModul = moduli[2].value;
    }
    else if (moduli[3].checked) {
        var odabraniModul = moduli[3].value;
    }
    else { var odabraniModul = ""; }
    return odabraniModul;
}
function odredjivanjeModulaPromena() {
    var moduli = document.getElementsByName("modulPromena");
    if (moduli[0].checked) {
        var odabraniModul = moduli[0].value;
    }
    else if (moduli[1].checked) {
        var odabraniModul = moduli[1].value;
    }
    else if (moduli[2].checked) {
        var odabraniModul = moduli[2].value;
    }
    else if (moduli[3].checked) {
        var odabraniModul = moduli[3].value;
    }
    else { var odabraniModul = ""; }
    return odabraniModul;
}
function odabirBrojaTreningaNedeljno() {
    var brojevi = document.getElementsByName("brojTreninga");
    if (brojevi[0].checked) {
        var odabraniBroj = brojevi[0].value;
    } else if (brojevi[1].checked) {
        var odabraniBroj = brojevi[1].value;
    } else if (brojevi[2].checked) {
        var odabraniBroj = brojevi[2].value;
    } else if (brojevi[3].checked) {
        var odabraniBroj = brojevi[3].value;
    } else if (brojevi[4].checked) {
        var odabraniBroj = brojevi[4].value;
    } else if (brojevi[5].checked) {
        var odabraniBroj = brojevi[5].value;
    } else if (brojevi[6].checked) {
        var odabraniBroj = brojevi[6].value;
    } else {
        var odabraniBroj = "";
    }
    var zaPovrat = parseInt(odabraniBroj);
    return zaPovrat;
}
function odabirBrojaTreningaPromena() {
    var ime = koJeUlogovan();
    var korisnik = proveraImena(ime);
    var brojevi = document.getElementsByName("brojTreningaPromena");
    if (brojevi[0].checked) {
        var odabraniBroj = brojevi[0].value;
    } else if (brojevi[1].checked) {
        var odabraniBroj = brojevi[1].value;
    } else if (brojevi[2].checked) {
        var odabraniBroj = brojevi[2].value;
    } else if (brojevi[3].checked) {
        var odabraniBroj = brojevi[3].value;
    } else if (brojevi[4].checked) {
        var odabraniBroj = brojevi[4].value;
    } else if (brojevi[5].checked) {
        var odabraniBroj = brojevi[5].value;
    } else if (brojevi[6].checked) {
        var odabraniBroj = brojevi[6].value;
    } else {
        var odabraniBroj = korisnik.brojTreningaNedeljno;
        return odabraniBroj;
    }
    var zaPovrat = parseInt(odabraniBroj);
    return zaPovrat;
}
function racunanjeOptimalnogTreninga() {
    var trening = {};
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    var terminus = terminusPovecavanja();
    if (korisnik.modulTreninga == 'masa') {
        trening = { serije: 3, ponavljanja: 6, povecavanjeSerija: 1, povecavanjePonavljanja: 1, povecavanjeOpterecenja: 2.5, terminusPovecavanja: terminus, };
    }
    else if (korisnik.modulTreninga == 'definicija') {
        trening = { serije: 5, ponavljanja: 9, povecavanjeSerija: 0, povecavanjePonavljanja: 2, povecavanjeOpterecenja: 2.5, terminusPovecavanja: terminus, };
    }
    else if (korisnik.modulTreninga == 'snaga') {
        trening = { serije: 2, ponavljanja: 3, povecavanjeSerija: 1, povecavanjePonavljanja: 1, povecavanjeOpterecenja: 2.5, terminusPovecavanja: terminus, };
    }
    else if (korisnik.modulTreninga == 'kardio') {
        trening = { serije: 2, ponavljanja: 1, povecavanjeSerija: 1, povecavanjePonavljanja: 1, povecavanjeOpterecenja: 2.5, terminusPovecavanja: terminus, };
    }
    return trening;
}
function brojSerija() {
    var serije;
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    if (korisnik.modulTreninga == 'masa') {
        serije = 4;
    }
    else if (korisnik.modulTreninga == 'definicija') {
        serije = 5;
    }
    else if (korisnik.modulTreninga == 'snaga') {
        serije = 2;
    }
    else if (korisnik.modulTreninga == 'kardio') {
        serije = 2
    }
    return serije;
}
function brojPonavljanja() {
    var ponavljanja;
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    if (korisnik.modulTreninga == 'masa') {
        ponavljanja = 8;
    }
    else if (korisnik.modulTreninga == 'definicija') {
        ponavljanja = 10;
    }
    else if (korisnik.modulTreninga == 'snaga') {
        ponavljanja = 3;
    }
    else if (korisnik.modulTreninga == 'kardio') {
        ponavljanja = 1;
    }
    return ponavljanja;
}
function racunanjeOpterecenja(x) {
    var intezitet;
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    var odradjeniTreninzi = korisnik.odradjeniTreninzi;
    var daLiPovecati = daLiJeVremeZaPovecavanje();
    var povecanje = 0;
    if (daLiPovecati == true) {
        povecanje = 2.5;
    }
    intezitet = Math.round(korisnik.tezina / 2);
    if (korisnik.pol == "female") {
        intezitet *= 0.7;
    }
    for (var index = odradjeniTreninzi.length - 1; index > 0; index--) {
        for (var z = odradjeniTreninzi[index].length; z > 0; z--) {
            if (odradjeniTreninzi[index][z] == x) {
                intezitet = odradjeniTreninzi[index][z + 3];
                if (intezitet < 150) {
                    intezitet += povecanje;
                }
                return intezitet;
            }
        }
    }
    return intezitet;
}

function vezbeZaTrening() {
    var vezbeZaGrudi = ["Bench press", "Kosi bench press", "Obrnuto kosi bench press", "Sklekovi", "Dizanje bućica sa obe ruke", "Razvlačenje"];
    var vezbeZaBiceps = ["Dizanje jednoručnog tega", "Dizanje dvoručnog tega sa Skotove klupe", "Dizanje dvoručnog tega iz stojećeg položaja", "Povlačenje sa kross mašine"];
    var vezbeZaTriceps = ["Dizanje dvoručnog tega iz ležećeg položaja", "Dizanje bućice iz ležeceg položaja", "Povlačenje na cross mašini", "Dizanje jednoručnog tega iz stojećeg položaja"];
    var vezbeZaLedja = ["Povlačenje na lat mašini na grudi", "Veslanje", "Dizanje jednoručnog tega iz naklona", "Dizanje dvoručnog tega iz naklona", "Dizanje tela iz ležećeg položaja unazad"];
    var vezbeZaRamena = ["Letenje", "Potisak iz sedećeg položaja na gore", "Dizanje tega iz sedećeg položaja na gore", "Dizanje jednoručnih tegova ispred sebe", "Povlačenje na lat mašini iza glave"];
    var vezbeZaNoge1 = ["Čučanj", "Potisak napred", "Potisak nogama"];
    var vezbeZaNoge2 = ["Iskorak", "Potisak nazad", "Listovi"];
    var kardio = ["Trcanje", "Nordijsko skijanje", "Voznja bicikle"];
    var vezbe = [vezbeZaGrudi, vezbeZaBiceps, vezbeZaTriceps, vezbeZaLedja, vezbeZaRamena, vezbeZaNoge1, vezbeZaNoge2, kardio];
    return vezbe;
}
function vremeNaPocetkuNedelje() {
    var d = new Date();
    var vreme = d.getTime();
    var dan = d.getDay();
    if (dan == 0) {
        dan = 7;
    }
    if (dan !== 1) {
        var novoVreme = vreme - (dan * 86400000);
    } else {
        novoVreme = vreme;
    }
    return novoVreme;
}
function resetovanje() {
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    var d = new Date();
    var trenutno = d.getTime();
    var korisnici = sviKorisnici();
    for (var index = 0; index < korisnici.length; index++) {
        var korisnik = korisnici[index];
        if (korisnik.user == ime.user) {
            korisnici[index].vreme = trenutno;
        }
    }
    localStorage.setItem('korisnik', JSON.stringify(korisnici));
}
function daLiJeVremeZaPovecavanje() {
    var povecati = false;
    var d = new Date();
    var vreme = d.getTime();
    var terminusKorisnika = terminusPovecavanja();
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    var pocetnoVreme = korisnik.vreme;
    var protekloVreme = vreme - pocetnoVreme;
    if (terminusKorisnika < protekloVreme) {
        povecati = true;
        resetovanje();
    }
    return povecati;
}
function terminusPovecavanja() {
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    var godine = korisnik.godine;
    if (godine < 16) {
        var izraz = 1209600000;
    }
    if (godine >= 16 || godine < 35) {
        var izraz = 604800000;
    }
    if (godine >= 35) {
        var izraz = 1209600000;
    }
    return izraz;
}
function preporuceniModulTreninga() {
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    var visina = korisnik.visina;
    var tezina = korisnik.tezina;
    var idealnaTezina = visina - 100;
    var razlikaUTezini = tezina - idealnaTezina;
    return tezineZaProfil = [idealnaTezina, razlikaUTezini];
}
function podelaMisicaNaGrupe() {
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    var vezbe = vezbeZaTrening();
    var brojDana = korisnik.brojTreningaNedeljno;
    if (brojDana == 1) {
        var vezbeZaDan = [[
            vezbe[0], vezbe[1], vezbe[2], vezbe[3], vezbe[4], vezbe[5], vezbe[6]
        ]];
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
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    var daniUNedelji = [1, 2, 3, 4, 5, 6, 7];
    var brojDana = korisnik.brojTreningaNedeljno;
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

function danasnjiDan(datum) {
    var d = new Date(datum);
    var dan = d.getDay();
    return dan;
}
function daLiDanasVezbam(datum) {
    var dan = danasnjiDan(datum);
    if (dan == 0) {
        dan = 7;
    }
    var daniZaVezbu = daniKojimaSeVezba();
    for (i = 0; i < daniZaVezbu.length; i++) {
        if (dan == daniZaVezbu[i]) {
            return odgovor = true;
        }
    }
    return odgovor = false;
}
function programZaDan(datum) {
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    var brojDana = parseInt(korisnik.brojTreningaNedeljno);
    var dan = danasnjiDan(datum);
    if (dan == 0) {
        dan = 7
    }
    var danDanas = dan - 1;
    if (brojDana == 1) {
        var opcije = ['x', 'x', 'x', 'x', 'x', 0, 'x'];
    }
    else if (brojDana == 2) {
        var opcije = ['x', 'x', 0, 'x', 'x', 1, 'x', 'x'];
    }
    else if (brojDana == 3) {
        var opcije = ['x', 0, 'x', 1, 'x', 2, 'x', 'x'];
    }
    else if (brojDana == 4) {
        var opcije = [0, 1, 'x', 'x', 0, 1, 'x'];
    }
    else if (brojDana == 5) {
        var opcije = [0, 1, 'x', 2, 0, 1, 'x', 'x'];
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

function povecavanjeTezine(tezina, y, redniBrojTreninga) {
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    tezina += 2.5;
    var korisnici = sviKorisnici();
    for (var index = 0; index < korisnici.length; index++) {
        var user = korisnici[index];
        if (korisnik.user == user.user) {
            korisnici[index].odradjeniTreninzi[redniBrojTreninga][y - 1] = tezina;
        }
    }
    localStorage.setItem('korisnik', JSON.stringify(korisnici));
    prikazPrograma();
}
function smanjivanjeTezine(tezina, y, redniBrojTreninga) {
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    tezina -= 2.5;
    var korisnici = sviKorisnici();
    for (var index = 0; index < korisnici.length; index++) {
        var user = korisnici[index];
        if (korisnik.user == user.user) {
            korisnici[index].odradjeniTreninzi[redniBrojTreninga][y - 1] = tezina;
        }
    }
    localStorage.setItem('korisnik', JSON.stringify(korisnici));
    prikazPrograma();
}
function povecavanjeTezineUSedmicnojTabeli(tezina, y, n) {
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    tezina += 2.5;
    var korisnici = sviKorisnici();
    for (var index = 0; index < korisnici.length; index++) {
        var user = korisnici[index];
        if (korisnik.user == user.user) {
            korisnici[index].odradjeniTreninzi[n][y - 1] = tezina;
        }
    }
    localStorage.setItem('korisnik', JSON.stringify(korisnici));
    prikazProgramaZaSedmicu();
}
function smanjivanjeTezineUSedmicnojTabeli(tezina, y, smanjiZa) {
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    tezina -= 2.5;
    var korisnici = sviKorisnici();
    for (var index = 0; index < korisnici.length; index++) {
        var user = korisnici[index];
        if (korisnik.user == user.user) {
            korisnici[index].odradjeniTreninzi[smanjiZa][y - 1] = tezina;
        }
    }
    localStorage.setItem('korisnik', JSON.stringify(korisnici));
    prikazProgramaZaSedmicu();
}
function racunanjeProcentaMasti() {
    var ime = koJeUlogovan();
    var korisnik = proveraImena(ime);
    var BMI = izracunajBMI();
    var pol = korisnik.pol;
    var godine = korisnik.godine;
    if (pol == "male") {
        if (godine < 20) {
            var procenatMasti = 1.51 * BMI - 0.70 * godine - 2.2;
        } else {
            var procenatMasti = 1.20 * BMI + 0.23 * godine - 16.2;
        }
    } else {
        if (godine < 20) {
            var procenatMasti = 1.51 * BMI - 0.70 * godine + 1.4;
        } else {
            var procenatMasti = 1.20 * BMI + 0.23 * godine - 5.4;
        }
    }
    procenatMasti = Math.round(procenatMasti * 100) / 100
    return procenatMasti;
}
function izracunajBMI() {
    var ime = koJeUlogovan();
    var korisnik = proveraImena(ime);
    var visina = korisnik.visina;
    var tezina = korisnik.tezina;
    var privremena = tezina * 1000000 / (visina * visina);
    var BMI = Math.round(privremena) / 100;
    return BMI;
}


//postaviti linkove sa informacijama o povredama
//insistirati na oprezu pri vezbanju