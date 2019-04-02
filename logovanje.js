function dodajKorisnika(event) {
    event.preventDefault();
    var user = document.getElementById("user1").value;
    var pass = document.getElementById("pass1").value;
    if (proveraImena(user) !== false) {
        alert('Već postoji korisnik');
        return;
    }
    var ime=document.getElementById("pravoImeKorisnikaPriRegistaciji").value;
    var tezina = document.getElementById("tezinaPriRegistraciji").value;
    var visina = document.getElementById("visinaPriRegistraciji").value;
    var godine = document.getElementById("godineRegistracija").value;
    var pol = odredjivanjePola();
    var modulTreninga = odredjivanjeModulaTreninga();
    var brojTreningaNedeljno = odabirBrojaTreningaNedeljno();
    var confirmpass = document.getElementById("confirmpass").value;
    var secquestion = document.getElementById("question").value;
    var answer = document.getElementById("answer").value;
    //var selektovan = document.getElementById("question");
    var vreme = vremeNaPocetkuNedelje();
    var odradjeniTreninzi = [];
    var podaciOKorisniku = {
        user: user,
        pass: pass,
        confirmpass: confirmpass,
        answer: answer,
        secquestion: secquestion,
        ime: ime,
        tezina: tezina,
        visina: visina,
        godine: godine,
        pol: pol,
        modulTreninga: modulTreninga,
        brojTreningaNedeljno: brojTreningaNedeljno,
        vreme: vreme,
        odradjeniTreninzi: odradjeniTreninzi
    }
    var korisniciIzStoragea = sviKorisnici();
    korisniciIzStoragea.push(podaciOKorisniku);
    localStorage.setItem('korisnik', JSON.stringify(korisniciIzStoragea));
    ulogujGa(user);
}
function proveriKorisnika() {
    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;
    var korisnik = proveraImena(user);
    if (korisnik === false) {
        alert('ne postoji korisnik');
    } else {
        if (korisnik.pass === pass) {
            ulogujGa(user);
        } else {
            alert('Pogrešna šifra');
        }
    }
}
function izlogujGa() {
    localStorage.removeItem('ulogovaniKorisnik');
    location='pocetna.html';
}

function proveraImena(user) {
    var korisnici = sviKorisnici();
    for (var index = 0; index < korisnici.length; index++) {
        var korisnik = korisnici[index];
        if (korisnik.user == user) {
            return korisnik;
        }
    }
    return false;
}
function ulogujGa(ime) {
    localStorage.setItem('ulogovaniKorisnik', ime);
    prikaziMojProfil();
}
function stranicaZaLogout() {
    document.getElementById("logoutPage").style.display = "block";
    document.getElementById("daLiSiSiguran").style.display = "block";
    document.body.style.background = 'url("./slike/pozadina-3.jpg")';
    document.getElementById("logoutPage").style.backgroundSize = "cover";
    document.getElementById("logoutPage").style.backgroundAttachment = "fixed";
    hideDivs(["home", "izmeniProfil", "statistika", "programZaSedmicu", "register", "promenaSifre", "program"]);
}
