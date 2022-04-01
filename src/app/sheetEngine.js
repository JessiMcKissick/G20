let state = 0;
let itemList = [
    'Blades',
    'Bludgeons',
    'Unarmed',
    'Throwing',
    'Aim',
    'Magic (Blasting)',
    'Magic (Blighting)',
    'Gadgetry (Destruction)',
    'Gadgetry (Disruption)',
    'Summon',
    'Pilot',

    'Fortitude', 'Clarity', 'Armor', 'Parry', 'Swiftness', 'Magic', 'Gadgetry', 'Summon', 'Pilot', 'Stealth',

    'Performance', 'Magic', 'Gadgetry', 'Medicine', 'Summon','Perception (Physical)','Perception (Magical)',
    'Perception (Insight)', 'Provisions', 'Science', 'Might', 'Sleight Of Hand'
]
var auxCount = 30;
var offPoints = 15;
const offPointsBase = 15;
const defPointsBase = 15;
const supPointsBase = 15;
var defPoints = 15;
var supPoints = 15;
var auxPoints = 30;
let offPointMax = 10;
let defPointMax = 10;
let supPointMax = 10;
 
let offComb = 0;
let defComb = 0;
let supComb = 0;
 
var offSkillID = []
var defSkillID = []
var supSkillID = []

function engine(type){ // Core sheet generation and assignment engine
    // TODO: Add system for using aux points after regular is exhausted.
    $d(body, '', 'content');
    $h(3, pullID('header'),'Auxilary points: ' + auxCount,'','auxCounter');
        let con = pullID('content'); 
        $form(con, '', 'sheet', console.log('test?'))
        let form = pullID('sheet');
        $input(form, 'Name', 'sheetData','charName','text','sheetName','Character Name', '');
        $hr(form,'','');
        $input(form, 'HP','sheetData','charHP','text','sheetHP','HP', 'true');
        $input(form, 'Armor', 'sheetData','charArmor','text','sheetArm','Armor', 'true');
        $hr(form,'','');
        $d(form, 'contentGrid','stats'); let grid = pullID('stats');
        $d(grid, 'subGrid', 'offenseGrid'); let ofGrid = pullID('offenseGrid');

        $d(grid, 'subGrid', 'defenseGrid'); let deGrid = pullID('defenseGrid');
        $d(grid, 'subGrid', 'supportGrid'); let suGrid = pullID('supportGrid');

        $h(3, deGrid, 'Points: ' + defPoints, 'pointCount', 'defPointCounter');
        $h(3, ofGrid, 'Points: ' + offPoints, 'pointCount', 'offPointCounter');
        $h(3, suGrid, 'Points: ' + supPoints, 'pointCount', 'supPointCounter');
        for(let i = 0; i < 11; i++){
            // $input(ofGrid, '', 'columnOffense', 'off'+i, 'text', '', itemList[i]);
            $p(ofGrid, itemList[i]);
            $sel(ofGrid, 'seler', 'selerOf' + i); let ofSel = pullID('selerOf' + i);
            offSkillID.push(('selerOf' + i));
            for(let e = 0; e<=offPointMax; e++){
                $opt(ofSel, e , '', '');
            };
            pullID('selerOf' + i).onchange = function () {
                update('off', ('selerOf' + i));
            };
        };
        for (let i = 0; i < 10; i++) {
            $p(deGrid, itemList[(i+11)]);
            $sel(deGrid, 'seler', 'selerDe' + i); let deSel = pullID('selerDe' + i);
            defSkillID.push('selerDe' + i);
            for (let e = 0; e <= defPointMax; e++) {
                $opt(deSel, e, '', '');
            }
            pullID('selerDe' + i).onchange = function () {
                update('def', ('selerDe' + i));
            };
        };
        for (let i = 0; i < 12; i++) {
            $p(suGrid, itemList[(i + 21)]);
            $sel(suGrid, 'seler', 'selerSu' + i); let suSel = pullID('selerSu' + i);
            supSkillID.push('selerSu' + i)
            pullID('selerSu' + i).onchange = function () {
                update('sup', ('selerSu' + i));
            };
            for (let e = 0; e <= supPointMax; e++) {
                $opt(suSel, e, '', '');
            }
            
            
        };



        updateData();
    if(type == '1'){

    } else if(type == 'load'){
        load();
    }
    $hr(con)
    $b(con,'Save Data',function(){save()});
}



