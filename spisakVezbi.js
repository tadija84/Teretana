function prikazDiva(x){
    var imeDiva=document.getElementById(x);
    var divovi=document.getElementById("divSaVezbama");
    imeDiva.style="display:block";
    divovi.style="display:none";
}
function zatvoritiDivVezbi(x){
    var imeDiva=document.getElementById(x);
    var divovi=document.getElementById("divSaVezbama");
    imeDiva.style="display:none";
    divovi.style="display:block";
}