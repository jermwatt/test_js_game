
// detect attack colision
function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.hitBox.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.hitBox.position.x + rectangle2.hitBox.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.hitBox.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.hitBox.position.y + rectangle2.hitBox.height &&
        rectangle1.isAttacking
    )
}

// determine winner based on hit points and time limit
function determineWinner({player,enemy,timerID}){
		clearTimeout(timerID)

		document.querySelector('#displayText').style.display="flex"

		if (player.health===enemy.health){
			document.querySelector('#displayText').innerHTML="TIE"
		}
		else if (player.health > enemy.health){
			document.querySelector('#displayText').innerHTML="Player 1 wins"
		}
		else if (player.health < enemy.health){
			document.querySelector('#displayText').innerHTML="Player 2 wins"
		}

}


// timer for each match
let timer = 60
let timerID
function decreaseTimer() {
	timerID = setTimeout(decreaseTimer,1000)
	if (timer > 0) {
		timer-=1
		document.querySelector('#timer').innerHTML=timer
	}

	if (timer==0) {
		determineWinner({player,winner,timerID})
	}
}


