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

    'Performance', 'Magic', 'Gadgetry', 'Medicine', 'Summon', 'Perception (Physical)', 'Perception (Magical)',
    'Perception (Insight)', 'Provisions', 'Science', 'Might', 'Sleight Of Hand'
]
// Stat variables
let auxCount = 30; // Base points
var auxoff = 0;
var auxdef = 0;
var auxsup = 0;
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
// Variables for the negative number system
var defNeg = 0;
var offNeg = 0;
var supNeg = 0;
var auxDif = 0;
///////////////////////////////////////////

function engine(type) { // Core sheet generation and assignment engine
    generateUI(); // Generate the basic UI

    /////Variables for ui/////
    let con = pullID('content');
    let ofGrid = pullID('offenseGrid');
    let deGrid = pullID('defenseGrid');
    let suGrid = pullID('supportGrid');
    let form = pullID('sheet');

    /////End Variables////////

    proceduralUI(ofGrid, deGrid, suGrid, con); // Generates the selectors

    updateData();

    $b(con, 'Save Data', function () { save() });
}


// UI Section ///////////////////////////////////////////////////////////////////////////////////////////

function generateUI() {
    $d(body, '', 'content');
    let con = pullID('content');
    $form(con, '', 'sheet')
    let form = pullID('sheet');
    $h(3, form, 'Auxilary points: ' + auxCount, '', 'auxCounter');
    $d(form, '', 'charnameBox'); let charBox = pullID('charnameBox');
    $input(charBox, 'Name', 'sheetData', 'charName', 'text', 'sheetName', 'Character Name', '');
    $d(form, '', 'hpBox'); let hpBox = pullID('hpBox');
    $input(hpBox, 'HP', 'sheetData', 'charHP', 'text', 'sheetHP', 'HP', 'true');
    $d(form,'','armorBox'); let armorBox = pullID('armorBox');
    $input(armorBox, 'Armor', 'sheetData', 'charArmor', 'text', 'sheetArm', 'Armor', 'true');

    $hr(form, '', '');
    $d(form, 'contentGrid', 'stats'); let grid = pullID('stats');
    $d(grid, 'subGrid', 'offenseGrid'); let ofGrid = pullID('offenseGrid');
    $d(grid, 'subGrid', 'defenseGrid'); let deGrid = pullID('defenseGrid');
    $d(grid, 'subGrid', 'supportGrid'); let suGrid = pullID('supportGrid');
    $p(deGrid,'Negative modifier');
    $sel(deGrid, '', 'defenseNegCounter');
    $p(ofGrid, 'Negative modifier');
    $sel(ofGrid, '', 'offenseNegCounter');
    $p(suGrid, 'Negative modifier');
    $sel(suGrid, '', 'supportNegCounter');
    for(let i = 0; i < 3; i++) {
        $opt(pullID('defenseNegCounter'), -Math.abs(i), '', '');
        
    }
    pullID('defenseNegCounter').onchange = function () {
        let difCount = (parseInt(pullID('defenseNegCounter').value) + parseInt(pullID('offenseNegCounter').value) + parseInt(pullID('supportNegCounter').value)) * 2;
        auxDif = Math.abs(difCount);
        defNeg = Math.abs(pullID('defenseNegCounter').value);
        // Go through each element in the defense section adding or subtracting according to the state.
        for(i=0; i<=9; i++){
            console.log(defNeg);
            if(pullID('selerDe' + i).value > -1){
                pullID('selerDe' + i).value -= defNeg;
            } else {
                pullID('selerDe' + i).value = 0 - defNeg;
            }
        }
        console.log(defNeg);
        update('def');
    }
    for (let i = 0; i < 3; i++) {
        $opt(pullID('offenseNegCounter'), -Math.abs(i), '', '');

    }
    pullID('offenseNegCounter').onchange = function () {
        let difCount = (parseInt(pullID('defenseNegCounter').value) + parseInt(pullID('offenseNegCounter').value) + parseInt(pullID('supportNegCounter').value)) * 2;
        auxDif = Math.abs(difCount);
        offNeg = Math.abs(pullID('offenseNegCounter').value);
        // Go through each element in the defense section adding or subtracting according to the state.
        for (i = 0; i <= 10; i++) {
            console.log(offNeg);
            if (pullID('selerOf' + i).value > -1) {
                pullID('selerOf' + i).value -= offNeg;
            } else {
                pullID('selerOf' + i).value = 0 - offNeg;
            }
        }
        console.log(offNeg);
        update('off');
    }
    
    for (let i = 0; i < 3; i++) {
        $opt(pullID('supportNegCounter'), -Math.abs(i), '', '');

    }

    pullID('supportNegCounter').onchange = function () {
        let difCount = (parseInt(pullID('defenseNegCounter').value) + parseInt(pullID('offenseNegCounter').value) + parseInt(pullID('supportNegCounter').value)) * 2;
        auxDif = Math.abs(difCount);
        supNeg = Math.abs(pullID('supportNegCounter').value);
        // Go through each element in the defense section adding or subtracting according to the state.
        for (i = 0; i <= 11; i++) {
            console.log(supNeg);
            if (pullID('selerSu' + i).value > -1) {
                pullID('selerSu' + i).value -= supNeg;
            } else {
                pullID('selerSu' + i).value = 0 - supNeg;
            }
        }
        console.log(defNeg);
        update('sup');
    }
    $h(3, deGrid, 'Defense Points: ' + defPoints, 'pointCount', 'defPointCounter');
    $h(3, ofGrid, 'Offense Points: ' + offPoints, 'pointCount', 'offPointCounter');
    $h(3, suGrid, 'Support Points: ' + supPoints, 'pointCount', 'supPointCounter');
    $hr(form)
    $b(pullID('sheet'), 'Export', function () { exportSheet() }, 'imp_exp_button', 'exportButton');
    $input(pullID('sheet'), '', '', 'importBox', '', '', 'Import sheet');
    $b(pullID('sheet'), 'import', function () { importSheet() }, 'imp_exp_button', 'importButton');
}
 
