let footer = () => {
    $d(body,"","footer");
    let foot = pullID('footer');
    $hr(foot)
    $p(foot,'Software provided As-Is, no guarantee for functionality or quality is provided.')
    $p(foot, 'Software is licensed under GNU-GPL 3.0, see https://github.com/JessiMcKissick/G20/blob/main/LICENSE for details.')
    $p(foot, 'In the event you find a bug or issue, please leave an issue at https://github.com/JessiMcKissick/G20/issues')
    $p(foot, 'Release version 1.0.0')
};