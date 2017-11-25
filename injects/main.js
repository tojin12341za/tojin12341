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



var inserthtml = '<div class="long-bet bot-panel" style="justify-content: left; align-items: center;"><svg style="float:left !important; margin-left: 20px" height="35" width="35"><polyline points="7.5,12.5 17.5,25 27.5,12.5" stroke="#fff" stroke-width="3" fill="none"/></svg><h3 style="vertical-align:middle; display: inline-block">BOT-Panel</h3></div><div class="long-bet roulette-tab" style="display:none"><a class="button" style="background:linear-gradient(to right,#1F39A3 0%,#152772 100%);" id="martingaleroulette">MARTINGALE</a><a class="button" style="background:linear-gradient(to right,#39A31F 0%,#226112 100%);" id="autoroulette">AUTOBET</a><a class="button" style="background:linear-gradient(to right,#891FA3 0%,#521261 100%);" id="multiroulette">GREEN+RED/BLACK</a></div>'

var styling = '<style>.selected{transform:scale(1.3)}.button{border: none; cursor:pointer;color: white; margin:10px;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;}.col-s4{width:33.33%}.bot-panel{transition: background-color 0.5s ease;}.bot-panel:hover{background-color:#141414;}</style>'
$('head').append(styling);
$(inserthtml).insertAfter( $( ".betting" ) );

$('.bot-panel').on('click', function(){
	if($('.roulette-tab').is(":visible")){
		$('.roulette-tab').slideUp( "slow" );
	}else{
		$('.roulette-tab').slideDown( "slow" );
	}
	
})

$('#martingaleroulette').on('click', function(){
	$('#martingaleroulette, #autoroulette, #multiroulette').hide()
	$('.roulette-tab').append('<a class="button red" style="background: linear-gradient(to right,#a31f39 0%,#750012 100%);"></a><a class="button green" style="background:linear-gradient(to right,#0e603e 0%,#084325 100%);"></a><a class="button black" style="background:linear-gradient(to right,#4b4b4b 0%,#28282a 100%);"></a><input type="number" id="bot-input" placeholder="Base bet" style="margin: 0 20px; width:150px"/><a class="button" style="background:linear-gradient(to right,#74be62 0%,#4cac35 100%);" id="start">START</a>')
	$('.button.green, .button.red, .button.black').on('click', function(){
		$('.selected').removeClass('selected')
		$(this).addClass('selected')
		if($(this).hasClass('red')){
			$chosencolor = 1;
		}else if($(this).hasClass('black')){
			$chosencolor = 2;
		}else if($(this).hasClass('green')){
			$chosencolor = 3;
		}
		
	})
	$('#start').on('click', function(){
		$(this).hide()
		$('#bot-input, .button.green, .button.red, .button.black').hide()
		martingale($('#bot-input').val(),$chosencolor)
		$('.roulette-tab').append('<a class="button" style="background:linear-gradient(to right,#b71c28 0%,#490b10 100%);" id="stop">STOP</a>');
		$('#stop').on('click', function(){
			window.location.reload()
		})
	})
})
$('#autoroulette').on('click', function(){
	$('#martingaleroulette, #autoroulette, #multiroulette').hide()
	$('.roulette-tab').append('<input id="bot-input" placeholder="Base bet" style="margin: 0 20px; width:150px"/><a class="button" style="background:linear-gradient(to right,#74be62 0%,#4cac35 100%);" id="start">START</a>')
})
$('#multiroulette').on('click', function(){
	$('#martingaleroulette, #autoroulette, #multiroulette').hide()

})

//Roulette
//---------------------------------------------------------
function init(){
	setInterval(function(){
		if(service.roulette.color == 'red'){
			$color = 1;
		}else if(service.roulette.color == 'black'){
			$color = 2;
		}else if(service.roulette.color == 'green'){
			$color = 3;
		}

		if(service.roulette.state == 'COUNTDOWN'){
			if(!$firstdrawn){
				$firstdrawn = true;
				$event.dispatchEvent(roundevent);
			}
		}else if(service.roulette.state == 'DRAW' && $firstdrawn){
			$firstdrawn = false;
		}	
	})

	$event.addEventListener('newRound', function () { 
	console.log('New Round');
	if($betcolor == $color){
		$event.dispatchEvent(win);
	}else{
		$event.dispatchEvent(loss);
	}
	});
}

