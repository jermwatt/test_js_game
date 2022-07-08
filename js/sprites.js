
// create background sprite
const background = new Sprite({
	position: {
				x:0,
				y:0
			},
	imgSrc:'./img/background.png'
})

// create shop sprite
const shop = new Sprite({
	position: {
				x:600,
				y:128
			},
	imgSrc:'./img/shop.png',
	scale: 2.75,
	framesMax:6
})

// create player 1 sprite
const player = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'red',
    imgSrc:'./img/samuraiMack/Idle.png',
    framesMax:8,
    scale:2.5,
    offset:{
            x: 100,
            y:155
         },
    sprites:{
        idle:{
            imgSrc:'./img/samuraiMack/Idle.png',
            framesMax:8
        },
        run:{
            imgSrc:'./img/samuraiMack/Run.png',
            framesMax:8
        },
        jump:{
            imgSrc:'./img/samuraiMack/Jump.png',
            framesMax:2
        },
        fall:{
            imgSrc:'./img/samuraiMack/Fall.png',
            framesMax:2
        },
        attack1:{
            imgSrc:'./img/samuraiMack/Attack1.png',
            framesMax:6
        },
        takeHit:{
            imgSrc:'./img/samuraiMack/Take Hit - white silhouette.png',
            framesMax:4
        },
        death:{
            imgSrc:'./img/samuraiMack/Death.png',
            framesMax:6
        }
    },
    attackBox:{
        offset: {
            x:-200,
            y:-50
        },
        width:140,
        height:50
    },
    hitBox:{
        offset: {
            x:-120,
            y:-30
        },
        width:60,
        height:120
    }
});

// create player 2 sprite
const enemy = new Fighter({
    position: {
        x: 350,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    offset: {
        x: 50,
        y: 0
    },
    imgSrc:'./img/kenji/Idle.png',
    framesMax:8,
    scale:2.5,
    offset:{x: -300, y:170},
    sprites:{
        idle:{
            imgSrc:'./img/kenji/Idle.png',
            framesMax:4
        },
        run:{
            imgSrc:'./img/kenji/Run.png',
            framesMax:8
        },
        jump:{
            imgSrc:'./img/kenji/Jump.png',
            framesMax:2
        },
        fall:{
            imgSrc:'./img/kenji/Fall.png',
            framesMax:2
        },
        attack1:{
            imgSrc:'./img/kenji/Attack1.png',
            framesMax:4
        },
        takeHit:{
            imgSrc:'./img/kenji/Take Hit.png',
            framesMax:3
        },
        death:{
            imgSrc:'./img/kenji/Death.png',
            framesMax:7
        }
    },
    attackBox:{
        offset: {
            x:-350,
            y:-50
        },
        width:140,
        height:50
    },
    hitBox:{
        offset: {
            x:-510,
            y:-30
        },
        width:50,
        height:120
    }
});
