document.getElementById("formaZaKalorije").addEventListener("submit", ispisRezultata);
function odredjivanjePolaKalorije() {
    var polovi = document.getElementsByName("gender");
    if (polovi[0].checked) {
        var odabraniPol = "male";
    }
    else {
        var odabraniPol = "female";
    }
    return odabraniPol;
}
function racunanjePotrebnihKalorije() {
    var pol = odredjivanjePolaKalorije();
    var tezina = document.getElementById("tezinaZaKalorije").value;
    var daLiTrenira = daLiKorisnikTrenira();
    if (pol == "male") {
        if (daLiTrenira == "da") {
            var preporuceniUnosKalorija = 815 + (36.6 * tezina) + 460;
        } else {
            var preporuceniUnosKalorija = 815 + (36.6 * tezina)
        }
    } else {
        if (daLiTrenira == "da") {
            var preporuceniUnosKalorija = 580 + (31.1 * tezina) + 350;
        } else {
            var preporuceniUnosKalorija = 580 + (31.1 * tezina);
        }
    }
    return preporuceniUnosKalorija;
}
function daLiKorisnikTrenira() {
    var treniranje = document.getElementsByName("trenira");
    if (treniranje[0].checked) {
        var sportista = treniranje[0].value;
    }
    else {
        var sportista = treniranje[1].value;
    }
    return sportista;
}
function ispisRezultata(event) {
    event.preventDefault();
    var kalorije = racunanjePotrebnihKalorije();
    document.getElementById("rezultatZaKalorije").innerHTML = "Vaše dnevne potrebe su " + kalorije + " kalorija.";
}