let AiyaTick = window.setInterval(adder, 187500);

var nuggetNeed = 0;
var glassState = 0;

function Aiya() {
    let data = localStorage.getItem('aiyaNug')
    if(data != undefined){
        nuggetNeed = parseInt(data).toFixed(1);

    }
    let con = page();
    $h(2, con, 'Aiya nugget generation needs', '', '');
    $hr(con);
    $h(3, con, 'Nuggets to safe: ' + nuggetNeed, '', 'ticker');
    $h(3,con,'Glasses are: Off','','glassText')
    $b(con, 'Create A Nugget', function () { nuggetGen(1) }, '', '');
    $b(con, 'Create 10 Nugget', function () { nuggetGen(10) }, '', '');
    $b(con,'Toggle Glasses', function(){glassTog()},'','');
}

async function adder() {
    if(window.location.hash == '#Aiya()'){
        if(glassState == 0){
            if(nuggetNeed >= 160){
                pullID('ticker').innerText = "EMERGENCY"
            } else {
                nuggetNeed += 1;
                pullID('ticker').innerText = "Nuggets to safe: " + nuggetNeed;
            }
        } else {
            if (nuggetNeed >= 160) {
                pullID('ticker').innerText = "EMERGENCY"
            } else {
                nuggetNeed += 0.5;
                pullID('ticker').innerText = "Nuggets to safe: " + nuggetNeed;
            }
        }
        localStorage.setItem('aiyaNug', nuggetNeed);
    }
}

function nuggetGen(n){
    if(nuggetNeed > 9 && n == 10){
        nuggetNeed -= 10
        pullID('ticker').innerText = "Nuggets to safe: " + nuggetNeed;
    } else if(nuggetNeed > 0 && n == 1){
        nuggetNeed -= 1
        pullID('ticker').innerText = "Nuggets to safe: " + nuggetNeed;

    }
    localStorage.setItem('aiyaNug', nuggetNeed);

}

function glassTog(){
    if(glassState == 0){
        glassState = 1;
        pullID('glassText').innerText = "Glasses are: On";
    } else {
        glassState = 0;
        pullID('glassText').innerText = "Glasses are: Off";

    }
}