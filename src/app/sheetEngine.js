let state = 0;

const offenseList = ['Blades',
    'Bludgeons',
    'Unarmed',
    'Throwing',
    'Aim',
    'Magic (Blasting)',
    'Magic (Blighting)',
    'Gadgetry (Destruction)',
    'Gadgetry (Disruption)',
    'Summon',
    'presence']

const defenseList = ['Fortitude', 'Clarity', 'Armor', 'Parry', 'Swiftness', 'Magic', 'Gadgetry', 'Summon', 'Pilot', 'Stealth',]
const supportList = ['Performance', 'Magic', 'Gadgetry', 'Medicine', 'Summon', 'Perception (Physical)', 'Perception (Magical)',
    'Perception (Insight)', 'Provisions', 'Might', 'Sleight Of Hand']
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
// var defNeg = 0;
// var offNeg = 0;
// var supNeg = 0;
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

    $b(con, 'Save Data', function () { save() },'button');
}


// UI Section ///////////////////////////////////////////////////////////////////////////////////////////

function generateUI() {
    $d(body, '', 'content');
    let con = pullID('content');
    $form(con, '', 'sheet')
    let form = pullID('sheet');
    $d(form,'','metaBox'); let meta = pullID('metaBox');
    $d(meta,'','statBox'); let sBox = pullID('statBox');
    $d(sBox, '', 'charnameBox'); let charBox = pullID('charnameBox');
    $input(charBox, 'Name', 'sheetData', 'charName', 'text', 'sheetName', 'Character Name', '');
    $d(sBox, '', 'hpBox'); let hpBox = pullID('hpBox');
    $input(hpBox, 'HP', 'sheetData', 'charHP', 'text', 'sheetHP', 'HP', 'true');
    $d(sBox,'','armorBox'); let armorBox = pullID('armorBox');
    $input(armorBox, 'Armor', 'sheetData', 'charArmor', 'text', 'sheetArm', 'Armor', 'true');

    $d(meta,'','damBox'); let damBox = pullID('damBox');
    $p(damBox,'Damage','labelImportant','');
    $d(damBox,'microCon','hpDamBox'); let hpDamBox = pullID('hpDamBox');
    $input(hpDamBox, 'HP Damage', '', 'hpDam', 'text', 'sheetDam', 'HP');
    $d(damBox, 'microCon', 'arDamBox'); let arDamBox = pullID('arDamBox');
    $input(arDamBox, 'Armor Damage', '', 'arDam', 'text', 'sheetArDam', 'Armor');

    pullID('hpDamBox').onchange = function(){
        update('def');
        console.log('spork')
    }

    pullID('arDamBox').onchange = function () {
        update('def');
        console.log('spork')
    }

    pullID('hpDamBox').onblur = function () {
        update('def');
        console.log('spork')
    }

    pullID('arDamBox').onblur = function () {
        update('def');
        console.log('spork')
    }


    $d(meta,'','tpContainer'); let tpContainer = pullID('tpContainer');
    $p(tpContainer,'TP','labelImportant','tpContainerLabel');
    $d(tpContainer, 'microCon', 'tpSubConMax'); let tpSubConMax = pullID('tpSubConMax');
    $input(tpSubConMax, 'TP Max', '', 'tpMax', 'text', 'tpMax', 'Max', '');
    $d(tpContainer, 'microCon', 'tpSubConCur'); let tpSubConCur = pullID('tpSubConCur');
    $input(tpSubConCur, 'TP Current', '', 'tpCur', 'text', 'tpCurrent', 'Current', '');
    val('tpCur', 3);
    val('tpMax', 3);

    $d(meta,'','determinationDiv'); let detDiv = pullID('determinationDiv');
    $input(detDiv,'Determination','','determinCount','text','Determination','Determination');


    $h(3, meta, 'Auxilary points: ' + auxCount, '', 'auxCounter');

    // $hr(form,'','hRule');
    $d(form, 'contentGrid', 'stats'); let grid = pullID('stats');
    $d(form, 'contentGrid', 'charData'); let charData = pullID('charData');
    $d(grid, 'subGrid', 'offenseGrid'); let ofGrid = pullID('offenseGrid');
    $d(grid, 'subGrid', 'defenseGrid'); let deGrid = pullID('defenseGrid');
    $d(grid, 'subGrid', 'supportGrid'); let suGrid = pullID('supportGrid');
    // $p(deGrid,'Negative modifier');
    // $sel(deGrid, '', 'defenseNegCounter');
    // $p(ofGrid, 'Negative modifier');
    // $sel(ofGrid, '', 'offenseNegCounter');
    // $p(suGrid, 'Negative modifier');
    // $sel(suGrid, '', 'supportNegCounter');
    // for(let i = 0; i < 3; i++) {
    //     $opt(pullID('defenseNegCounter'), -Math.abs(i), '', '');
        
    // }
    // pullID('defenseNegCounter').onchange = function () {
    //     let difCount = (parseInt(pullID('defenseNegCounter').value) + parseInt(pullID('offenseNegCounter').value) + parseInt(pullID('supportNegCounter').value)) * 2;
    //     auxDif = Math.abs(difCount);
    //     defNeg = Math.abs(pullID('defenseNegCounter').value);
    //     // Go through each element in the defense section adding or subtracting according to the state.
    //     for(i=0; i<=9; i++){
    //         console.log(defNeg);
    //         if(pullID('selerDe' + i).value > -1){
    //             pullID('selerDe' + i).value -= defNeg;
    //         } else {
    //             pullID('selerDe' + i).value = 0 - defNeg;
    //         }
    //     }
    //     console.log(defNeg);
    //     update('def');
    // }
    // for (let i = 0; i < 3; i++) {
    //     $opt(pullID('offenseNegCounter'), -Math.abs(i), '', '');

    // }
    // pullID('offenseNegCounter').onchange = function () {
    //     let difCount = (parseInt(pullID('defenseNegCounter').value) + parseInt(pullID('offenseNegCounter').value) + parseInt(pullID('supportNegCounter').value)) * 2;
    //     auxDif = Math.abs(difCount);
    //     offNeg = Math.abs(pullID('offenseNegCounter').value);
    //     // Go through each element in the defense section adding or subtracting according to the state.
    //     for (i = 0; i <= 10; i++) {
    //         console.log(offNeg);
    //         if (pullID('selerOf' + i).value > -1) {
    //             pullID('selerOf' + i).value -= offNeg;
    //         } else {
    //             pullID('selerOf' + i).value = 0 - offNeg;
    //         }
    //     }
    //     console.log(offNeg);
    //     update('off');
    // }
    
    // for (let i = 0; i < 3; i++) {
    //     $opt(pullID('supportNegCounter'), -Math.abs(i), '', '');

    // }

    // pullID('supportNegCounter').onchange = function () {
    //     let difCount = (parseInt(pullID('defenseNegCounter').value) + parseInt(pullID('offenseNegCounter').value) + parseInt(pullID('supportNegCounter').value)) * 2;
    //     auxDif = Math.abs(difCount);
    //     supNeg = Math.abs(pullID('supportNegCounter').value);
    //     // Go through each element in the defense section adding or subtracting according to the state.
    //     for (i = 0; i <= 11; i++) {
    //         console.log(supNeg);
    //         if (pullID('selerSu' + i).value > -1) {
    //             pullID('selerSu' + i).value -= supNeg;
    //         } else {
    //             pullID('selerSu' + i).value = 0 - supNeg;
    //         }
    //     }
    //     console.log(defNeg);
    //     update('sup');
    // }
    $h(3, deGrid, 'Defense : ' + defPoints, 'pointCount', 'defPointCounter');
    $h(3, ofGrid, 'Offense : ' + offPoints, 'pointCount', 'offPointCounter');
    $h(3, suGrid, 'Support : ' + supPoints, 'pointCount', 'supPointCounter');
    $hr(form)
    // Don't ask me why when this section is the child of con its fine but form it breaks the router
    // I have no answers only confusion
    $d(con,'','importBoxDiv'); let impbox = pullID('importBoxDiv');
    $b(impbox, 'Export', function () { exportSheet() }, 'imp_exp_button', 'exportButton');
    $input(impbox, '', '', 'importBox', '', '', 'Import sheet');
    $b(impbox, 'import', function () { importSheet() }, 'imp_exp_button', 'importButton');
}
 
