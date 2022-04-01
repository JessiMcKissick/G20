function home(){
    $d(body, '', 'content');
        let con = pullID('content');
        $h(2, con, 'Character Sheets', '', 'homeTitle');
        $hr(con, 'divider', '')
        $b(con, 'New Sheet', function () { router('engine()')},'button','');
        $b(con,'Load Sheet',function(){router('engine("load")')}, 'button', '');
        $b(con,'Character apps', function(){router('applets()')}, 'button','');
} 