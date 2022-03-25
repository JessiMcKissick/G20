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

 
function engine(type){
    $d(body, '', 'content');
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
        $d(grid, 'subGrid', 'supportGrid'); let suGrid = pullID('defenseGrid');
        for(let i = 0; i < 11; i++){
            $input(ofGrid, '', 'columnOffense', 'off'+i, 'text', '', itemList[i]);
        };
        for (let i = 0; i < 11; i++) {
            $input(deGrid, '', 'columnDefense', 'def' + i, 'text', '', itemList[(i + 10)]);
        };
        for (let i = 0; i < 11; i++) {
            $input(suGrid, '', 'columnSupport', 'sup' + i, 'text', '', itemList[(i + 22)]);
        };


        // TODO: Rest of stats, refer to google sheet. Also, add a section for their 5 base feats and any bonus feats.
        // Css grid time! each column, all items classed as columnBlah, E.G. columnOffense

    if(type == '1'){
        // new

    } else if(type == '2'){
        // load
    }
}