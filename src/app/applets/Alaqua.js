
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
    $hr(con);
    $b(con, 'Small spell', function () { aqSpell('small') });
    $b(con, 'Medium spell', function () { aqSpell('medium') });
    $b(con, 'Large spell', function () { aqSpell('large') });
    $b(con, 'Grand spell', function () { aqSpell('grand') });
    $b(con, 'Megaflare', function () { aqSpell('mega') });


}

function aqSpell(s){
    if(s == 'small'){
        aquaAether -= 50
        pullID('ticker').innerText = 'Aether: ' + aquaAether;
    } else if (s=='medium'){
        aquaAether -= 100
        pullID('ticker').innerText = 'Aether: ' + aquaAether;
    } else if(s=='large'){
        aquaAether -= 200
        pullID('ticker').innerText = 'Aether: ' + aquaAether;

    } else if(s=='grand'){
        aquaAether -= 500;
        pullID('ticker').innerText = 'Aether: ' + aquaAether;
    } else if(s=='mega'){
        aquaAether -= 4000;
        pullID('ticker').innerText = 'Aether: ' + aquaAether;

    }
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
    if(aquaAether < 3925){
        aquaAether += 75;
        pullID('ticker').innerText = 'Aether: ' + aquaAether;
    }
}

function crystal(){
    if (aquaAether < 3800) {
        aquaAether += 200;
        pullID('ticker').innerText = 'Aether: ' + aquaAether;
    }
}

function vampire(){
    if (aquaAether < 3500) {
        aquaAether += 500;
        pullID('ticker').innerText = 'Aether: ' + aquaAether;
    }
}

function food(){
    if (aquaAether < 3980) {
        aquaAether += 20;
        pullID('ticker').innerText = 'Aether: ' + aquaAether;
    }
}