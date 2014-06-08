Array.prototype.shuffle = function()
{
	this.sort(function(a, b)
	{
		return Math.random() - 0.5;
	});
}

function Pion(couleur, posX, posY, map)
{
	this.setCouleur(couleur);
	this.setX(posX);
	this.setY(posY);
	this.map = map;
	this.mort = false;
	map[posX][posY] = this;
}

Pion.prototype =
{
	bouger : function()
	{
		if (this.mort == true)
			return false;
		var nbr = Math.random();
		if (nbr >= 0.5)
		{
			var capable = this.bouger1();
			if (capable == false)
				return this.bouger2();
		}
		else
		{
			var capable = this.bouger2();
			if (capable == false)
				return this.bouger1();
		}
	},
	bouger1 : function()
	{
		if (this.getCouleur() == 'noir')
		{
			var x = this.getX() - 1;
			var y = this.getY() - 1;
			return this.checkBouger(x, y);
		}
		else if (this.getCouleur() == 'blanc')
		{
			var x = this.getX() + 1;
			var y = this.getY() - 1;
			return this.checkBouger(x, y);
		}
	},
	bouger2 : function()
	{
		if (this.getCouleur() == 'noir')
		{
			var x = this.getX() - 1;
			var y = this.getY() + 1;
			return this.checkBouger(x, y);
		}
		else if (this.getCouleur() == 'blanc')
		{
			var x = this.getX() + 1;
			var y = this.getY() + 1;
			return this.checkBouger(x, y);
		}
	},
	checkBouger : function(x, y)
	{
		if (this.map[x] != undefined && this.map[x][y] != undefined)
		{
			if (typeof this.map[x][y] == "object" && this.map[x][y].getCouleur() == this.getCouleur())
				return false;
			else
			{
				this.deplacement(x, y);
				return true;
			}
		}
		else
			return false;
	},
	deplacement : function(x, y)
	{
		this.map[this.x][this.y] = "";
		if (typeof this.map[x][y] == 'object')
			this.map[x][y].tuer();
		this.map[x][y] = this;
		this.setX(x);
		this.setY(y);
	},
	getX : function()
	{
		return this.x;
	},
	getY : function()
	{
		return this.y;
	},
	getCouleur : function()
	{
		return this.couleur;
	},
	setX : function(x)
	{
		this.x = x;
	},
	setY : function(y)
	{
		this.y = y;
	},
	setCouleur : function(couleur)
	{
		this.couleur = couleur;
	},
	tuer : function()
	{
		this.mort = true;
	},
	isWinner : function()
	{
		if (this.getCouleur() == 'noir' && this.getX() == 0)
			return true;
		if (this.getCouleur() == 'blanc' && this.getX() == 9)
			return true;
		return false;
	},
	display : function()
	{
		if (this.getCouleur() == 'blanc')
			return '<div class="pb" style="margin:auto;background-color:white;width:50px;height:50px"></div>';
		if (this.getCouleur() == 'noir')
			return '<div style="margin:auto;border-style:solid;border-color:white;width:50px;height:50px"></div>';
	}
}