
var roundevent = new Event('newRound');
var loss = new Event('lose');
var win = new Event('win');
$firstdrawn = false;
$color = 0;
$event = window;

$base = 0;
$bet = 0;

$betcolor = 0;
$firstbet = false;


var inserthtml = '<div class="long-bet bot-panel" style=" align-items: center;"><input id="base" placeholder="BASE BET"/><a class="button" style="background:linear-gradient(to right,#1F39A3 0%,#152772 100%);" id="start">START AUTO</a></div>'

var styling = '<style>.selected{transform:scale(1.3)}.button{border: none; cursor:pointer;color: white; margin:10px;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;}.col-s4{width:33.33%}.bot-panel{transition: background-color 0.5s ease;}.bot-panel:hover{background-color:#141414;}</style>'

$('head').append(styling);
$(inserthtml).insertBefore( $( ".betting" ) );

$('#start').on('click', function(){
	$('.bot-panel').hide()
	$('<button id="stop" class="button" style="z-index:9999;top: -50%;background:linear-gradient(to right,#b71c28 0%,#490b10 100%);">STOP</button>').insertBefore( $( ".blackjack-right" ) );
	$('#stop').on('click',function(){
		window.location.reload();
	})
	autoblackjack($('#base').val())
})
	//                   2    3    4    5    6    7    8    9    10  11  
var book = [
		/* 0 */	['','H','H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H','H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'S'],
		/* 1 */	['','H','H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H','H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'S'],
		/* 2 */	['','H','H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H','H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'S'],
		/* 3 */	['','H','H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H','H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'S'],

		/* 4 */	['','H','H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H','H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'S'],
		/* 5 */	['','H','H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H','H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'S'],
		/* 6 */	['','H','H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H','H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'S'],
		/* 7 */	['','H','H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H','H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'S'],
		/* 8 */	['','H','H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H','H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'S'],
		/* 9 */	['','H','H', 'D', 'D', 'D', 'D', 'H', 'H', 'H', 'H', 'H','H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'S'],
		/*10 */	['','H','D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'H', 'H','H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'S'],
		/*11 */	['','H','D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D','S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
		/*12 */	['','H','H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H','S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
		/*13 */	['','H','S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H','S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
		/*14 */	['','H','S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H','S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
		/*15 */	['','H','S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H','S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
		/*16 */	['','H','S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H','S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
		/*17 */	['','S','S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S','S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
		/*18 */	['','S','S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S','S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
		/*19 */	['','S','S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S','S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
		/*20 */	['','S','S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S','S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
		/*21 */	['','S','S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S','S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S']
]


function blackjackinit(){
	$startblackjack = true;
	setInterval(function(){
		if(window.blackjack._stage == "deal" && $startblackjack){
			$startblackjack = false;
			$event.dispatchEvent(roundevent);
		}else if(window.blackjack._stage == "play"){
			$startblackjack = true;
		}
	},100)
}

function blackjackres(me, dealer){
	var tip = book[me][dealer];
	if(tip == 'H'){
		console.log('HIT')
		hit()
	}else if(tip == 'S'){
		console.log('STAND')
		stand()
	}else if(tip == 'D' && window.blackjack._playerCards.length == 2){
		console.log('DOUBLE-DOWN')
		double()
	}else if(tip == 'D' && window.blackjack._playerCards.length > 2){
		console.log('HIT')
		hit()
	}

}

function autoblackjack(amount){
	blackjackinit()
	$event.addEventListener('newRound', function(){
		jbet(amount)
		setTimeout(function(){
			blackjackres(window.blackjack._playerPoints, window.blackjack._dealerPoints)
					
			var betloop = setInterval(function(){
				if(window.blackjack._playerCards.length > 2 && window.blackjack._stage == "play"){
					console.log('New bet')
					blackjackres(window.blackjack._playerPoints, window.blackjack._dealerPoints)
				}else{
					console.log('Clear interval')
					clearInterval(betloop);
				}
			},2000)
		},500)
		
	})
}


function jbet(amount){
	service.socket.send({
        service: "blackjack",
        cmd: "deposit",
        amount: amount
    })
}
function stand(){
	service.socket.send({
        service: "blackjack",
        cmd: "end"
    })
}

function hit(){
	service.socket.send({
        service: "blackjack",
        cmd: "hit"
    })
}

function double(){
	service.socket.send({
        service: "blackjack",
        cmd: "double-down"
    })
}
//-----------------------------------------------------------