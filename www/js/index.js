
var pokemon_list = [
	"bulbasaur",
	"charmander",
	"squirtle",
];

var action_scene = "Walk";
var action_type = "None";
var action_timer = 0.0;
var action_pos_x = 0;
var action_pos_y = 0;
var action_direction = 0;
var action_width = 0;
var action_height = 0;
var action_hp = 0;

window.addEventListener("resize", function()
{
	Resize();
});

document.getElementById("main_canvas").addEventListener("mousedown", function(event)
{
	if (action_scene == "Walk" && action_type == "Show")
	{
		if (event.pageX >= action_pos_x && event.pageX <= action_pos_x + action_width &&
			event.pageY >= action_pos_y && event.pageY <= action_pos_y + action_height)
		{
			action_scene = "Battle";
			action_type = "None";
			action_timer = 0.0;
			action_hp = 5;
		}
	}
});

document.getElementById("main_canvas").addEventListener("touchstart", function(event)
{
	if (action_scene == "Walk" && action_type == "Show")
	{
		if (event.touches[0].pageX >= action_pos_x && event.touches[0].pageX <= action_pos_x + action_width &&
			event.touches[0].pageY >= action_pos_y && event.touches[0].pageY <= action_pos_y + action_height)
		{
			action_scene = "Battle";
			action_type = "None";
			action_timer = 0.0;
			action_hp = 5;
		}
	}
});

document.getElementById("fight_button").addEventListener("mousedown", function(event)
{
	if (action_scene == "Battle" && action_type == "None")
	{
		action_type = "Fight";
		action_timer = 0.0;
	}
});

document.getElementById("pokeball_button").addEventListener("mousedown", function(event)
{
	if (action_scene == "Battle" && action_type == "None")
	{
		action_type = "Pokeball";
		action_timer = 0.0;
	}
});

document.getElementById("run_button").addEventListener("mousedown", function(event)
{
	if (action_scene == "Battle" && action_type == "None")
	{
		action_type = "Run";
		action_timer = 0.0;
	}
});

document.getElementById("fight_button").addEventListener("touchstart", function(event)
{
	if (action_scene == "Battle" && action_type == "None")
	{
		action_type = "Fight";
		action_timer = 0.0;
	}
});

document.getElementById("pokeball_button").addEventListener("touchstart", function(event)
{
	if (action_scene == "Battle" && action_type == "None")
	{
		action_type = "Pokeball";
		action_timer = 0.0;
	}
});

document.getElementById("run_button").addEventListener("touchstart", function(event)
{
	if (action_scene == "Battle" && action_type == "None")
	{
		action_type = "Run";
		action_timer = 0.0;
	}
});

Resize();

function Resize()
{
	action_width = window.innerWidth * 0.15;
	action_height = action_width;

	document.getElementById("main_canvas").width = window.innerWidth;
	document.getElementById("main_canvas").height = window.innerHeight;
	document.getElementById("main_canvas").style.width = window.innerWidth + "px";
	document.getElementById("main_canvas").style.height = window.innerHeight + "px";

	document.getElementById("fight_button").style.left = parseInt(window.innerWidth/2 - action_width) + "px";
	document.getElementById("fight_button").style.top = parseInt(window.innerHeight - action_height/2 - 10) + "px";
	document.getElementById("fight_button").style.width = parseInt(action_width/2) + "px";
	document.getElementById("fight_button").style.height = parseInt(action_height/2) + "px";

	document.getElementById("pokeball_button").style.left = parseInt(window.innerWidth/2 - action_width/4) + "px";
	document.getElementById("pokeball_button").style.top = parseInt(window.innerHeight - action_width / 2 - 10) + "px";
	document.getElementById("pokeball_button").style.width = parseInt(action_width/2) + "px";
	document.getElementById("pokeball_button").style.height = parseInt(action_height/2) + "px";

	document.getElementById("run_button").style.left = parseInt(window.innerWidth/2 + action_width/2) + "px";
	document.getElementById("run_button").style.top = parseInt(window.innerHeight - action_height/2 - 10) + "px";
	document.getElementById("run_button").style.width = parseInt(action_width/2) + "px";
	document.getElementById("run_button").style.height = parseInt(action_height/2) + "px";

	return;
};

function RandomEnemy()
{
	document.getElementById("enemy_img").src = "img/" + pokemon_list[parseInt(Math.random() * pokemon_list.length)] + ".png";

	return;
};

RandomEnemy();

var interval_loop = setInterval(function()
{
	DrawCanvas();

}, 100);

