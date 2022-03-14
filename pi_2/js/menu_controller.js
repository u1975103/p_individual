function start_game(){
	name = prompt("User name");
	loadpage("./html/game.html");
}

function exit (){
	if (name != ""){
		alert("Leaving " + name + "'s game");
	}
	name = "";
	loadpage("../index.html")
}

function options(){
	// TODO: Open options menu
	console.log("Options menu button");
}

function nav_p2(){
	loadpage("./pi_2/index.html");
}

function nav_p3(){
	loadpage("./pi_3/index.html");
}

