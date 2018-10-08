function prikaziDivTabelu(x,y){
    var imeBildera=document.getElementById(x);
    var pozadina=y;
    var divovi=document.getElementById("divoviPoznatih");
    imeBildera.style="display:block";
    divovi.style="display:none";
    document.body.style=" background:url('"+y+"');background-attachment: fixed;background-size: cover;background-repeat: no-repeat;";
}
function zatvoriTabeluPoznatog(x){
    var imeBildera=document.getElementById(x);
    var divovi=document.getElementById("divoviPoznatih");
    imeBildera.style="display:none";
    divovi.style="display:block";
    document.body.style=" background:url('./slike/pozaadina-4.jpg');background-size: cover;background-repeat: no-repeat;";
}