function bet(amount, color){
	if(color == 1){
		service.socket.send({
                service: "roulette",
                cmd: "deposit",
                color: "red",
                amount: amount
            })
	}else if(color == 2){
		service.socket.send({
                service: "roulette",
                cmd: "deposit",
                color: "black",
                amount: amount
            })
	}else if(color == 3){
		service.socket.send({
                service: "roulette",
                cmd: "deposit",
                color: "green",
                amount: amount
            })
	}
}

function martingale(amount, color){
	$base = amount;
	$bet = $base;
	
	if(service.roulette.state == "COUNTDOWN"){
		bet($bet, color)//1(red), 2(black), 3(green)
		$firstbet = true;
		$betcolor = color;
			$event.addEventListener('lose', function () {
				console.log('Loss')
				$bet = $bet*2;
				bet($bet, color)
			});
			$event.addEventListener('win', function () { 
				console.log('Win')
				$bet = $base;
				bet($bet, color)
			});	
	}else{
		$event.addEventListener('newRound', function () { 
					if(!$firstbet){
						bet($bet, color)//1(red), 2(black), 3(green)
						$firstbet = true;
						$betcolor = color;
							$event.addEventListener('lose', function () {
								console.log('Loss')
								$bet = $bet*2;
								bet($bet, color)
							});
							$event.addEventListener('win', function () { 
								console.log('Win')
								$bet = $base;
								bet($bet, color)
							});	
					}
			});
	}	
}

function rainbow(amount){
	$base = amount;
	$bet = $base;

	if(service.roulette.color == "red"){
		$mycolor = 2
	}else if(service.roulette.color == "black"){
		$mycolor = 1
	}else{
		$mycolor = 1
	}
	if(service.roulette.state == "COUNTDOWN"){
		bet($bet, $mycolor)//1(red), 2(black), 3(green)
		$firstbet = true;
		$betcolor = $mycolor;
			$event.addEventListener('lose', function () {
				console.log('Loss')
				$bet = $bet*2;
				bet($bet, $mycolor)
			});
			$event.addEventListener('win', function () { 
				console.log('Win')
				$bet = $base;
				bet($bet, $mycolor)
			});	
		$event.addEventListener('newRound', function () { 
		if($mycolor == 1){
			$mycolor = 2
		}else{
			$mycolor = 1
		}
	})
	}else{
		$event.addEventListener('newRound', function () { 
					

					if(!$firstbet){
						bet($bet, $mycolor)//1(red), 2(black), 3(green)
						$firstbet = true;
						$betcolor = $mycolor;
							$event.addEventListener('lose', function () {
								console.log('Loss')
								$bet = $bet*2;
								bet($bet, $mycolor)
							});
							$event.addEventListener('win', function () { 
								console.log('Win')
								$bet = $base;
								bet($bet, $mycolor)
							});	

					if($mycolor == 1){
						$mycolor = 2
					}else{
						$mycolor = 1
					}

					}
			});
	}
}

function onecolor(amount, color){
	$mycolor = color;
	$bet = amount;

	if(service.roulette.state == "COUNTDOWN"){
		bet($bet, $mycolor)
		$event.addEventListener('newRound', function () { 
			bet($bet, $mycolor)//1(red), 2(black), 3(green)

		});
	}else{
		$event.addEventListener('newRound', function () { 
				bet($bet, $mycolor)//1(red), 2(black), 3(green)

		});
	}
}

function multi(amount1, amount2, color1, color2){
	$amount1 = amount1;
	$amount2 = amount2;
	$color1 = color1;
	$color2 = color2;

	if(service.roulette.state == "COUNTDOWN"){
		bet($amount1, $color1)
		bet($amount2, $color2)
		$event.addEventListener('newRound', function () { 
			bet($amount1, $color1)
			bet($amount2, $color2)

		});
	}else{
		$event.addEventListener('newRound', function () { 
			bet($amount1, $color1)
			bet($amount2, $color2)

		});
	}	
}

