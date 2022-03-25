function home(){
    $d(body, '', 'content');
        let con = pullID('content');
        $h(2, con, 'Character Sheets', '', 'homeTitle');
        $hr(con, 'divider', '')
        $b(con,'New Sheet', function(){newSheet()},'button','');
        $b(con,'Load Sheet',function(){loadSheets()}, 'button', '');
} 