// Item list has been replaced with offenselist defenselist and supportlist
function proceduralUI(a, b, c, d) {
    for (let i = 0; i < offenseList.length; i++) {
        console.log('A tick')
        $d(a,'offenseSub',offenseList[i]+"Div"); let div = pullID(offenseList[i]+"Div");
        $p(div, offenseList[i], 'statListItem', offenseList[(i)] + "Label");
        $sel(div, 'seler', 'selerOf' + i); let ofSel = pullID('selerOf' + i);
        offSkillID.push(('selerOf' + i));
        for (let e = 0; e <= offPointMax; e++) {
            $opt(ofSel, e, '', '');
        };
        pullID('selerOf' + i).onchange = function () {
            update('off', ('selerOf' + i));
        };
        pullID('selerOf' + i).value = 0;
    };
    for (let i = 0; i < defenseList.length; i++) {
        console.log('B tick')
        $d(b, 'defenseSub', defenseList[i] + "DefDiv"); let div = pullID(defenseList[i] + "DefDiv");
        $p(div, defenseList[i], 'statListItem', defenseList[i] + 'Label');
        $sel(div, 'seler', 'selerDe' + i); let deSel = pullID('selerDe' + i);
        defSkillID.push('selerDe' + i);
        for (let e = 0; e <= defPointMax; e++) {
            $opt(deSel, e, '', '');
        }
        pullID('selerDe' + i).onchange = function () {
            update('def', ('selerDe' + i));
        };
        pullID('selerDe' + i).value = 0;

    };
    for (let i = 0; i < supportList.length; i++) {
        $d(c, 'supportSub', supportList[i] + "SuDiv"); let div = pullID(supportList[i] + "SuDiv");
        $p(div, supportList[i],'statListItem',supportList[i] + "Label");
        $sel(div, 'seler', 'selerSu' + i); let suSel = pullID('selerSu' + i);
        supSkillID.push('selerSu' + i)
        pullID('selerSu' + i).onchange = function () {
            update('sup', ('selerSu' + i));
        };
        pullID('selerSu' + i).value = 0;

        for (let e = 0; e <= supPointMax; e++) {
            $opt(suSel, e, '', '');
        }
    };
    for (let i = 0; i < supportList.length; i++) {
        pullID('selerSu' + i).value = 0;    
    }
    generate_charData();
}

