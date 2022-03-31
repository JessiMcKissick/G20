
let aquaTick = window.setInterval(subtractor, 1000);

var aquaAether = 500;

function Alaqua() {
    let con = page();
    $h(2, con, 'Alaquas Aether burn-down', '', '');
    $hr(con);
    $h(3, con, 'Aether: 500', '', 'ticker');
    $b(con,'Nugget',function(){ nugget() },'','');
    $b(con, 'Crystal', function () { crystal() }, '', '');
    $b(con, 'Vampire', function () { vampire() }, '', '');
    $b(con, 'Food', function () { food() }, '', '');

}

async function subtractor(){
    if(window.location.hash == '#Alaqua()'){
        if(aquaAether > 0){
            aquaAether -= 1;
            pullID('ticker').innerText = 'Aether: ' + aquaAether;
        } else {
            pullID('ticker').innerText = 'EMERGENCY';
        }
    }
}

function nugget(){
    console.log("nuggetB")
    if(aquaAether < 1940){
        aquaAether += 60;
        pullID('ticker').innerText = 'Aether: ' + aquaAether;
    }
}

function crystal(){
    if (aquaAether < 1800) {
        aquaAether += 200;
        pullID('ticker').innerText = 'Aether: ' + aquaAether;
    }
}

function vampire(){
    if (aquaAether < 1500) {
        aquaAether += 500;
        pullID('ticker').innerText = 'Aether: ' + aquaAether;
    }
}

function food(){
    if (aquaAether < 1980) {
        aquaAether += 20;
        pullID('ticker').innerText = 'Aether: ' + aquaAether;
    }
}