function proceduralUI(a, b, c, d) {
    for (let i = 0; i < 11; i++) {
        console.log('A tick')
        $d(a,'',itemList[i]+"Div"); let div = pullID(itemList[i]+"Div");
        $p(div, itemList[i], '', itemList[(i)] + "Label");
        $sel(div, 'seler', 'selerOf' + i); let ofSel = pullID('selerOf' + i);
        offSkillID.push(('selerOf' + i));
        for (let e = -2; e <= offPointMax; e++) {
            $opt(ofSel, e, '', '');
        };
        pullID('selerOf' + i).onchange = function () {
            update('off', ('selerOf' + i));
        };
        pullID('selerOf' + i).value = 0;
    };
    for (let i = 0; i < 10; i++) {
        console.log('B tick')
        $d(b, '', itemList[(i + 11)] + "DefDiv"); let div = pullID(itemList[(i + 11)] + "DefDiv");
        $p(div, itemList[(i + 11)], '', itemList[(i + 11)] + 'Label');
        $sel(div, 'seler', 'selerDe' + i); let deSel = pullID('selerDe' + i);
        defSkillID.push('selerDe' + i);
        for (let e = -2; e <= defPointMax; e++) {
            $opt(deSel, e, '', '');
        }
        pullID('selerDe' + i).onchange = function () {
            update('def', ('selerDe' + i));
        };
        pullID('selerDe' + i).value = 0;

    };
    for (let i = 0; i < 12; i++) {
        $d(c, '', itemList[(i + 21)] + "SuDiv"); let div = pullID(itemList[(i + 21)] + "SuDiv");
        $p(div, itemList[(i + 21)],'',itemList[(i+21)] + "Label");
        $sel(div, 'seler', 'selerSu' + i); let suSel = pullID('selerSu' + i);
        if (itemList[(i + 21)] == "Science") {
            $input(div, '', '', 'scienceType');
            pullID('ScienceLabel').innerText = "Science (Specify)";
        }
        supSkillID.push('selerSu' + i)
        pullID('selerSu' + i).onchange = function () {
            update('sup', ('selerSu' + i));
        };
        pullID('selerSu' + i).value = 0;

        for (let e = -2; e <= supPointMax; e++) {
            $opt(suSel, e, '', '');
        }
    };
    for (let i = 0; i < 12; i++) {
        pullID('selerSu' + i).value = 0;    
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

// Save and load functionality
//////////////////////////////
//////////////////////////////
function save() { // Simply saves data to browser storage

    let saveObj = generateObject();
    localStorage.setItem('sheet' + localStorage.length, JSON.stringify(saveObj));    

}


function load(data){
    if (data == undefined) {
        engine();
    }
    let sheet = pullID('sheet');
    if(data == undefined){
        $sel(sheet, '', 'profileSelector'); let prof = pullID('profileSelector');
        for (let i = 0; i < localStorage.length; i++) {
            let targetObject = JSON.parse(localStorage.getItem('sheet' + i));
            $opt(prof, targetObject.name, '');
        }
        prof.onchange = function () { load(true) }
    }
    let prof = pullID('profileSelector');

    let current;
    if(prof == undefined){
        current = data;
    } else {
        for(let i = 0; i<localStorage.length; i++){
            let tar = JSON.parse(localStorage.getItem('sheet' + i));
            if(tar.name == prof.value){
                current = tar;
            }
        }
        
    }


    loadState(current);
}

function loadState(state) {
    let off = state.off;
    let def = state.def;
    let sup = state.sup;
    let defenseNegative = state.defenseNegative;
    let offenseNegative = state.offenseNegative;
    let supportNegative = state.supportNegative;
    let auxData = state.auxPoints;
    let scienceType = state.scienceType;

    pullID('scienceType').value = scienceType;
    pullID('offenseNegCounter').value = -Math.abs(offenseNegative);
    pullID('defenseNegCounter').value = -Math.abs(defenseNegative);
    pullID('supportNegCounter').value = -Math.abs(supportNegative);
    defNeg = defenseNegative;
    offNeg = offenseNegative;
    supNeg = supportNegative;
    difCount = (defNeg + supNeg + offNeg) * 2
    auxDif = Math.abs(difCount);
    if (off != undefined) {
        for (let i = 0; i < off.length; i++) {
            pullID('selerOf' + [i]).value = off[i];
        }
        for (let i = 0; i < def.length; i++) {
            pullID('selerDe' + [i]).value = def[i];
        }
        for (let i = 0; i < sup.length; i++) {
            pullID('selerSu' + [i]).value = sup[i];
        }
        pullID('charName').value = state.name;
    }
    update('off');
    update('def');
    update('sup');
}
// END Save / Load functions
/////////////////////////////
////////////////////////////


// Import/Export Functions////////////////////////////
/////////////////////////////////////////////////////
function exportSheet() {
    let sheet = generateObject();
    let target = pullID('sheet');
    try{
        pullID('exportString').remove();
    } catch {

    }
    $p(target, JSON.stringify(sheet),'','exportString');

}

function importSheet(){
    let data = pullID('importBox').value;
    console.log(data);
    load(JSON.parse(data));
}

// End import/Export////////////////////////////////
////////////////////////////////////////////////////


// Generic functions ///////////////////////////
///////////////////////////////////////////////
function generateObject() {
    var saveObj = {};
    var off = [];
    var def = [];
    var sup = [];
    let scienceType = pullID('scienceType').value;
    saveObj.name = pullID('charName').value;
    saveObj.hp = pullID('charHP').value;
    saveObj.armor = pullID('charArmor').value;


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
    saveObj.off = off;
    saveObj.def = def;
    saveObj.sup = sup;

    saveObj.defenseNegative = defNeg;
    saveObj.offenseNegative = offNeg;
    saveObj.supportNegative = supNeg;
    saveObj.auxData = auxPoints;
    saveObj.scienceType = scienceType;
    return saveObj;

}

// End generic functions //////////////////////
//////////////////////////////////////////////


//Update functions////////////
/////////////////////////////
var num = 0;
function update(type) { // Main sheet update function
    let defText = pullID('defPointCounter');
    let supText = pullID('supPointCounter');
    if (type == 'off' && (offPoints + auxPoints) > 0) {
        updateAssist('off');
    } else if (type == 'def' && (defPoints + auxPoints) > 0) {
        updateAssist('def');
    } else if (type == 'sup' && (supPoints + auxPoints) > 0) {
        updateAssist('sup');
    }
    updateData();
}

function updateData() { // Updates all state-specific text
    val('charHP', Math.floor((val('selerDe0') / 2) + 5));
    if(pullID('selerDe2').value < 0){
        val('charArmor', 0);
    } else {
        val('charArmor', val('selerDe2'));

    }
};

let updateAssist = (type) => { // This does the work of checking each box's value
    var typePoints = eval(type + 'Points');

    var num = 0;
    let data = eval(type + 'SkillID');
    var poinTexBase = eval(type + 'PointCounter')
    for (let i = 0; i < data.length; i++) {
        let inp = parseInt(pullID(data[i]).value);
        if(type == 'off'){
            console.log("Offense negative state: " + offNeg);
            if (inp == -1 && offNeg == -1) {
                num = num + 0;
            } else if (inp == -1 && offNeg == -2){
                num = num + 1;
            } else if (inp == -2){
                num = num + 0;
            } else if (inp < 9 && inp > -Math.abs(offNeg)) { // 1-8 sets the number to the input plus the modifier.
                console.log('works fine')
                num = (num + inp) + offNeg;
            } else if (inp == 9) { // 9 sets the number to input +1
                num = (num + inp) + 1 + offNeg;
            } else if (inp == 10) { // 10 sets the number to input +2
                num = (num + inp) + 4 + offNeg;
            }
        }
        if (type == 'def') {
            if (inp == -1 && defNeg == -1) {
                num = num + 0;
            } else if (inp == -1 && defNeg == -2) {
                num = num + 1;
            } else if (inp == -2) {
                num = num + 0;
            } else if (inp < 9 && inp > -Math.abs(defNeg)) { // 1-8 sets the number to the input.
                num = (num + inp) + defNeg;

            } else if (inp == 9) { // 9 sets the number to input +1
                num = (num + inp) + 1 + defNeg;
            } else if (inp == 10) { // 10 sets the number to input +2
                num = (num + inp) + 4 + defNeg;
            }
        }
        if (type == 'sup') {
            if (inp == -1 && supNeg == -1) {
                num = num + 0;
            } else if (inp == -1 && supNeg == -2) {
                num = num + 1;
            } else if (inp == -2) {
                num = num + 0;
            } else if (inp < 9 && inp > -Math.abs(supNeg)) { // 1-8 sets the number to the input.
                num = (num + inp) + supNeg;
            } else if (inp == 9) { // 9 sets the number to input +1
                num = (num + inp) + 1 + supNeg;
            } else if (inp == 10) { // 10 sets the number to input +2
                num = (num + inp) + 4 + supNeg;
            }
        }
        
    }
    let pBase = eval(type + 'PointsBase'); // This grabs the base amount of points for a category, so 15 atm
    let pnum = pBase - num;
    if ((pBase - num) < 0) {
        if (type == 'off') {
            auxoff = Math.abs(pnum)
        } else if (type == 'def') {
            auxdef = Math.abs(pnum)
        } else if (type == 'sup') {
            auxsup = Math.abs(pnum)
        }
        let allAux = (auxoff + auxdef + auxsup);
        let infNum = auxCount - (allAux + -Math.abs(auxDif));
        auxPoints = infNum;
        typePoints = 0; // This sets the available points in a category to the base - the amount used
        // poinTexBase.innerText = 'Points: ' + typePoints; // This sets the text for the category        // Check how many points below 0 are being used
        if (type == 'off') {
            poinTexBase.innerText = 'Offense Points: ' + typePoints; // This sets the text for the category        // Check how many points below 0 are being used

        } else if (type == 'def') {
            poinTexBase.innerText = 'Defense Points: ' + typePoints; // This sets the text for the category        // Check how many points below 0 are being used

        } else if (type == 'sup') {
            poinTexBase.innerText = 'Support Points: ' + typePoints; // This sets the text for the category        // Check how many points below 0 are being used

        }
        pullID('auxCounter').innerText = 'Auxilary points: ' + auxPoints;
        // subtract n from auxilary 
        // continue.

    } else {
        if (type == 'off') {
            auxoff = 0
        } else if (type == 'def') {
            auxdef = 0
        } else if (type == 'sup') {
            auxsup = 0
        }
        typePoints = pBase - num; // This sets the available points in a category to the base - the amount used
        // poinTexBase.innerText = 'Points: ' + typePoints; // This sets the text for the category
        if (type == 'off') {
            if(typePoints > 15){
                poinTexBase.innerText = 'Offense Points: ' + 15; // This sets the text for the category        // Check how many points below 0 are being used

            } else {
                poinTexBase.innerText = 'Offense Points: ' + typePoints; // This sets the text for the category        // Check how many points below 0 are being used

            }

        } else if (type == 'def') {
            if (typePoints > 15) {
                poinTexBase.innerText = 'Defense Points: ' + 15; // This sets the text for the category        // Check how many points below 0 are being used

            } else {
                poinTexBase.innerText = 'Defense Points: ' + typePoints; // This sets the text for the category        // Check how many points below 0 are being used

            }

        } else if (type == 'sup') {
            if (typePoints > 15) {
                poinTexBase.innerText = 'Support Points: ' + 15; // This sets the text for the category        // Check how many points below 0 are being used

            } else {
                poinTexBase.innerText = 'Support Points: ' + typePoints; // This sets the text for the category        // Check how many points below 0 are being used

            }

        }
        let allAux = (auxoff + auxdef + auxsup);
        let infNum = auxCount - (allAux + -Math.abs(auxDif) );
        auxPoints = infNum;
        pullID('auxCounter').innerText = 'Auxilary points: ' + auxPoints;

    }
    if (auxPoints < 0) {
        pullID('auxCounter').innerText = 'Auxilary points: ILLEGAL  '

    }

    //Set the last used aux for that category (type+'aux' or whatever)
    //Add all the types of aux
    //take added number, compare to base aux points
    //Set number based on comparison


    // all this means, to start using aux, just take pbase-num there, if its less than 0, take from the aux pool.
}
//////end of update functions///////////////
////////////////////////////////////////////
