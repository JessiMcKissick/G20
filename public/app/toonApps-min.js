let listApp=["Alaqua","Aiya","Dice"];var tick=0;function applets(){let p=page();$h(2,p,"Applets","","appsTitle"),$hr(p,"divider","");for(let t=0;t<listApp.length;t++)$b(p,listApp[t],function(){router(listApp[t]+"()")},"",""),console.log(listApp[t]+"()")}