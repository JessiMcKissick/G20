let state=0,itemList=["Blades","Bludgeons","Unarmed","Throwing","Aim","Magic (Blasting)","Magic (Blighting)","Gadgetry (Destruction)","Gadgetry (Disruption)","Summon","Pilot","Fortitude","Clarity","Armor","Parry","Swiftness","Magic","Gadgetry","Summon","Pilot","Stealth","Performance","Magic","Gadgetry","Medicine","Summon","Perception (Physical)","Perception (Magical)","Perception (Insight)","Provisions","Science","Might","Sleight Of Hand"],auxCount=30;var auxoff=0,auxdef=0,auxsup=0,offPoints=15;const offPointsBase=15,defPointsBase=15,supPointsBase=15;var defPoints=15,supPoints=15,auxPoints=30;let offPointMax=10,defPointMax=10,supPointMax=10,offComb=0,defComb=0,supComb=0;var offSkillID=[],defSkillID=[],supSkillID=[],defNeg=0,offNeg=0,supNeg=0,auxDif=0;function engine(e){generateUI();let t=pullID("content"),l=pullID("offenseGrid"),a=pullID("defenseGrid"),o=pullID("supportGrid");pullID("sheet");proceduralUI(l,a,o,t),updateData(),$hr(t),$b(t,"Save Data",function(){save()})}function generateUI(){$d(body,"","content"),$h(3,pullID("header"),"Auxilary points: "+auxCount,"","auxCounter");let e=pullID("content");$form(e,"","sheet");let t=pullID("sheet");$input(t,"Name","sheetData","charName","text","sheetName","Character Name",""),$hr(t,"",""),$input(t,"HP","sheetData","charHP","text","sheetHP","HP","true"),$input(t,"Armor","sheetData","charArmor","text","sheetArm","Armor","true"),$hr(t,"",""),$d(t,"contentGrid","stats");let l=pullID("stats");$d(l,"subGrid","offenseGrid");let a=pullID("offenseGrid");$d(l,"subGrid","defenseGrid");let o=pullID("defenseGrid");$d(l,"subGrid","supportGrid");let u,n=pullID("supportGrid");$sel(o,"","defenseNegCounter"),$sel(a,"","offenseNegCounter"),$sel(n,"","supportNegCounter");for(let e=0;e<3;e++)$opt(pullID("defenseNegCounter"),-Math.abs(e),"","");pullID("defenseNegCounter").onchange=function(){let e=2*(parseInt(pullID("defenseNegCounter").value)+parseInt(pullID("offenseNegCounter").value)+parseInt(pullID("supportNegCounter").value));for(auxDif=Math.abs(e),defNeg=Math.abs(pullID("defenseNegCounter").value),u=0;u<=9;u++)console.log(defNeg),pullID("selerDe"+u).value>-1?pullID("selerDe"+u).value-=defNeg:pullID("selerDe"+u).value=0-defNeg;console.log(defNeg),update("def")};for(let e=0;e<3;e++)$opt(pullID("offenseNegCounter"),-Math.abs(e),"","");pullID("offenseNegCounter").onchange=function(){let e=2*(parseInt(pullID("defenseNegCounter").value)+parseInt(pullID("offenseNegCounter").value)+parseInt(pullID("supportNegCounter").value));for(auxDif=Math.abs(e),offNeg=Math.abs(pullID("offenseNegCounter").value),u=0;u<=10;u++)console.log(offNeg),pullID("selerOf"+u).value>-1?pullID("selerOf"+u).value-=offNeg:pullID("selerOf"+u).value=0-offNeg;console.log(offNeg),update("off")};for(let e=0;e<3;e++)$opt(pullID("supportNegCounter"),-Math.abs(e),"","");for(pullID("supportNegCounter").onchange=function(){let e=2*(parseInt(pullID("defenseNegCounter").value)+parseInt(pullID("offenseNegCounter").value)+parseInt(pullID("supportNegCounter").value));for(auxDif=Math.abs(e),supNeg=Math.abs(pullID("supportNegCounter").value),u=0;u<=11;u++)console.log(supNeg),pullID("selerSu"+u).value>-1?pullID("selerSu"+u).value-=supNeg:pullID("selerSu"+u).value=0-supNeg;console.log(defNeg),update("sup")},$h(3,o,"Defense Points: "+defPoints,"pointCount","defPointCounter"),$h(3,a,"Offense Points: "+offPoints,"pointCount","offPointCounter"),$h(3,n,"Support Points: "+supPoints,"pointCount","supPointCounter"),$hr(t);u<5;u++)$input(t,"fName","","fName"+u,"text","fname1","Feat name"),$input(t,"fInf","","fInf"+u,"text","fname1","Feat name")}function proceduralUI(a,b,c,d){for(let e=0;e<11;e++){$p(a,itemList[e]),$sel(a,"seler","selerOf"+e);let t=pullID("selerOf"+e);offSkillID.push("selerOf"+e);for(let e=-2;e<=offPointMax;e++)$opt(t,e,"","");pullID("selerOf"+e).onchange=function(){update("off","selerOf"+e)},pullID("selerOf"+e).value=0}for(let e=0;e<10;e++){$p(b,itemList[e+11]),$sel(b,"seler","selerDe"+e);let t=pullID("selerDe"+e);defSkillID.push("selerDe"+e);for(let e=-2;e<=defPointMax;e++)$opt(t,e,"","");pullID("selerDe"+e).onchange=function(){update("def","selerDe"+e)},pullID("selerDe"+e).value=0}for(let e=0;e<12;e++){$p(c,itemList[e+21]),$sel(c,"seler","selerSu"+e);let t=pullID("selerSu"+e);supSkillID.push("selerSu"+e),pullID("selerSu"+e).onchange=function(){update("sup","selerSu"+e)},pullID("selerSu"+e).value=0;for(let e=-2;e<=supPointMax;e++)$opt(t,e,"","")}$hr(d);for(let e=0;e<5;e++){e%2==0?$d(d,"featDiv","featNo"+e):$d(d,"featDivAlt","featNo"+e);let t=pullID("featNo"+e);$input(t,"","fName","fName"+e,"text","","Feat Name"),$area(t,"","fInfo","fInf"+e,"Feat Info")}$hr(d);for(let i=0;i<5;i++){let divAlta=eval("featNo"+i);i%2==0?$d(divAlta,"featDivStory","featStNo"+i):$d(divAlta,"featDivStoryAlt","featStNo"+i);let divAlt=pullID("featStNo"+i);$input(divAlt,"","fName","fNameSt"+i,"text","","Story Feat Name"),$area(divAlt,"","fInfo","fInfSt"+i,"Story Feat Info")}for(let e=0;e<11;e++)pullID("selerSu"+e).value=0}function save(){var e=[],t=[],l=[];let a=[],o=[],u=[],n=[];localStorage.setItem("name",pullID("charName").value),localStorage.setItem("hp",pullID("charHP").value),localStorage.setItem("armor",pullID("charArmor").value);for(let t=0;t<11;t++){let l=pullID("selerOf"+[t]).value;e.push(l)}for(let e=0;e<10;e++){let l=pullID("selerDe"+[e]).value;t.push(l)}for(let e=0;e<12;e++){let t=pullID("selerSu"+[e]).value;l.push(t)}for(let e=0;e<5;e++){let t=pullID("fName"+e).value,l=pullID("fInf"+e).value;a.push(t),o.push(l)}for(let e=0;e<5;e++){let t=pullID("fNameSt"+e).value,l=pullID("fInfSt"+e).value;console.log(t),u.push(t),n.push(l)}localStorage.setItem("offense",JSON.stringify(e)),localStorage.setItem("defense",JSON.stringify(t)),localStorage.setItem("support",JSON.stringify(l)),localStorage.setItem("featNames",JSON.stringify(a)),localStorage.setItem("featInfo",JSON.stringify(o)),localStorage.setItem("featNameStory",JSON.stringify(u)),localStorage.setItem("featInfoStory",JSON.stringify(n)),localStorage.setItem("defenseNegative",JSON.stringify(defNeg)),localStorage.setItem("offenseNegative",JSON.stringify(offNeg)),localStorage.setItem("supportNegative",JSON.stringify(supNeg)),localStorage.setItem("auxData",JSON.stringify(auxPoints))}function load(){engine();let e=JSON.parse(localStorage.getItem("offense")),t=JSON.parse(localStorage.getItem("defense")),l=JSON.parse(localStorage.getItem("support")),a=JSON.parse(localStorage.getItem("featNames")),o=JSON.parse(localStorage.getItem("featInfo")),u=JSON.parse(localStorage.getItem("featNameStory")),n=JSON.parse(localStorage.getItem("featInfoStory")),s=JSON.parse(localStorage.getItem("defenseNegative")),f=JSON.parse(localStorage.getItem("offenseNegative")),r=JSON.parse(localStorage.getItem("supportNegative"));JSON.parse(localStorage.getItem("auxData"));if(pullID("offenseNegCounter").value=-Math.abs(f),pullID("defenseNegCounter").value=-Math.abs(s),pullID("supportNegCounter").value=-Math.abs(r),defNeg=s,offNeg=f,supNeg=r,difCount=4*(defNeg+supNeg+offNeg),auxDif=Math.abs(difCount),console.log(supNeg+" wowaonw"),null!=e){for(let t=0;t<e.length;t++)pullID("selerOf"+[t]).value=e[t];for(let e=0;e<t.length;e++)pullID("selerDe"+[e]).value=t[e];for(let e=0;e<l.length;e++)pullID("selerSu"+[e]).value=l[e];for(let e=0;e<a.length;e++)pullID("fName"+e).value=a[e];for(let e=0;e<o.length;e++)pullID("fInf"+e).value=o[e];for(let e=0;e<u.length;e++)pullID("fNameSt"+e).value=u[e];for(let e=0;e<n.length;e++)pullID("fInfSt"+e).value=n[e];pullID("charName").value=lo("name")}update("off"),update("def"),update("sup")}var num=0;function update(e){pullID("defPointCounter"),pullID("supPointCounter");"off"==e&&offPoints+auxPoints>0?updateAssist("off"):"def"==e&&defPoints+auxPoints>0?updateAssist("def"):"sup"==e&&supPoints+auxPoints>0&&updateAssist("sup"),updateData()}function updateData(){val("charHP",Math.floor(val("selerDe0")/2+5)),val("charArmor",val("selerDe2"))}let updateAssist=type=>{var typePoints=eval(type+"Points"),num=0;let data=eval(type+"SkillID");var poinTexBase=eval(type+"PointCounter");for(let e=0;e<data.length;e++){let t=parseInt(pullID(data[e]).value);"off"==type&&(console.log("Offense negative state: "+offNeg),-1==t&&-1==offNeg?num+=0:-1==t&&-2==offNeg?num+=1:-2==t?num+=0:t<9&&t>-Math.abs(offNeg)?(console.log("works fine"),num=num+t+offNeg):9==t?num=num+t+1+offNeg:10==t&&(num=num+t+4+offNeg)),"def"==type&&(-1==t&&-1==defNeg?num+=0:-1==t&&-2==defNeg?num+=1:-2==t?num+=0:t<9&&t>-Math.abs(defNeg)?num=num+t+defNeg:9==t?num=num+t+1+defNeg:10==t&&(num=num+t+4+defNeg)),"sup"==type&&(-1==t&&-1==supNeg?num+=0:-1==t&&-2==supNeg?num+=1:-2==t?num+=0:t<9&&t>-Math.abs(supNeg)?num=num+t+supNeg:9==t?num=num+t+1+supNeg:10==t&&(num=num+t+4+supNeg))}let pBase=eval(type+"PointsBase"),pnum=pBase-num;if(pBase-num<0){"off"==type?auxoff=Math.abs(pnum):"def"==type?auxdef=Math.abs(pnum):"sup"==type&&(auxsup=Math.abs(pnum));let e=auxoff+auxdef+auxsup,t=auxCount-(e+-Math.abs(auxDif));auxPoints=t,typePoints=0,"off"==type?poinTexBase.innerText="Offense Points: "+typePoints:"def"==type?poinTexBase.innerText="Defense Points: "+typePoints:"sup"==type&&(poinTexBase.innerText="Support Points: "+typePoints),pullID("auxCounter").innerText="Auxilary points: "+auxPoints}else{"off"==type?auxoff=0:"def"==type?auxdef=0:"sup"==type&&(auxsup=0),typePoints=pBase-num,"off"==type?poinTexBase.innerText=typePoints>15?"Offense Points: 15":"Offense Points: "+typePoints:"def"==type?poinTexBase.innerText=typePoints>15?"Defense Points: 15":"Defense Points: "+typePoints:"sup"==type&&(poinTexBase.innerText=typePoints>15?"Support Points: 15":"Support Points: "+typePoints);let e=auxoff+auxdef+auxsup,t=auxCount-(e+-Math.abs(auxDif));auxPoints=t,pullID("auxCounter").innerText="Auxilary points: "+auxPoints}auxPoints<0&&(pullID("auxCounter").innerText="Auxilary points: ILLEGAL  ")};function sa(e,t){localStorage.setItem(e,t)}function lo(e){return localStorage.getItem(e)}