let charDatList = [
    'Title','Occupation','Rank','Feature', 'Knowledge', 'Technique', 'Special'
]
let ranks = ['Trash Panda', 'Ally', 'Initiate', 'Guardian', 'Vigilant', 'Archon', 'Grand Archon']
///////////////////////////////////////////////////////////////////////////////
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
///////////////////////////////////////////////////////////////////////////////



function generate_charData(){ // Current project !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    let charData = pullID('charData');
    for(let i = 0; i < charDatList.length; i++){
        if(charDatList[i] == 'Occupation' || charDatList[i] == 'Feature' || charDatList[i] == 'Knowledge' || charDatList[i] == 'Technique' || charDatList[i] == 'Special'){
            $d(charData,'housing',charDatList[i] + 'houseDiv'); let newDiv = pullID(charDatList[i] + 'houseDiv');
            for(let e = 0; e < 3; e++){
                $d(newDiv,'dataItem', (charDatList[i]) + e + 'div'); let item = pullID(charDatList[i] + e + 'div');
                // $input(item,'','input',charDatList[i] + e,'','',charDatList[i] + ' ' + (e+1) + ":");
                $area(item, '', 'input', charDatList[i] + e, charDatList[i] + ' ' + (e + 1) + ":")
                // if(charDatList[i] == 'Feature' || charDatList[i] == 'Technique'){
                //     $area(item,'','datArea',charDatList[i] + "area" + e,charDatList[i] + ' ' + (e+1) + ' description:' )
                // }
            }
        }

        if(charDatList[i] == 'Rank'){ //TODO: Populate rank
            $d(charData, 'dataItemTitle', 'rankDiv'); let item = pullID('rankDiv');
            $p(item, 'Rank: ','label');
            $sel(item,'','rankSel'); let selector = pullID('rankSel');
            for(let n = 0; n < ranks.length; n++){
                $opt(selector,ranks[n]);
            }
            selector.value = 'Guardian';

        }

        if(charDatList[i] == 'Title'){
            $d(charData, 'dataItemTitle', 'charTitle'); let item = pullID('charTitle');
            $input(item, '', 'input', 'Title','','','Title:'); 

        }

    }

}
////////////////////////////////////////////////////////////////////////////////////////////////////////