function DrawCanvas()
{
	var ctx = document.getElementById("main_canvas").getContext("2d");

	var canvas_width = parseInt(document.getElementById("main_canvas").style.width);
	var canvas_height = parseInt(document.getElementById("main_canvas").style.height);

//	ctx.fillStyle = "#000000";
//	ctx.fillRect(0, 0, canvas_width, canvas_height);
	
	if (action_scene == "Walk")
	{
		ctx.drawImage(document.getElementById("background_img"),
			0, 0, canvas_width, canvas_height);

		document.getElementById("button_div").style.display = "none";

		if (action_type == "None")
		{
			if (Math.random() < 0.1)
			{
				action_type = "Show";
				action_timer = 0.0;
				if (Math.random() < 0.5) { action_pos_x = parseInt(-action_width * 1.5); action_direction = 1; }
				else { action_pos_x = parseInt(canvas_width + action_width * 0.5); action_direction = -1; }
				action_pos_y = parseInt((canvas_height - action_height) * (Math.random() * 0.5 + 0.25));
				
				RandomEnemy();
			}
		}
		else if (action_type == "Show")
		{
			action_pos_x += parseInt(action_direction * Math.pow(Math.sin(action_timer * 6.28), 5.0) * canvas_width / 10.0);

			ctx.drawImage(document.getElementById("enemy_img"), 
				parseInt(action_pos_x), parseInt(action_pos_y),
				parseInt(action_width), parseInt(action_height));

			action_timer += 0.025;

			if (action_timer > 1.0)
			{
				action_type = "None";
				action_timer = 0.0;
			}
		}
	}
	else if (action_scene == "Battle")
	{
		ctx.drawImage(document.getElementById("background_img"),
			0, 0, canvas_width, canvas_height);

		if (action_type == "None")
		{
			document.getElementById("button_div").style.display = "inline";

			ctx.drawImage(document.getElementById("trainer_img"), 
				parseInt(canvas_width * 0.05), parseInt(canvas_height * 0.333),
				parseInt(action_width), parseInt(action_height));

			ctx.drawImage(document.getElementById("friend_img"), 
				parseInt(canvas_width * 0.25), 
				parseInt(canvas_height * 0.333),
				parseInt(action_width), parseInt(action_height));

			ctx.drawImage(document.getElementById("enemy_img"), 
				parseInt(canvas_width * 0.75), parseInt(canvas_height * 0.333),
				parseInt(action_width), parseInt(action_height));
		}
		else if (action_type == "Fight")
		{
			document.getElementById("button_div").style.display = "none";

			ctx.drawImage(document.getElementById("trainer_img"), 
				parseInt(canvas_width * 0.05), parseInt(canvas_height * 0.333),
				parseInt(action_width), parseInt(action_height));

			ctx.drawImage(document.getElementById("friend_img"), 
				parseInt(canvas_width * 0.25 + canvas_width * 0.25 * Math.sin(action_timer * 3.14)), 
				parseInt(canvas_height * 0.333),
				parseInt(action_width), parseInt(action_height));
	
			ctx.drawImage(document.getElementById("enemy_img"), 
				parseInt(canvas_width * 0.75), parseInt(canvas_height * 0.333),
				parseInt(action_width), parseInt(action_height));

			action_timer += 0.1;

			if (action_timer > 1.0)
			{
				action_hp--;

				if (action_hp <= 0)
				{
					action_scene = "Walk";
					action_type = "None";
					action_timer = 0.0;
				}
				else
				{
					action_type = "None";
					action_timer = 0.0;
				}
			}
		}
		else if (action_type == "Pokeball")
		{
			document.getElementById("button_div").style.display = "none";

			ctx.drawImage(document.getElementById("trainer_img"), 
				parseInt(canvas_width * 0.05), parseInt(canvas_height * 0.333),
				parseInt(action_width), parseInt(action_height));
	
			ctx.drawImage(document.getElementById("enemy_img"), 
				parseInt(canvas_width * 0.75), parseInt(canvas_height * 0.333),
				parseInt(action_width), parseInt(action_height));
	
			ctx.drawImage(document.getElementById("pokeball_img"), 
				parseInt(canvas_width * 0.05 + canvas_width * 0.7 * action_timer), 
				parseInt(canvas_height * (0.333 - 0.167 * Math.sin(action_timer * 3.14))),
				parseInt(action_width), parseInt(action_height));

			action_timer += 0.1;

			if (action_timer > 1.0)
			{
				action_type = "Wait";
				action_timer = 0.0;
			}
		}
		else if (action_type == "Wait")
		{
			document.getElementById("button_div").style.display = "none";

			ctx.drawImage(document.getElementById("trainer_img"), 
				parseInt(canvas_width * 0.05), parseInt(canvas_height * 0.333),
				parseInt(action_width), parseInt(action_height));
	
			ctx.translate(parseInt(canvas_width * 0.25 + canvas_width * 0.5 + action_width / 2), 
				parseInt(canvas_height * 0.333 + action_height / 2));
			ctx.rotate(0.524 * Math.sin(action_timer * 4.0 * 6.28));
			ctx.drawImage(document.getElementById("pokeball_img"), 
				parseInt(-action_width / 2), parseInt(-action_height / 2),
				parseInt(action_width), parseInt(action_height));
			ctx.rotate(-0.524 * Math.sin(action_timer * 4.0 * 6.28));
			ctx.translate(-parseInt(canvas_width * 0.25 + canvas_width * 0.5 + action_width / 2), 
				-parseInt(canvas_height * 0.333 + action_height / 2));

			action_timer += 0.05;

			if (action_timer > 1.0)
			{
				if (Math.random() * 6 > action_hp)
				{
					action_scene = "Catch";
					action_type = "None";
					action_timer = 0.0;
				}
				else
				{
					action_type = "None";
					action_timer = 0.0;
				}
			}
		}
		else if (action_type == "Run")
		{
			document.getElementById("button_div").style.display = "none";

			ctx.drawImage(document.getElementById("enemy_img"), 
				parseInt(canvas_width * 0.75 + canvas_width * 0.25 * action_timer), parseInt(canvas_height * 0.333),
				parseInt(action_width), parseInt(action_height));

			action_timer += 0.1;

			if (action_timer > 1.0)
			{
				action_scene = "Walk";
				action_type = "None";
				action_timer = 0.0;
			}
		}
	}
	else if (action_scene == "Catch")
	{
		ctx.drawImage(document.getElementById("winner_img"),
			0, 0, canvas_width, canvas_height);

		document.getElementById("button_div").style.display = "none";
	
		ctx.drawImage(document.getElementById("enemy_img"), 
			parseInt((canvas_width) * 0.5 - action_width/2), parseInt(canvas_height * 0.333),
			parseInt(action_width), parseInt(action_height));

		action_timer += 0.025;

		if (action_timer > 1.0)
		{
			action_scene = "Walk";
			action_type = "None";
			action_timer = 0.0;
		}
	}

	return;
};

