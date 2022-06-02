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

function engine(type) { // Core sheet generation and assignment engine
    // TODO: Add system for using aux points after regular is exhausted.
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

    $hr(con)
    $b(con, 'Save Data', function () { save() });
}




function generateUI() {
    $d(body, '', 'content');
    $h(3, pullID('header'), 'Auxilary points: ' + auxCount, '', 'auxCounter');
    let con = pullID('content');
    $form(con, '', 'sheet')
    let form = pullID('sheet');
    $input(form, 'Name', 'sheetData', 'charName', 'text', 'sheetName', 'Character Name', '');
    $hr(form, '', '');
    $input(form, 'HP', 'sheetData', 'charHP', 'text', 'sheetHP', 'HP', 'true');
    $input(form, 'Armor', 'sheetData', 'charArmor', 'text', 'sheetArm', 'Armor', 'true');
    $hr(form, '', '');
    $d(form, 'contentGrid', 'stats'); let grid = pullID('stats');
    $d(grid, 'subGrid', 'offenseGrid'); let ofGrid = pullID('offenseGrid');
    $d(grid, 'subGrid', 'defenseGrid'); let deGrid = pullID('defenseGrid');
    $d(grid, 'subGrid', 'supportGrid'); let suGrid = pullID('supportGrid');
    $h(3, deGrid, 'Defense Points: ' + defPoints, 'pointCount', 'defPointCounter');
    $h(3, ofGrid, 'Offense Points: ' + offPoints, 'pointCount', 'offPointCounter');
    $h(3, suGrid, 'Support Points: ' + supPoints, 'pointCount', 'supPointCounter');
    $hr(form)
    for (let i; i < 5; i++) {
        $input(form, 'fName', '', 'fName' + i, 'text', 'fname1', 'Feat name');
        $input(form, 'fInf', '', 'fInf' + i, 'text', 'fname1', 'Feat name');

    }
}




function proceduralUI(a, b, c, d) {
    for (let i = 0; i < 11; i++) {
        $p(a, itemList[i]);
        $sel(a, 'seler', 'selerOf' + i); let ofSel = pullID('selerOf' + i);
        offSkillID.push(('selerOf' + i));
        for (let e = 0; e <= offPointMax; e++) {
            $opt(ofSel, e, '', '');
        };
        pullID('selerOf' + i).onchange = function () {
            update('off', ('selerOf' + i));
        };
    };
    for (let i = 0; i < 10; i++) {
        $p(b, itemList[(i + 11)]);
        $sel(b, 'seler', 'selerDe' + i); let deSel = pullID('selerDe' + i);
        defSkillID.push('selerDe' + i);
        for (let e = 0; e <= defPointMax; e++) {
            $opt(deSel, e, '', '');
        }
        pullID('selerDe' + i).onchange = function () {
            update('def', ('selerDe' + i));
        };
    };
    for (let i = 0; i < 12; i++) {
        $p(c, itemList[(i + 21)]);
        $sel(c, 'seler', 'selerSu' + i); let suSel = pullID('selerSu' + i);
        supSkillID.push('selerSu' + i)
        pullID('selerSu' + i).onchange = function () {
            update('sup', ('selerSu' + i));
        };
        for (let e = 0; e <= supPointMax; e++) {
            $opt(suSel, e, '', '');
        }
    };
    $hr(d)
    for (let i = 0; i < 5; i++) {
        if(i%2 == 0){
            $d(d, 'featDiv', 'featNo' + i);
        } else {
            $d(d, 'featDivAlt', 'featNo' + i);

        }
        let div = pullID('featNo' + i);
        $input(div, '', 'fName', 'fName' + i, 'text', '', 'Feat Name');
        $area(div,'','fInfo','fInf' + i,'Feat Info');
        // $input(div, '', 'fInfo', 'fInf' + i, 'textArea','', 'Feat Info');
    }
    $hr(d);
    for (let i = 0; i < 5; i++) {
        let divAlta = eval('featNo' + i);
        if (i % 2 == 0) {
            $d(divAlta, 'featDivStory', 'featStNo' + i);
        } else {
            $d(divAlta, 'featDivStoryAlt', 'featStNo' + i);
        }
        let divAlt = pullID('featStNo' + i);
        $input(divAlt, '','fName', 'fNameSt' + i, 'text', '', 'Story Feat Name');
        // $input(divAlt, '', 'fInfo', 'fInfSt' + i, 'textArea', '', 'Story Feat Info');
        $area(divAlt, '', 'fInfo', 'fInfSt' + i, 'Story Feat Info');

    }
}