// Save and load functionality
//////////////////////////////
//////////////////////////////
////////////////////////////////////WORKING HERE////////////////////////////////////
///!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!///////////!!!!!!!!!!!!!!!!!!!!!!/////////////////
function save() { // Simply saves data to browser storage

    let saveObj = generateObject();
    try{
        localStorage.setItem('sheet' + localStorage.length, JSON.stringify(saveObj));
        alert('Saved successfully!')
    } catch {
        alert('Save failed! See console for error.');
    }

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
            if(targetObject.name != undefined){
                $opt(prof, targetObject.name, '');
            }
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
            console.log(tar)
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
    // let defenseNegative = state.defenseNegative;
    // let offenseNegative = state.offenseNegative;
    // let supportNegative = state.supportNegative;
    let auxData = state.auxPoints;
    let occupation = state.occupation;
    let feature = state.feature;
    let technique = state.technique;
    let knowledge = state.knowledge;
    let special = state.special;
    let hpDam = state.hpDam;
    let arDam = state.arDam;
    let tpMax = state.tpMax;
    let tpCur = state.tpCur;
    let determination = state.determination;

    val('hpDam', hpDam);
    val('arDam', arDam);
    val('tpMax',tpMax);
    val('tpCur', tpCur);
    val('determinCount', determination);

    // pullID('offenseNegCounter').value = -Math.abs(offenseNegative);
    // pullID('defenseNegCounter').value = -Math.abs(defenseNegative);
    // pullID('supportNegCounter').value = -Math.abs(supportNegative);
    // defNeg = defenseNegative;
    // offNeg = offenseNegative;
    // supNeg = supportNegative;
    // difCount = (defNeg + supNeg + offNeg) * 2
    // auxDif = Math.abs(difCount);
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
    for(let i = 0; i < occupation.length;i++){
        pullID('Occupation' + i).value = occupation[i];
    }
    for (let i = 0; i < feature.length; i++) {
        pullID('Feature' + i).value = feature[i];
    }
    for (let i = 0; i < technique.length; i++) {
        pullID('Technique' + i).value = technique[i];
    }
    for (let i = 0; i < knowledge.length; i++) {
        pullID('Knowledge' + i).value = knowledge[i];
    }
    for (let i = 0; i < special.length; i++) {
        pullID('Special' + i).value = special[i];
    }
    pullID('Title').value = state.title;
    pullID('rankSel').value = state.rank;


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
    // let target = pullID('sheet');
    // try{
    //     pullID('exportString').remove();
    // } catch {

    // }
    alert("Success! Please copy: " + JSON.stringify(sheet))
    // $p(target, JSON.stringify(sheet),'','exportString');

}

function importSheet(){
    try{
        let data = pullID('importBox').value;
        // console.log(data);
        load(JSON.parse(data));
        alert('Import successful!');
    } catch (err){
        alert('Import failed! Error:' + err.message)
    }
}

// End import/Export////////////////////////////////
////////////////////////////////////////////////////


// Generic functions ///////////////////////////
///////////////////////////////////////////////

