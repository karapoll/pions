var map = new Array();
var blanc = new Array();
var noir = new Array();

function initialisation()
{
	var i = 0;
	while (i < 10)
	{
		map[i] = new Array();
		var j = 0;
		while (j < 10)
		{
			map[i][j] = "";
			j++;
		}
		i++;
	}

	blanc.push(new Pion("blanc", 0, 1, map));
	blanc.push(new Pion("blanc", 0, 3, map));
	blanc.push(new Pion("blanc", 0, 5, map));
	blanc.push(new Pion("blanc", 0, 7, map));
	blanc.push(new Pion("blanc", 0, 9, map));
	blanc.push(new Pion("blanc", 1, 0, map));
	blanc.push(new Pion("blanc", 1, 2, map));
	blanc.push(new Pion("blanc", 1, 4, map));
	blanc.push(new Pion("blanc", 1, 6, map));
	blanc.push(new Pion("blanc", 1, 8, map));
	blanc.push(new Pion("blanc", 2, 1, map));
	blanc.push(new Pion("blanc", 2, 3, map));
	blanc.push(new Pion("blanc", 2, 5, map));
	blanc.push(new Pion("blanc", 2, 7, map));
	blanc.push(new Pion("blanc", 2, 9, map));
	blanc.shuffle();
	noir.push(new Pion("noir", 7, 0, map));
	noir.push(new Pion("noir", 7, 2, map));
	noir.push(new Pion("noir", 7, 4, map));
	noir.push(new Pion("noir", 7, 6, map));
	noir.push(new Pion("noir", 7, 8, map));
	noir.push(new Pion("noir", 8, 1, map));
	noir.push(new Pion("noir", 8, 3, map));
	noir.push(new Pion("noir", 8, 5, map));
	noir.push(new Pion("noir", 8, 7, map));
	noir.push(new Pion("noir", 8, 9, map));
	noir.push(new Pion("noir", 9, 0, map));
	noir.push(new Pion("noir", 9, 2, map));
	noir.push(new Pion("noir", 9, 4, map));
	noir.push(new Pion("noir", 9, 6, map));
	noir.push(new Pion("noir", 9, 8, map));
	noir.shuffle();
}

function affichage()
{

	$('table').empty();
	var color = 0;
	var i = 0;
	while (map[i] != undefined)
	{
		var j = 0;
		var ligne = '<tr>';
		while (map[i][j] != undefined)
		{
			ligne = ligne + '<td class="';
			if (color % 2 == 0)
				ligne = ligne += "b";
			else
				ligne = ligne += "n";
			ligne = ligne + '">';
			if (typeof map[i][j] == "object")
				ligne = ligne + map[i][j].display();
			ligne = ligne + '</td>';
			color++;
			j++;
		}
		color++;
		ligne = ligne + '</tr>';
		$('table').append(ligne);
		i++;
	}
}

function start()
{
	var couleur = 0;
	var interval = setInterval(function()
	{
		if (couleur % 2 == 0)
		{
			var i = 0;
			while (blanc[i] != undefined && blanc[i].bouger() == false)
				i++;
			if (blanc[i].isWinner() == true)
			{
				clearInterval(interval);
				affichage();
				alert('Les blancs ont gagnes !');
			}
			blanc.shuffle();
		}
		else
		{
			var i = 0;
			while (noir[i] != undefined && noir[i].bouger() == false)
				i++;
			if (noir[i].isWinner() == true)
			{
				clearInterval(interval);
				affichage();
				alert('Les noirs ont gagnes !');
			}
			noir.shuffle();
		}
		couleur++;
		affichage();
	}, 200);
}

$(document).ready(function()
{
	initialisation();
	affichage();
	start();
});