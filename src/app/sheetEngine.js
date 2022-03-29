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
            // $input(deGrid, '', 'columnDefense', 'def' + i, 'text', '', itemList[(i + 11)]);
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
            // $input(suGrid, '', 'columnSupport', 'sup' + i, 'text', '', itemList[(i + 21)]);
            
            
        };


        // TODO: Rest of stats, refer to   google sheet. Also, add a section for their 5 base feats and any bonus feats.
        // Css grid time! each column, all items classed as columnBlah, E.G. columnOffense

        updateData();
    if(type == '1'){
        // new

    } else if(type == '2'){
        // load
    }
}



var num = 0;
function update(type, id){ // Main sheet update function

    var num = 0;
    let offText = pullID('offPointCounter');
    let defText = pullID('defPointCounter');
    let supText = pullID('supPointCounter');
    // Figure a way to generic this functionality VVVVV
    if(type == 'off' && (offPoints + auxPoints) > 0){
        for(let i = 0; i < offSkillID.length; i++){
            if(offSkillID[i].value >8){
                num = (num + parseInt(pullID(offSkillID[i]).value));
            } else {
                num = (num + parseInt(pullID(offSkillID[i]).value));
            }
        }
        offPoints = offPointsBase - num;
        offText.innerText = 'Points: ' + offPoints;
    } else if (type == 'def' && (defPoints + auxPoints) > 0){
        for (let i = 0; i < defSkillID.length; i++) {
            num = (num + parseInt(pullID(defSkillID[i]).value));
        }
        defPoints = defPointsBase - num;
        defText.innerText = 'Points: ' + defPoints;
    } else if (type == 'sup' && (supPoints + auxPoints) > 0){
        for (let i = 0; i < supSkillID.length; i++) {
            num = (num + parseInt(pullID(supSkillID[i]).value));
        }
        supPoints = supPointsBase - num;
        supText.innerText = 'Points: ' + supPoints;
    }
    updateData();
};

function updateData(){ // Updates all state-specific text
    val('charHP', Math.floor((val('selerDe0') / 2) + 5));
    val('charArmor', val('selerDe2'));
}


// Change skill algorithm to accomodate for the avove 8 rule