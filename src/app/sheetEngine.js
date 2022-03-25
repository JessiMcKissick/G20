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
        // TODO: Rest of stats, refer to google sheet. Also, add a section for their 5 base feats and any bonus feats.


    if(type == '1'){
        // new

    } else if(type == '2'){
        // load
    }
}