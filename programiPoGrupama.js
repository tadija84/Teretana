document.getElementById("prikaz").addEventListener("click", ispisRezultata);
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

function nadjiIzabranuVrednost() {
    var izabranaVrednost = document.getElementById("grupe").value;
    return izabranaVrednost;
}
function ispisRezultata() {
    var ispis=racunanje();
document.getElementById("zaIspis").innerHTML=ispis;
}
function indeksVezbe() {
    var grupaMisica = nadjiIzabranuVrednost();
    var index;
    if (grupaMisica == 'grudi') {
        index = 0;
    }
    else if (grupaMisica == 'biceps') {
        index = 1;
    }
    else if (grupaMisica == 'triceps') {
        index = 2;
    }
    else if (grupaMisica == 'ledja') {
        index = 3;
    }
    else if (grupaMisica == 'ramena') {
        index = 4;
    }
    else if (grupaMisica == 'noge1') {
        index = 5;
    }
    else if (grupaMisica == 'noge2') {
        index = 6;
    }
    return index;
}
function racunanje() {
    var index = indeksVezbe();
    var vezbe = vezbeZaTrening();
    var random1 = izborNasumicnogBroja(vezbe[index].length);
    var random2 = izborNasumicnogBroja(vezbe[index].length);
    while (random1 == random2) {
        random2 = izborNasumicnogBroja(vezbe[index].length);
    }
    var random3 = izborNasumicnogBroja(vezbe[index].length);
    while (random3 == random1 || random3 == random2) {
        random3 = izborNasumicnogBroja(vezbe[index].length);
        random3 = izborNasumicnogBroja(vezbe[index].length);
    }
    var prvaVezba = vezbe[index][random1];
    var drugaVezba = vezbe[index][random2];
    var trecaVezba = vezbe[index][random3];
    var tabela = "<table><tr><th>Broj vežbe</th><th>Vežba</th></tr><tr><td>1</td><td class='kockica'>" + prvaVezba + "</td></tr></tr><tr><td>2</td><td class='kockica'>" + drugaVezba + "</td></tr></tr><tr><td>3</td><td class='kockica'>" + trecaVezba + "</td></tr></table>"
    return tabela;
}
function izborNasumicnogBroja(x) {
    var broj = Math.floor(Math.random() * x);
    return broj
}