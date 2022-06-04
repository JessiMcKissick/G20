var pc_count = 0;
var en_count = 0;
var actor_init_count = 0;
var initArray = [];
var initArrayParsed = [];

function dm() {
    let con = page()
    $h(2, con, 'DM Tools', '', 'dmTitle');
    ui(con);
}

function ui(con) {
    $d(con, '', 'dm_tools'); let dm_tools = pullID('dm_tools');
    $d(dm_tools, '', 'playerControl'); let pc = pullID('playerControl');
    $b(pc, 'Add Player', function () { playerGen() }, 'button', '');
    $d(dm_tools, '', 'players');
    $d(dm_tools, '', 'enemyControl'); let ec = pullID('enemyControl');
    $b(ec, 'Add NPC', function () { npmGen() }, 'button', '');
    $d(dm_tools, '', 'enemies');
    $a(dm_tools, 'G20 DM Guide', 'https://docs.google.com/document/d/1SJQqdMNBLsuvdvN-fNe0UobYpFaskkDBKXHkjqhzugs/edit', '', 'g20Guide');
    pullID('g20Guide').target = '_blank';
    $d(dm_tools, '', 'initModule'); let im = pullID('initModule');
    $b(im, 'Add actor', function () { initCreate(im) }, 'button', '');
    $b(im, 'Calculate Initiative', function () { initParse(im) }, 'button', '');

    $hr(dm_tools);
}

function playerGen() {
    let con = pullID('players');
    $d(con, 'playerDiv', 'player' + pc_count); let player = pullID('player' + pc_count);
    $h(3, player, 'Player ' + (pc_count + 1));
    $input(player, '', 'playerName', '', '', '', 'Name');
    $input(player, '', 'playerHP', '', '', '', 'HP (base)');
    $input(player, '', 'playerArmor', '', '', '', 'Armor');
    $input(player, '', 'playerDamage', '', '', '', 'Damage taken');
    $input(player, '', 'playerArmorDamage', '', '', '', 'Armor damage taken');
    // $input(player, '', 'playerName', '', '', '', 'Feats');
    $area(player, '', 'playerFeats', '', 'Feats');
    pc_count += 1;
}

function npmGen() {
    let con = pullID('enemies');
    $d(con, 'enemyDiv', 'enemy' + en_count); let enemy = pullID('enemy' + en_count);
    $h(3, enemy, 'Enemy ' + (en_count + 1));
    $input(enemy, '', 'enemyName', '', '', '', 'Name');
    $input(enemy, '', 'enemyHP', '', '', '', 'HP (base)');
    $input(enemy, '', 'enemySpeed', '', '', '', 'Speed');
    $area(enemy, '', 'enemyFeats', '', 'Feats and abilities');

    // NPC Offensive data
    $d(enemy, '', 'enemyOffensive' + en_count); let offensive = pullID('enemyOffensive' + en_count);
    $h(3, offensive, 'Offense V Players');
    $input(offensive, '', 'enemyOf', '', '', '', 'Vs parry');
    $input(offensive, '', 'enemyOf', '', '', '', 'Vs armor');
    $input(offensive, '', 'enemyOf', '', '', '', 'Vs barrier');
    $input(offensive, '', 'enemyOf', '', '', '', 'Vs dodge');
    $input(offensive, '', 'enemyOf', '', '', '', 'Forcefullness');

    // NPC Defensive data
    $d(enemy, '', 'enemyDefensive' + en_count); let defensive = pullID('enemyDefensive' + en_count);
    $h(3, defensive, 'Defense V Players');

    $d(defensive, '', 'enemyDefenseMelee' + en_count); let melee = pullID('enemyDefenseMelee' + en_count);
    $h(3, melee, 'Melee');
    $input(melee, '', 'enemyDf', '', '', '', 'Vs slashing');
    $input(melee, '', 'enemyDf', '', '', '', 'Vs piercing');
    $input(melee, '', 'enemyDf', '', '', '', 'Vs bludgeoning');

    $d(defensive, '', 'enemyDefenseMagic' + en_count); let magic = pullID('enemyDefenseMagic' + en_count);
    $h(3, magic, 'Magic');
    $input(magic, '', 'enemyDf', '', '', '', 'Vs Lightning');
    $input(magic, '', 'enemyDf', '', '', '', 'Vs fire');
    $input(magic, '', 'enemyDf', '', '', '', 'Vs frost');
    $input(magic, '', 'enemyDf', '', '', '', 'Vs corrosive');
    $input(magic, '', 'enemyDf', '', '', '', 'Vs light');
    $input(magic, '', 'enemyDf', '', '', '', 'Vs dark');
    $input(magic, '', 'enemyDf', '', '', '', 'Vs poison');

    $d(defensive, '', 'enemyDefenseOther' + en_count); let other = pullID('enemyDefenseOther' + en_count);
    $h(3, other, 'Other');
    $input(other, '', 'enemyDf', '', '', '', 'Clarity');
    $input(other, '', 'enemyDf', '', '', '', 'Subtlety');
    $input(other, '', 'enemyDf', '', '', '', 'Perception');
    en_count += 1;
}

function initCreate(im) {
    $d(im, '', 'playerInitDiv' + actor_init_count); let playerInit = pullID('playerInitDiv' + actor_init_count);
    $input(playerInit, '', 'playerName', 'actorName' + actor_init_count, '', '', 'Actor Name');
    $input(playerInit, '', 'playerInitiative', 'actorInit' + actor_init_count, '', '', 'Actor init');
    actor_init_count += 1;
}


function initParse(im) {
    console.log('????') 
    if(initArray = []){
        for (let i = 0; i < actor_init_count; i++) {
            let initObject = {};
            let playerName = pullID('actorName' + i).value;
            let playerInit = pullID('actorInit' + i).value;
            initObject['playerInit'] = playerInit;
            initObject['playerName'] = playerName;
            initArray.push(initObject);
        } 
    } else {
        initArray = [];
        for (let i = 0; i < actor_init_count; i++) {
            let initObject = {};
            let playerName = pullID('actorName' + i).value;
            let playerInit = pullID('actorInit' + i).value;
            initObject['playerInit'] = playerInit;
            initObject['playerName'] = playerName;
            initArray.push(initObject);
        } 
    }
    

    initArrayParsed = (initArray.sort(function (a, b) { return a.playerInit - b.playerInit })).reverse();
    pullID('initModule').remove();  
    initWorker();

}

function initWorker(){
    $d(dm_tools, '', 'initModule'); let im = pullID('initModule');
    $b(im, 'Add actor', function () { initCreate(im) }, 'button', '');
    $b(im, 'Calculate Initiative', function () { initParse() }, 'button', '');

    for (let i = 0; i < initArrayParsed.length; i++) {
        let initObject = initArrayParsed[i];
        let actorName = initObject['playerName'];
        let actorInit = initObject['playerInit'];
        console.log(initObject);
        $d(im, '', 'playerInitDiv' + i); let playerInit = pullID('playerInitDiv' + i);
        $input(playerInit, '', 'playerName', 'actorName' + i, '', '', 'Actor Name'); pullID('actorName' + i).value = actorName;
        $input(playerInit, '', 'playerInitiative', 'actorInit' + i, '', '', 'Actor init'); pullID('actorInit' + i).value = actorInit;
    }
}