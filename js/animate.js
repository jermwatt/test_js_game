
//  animation function
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()



    shop.update()

    c.fillStyle='rgba(255,255,255,0.1)'
    c.fillRect(0,0,canvas.width,canvas.height)

    player.update()
    enemy.update()


    player.velocity.x = 0
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
        player.switchSprite('run')

    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
        player.switchSprite('run')
    }
    else {
            player.switchSprite('idle')
    }
    if (player.velocity.y <0){
         player.switchSprite('jump')
    }
    if (player.velocity.y >0){
         player.switchSprite('fall')
    }




    enemy.velocity.x = 0
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
        enemy.switchSprite('run')

    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
        enemy.switchSprite('run')
    }
    else {
            enemy.switchSprite('idle')
    }
    if (enemy.velocity.y <0){
         enemy.switchSprite('jump')
    }
    if (enemy.velocity.y >0){
         enemy.switchSprite('fall')
    }

    if (rectangularCollision({
            rectangle1: player,
            rectangle2: enemy
        }) &&
        player.isAttacking && player.framesCurrent===4
    ) {
        console.log('player hit enemy')
        enemy.takeHit(20)
        player.isAttacking = false
        // document.querySelector('#enemyHealth').style.width = enemy.health + '%'
        gsap.to('#enemyHealth',{
            width: enemy.health + '%'
        })
    }

    if (player.isAttacking && player.framesCurrent===4)
    {
        player.isAttacking=false
    }

    if (rectangularCollision({
            rectangle1: enemy,
            rectangle2: player
        }) &&
        enemy.isAttacking && enemy.framesCurrent===2
    ) {
        player.takeHit(10)
        enemy.isAttacking = false
        // document.querySelector('#playerHealth').style.width = player.health + '%'
        gsap.to('#playerHealth',{
            width: player.health + '%'
        })
    }

    if (enemy.isAttacking && enemy.framesCurrent===2)
    {
        enemy.isAttacking=false
    }



    if (player.health <=0 || enemy.health <=0)
    {
    	determineWinner({player,enemy,timerID})
    }
}