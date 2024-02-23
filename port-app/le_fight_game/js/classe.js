//sprites
class animer{
	constructor({
		position, imageSrc,scale=1,
		spritenu = 1,offset={x:0,y:0}
	}) {
		this.position=position
		this.height =150
		this.width=60
		this.image= new Image()
		this.image.src=imageSrc
		this.scale=scale
		this.spritenu=spritenu
		//frame current
		this.spritest =0
//sprite speed
		this.spritelap=0
		this.spritehold=5
		
		this.offset=offset
	}
//draw & img 8 sprite, crop
	look(){
		ca.drawImage(
			this.image,
			this.spritest*(this.image.width/this.spritenu),
			0,
			this.image.width/this.spritenu,
			this.image.height, 
			this.position.x - this.offset.x,
			this.position.y - this.offset.y,
			(this.image.width/this.spritenu) * this.scale,
			this.image.height * this.scale
			)
	}

//sprite control
	spritemove(){

		this.spritelap++

		if(this.spritelap % this.spritehold===0){
			if(this.spritest < this.spritenu -1){
				this.spritest++
			}else{
				this.spritest=0
			}
		}

	}

	update(){

		this.look()


		this.spritemove()		
	}


}


//players & chararater
class playes extends animer{
	constructor({
		position,
		velocity, 
		color='blue',
		imageSrc,
		scale=1,
		spritenu = 1,
		offset={x: 0, y: 0},
		nsprite,
		attkbox={offset:{},width:undefined,height:undefined}
	}){
		super({
			position,
			imageSrc,
			scale,
			spritenu,
			offset
		})

	this.velocity=velocity
	this.width=50
	this.height =150
	this.lastp
	this.attkbox = {
		position: {
			x:this.position.x,
			y:this.position.y
		},
		offset: attkbox.offset,
		width: attkbox.width,
		height: attkbox.height
	}
	this.color=color
	this.sordattk
	this.buhay=100

//charac speed
	this.spritest =0
	this.spritelap=0
	this.spritehold=6

	this.deds =false

	//character sprite
	this.nsprite=nsprite
	for (const sprite in this.nsprite){
		nsprite[sprite].image = new Image()
		nsprite[sprite].image.src = nsprite[sprite].imageSrc
		}

	  console.log(this.nsprite)

	}


//
	update(){

		this.look()

		this.spritemove()

		if (this.deds)this.animer()

//hit position
		//bot
		this.attkbox.position.x = this.position.x + this.attkbox.offset.x
		//player
		this.attkbox.position.y = this.position.y + this.attkbox.offset.y

		//attack location viewer
		/*ca.fillRect(this.attkbox.position.x, this.attkbox.position.y,
			this.attkbox.width, this.attkbox.height)*/

		//moves 
		//this.velocity.y += fall
		this.position.x += this.velocity.x
		this.position.y += this.velocity.y

		//gravity 
		if(this.position.y + this.height + this.velocity.y >=
			canvas.height-6) {
			this.velocity.y= 0
			this.position.y= 420
		}else this.velocity.y +=fall
		//console.log(this.position.y)
	}

//attack function
	attck(){
		this.swapsprite('attk')

		this.sordattk=true

		/*setTimeout(()=>{
			this.sordattk=false
		}, 1000)
		*/

	}

	hittake(){
		
		//this.buhay -=5

		//deads & take hit
		if(this.buhay<=0){
			this.swapsprite('deds')
		}else this.swapsprite('hittake')
	}

	swapsprite(sprite){
		//overdrive sprite

		//deads
		if(this.image === this.nsprite.deds.image) {
			if(this.spritest=== this.nsprite.deds.spritenu-1)this.deds=true
			return}

		//attck
		if (
			this.image === this.nsprite.attk.image &&
			this.spritest < this.nsprite.attk.spritenu-1
			)
			return

		//hit take
		if(this.image === this.nsprite.hittake.image && 
			this.spritest < this.nsprite.hittake.spritenu-1
			)
			return

		switch(sprite){
			case 'idle':
				if (this.image !== this.nsprite.idle.image){
					this.image=this.nsprite.idle.image
					this.spritenu=this.nsprite.idle.spritenu
					//this.spritest =0
				}
				break
			case 'run':
				if (this.image !== this.nsprite.run.image){
					this.image=this.nsprite.run.image
					this.spritenu=this.nsprite.run.spritenu
					//this.spritest =0
				}
				break
			case 'jump':
				if(this.image !== this.nsprite.jump.image){
					this.image=this.nsprite.jump.image
					this.spritenu=this.nsprite.jump.spritenu
					//this.spritest =0
				}
				break
			case 'fall':
				if (this.image !== this.nsprite.fall.image){
					this.image=this.nsprite.fall.image
					this.spritenu=this.nsprite.fall.spritenu
					//this.spritest =0
				}
				break
			case 'attk':
				if (this.image !== this.nsprite.attk.image){
					this.image=this.nsprite.attk.image
					this.spritenu=this.nsprite.attk.spritenu
					this.spritest =0
				}
				break
			case 'hittake':
				if (this.image !== this.nsprite.hittake.image){
					this.image=this.nsprite.hittake.image
					this.spritenu=this.nsprite.hittake.spritenu
					this.spritest =0
				}
				break
			case 'deds':
				if (this.image !== this.nsprite.deds.image){
					this.image=this.nsprite.deds.image
					this.spritenu=this.nsprite.deds.spritenu
					this.spritest =0
				}
				break
		}

	}



}

