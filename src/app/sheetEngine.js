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
var defPoints = 15;
var supPoints = 15;
let offPointMax = 10;
let defPointMax = 10;
let supPointMax = 10;
 
 
function engine(type){
    
    $d(body, '', 'content');
    $h(3, pullID('header'),'Auxilary points: ' + auxCount,'','auxCounter');
        let con = pullID('content'); 
        $form(con, '', 'sheet', console.log('test?'))
        let form = pullID('sheet');
        $input(form, 'Name', 'sheetData','','text','sheetName','Character Name');
        $hr(form,'','');
        $input(form, 'HP','sheetData','','text','sheetHP','HP');
        $input(form, 'Armor', 'sheetData','','text','sheetArm','Armor');
        $hr(form,'','');
        $d(form, 'contentGrid','stats'); let grid = pullID('stats');
        $d(grid, 'subGrid', 'offenseGrid'); let ofGrid = pullID('offenseGrid');

        $d(grid, 'subGrid', 'defenseGrid'); let deGrid = pullID('defenseGrid');
        $d(grid, 'subGrid', 'supportGrid'); let suGrid = pullID('supportGrid');

        $h(3, deGrid, 'Points: ' + defPoints, 'pointCount', '');
        $h(3, ofGrid, 'Points: ' + offPoints, 'pointCount', '');
        $h(3, suGrid, 'Points: ' + supPoints, 'pointCount', '');
        for(let i = 0; i < 11; i++){
            // $input(ofGrid, '', 'columnOffense', 'off'+i, 'text', '', itemList[i]);
            $p(ofGrid, itemList[i]);
            $sel(ofGrid, 'seler', 'selerOf' + i); let ofSel = pullID('selerOf' + i);
            for(let e = 0; e<=offPointMax; e++){
                $opt(ofSel, e , '', '');
            }
        };
        for (let i = 0; i < 10; i++) {
            $p(deGrid, itemList[(i+11)]);
            $sel(deGrid, 'seler', 'selerDe' + i); let deSel = pullID('selerDe' + i);
            for (let e = 0; e <= defPointMax; e++) {
                $opt(deSel, e, '', '');
            }
            // $input(deGrid, '', 'columnDefense', 'def' + i, 'text', '', itemList[(i + 11)]);
        };
        for (let i = 0; i < 12; i++) {
            $p(suGrid, itemList[(i + 21)]);
            $sel(suGrid, 'seler', 'selerSu' + i); let suSel = pullID('selerSu' + i);
            for (let e = 0; e <= supPointMax; e++) {
                $opt(suSel, e, '', '');
            }
            // $input(suGrid, '', 'columnSupport', 'sup' + i, 'text', '', itemList[(i + 21)]);
        };


        // TODO: Rest of stats, refer to google sheet. Also, add a section for their 5 base feats and any bonus feats.
        // Css grid time! each column, all items classed as columnBlah, E.G. columnOffense

    if(type == '1'){
        // new

    } else if(type == '2'){
        // load
    }
}