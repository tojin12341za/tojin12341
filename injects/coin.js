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




var styling = '<style>.selected{transform:scale(1.3)}.button{border: none; cursor:pointer;color: white; margin:10px;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;}.col-s4{width:33.33%}.bot-panel{transition: background-color 0.5s ease;}.bot-panel:hover{background-color:#141414;}</style>'

$('head').append(styling);

$('<div class="long-bet bot-panel" style="align-items: center;"><a class="button" style="background:linear-gradient(to right,#1F39A3 0%,#152772 100%);" id="martingale">MARTINGALE</a><a class="button" style="background:linear-gradient(to right,#39A31F 0%,#226112 100%);" id="auto">AUTOBET</a><a class="button" style="background:linear-gradient(to right,#891FA3 0%,#521261 100%);" id="rainbow">RAINBOW</a></div>').insertAfter('.long-bet.betting')


$('#martingale').on('click', function(){
	$('.button').hide()
	$('.bot-panel').append('<a class="button red" style="background: linear-gradient(to right,#0694F7 0%,#0DF771 100%);"></a><a class="button black" style="background:linear-gradient(to right,#DD0154 0%,#960DFE 100%);"></a><input type="number" id="bot-input" placeholder="Base bet" style="margin: 0 20px; width:150px"/><a class="button" style="background:linear-gradient(to right,#74be62 0%,#4cac35 100%);" id="start">START</a>')
	$('.button.green, .button.red, .button.black').on('click', function(){
		$('.selected').removeClass('selected')
		$(this).addClass('selected')
		if($(this).hasClass('red')){
			$chosencolor = 1;
		}else if($(this).hasClass('black')){
			$chosencolor = 2;
		}
	})
	$('#start').on('click',function(){
		$('.button, #bot-input').hide()
		martingalecoin($('#bot-input').val(),$chosencolor)
		$('.bot-panel').append('<a class="button" style="background:linear-gradient(to right,#b71c28 0%,#490b10 100%);" id="stop">STOP</a>');
		$('.coins').hide()
		$('#stop').on('click', function(){
			window.location.reload()
		})
	})
})
$('#auto').on('click', function(){
	$('.button').hide()
	$('.bot-panel').append('<a class="button red" style="background: linear-gradient(to right,#0694F7 0%,#0DF771 100%);"></a><a class="button black" style="background:linear-gradient(to right,#DD0154 0%,#960DFE 100%);"></a><input type="number" id="bot-input" placeholder="Base bet" style="margin: 0 20px; width:150px"/><a class="button" style="background:linear-gradient(to right,#74be62 0%,#4cac35 100%);" id="start">START</a>')
	$('.button.green, .button.red, .button.black').on('click', function(){
		$('.selected').removeClass('selected')
		$(this).addClass('selected')
		if($(this).hasClass('red')){
			$chosencolor = 1;
		}else if($(this).hasClass('black')){
			$chosencolor = 2;
		}
	})
	$('#start').on('click',function(){
		$('.button, #bot-input').hide()
		autocoin($('#bot-input').val(), $chosencolor)
		$('.bot-panel').append('<a class="button" style="background:linear-gradient(to right,#b71c28 0%,#490b10 100%);" id="stop">STOP</a>');
		$('.coins').hide()
		$('#stop').on('click', function(){
			window.location.reload()
		})
	})
})
$('#rainbow').on('click', function(){
	$('.button').hide()
	$('.bot-panel').append('<input type="number" id="bot-input" placeholder="Base bet" style="margin: 0 20px; width:150px"/><a class="button" style="background:linear-gradient(to right,#74be62 0%,#4cac35 100%);" id="start">START</a>')
	
	$('#start').on('click',function(){
		$('.button, #bot-input').hide()
		rainbowcoin($('#bot-input').val())
		$('.bot-panel').append('<a class="button" style="background:linear-gradient(to right,#b71c28 0%,#490b10 100%);" id="stop">STOP</a>');
		$('.coins').hide()
		$('#stop').on('click', function(){
			window.location.reload()
		})
	})
})

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
	$.notify(T('BOT RUNNING'))
	setInterval(function(){
		coinbet(amount, option)
	}, 2500)
}

function martingalecoin(amount, option){
	$.notify(T('BOT RUNNING'))
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
	$.notify(T('BOT RUNNING'))
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