////TODO: Add all the new attributes to saved object.
function generateObject() {
    var saveObj = {};
    var off = [];
    var def = [];
    var sup = [];
    var occupation = [];
    var feature = [];
    var technique = [];
    var knowledge = [];
    var special = [];

    for (let i = 0; i < offenseList.length; i++) {
        let state = pullID('selerOf' + [i]).value;
        off.push(state);
    }
    for (let i = 0; i < defenseList.length; i++) {
        let state = pullID('selerDe' + [i]).value;
        def.push(state);
    }
    for (let i = 0; i < supportList.length; i++) {
        let state = pullID('selerSu' + [i]).value;
        sup.push(state);
    }
    for (let i = 0; i < 3; i++) {
        let state = pullID('Occupation' + i).value;
        occupation.push(state);
    }
    for (let i = 0; i < 3; i++) {
        let state = pullID('Feature' + i).value;
        feature.push(state);
    }
    for (let i = 0; i < 3; i++) {
        let state = pullID('Technique' + i).value;
        technique.push(state);
    }
    for (let i = 0; i < 3; i++) {
        let state = pullID('Knowledge' + i).value;
        knowledge.push(state);
    }
    for (let i = 0; i < 3; i++) {
        let state = pullID('Special' + i).value;
        special.push(state);
    }

    saveObj.name = pullID('charName').value;
    saveObj.hp = pullID('charHP').value;
    saveObj.armor = pullID('charArmor').value;
    saveObj.title = pullID('Title').value;
    saveObj.rank = pullID('rankSel').value;
    saveObj.hpDam = pullID('hpDam').value;
    saveObj.arDam = pullID('arDam').value;
    saveObj.tpMax = pullID('tpMax').value;
    saveObj.tpCur = pullID('tpCur').value;
    saveObj.determination = pullID('determinCount').value;

    saveObj.occupation = occupation;
    saveObj.feature = feature;
    saveObj.technique = technique;
    saveObj.knowledge = knowledge;
    saveObj.special = special;

    saveObj.off = off;
    saveObj.def = def;
    saveObj.sup = sup;

    // saveObj.defenseNegative = defNeg;
    // saveObj.offenseNegative = offNeg;
    // saveObj.supportNegative = supNeg;
    saveObj.auxData = auxPoints;
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
    val('charHP', (Math.floor((val('selerDe0') / 2) + 5) - pullID('hpDam').value).toString());
    if(val('arDam') > 0){
        val('charArmor', (val('selerDe2') - pullID('arDam').value).toString());
    } else {
        val('charArmor', (val('selerDe2')).toString());

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
            // console.log("Offense negative state: " + offNeg);
            // if (inp == -1 && offNeg == -1) {
            //     num = num + 0;
            // } else if (inp == -1 && offNeg == -2){
            //     num = num + 1;
            // } else if (inp == -2){
                // num = num + 0;
            if (inp < 9) { // 1-8 sets the number to the input plus the modifier.
                console.log('works fine')
                num = (num + inp);
            } else if (inp == 9) { // 9 sets the number to input +1
                num = (num + inp) + 1;
            } else if (inp == 10) { // 10 sets the number to input +2
                num = (num + inp) + 4;
            }
        }
        if (type == 'def') {
            // if (inp == -1 && defNeg == -1) {
            //     num = num + 0;
            // } else if (inp == -1 && defNeg == -2) {
            //     num = num + 1;
            // } else if (inp == -2) {
            //     num = num + 0;
            if (inp < 9) { // 1-8 sets the number to the input.
                num = (num + inp);

            } else if (inp == 9) { // 9 sets the number to input +1
                num = (num + inp) + 1;
            } else if (inp == 10) { // 10 sets the number to input +2
                num = (num + inp) + 4;
            }
        }
        if (type == 'sup') {
            // if (inp == -1 && supNeg == -1) {
            //     num = num + 0;
            // } else if (inp == -1 && supNeg == -2) {
            //     num = num + 1;
            // } else if (inp == -2) {
            //     num = num + 0;
            if (inp < 9) { // 1-8 sets the number to the input.
                num = (num + inp);
            } else if (inp == 9) { // 9 sets the number to input +1
                num = (num + inp) + 1;
            } else if (inp == 10) { // 10 sets the number to input +2
                num = (num + inp) + 4;
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
            poinTexBase.innerText = 'Offense : ' + typePoints; // This sets the text for the category        // Check how many points below 0 are being used

        } else if (type == 'def') {
            poinTexBase.innerText = 'Defense : ' + typePoints; // This sets the text for the category        // Check how many points below 0 are being used

        } else if (type == 'sup') {
            poinTexBase.innerText = 'Support : ' + typePoints; // This sets the text for the category        // Check how many points below 0 are being used

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
                poinTexBase.innerText = 'Offense : ' + 15; // This sets the text for the category        // Check how many points below 0 are being used

            } else {
                poinTexBase.innerText = 'Offense : ' + typePoints; // This sets the text for the category        // Check how many points below 0 are being used

            }

        } else if (type == 'def') {
            if (typePoints > 15) {
                poinTexBase.innerText = 'Defense : ' + 15; // This sets the text for the category        // Check how many points below 0 are being used

            } else {
                poinTexBase.innerText = 'Defense : ' + typePoints; // This sets the text for the category        // Check how many points below 0 are being used

            }

        } else if (type == 'sup') {
            if (typePoints > 15) {
                poinTexBase.innerText = 'Support : ' + 15; // This sets the text for the category        // Check how many points below 0 are being used

            } else {
                poinTexBase.innerText = 'Support : ' + typePoints; // This sets the text for the category        // Check how many points below 0 are being used

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
