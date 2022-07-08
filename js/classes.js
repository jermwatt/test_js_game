// background sprite
class Sprite {
    constructor({ position, imgSrc, scale = 1, framesMax = 1, offset ={x:0,y:0}}) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imgSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.offset=offset
    }

    animateFrames(){
        this.framesElapsed++

        if (this.framesElapsed % this.framesHold === 0)
        {
            if (this.framesCurrent < this.framesMax - 1){
                this.framesCurrent++
            }
            else {
                this.framesCurrent = 0
            }
        }
    }

    draw() {
        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width/this.framesMax), 
            0,
            this.image.width/this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width/this.framesMax) *this.scale,
            this.image.height*this.scale
            )
    }

    update() {
        this.draw()
        this.animateFrames()
    }
}



class Fighter extends Sprite {
    constructor({ position, velocity, color, offset, imgSrc, scale = 1, framesMax = 1, sprites, attackBox={offset:{},width:undefined,height:undefined}, hitBox={offset:{},width:undefined,height:undefined}  }) {
        super({
            position,
            imgSrc,
            scale,
            framesMax,
            offset
        })
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.color = color
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }
        this.hitBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: hitBox.offset,
            width: hitBox.width,
            height: hitBox.height
        }
        this.isAttacking
        this.health = 100
        this.gravity=0.7

        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.sprites=sprites
        this.dead=false

        for (const sprite in this.sprites) {
            this.sprites[sprite].image = new Image()
            this.sprites[sprite].image.src = this.sprites[sprite].imgSrc
        }
    }

    // draw() {
    //     // draw agent
    //     c.fillStyle = this.color
    //     c.fillRect(this.position.x, this.position.y, this.width, this.height)

    //     if (this.isAttacking) {
    //         // draw attackBox
    //         c.fillStyle = 'green'
    //         c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    //     }
    // }

    update() {
        this.draw()
        this.attackBox.position.x = this.position.x - this.attackBox.offset.x
        this.attackBox.position.y = this.position.y - this.attackBox.offset.y
        this.hitBox.position.x = this.position.x - this.hitBox.offset.x
        this.hitBox.position.y = this.position.y - this.hitBox.offset.y
        // attackBox
        // c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        // c.fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height)

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.velocity.y + this.height >= canvas.height - 96) {
            this.velocity.y = 0
            this.position.y = 330
        } else {
            this.velocity.y += this.gravity
        }

        if (!this.dead) this.animateFrames()
    }

    takeHit(damage){
        this.health -= damage
        console.log(this.health)

        if (this.health <= 0){
            this.switchSprite('death')
        }
        else{
            this.switchSprite('takeHit')
        }
    }

    attack() {
        this.switchSprite('attack1')
        this.isAttacking = true
    }

    switchSprite(sprite) {
        // override all animations with attack
        if (this.image === this.sprites.attack1.image && this.framesCurrent < this.sprites.attack1.framesMax-1) return
        
        // override all animations with get hit
        if (this.image === this.sprites.takeHit.image && this.framesCurrent < this.sprites.takeHit.framesMax-1) return

        // override all aniations with death
        if (this.image === this.sprites.death.image)
        {
            if (this.framesCurrent === this.sprites.death.framesMax-1) 
            {   
                this.dead=true
            }
            return 
        }
        switch(sprite){
            case 'idle':
                if (this.image != this.sprites.idle.image){
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                    this.framesCurrent=0
                }
                break
            case 'run':
                if (this.image != this.sprites.run.image){
                    this.image=this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                    this.framesCurrent=0
                }
                break
            case 'jump':
                if (this.image != this.sprites.jump.image){
                    this.image=this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                    this.framesCurrent=0
                }
                break         
            case 'fall':
                if (this.image != this.sprites.fall.image){
                    this.image=this.sprites.fall.image
                    this.framesMax = this.sprites.fall.framesMax
                    this.framesCurrent=0
                }
                break      
            case 'attack1':
                if (this.image != this.sprites.attack1.image){
                    this.image=this.sprites.attack1.image
                    this.framesMax = this.sprites.attack1.framesMax
                    this.framesCurrent=0
                }
                break      
            case 'takeHit':
                if (this.image != this.sprites.takeHit.image){
                    this.image=this.sprites.takeHit.image
                    this.framesMax = this.sprites.takeHit.framesMax
                    this.framesCurrent=0
                }
                break      
            case 'death':
                if (this.image != this.sprites.death.image){
                    this.image=this.sprites.death.image
                    this.framesMax = this.sprites.death.framesMax
                    this.framesCurrent=0
                }
                break   
        }

    }
}