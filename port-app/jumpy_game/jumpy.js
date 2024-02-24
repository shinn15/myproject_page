//for the bg
let board;

//img size
let board_width=640;
let board_height=640;
let context;

//character
let characwidth=55;
let characheight=55;

let characx=board_width/2 - characwidth/2;
let characy= board_height*7/8 - characheight;

let charac_imL;
let chararc_imR;

//draw character
let charac = {
	img : null,
	x : characx,
	y : characy,
	width: characwidth,
	height: characheight

}

//physic
let velocityx=0;//right and left speed
let velocityy=0;//jump speed
let initial_velocityy= -9//jump velocity
let gravity = 0.4;

//tiles
let tileArry=[];
let tile_width=70;
let tile_height=20;
let tileImg;

//score
let score=0;
let maxscore=0;//current score
let gameend= false;//if you fall




//draw canvas
window.onload= function(){

	//get the board id canvas
	board= document.getElementById("board");
	board.width= board_width;
	board.height=board_height;
	context = board.getContext("2d");

	/*draw charac
	context.fillStyle="black";
	context.fillRect(charac.x,charac.y,charac.width,charac.height);
	*/

	//load img

	//charac
	//right
	charac_imgR= new Image();
	charac_imgR.src="img/characR.png";
	charac.img=charac_imgR;
	charac_imgR.onload=function(){
		context.drawImage(charac.img,charac.x,charac.y,
			charac.width,charac.height);
	}
	//left
	charac_imgL= new Image();
	charac_imgL.src="img/characL.png";

	//tiles
	tileImg = new Image();
	tileImg.src ="img/til1.png";

	//
	velocityy = initial_velocityy;

	//call tile
	Placetile();

	//call loop the canva and update
	requestAnimationFrame(update);

	//call charac move
	document.addEventListener("keydown",keycharac);

}

//update/draw canvas
function update(){

	requestAnimationFrame(update);

	if(gameend){
		return;
	}

	//for img pix draw
	context.clearRect(0,0, board.width, board.height);

	//draw charac
	//charac move
	charac.x += velocityx;

	//border loop
	if(charac.x > board_width){
		charac.x=0;
	}
	else if(charac.x + charac.width < 0){
		charac.x = board_width;
	}

	//jumping pysic
	charac.y += velocityy;
	velocityy += gravity;

	//if you fall/losing
	if(charac.y > board.height){
		gameend=true;
	}

	context.drawImage(charac.img,charac.x,charac.y,
			charac.width,charac.height);

	//tile
	for(let i=0; i < tileArry.length; i++){
		let tile = tileArry[i];

		//follow the charc 
		if(velocityy < 0 && charac.y < board_height*3/4){

			tile.y -= initial_velocityy;
		}


		//detect tile and charac collision
		if(detectcolli(charac,tile)&& velocityy >= 0){
			velocityy = initial_velocityy;//jump
		}

		context.drawImage(tile.img,tile.x,tile.y,
			tile.width,tile.height);
	}

//follow charrac jump
	while(tileArry.length > 0 && tileArry[0].y >= board_height){
		tileArry.shift();//remove 1st element from aaray
		newtile();

	}

	//score
	addscore();
	context.fillStyle="black";
	context.font="25px san-serif";
	context.fillText("Your Score: "+score,5,20);

	//text game over
	if(gameend){
		context.font="22px san-serif";
		context.fillText("Game over Press 'Space' or 'R' to restart",
			board_width/5,board_height*7/8);
	}

}

//characc move
function keycharac(e){
	//game restart
	if(e.code == "KeyR" && gameend){
		window.location.href = "jumpy_start.html";
	}

	//right
	else if(e.code == "ArrowRight" || e.code=="KeyD"){
		velocityx=4;//4 speed pixel
		charac.img=charac_imgR;

	}
	//left
	else if(e.code == "ArrowLeft" || e.code=="KeyA"){
		velocityx=-4;
		charac.img=charac_imgL;
		
	}
//reset if gam end
	else if(e.code == "Space" && gameend){

		//draw character
		charac = {
			img : charac_imgR,
			x : characx,
			y : characy,
			width: characwidth,
			height: characheight
			}

		velocityx=0;
		velocityy=initial_velocityy;
		score=0;
		maxscore=0;
		gameend=false;
		Placetile();
	}



}

//for tiles
function Placetile(){
	tileArry = [];

	//start tile
	let tile = {
		img : tileImg,
		x: board_width/2,
		y : board_height - 50,
		width: tile_width,
		height: tile_height
	}

	tileArry.push(tile);

	//random tile generator
	for(let i = 0; i<6; i++){
		let randomtl= Math.floor(Math.random()*board_width*3/4);

		let tile = {
		img : tileImg,
		x: randomtl,
		y : board_height - 75*i - 150,
		width: tile_width,
		height: tile_height
		}

		tileArry.push(tile);
	}
		
}

//generate tile set 
function newtile(){

	let randomtl= Math.floor(Math.random()*board_width*3/4);
	let tile = {

		img : tileImg,
		x: randomtl,
		y : -tile_height,
		width: tile_width,
		height: tile_height
	}

	tileArry.push(tile);

}

//tile collision
function detectcolli(a,b){
	//define the collision of tiles
	return a.x < b.x + b.width &&
		   a.x + a.width > b.x &&
		   a.y < b.y + b.height &&
		   a.y + a.height > b.y;
}

//score points
function addscore(){
	//score+20
	let points = Math.floor(20*Math.random());
	//score += points;

	//if up
	if(velocityy < 0 ){
		maxscore += points;
		if(score < maxscore){
			score = maxscore;
		}
	}
	//if falling
	else if(velocityy >= 0){
		maxscore -= points;
	}
}