
let aquaTick = window.setInterval(subtractor, 1000);

var aquaAether = 500;
var isBurn = false;

function Alaqua() {
    let data = localStorage.getItem('aquaState')
    if(data != undefined){
        aquaAether = parseInt(data).toFixed(1);
    }
    let con = page();
    $h(2, con, 'Alaquas Aether burn-down', '', '');
    $hr(con);
    $h(3, con, 'Aether: ' + aquaAether, '', 'ticker');
    $h(4, con, 'Is Burning: No', '', 'burnState');
    $b(con,'Burn toggle', function(){burnToggle()},);
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
        if(isBurn == true){
            if(aquaAether > 0){
                aquaAether -= 1;
                numUpd()
            } else {
                pullID('ticker').innerText = 'EMERGENCY';
            }
        } else if(isBurn == false){
            if (aquaAether > 0) {
                aquaAether -= 0.1;
                numUpd()
            } else {
                pullID('ticker').innerText = 'EMERGENCY';
            }
        }
        localStorage.setItem('aquaState', aquaAether);
    }
}

function nugget(){
    if(aquaAether < 3925){
        aquaAether += 75;
        numUpd()
    }
    localStorage.setItem('aquaState', aquaAether);

}

function crystal(){
    if (aquaAether < 3800) {
        aquaAether += 200;
        numUpd()
    }
    localStorage.setItem('aquaState', aquaAether);

}

function vampire(){
    if (aquaAether < 3500) {
        aquaAether += 500;
        numUpd()
    }
    localStorage.setItem('aquaState', aquaAether);

}

function food(){
    if (aquaAether < 3980) {
        aquaAether += 20;
        numUpd()
    }
    localStorage.setItem('aquaState', aquaAether);

}

function burnToggle(){
    if(isBurn == false){
        isBurn = true;
        pullID('burnState').innerText = "Is Burning: Yes"
    } else {
        isBurn = false;
        pullID('burnState').innerText = "Is Burning: No"

    }
}

function numUpd(){
    pullID('ticker').innerText = 'Aether: ' + aquaAether.toFixed(1);
}