// Save and load functionality
//////////////////////////////
//////////////////////////////
function save() { // Simply saves data to browser storage
    var off = [];
    var def = [];
    var sup = [];
    let featName = [];
    let featInf = [];
    let featNameStory = [];
    let featInfStory = [];
    localStorage.setItem('name', pullID('charName').value);
    localStorage.setItem('hp', pullID('charHP').value);
    localStorage.setItem('armor', pullID('charArmor').value);
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
    for (let i = 0; i < 5; i++) {
        let state1 = pullID('fName' + i).value;
        let state2 = pullID('fInf' + i).value;
        featName.push(state1);
        featInf.push(state2);
    }
    for (let i = 0; i < 5; i++) {
        let state1 = pullID('fNameSt' + i).value;
        let state2 = pullID('fInfSt' + i).value;
        console.log(state1)
        featNameStory.push(state1);
        featInfStory.push(state2);
    }
    localStorage.setItem('offense', JSON.stringify(off));
    localStorage.setItem('defense', JSON.stringify(def));
    localStorage.setItem('support', JSON.stringify(sup));
    localStorage.setItem('featNames', JSON.stringify(featName));
    localStorage.setItem('featInfo', JSON.stringify(featInf));
    localStorage.setItem('featNameStory', JSON.stringify(featNameStory));
    localStorage.setItem('featInfoStory', JSON.stringify(featInfStory));


}

function load() { // Loads data from browser storage
    engine();
    let off = JSON.parse(localStorage.getItem('offense'));
    let def = JSON.parse(localStorage.getItem('defense'));
    let sup = JSON.parse(localStorage.getItem('support'));

    let featNames = JSON.parse(localStorage.getItem('featNames'));
    let featInf = JSON.parse(localStorage.getItem('featInfo'));
    let featNameStory = JSON.parse(localStorage.getItem('featNameStory'));
    let featInfStory = JSON.parse(localStorage.getItem('featInfoStory'));
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


        for (let i = 0; i < featNames.length; i++) {
            pullID('fName' + i).value = featNames[i];
        }
        for (let i = 0; i < featInf.length; i++) {
            pullID('fInf' + i).value = featInf[i];
        }
        for (let i = 0; i < featNameStory.length; i++) {
            pullID('fNameSt' + i).value = featNameStory[i];
        }
        for (let i = 0; i < featInfStory.length; i++) {
            pullID('fInfSt' + i).value = featInfStory[i];
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
function update(type, id) { // Main sheet update function
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
    val('charArmor', val('selerDe2'));
};

let updateAssist = (type) => { // This does the work of checking each box's value
    var typePoints = eval(type + 'Points');

    var num = 0;
    let data = eval(type + 'SkillID');
    var poinTexBase = eval(type + 'PointCounter')
    for (let i = 0; i < data.length; i++) {
        let inp = parseInt(pullID(data[i]).value);
        if (inp < 9) { // 1-8 sets the number to the input.
            num = (num + inp);
        } else if (inp == 9) { // 9 sets the number to input +1
            num = (num + inp) + 1;
        } else if (inp == 10) { // 10 sets the number to input +2
            num = (num + inp) + 4;
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
        let infNum = auxCount - allAux;
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
            poinTexBase.innerText = 'Offense Points: ' + typePoints; // This sets the text for the category        // Check how many points below 0 are being used

        } else if (type == 'def') {
            poinTexBase.innerText = 'Defense Points: ' + typePoints; // This sets the text for the category        // Check how many points below 0 are being used

        } else if (type == 'sup') {
            poinTexBase.innerText = 'Support Points: ' + typePoints; // This sets the text for the category        // Check how many points below 0 are being used

        }
        let allAux = (auxoff + auxdef + auxsup);
        let infNum = auxCount - allAux;
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




///////////////////////////////======================================///////////////////

function sa(a, b) { // Saves an item to storage
    localStorage.setItem(a, b);
}
function lo(a) { // Loads an item from storage
    return localStorage.getItem(a);
}