// Save and load functionality
//////////////////////////////
//////////////////////////////

function save(){
    var off = [];
    var def = [];
    var sup = [];
    localStorage.setItem('name',pullID('charName').value);
    localStorage.setItem('hp',pullID('charHP').value);
    localStorage.setItem('armor',pullID('charArmor').value);
    for (let i = 0; i < 11; i++) {
        let state = pullID('selerOf' + [i]).value;
        off.push(state);
    }
    for (let i = 0; i < 10; i++) {
        let state = pullID('selerDe' + [i]).value;
        def.push(state);
    }
    for (let i = 0; i < 12; i++) {
        let state = pullID('selerSu' + [i]).value;
        sup.push(state);
    }
    localStorage.setItem('offense', JSON.stringify(off));
    localStorage.setItem('defense', JSON.stringify(def));
    localStorage.setItem('support', JSON.stringify(sup));
}

function load(){
    let off = JSON.parse(localStorage.getItem('offense'));
    let def = JSON.parse(localStorage.getItem('defense'));
    let sup = JSON.parse(localStorage.getItem('support'));
    if(off != undefined){
        for(let i = 0; i < off.length; i++){
            pullID('selerOf' + [i]).value = off[i];
        }
        for (let i = 0; i < def.length; i++) {
            pullID('selerDe' + [i]).value = def[i];
        }
        for (let i = 0; i < sup.length; i++) {
            pullID('selerSu' + [i]).value = sup[i];
        }
        pullID('charName').value = lo('name');
    }
    updateData();
    updateAssist('off');
    updateAssist('def');
    updateAssist('sup');
}

// END Save / Load functions
/////////////////////////////
////////////////////////////


/////////////////////////////////////////========================================/////////////////////////////

//Update functions////////////
/////////////////////////////

var num = 0;
function update(type, id){ // Main sheet update function
    let defText = pullID('defPointCounter');
    let supText = pullID('supPointCounter');
    if(type == 'off' && (offPoints + auxPoints) > 0){
        updateAssist('off'); 
    } else if (type == 'def' && (defPoints + auxPoints) > 0){
        updateAssist('def');
    } else if (type == 'sup' && (supPoints + auxPoints) > 0){
        updateAssist('sup');
    }
    updateData();
};

function updateData(){ // Updates all state-specific text
    val('charHP', Math.floor((val('selerDe0') / 2) + 5));
    val('charArmor', val('selerDe2'));
};

let updateAssist = (type) => {
    var typePoints = eval(type+'Points');

    var num = 0;
    let data = eval(type+'SkillID');
    var poinTexBase = eval(type + 'PointCounter')
    for (let i = 0; i < data.length; i++) {
        let inp = parseInt(pullID(data[i]).value);
        if (inp < 9) {
            num = (num + inp);
        } else if (inp == 9) {
            num = (num + inp) + 1;
        } else if (inp == 10) {
            num = (num + inp) + 4;
        }
    }
    let pBase = eval(type+'PointsBase');
    typePoints = pBase - num;
    poinTexBase.innerText = 'Points: ' + typePoints;
}

//////end of update functions///////////////
////////////////////////////////////////////


///////////////////////////////======================================///////////////////

function sa(a, b){ // Saves an item to storage
    localStorage.setItem(a, b);
}
function lo(a){ // Loads an item from storage
    return localStorage.getItem(a);
}