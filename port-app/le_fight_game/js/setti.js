//attackin function
function attckin({rectan1,rectan2}){

	return(

		rectan1.attkbox.position.x + rectan1.attkbox.width >= 
		rectan2.position.x && 
		rectan1.attkbox.position.x <= rectan2.position.x + 
		rectan2.width && 
		rectan1.attkbox.position.y+rectan1.attkbox.height>= 
		rectan2.position.y &&
		rectan1.attkbox.position.y<= rectan2.position.y+rectan2.height
	)
}

//win or lose
function winrlos({player,bot,timerdi}){
	clearTimeout(timerdi)
	document.querySelector('#tied').style.display = 'flex'

	if(player.buhay === bot.buhay){
		//console.log('Its A Tie!!!!')
		document.querySelector('#tied').innerHTML='Tie!'
	}else if(player.buhay>bot.buhay){
		document.querySelector('#tied').innerHTML='Player Win!'
	}else if(player.buhay<bot.buhay){
			document.querySelector('#tied').innerHTML='Player 2 Win!'

	}

}


//timer 
let timer =60
let timerdi
function destime(){
	
	if(timer>0){
		timerdi=setTimeout(destime, 1000)
		timer--
		document.querySelector('#timerd').innerHTML=timer
	}

	if(timer==0){
		
		winrlos({player,bot,timerdi})
	}
	
}
