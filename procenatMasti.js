document.getElementById("formaProcentaMasti").addEventListener("submit", ispisRezultata);
function izracunajBMI() {
    var visina = document.getElementById("visina").value;
    var tezina = document.getElementById("tezina").value;
    var privremena = tezina * 1000000 / (visina * visina);
    var BMI = Math.round(privremena) / 100;
    return BMI;
}
function ispisRezultata(event) {
    event.preventDefault();
    var indeksMase = izracunajBMI();
    var procenatMasti= racunanjeProcentaMasti()
    document.getElementById("BMI").innerHTML = "Indeks mase je " + indeksMase + "kg/m<sup>2</sup>";
    document.getElementById("procenatMasti").innerHTML = "Procenat masti je " + procenatMasti + "%";
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
function racunanjeProcentaMasti() {
    var BMI = izracunajBMI();
    var pol = odredjivanjePola();
    var godine = document.getElementById("godine").value;
    if (pol = "muski") {
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
    procenatMasti=Math.round(procenatMasti*100)/100
    return procenatMasti;
}