function multimartingle(amount1, green, color1){
	$amount1 = amount1;
	$amount2 = green;
	$bet1 = $amount1;
	$bet2 = $amount2;
	$color1 = color1;
	$color2 = 3;
	

	if(service.roulette.state == "COUNTDOWN"){
		$mycolor = color1;
		bet($amount1, $color1)
		bet($amount2, $color2)
		$event.addEventListener('newRound', function () { 
			if(!$firstbet){
				bet($amount1, $color1)
				bet($amount2, $color2)	
				$firstbet = true;
			}
		});
		$event.addEventListener('lose', function () {
				console.log('Loss')
				$bet1 = $bet1*2;
				bet($bet1, $color1)
				bet($bet2, $color2)
			});
		$event.addEventListener('win', function () { 
			console.log('Win')
			$bet = $base;
			$bet1 = $amount1;
			bet($bet1, $color1)
			bet($bet2, $color2)
		});	
	}else{
		$event.addEventListener('newRound', function () { 
			$event.addEventListener('newRound', function () { 
			if(!$firstbet){
				bet($amount1, $color1)
				bet($amount2, $color2)	
				$firstbet = true;
				$mycolor = color1;
			}
		});
		$event.addEventListener('lose', function () {
				console.log('Loss')
				$bet1 = $bet1*2;
				bet($bet1, $color1)
				bet($bet2, $color2)
			});
		$event.addEventListener('win', function () { 
			console.log('Win')
			$bet = $base;
			$bet1 = $amount1;
			bet($bet1, $color1)
			bet($bet2, $color2)
		});

		});
	}	
}

function random(amount, mode){
	$base = amount;
	$bet = $base;
	if(mode == 1){
		$event.addEventListener('newRound', function () { 
			var num = Math.floor((Math.random() * 14)+0);
			if(num == 0){
				bet($bet, 3)
				$mycolor = 3;
			}else if(num > 7){
				bet($bet, 2)
				$mycolor = 2;
			}else if(num <= 7 && num > 0){
				bet($bet, 1)
				$mycolor = 1;
			}
		});	
		$event.addEventListener('lose', function () {
				console.log('Loss')
				$bet = $bet*2;
				var num = Math.floor((Math.random() * 14)+0);
				if(num == 0){
					bet($bet, 3)
					$mycolor = 3;
				}else if(num > 7){
					bet($bet, 2)
					$mycolor = 2;
				}else if(num <= 7 && num > 0){
					bet($bet, 1)
					$mycolor = 1;
				}
			});
		$event.addEventListener('win', function () { 
			console.log('Win')
			$bet = $base;
			var num = Math.floor((Math.random() * 14)+0);
			if(num == 0){
				bet($bet, 3)
				$mycolor = 3;
			}else if(num > 7){
				bet($bet, 2)
				$mycolor = 2;
			}else if(num <= 7 && num > 0){
				bet($bet, 1)
				$mycolor = 1;
			}
		});	
	}else{
		$event.addEventListener('newRound', function () { 
			var num = Math.floor((Math.random() * 14)+0);
			if(num == 0){
				bet(amount, 3)
			}else if(num > 7){
				bet(amount, 2)
			}else if(num <= 7 && num > 0){
				bet(amount, 1)
			}
		});	
	}
}

init()
// REMEMBER TO UN_COMMENT
//init()
//--------------------------------------------------------------

//Jackpot
//----------------------------------------------------------

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

function jackpotinit(){
	$startpot = true;
	setInterval(function(){
	if(service.jackpot.state == "DRAW"){
		$startpot = true;
	}else if(service.jackpot.state == "COUNTDOWN"){
		if($startpot){
			$event.dispatchEvent(roundevent);
			$startpot = false;
		}
	}
	})
}
//----------------------------------------------------------
function lastminute(amount){
	jackpotinit()
$event.addEventListener('newRound', function(){
	console.log('New round')
	setTimeout(function(){
		service.socket.send({
            service: "jackpot",
            cmd: "deposit",
            amount: amount
        })
	},14000)
})
}
//-----------------------------------------------------------
//Blackjack
//-----------------------------------------------------------

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


	//                   2    3    4    5    6    7    8    9    10  11  
