const canvas = document.querySelector('canvas');
const ca= canvas.getContext('2d');
const fall= 0.8

canvas.width = 1024
canvas.height =576

ca.fillRect(0, 0, canvas.width, canvas.height);

//background
const bki = new animer({
	position:{
		x:0,
		y:0
	},
	imageSrc: './img/bhe.jpg',


})

//sprite
const nai = new animer({
	position:{
		x:355,
		y:229
	},
	imageSrc: './img/nainai.png',
	scale:0.8,
	spritenu:6

})

const nai2 = new animer({
	position:{
		x:535,
		y:200
	},
	imageSrc: './img/nainai.png',
	scale:0.8,
	spritenu:6

})

const nai3 = new animer({
	position:{
		x:710,
		y:233
	},
	imageSrc: './img/nainai.png',
	scale:0.8,
	spritenu:6

})



//character & animation charac
const player = new playes({
	position: {
		x: 180,
		y: 100
	},velocity: {
		x:0,
		y:0
	},
	offset:{
		x:0,
		y:0
	},
	imageSrc: './img/charac/naiwalk.png',
	scale:2,
	spritenu:6,
	offset:{
		x:88,
		y:198
	},
	nsprite:{
		idle:{
			imageSrc: './img/charac/naiwalk.png',
			spritenu: 6
			},
		run:{
			imageSrc: './img/charac/nairun2.png',
			spritenu: 6
		},
		jump:{
			imageSrc: './img/charac/naijump.png',
			spritenu: 2
		},
		fall:{
			imageSrc: './img/charac/naiwalk.png',
			spritenu: 6
		},
		attk:{
			imageSrc: './img/charac/naiA.png',
			spritenu: 5
		},
		hittake:{
			imageSrc: './img/charac/naihit.png',
			spritenu: 3
		},
		deds:{
			imageSrc: './img/charac/naided.png',
			spritenu: 5
		},


	},
	//attack location
	attkbox:{
		offset:{
			x: 150,
			y: 0,
		},
		width:110,
		height:50
	}
		

})


//player.look();

const bot = new playes({
	position: {
		x: 850,
		y: 100
	},velocity: {
		x:0,
		y:0
	},
	color:'red',
	offset:{
		x:-50,
		y:0
	},
	imageSrc: './img/charac/necwalk.png',
	scale:2,
	spritenu:6,
	offset:{
		x:88,
		y:150
	},
	nsprite:{
		idle:{
			imageSrc: './img/charac/necwalk.png',
			spritenu: 6
			},
		run:{
			imageSrc: './img/charac/necrun.png',
			spritenu: 6
		},
		jump:{
			imageSrc: './img/charac/necjump.png',
			spritenu: 2
		},
		fall:{
			imageSrc: './img/charac/necfall.png',
			spritenu: 2
		},
		attk:{
			imageSrc: './img/charac/necattk.png',
			spritenu: 5
		},
		hittake:{
			imageSrc: './img/charac/nechit.png',
			spritenu: 3
		},
		deds:{
			imageSrc: './img/charac/necded.png',
			spritenu: 5
		}

	},
	attkbox:{
		offset:{
			x: -50,
			y: 10,
		},
		width:100,
		height:50
	}
})

//bot.look();
//console.log(player);

//keys
const keys={
	a: {
		pressed:false
	},
	d: {
		pressed:false
	},
	w:{
		pressed:false
	},
	ArrowRight:{ 
		pressed:false
	},
	ArrowLeft: {
		pressed:false
	}

}

destime()

//animation & background
function anime(){
	window.requestAnimationFrame(anime)
	//console.log('Test!!!');
	//ca.clearRect(0,0,canvas.width,canvas.height)
	ca.fillStyle='black'
	ca.fillRect(0,0,canvas.width,canvas.height)
//sprite

	bki.update()

	nai.update()
	nai2.update()
	nai3.update()
//charcter
	player.update()
	bot.update()
	player.velocity.x=0
	bot.velocity.x=0

//moves & aniamation
//player
//moves
	player.swapsprite('idle')
	if (keys.a.pressed && player.lastp==='a'){
		player.velocity.x=-5
		player.swapsprite('run')

	}else if (keys.d.pressed && player.lastp==='d'){
		player.velocity.x=5
		player.swapsprite('run')
	}else{
		player.swapsprite('idle')
	}

//player jump & fall
	if (player.velocity.y<0){
		player.swapsprite('jump')
	}else if(player.velocity.y>0){
		player.swapsprite('fall')
	}


//bot
	bot.swapsprite('idle')
	if (keys.ArrowLeft.pressed && bot.lastp==='ArrowLeft'){
		bot.velocity.x=-5
		bot.swapsprite('run')
	}else if (keys.ArrowRight.pressed && bot.lastp==='ArrowRight'){
		bot.velocity.x=5
		bot.swapsprite('run')
	}else{
		bot.swapsprite('idle')
	}
//bot jump
	if (bot.velocity.y<0){
		bot.swapsprite('jump')
	}else if(bot.velocity.y > 0){
		bot.swapsprite('fall')
	}


//attackin & hitbox/collision -
//sordattk=to hit
	//player
	if (attckin({
		rectan1:player,
		rectan2:bot
	}) &&
		player.sordattk && player.spritest == 4
		){
		//player hit bot
		bot.hittake()

		player.sordattk=false
		console.log('player hit')
		bot.buhay -= 5
		document.querySelector('#botth').style.width=bot.buhay + '%'
	}

	//if misses
	if(player.sordattk && player.spritest===4){
		player.sordattk=false

	}

	//bot
	if (attckin({
		rectan1:bot,
		rectan2:player
	}) &&
		bot.sordattk && bot.spritest == 3
		){
		//bot hit player
		player.hittake()

		bot.sordattk=false
		console.log('bot hit')
		player.buhay -= 10
		document.querySelector('#playerh').style.width=player.buhay + '%'
	}

	if(bot.sordattk && bot.spritest===3){
		bot.sordattk=false

	}

//endin game 
	if(bot.buhay <= 0 || player.buhay<=0){
		winrlos({player,bot,timerdi})


	}


}

anime()

//movement keys
window.addEventListener('keydown',(event)=>{
	if(!player.deds){
//player
	switch(event.key){
	case 'd':
		keys.d.pressed=true
		player.lastp='d'
		break
	case 'a':
		keys.a.pressed=true
		player.lastp='a'
		break
	case 'w':
		player.velocity.y= -20
		break
	case ' ':
		player.attck()

		console.log('player attack')
		break
	}
}

//bot
	if(!bot.deds){
	switch(event.key){
	case 'ArrowRight':
		keys.ArrowRight.pressed=true
		bot.lastp='ArrowRight'
		break
	case 'ArrowLeft':
		keys.ArrowLeft.pressed=true
		bot.lastp='ArrowLeft'
		break
	case 'ArrowUp':
		bot.velocity.y= -20
		break
	case 'ArrowDown':
		bot.attck()

		console.log('bot attack')
		break
	}
}
	

	
	
	console.log(event.key);
});

window.addEventListener('keyup',(event)=>{
//player
	switch(event.key){
	case 'd':
		keys.d.pressed=false
		break
	case 'a':
		keys.a.pressed=false
		break

	}

//bot
	switch(event.key){
	case 'ArrowRight':
		keys.ArrowRight.pressed=false
	case 'ArrowLeft':
		keys.ArrowLeft.pressed=false
		break
	}
	
	console.log(event.key);


})