var afterbook = [
		/* 0 */	['','H','H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H','H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'S'],
		/* 1 */	['','H','H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H','H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'S'],
		/* 2 */	['','H','H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H','H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'S'],
		/* 3 */	['','H','H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H','H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'S'],

		/* 4 */	['','H','H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H','H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'S'],
		/* 5 */	['','H','H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H','H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'S'],
		/* 6 */	['','H','H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H','H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'S'],
		/* 7 */	['','H','H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H','H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'S'],
		/* 8 */	['','H','H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H','H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'S'],
		/* 9 */	['','H','H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H','H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'S'],
		/*10 */	['','H','H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H','H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'S'],
		/*11 */	['','H','H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H','S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
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

// Coinflip
//-----------------------------------------------------------


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

function initcoin(){
	$.notify({
	// options
	message: '' 
	})
$('.notifyjs-corner').bind("DOMNodeInserted",function(e){
		e.preventDefault()
	  var text = $('span[data-notify-text]')[0].innerHTML;
		  if(text == "You lost :("){
		  	$event.dispatchEvent(loss)
		  	console.log('Dispatching loss')
		  }else if(text.indexOf("Congratulations! You won") + 1 ){
			$event.dispatchEvent(win)
			console.log('Dispatching win')
		  }else{
		  	console.log(text)
		  }
	});		
}



function coinbet(amount, option){
	service.socket.send({
	    service: "coinflip",
	    cmd: "deposit",
	    option: option,
	    amount: amount
	})
}

function autocoin(amount, option){
	setInterval(function(){
		coinbet(amount, option)
	}, 2500)
}

function martingalecoin(amount, option){
	initcoin()
	$base = amount;
	$bet = $base;
	coinbet(amount, option)
	$event.addEventListener('win',function(){
		console.log('Win')
		$bet = $base;
		coinbet($bet, option)
	})
	$event.addEventListener('lose',function(){
		console.log('Lose')
		$bet = $bet*2;
		coinbet($bet, option)
	})
}

function rainbowcoin(amount){
	initcoin()
	$choice = 1;
	coinbet(amount, $choice)
	$event.addEventListener('win',function(){
		if($choice == 1){
			$choice = 2;
			coinbet(amount, $choice)
		}else{
			$choice = 1;
			coinbet(amount, $choice)
		}
	})
	$event.addEventListener('lose',function(){
		if($choice == 1){
			$choice = 2;
			coinbet(amount, $choice)
		}else{
			$choice = 1;
			coinbet(amount, $choice)
		}
	})
}
//-----------------------------------------------------------


//DICE
//-----------------------------------------------------------

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

function dicebet(amount, option){
	service.socket.send({
	    service: "dice",
	    cmd: "deposit",
	    option: option,
	    amount: amount
	})
}

function initdice(){
	$.notify({
	// options
	message: '' 
	})
	$('.notifyjs-corner').bind("DOMNodeInserted",function(e){
		e.preventDefault()
	  var text = $('span[data-notify-text]')[0].innerHTML;
		  if(text == "You lost :("){
		  	$event.dispatchEvent(loss)
		  	console.log('Dispatching loss')
		  }else if(text.indexOf("Congratulations! You won") + 1 ){
			$event.dispatchEvent(win)
			console.log('Dispatching win')
		  }else{
		  	console.log(text)
		  }
	});		
}

function autodice(amount, option){
	setInterval(function(){
		dicebet(amount, option)
	}, 2500)
}

function martingaledice(amount, option){
	initdice()
	$base = amount;
	$bet = $base;
	dicebet(amount, option)
	$event.addEventListener('win',function(){
		console.log('Win')
		$bet = $base;
		dicebet($bet, option)
	})
	$event.addEventListener('lose',function(){
		console.log('Lose')
		$bet = $bet*2;
		dicebet($bet, option)
	})
}
//-----------------------------------------------------------
//Ready to load