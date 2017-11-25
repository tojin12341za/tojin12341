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






var styling = '<style>.selected{transform:scale(1.3)}.button{border: none; cursor:pointer;color: white; margin:10px;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;}.col-s4{width:33.33%}.bot-panel{transition: background-color 0.5s ease;}.bot-panel:hover{background-color:#141414;}</style>'

$('head').append(styling);

$('<div class="long-bet bot-panel" style="align-items: center;"><a class="button" style="background:linear-gradient(to right,#1F39A3 0%,#152772 100%);" id="martingale">MARTINGALE</a><a class="button" style="background:linear-gradient(to right,#39A31F 0%,#226112 100%);" id="auto">AUTOBET</a></div>').insertAfter('.long-bet.betting')



$('#martingale').on('click', function(){
	$('.button').hide()
	$('.bot-panel').append('<input id="mode" placeholder="low/high/1-6" style="margin: 0 20px; width:150px"/><input type="number" id="bot-input" placeholder="Base bet" style="margin: 0 20px; width:150px"/><a class="button" style="background:linear-gradient(to right,#74be62 0%,#4cac35 100%);" id="start">START</a>')
	$('#start').on('click',function(){

		if($('#mode').val() == '1'){
			$('.button, #bot-input, #mode').hide()
			martingaledice($('#bot-input').val(), 1)
			$('.bot-panel').append('<a class="button" style="background:linear-gradient(to right,#b71c28 0%,#490b10 100%);" id="stop">STOP</a>');
			$('#stop').on('click', function(){
				window.location.reload()
			})
		}else if($('#mode').val() == '2'){
			$('.button, #bot-input, #mode').hide()
			martingaledice($('#bot-input').val(), 2)
			$('.bot-panel').append('<a class="button" style="background:linear-gradient(to right,#b71c28 0%,#490b10 100%);" id="stop">STOP</a>');
			$('#stop').on('click', function(){
				window.location.reload()
			})
		}else if($('#mode').val() == '3'){
			$('.button, #bot-input, #mode').hide()
			martingaledice($('#bot-input').val(), 3)
			$('.bot-panel').append('<a class="button" style="background:linear-gradient(to right,#b71c28 0%,#490b10 100%);" id="stop">STOP</a>');
			$('#stop').on('click', function(){
				window.location.reload()
			})
		}else if($('#mode').val() == '4'){
			$('.button, #bot-input, #mode').hide()
			martingaledice($('#bot-input').val(), 4)
			$('.bot-panel').append('<a class="button" style="background:linear-gradient(to right,#b71c28 0%,#490b10 100%);" id="stop">STOP</a>');
			$('#stop').on('click', function(){
				window.location.reload()
			})
		}else if($('#mode').val() == '5'){
			$('.button, #bot-input, #mode').hide()
			martingaledice($('#bot-input').val(), 5)
			$('.bot-panel').append('<a class="button" style="background:linear-gradient(to right,#b71c28 0%,#490b10 100%);" id="stop">STOP</a>');
			$('#stop').on('click', function(){
				window.location.reload()
			})
		}else if($('#mode').val() == '6'){
			$('.button, #bot-input, #mode').hide()
			martingaledice($('#bot-input').val(), 6)
			$('.bot-panel').append('<a class="button" style="background:linear-gradient(to right,#b71c28 0%,#490b10 100%);" id="stop">STOP</a>');
			$('#stop').on('click', function(){
				window.location.reload()
			})
		}else if($('#mode').val() == 'low'){
			$('.button, #bot-input, #mode').hide()
			martingaledice($('#bot-input').val(), "low")
			$('.bot-panel').append('<a class="button" style="background:linear-gradient(to right,#b71c28 0%,#490b10 100%);" id="stop">STOP</a>');
			$('#stop').on('click', function(){
				window.location.reload()
			})
		}else if($('#mode').val() == 'high'){
			$('.button, #bot-input, #mode').hide()
			martingaledice($('#bot-input').val(), "high")
			$('.bot-panel').append('<a class="button" style="background:linear-gradient(to right,#b71c28 0%,#490b10 100%);" id="stop">STOP</a>');
			$('#stop').on('click', function(){
				window.location.reload()
			})
		}else{
			$.notify(T('Wrong Mode choice'))
			$.notify(T('Needs to be: 1-6/low/high'))
		}
		
	})
})
$('#auto').on('click', function(){
	$('.button').hide()
	$('.bot-panel').append('<input  id="mode" placeholder="low/high/1-6" style="margin: 0 20px; width:150px"/><input type="number" id="bot-input" placeholder="Base bet" style="margin: 0 20px; width:150px"/><a class="button" style="background:linear-gradient(to right,#74be62 0%,#4cac35 100%);" id="start">START</a>')
	$('#start').on('click',function(){

		if($('#mode').val() == '1'){
			$('.button, #bot-input, #mode').hide()
			autodice($('#bot-input').val(), 1)
			$('.bot-panel').append('<a class="button" style="background:linear-gradient(to right,#b71c28 0%,#490b10 100%);" id="stop">STOP</a>');
			$('#stop').on('click', function(){
				window.location.reload()
			})
		}else if($('#mode').val() == '2'){
			$('.button, #bot-input, #mode').hide()
			autodice($('#bot-input').val(), 2)
			$('.bot-panel').append('<a class="button" style="background:linear-gradient(to right,#b71c28 0%,#490b10 100%);" id="stop">STOP</a>');
			$('#stop').on('click', function(){
				window.location.reload()
			})
		}else if($('#mode').val() == '3'){
			$('.button, #bot-input, #mode').hide()
			autodice($('#bot-input').val(), 3)
			$('.bot-panel').append('<a class="button" style="background:linear-gradient(to right,#b71c28 0%,#490b10 100%);" id="stop">STOP</a>');
			$('#stop').on('click', function(){
				window.location.reload()
			})
		}else if($('#mode').val() == '4'){
			$('.button, #bot-input, #mode').hide()
			autodice($('#bot-input').val(), 4)
			$('.bot-panel').append('<a class="button" style="background:linear-gradient(to right,#b71c28 0%,#490b10 100%);" id="stop">STOP</a>');
			$('#stop').on('click', function(){
				window.location.reload()
			})
		}else if($('#mode').val() == '5'){
			$('.button, #bot-input, #mode').hide()
			autodice($('#bot-input').val(), 5)
			$('.bot-panel').append('<a class="button" style="background:linear-gradient(to right,#b71c28 0%,#490b10 100%);" id="stop">STOP</a>');
			$('#stop').on('click', function(){
				window.location.reload()
			})
		}else if($('#mode').val() == '6'){
			$('.button, #bot-input, #mode').hide()
			autodice($('#bot-input').val(), 6)
			$('.bot-panel').append('<a class="button" style="background:linear-gradient(to right,#b71c28 0%,#490b10 100%);" id="stop">STOP</a>');
			$('#stop').on('click', function(){
				window.location.reload()
			})
		}else if($('#mode').val() == 'low'){
			$('.button, #bot-input, #mode').hide()
			autodice($('#bot-input').val(), "low")
			$('.bot-panel').append('<a class="button" style="background:linear-gradient(to right,#b71c28 0%,#490b10 100%);" id="stop">STOP</a>');
			$('#stop').on('click', function(){
				window.location.reload()
			})
		}else if($('#mode').val() == 'high'){
			$('.button, #bot-input, #mode').hide()
			autodice($('#bot-input').val(), "high")
			$('.bot-panel').append('<a class="button" style="background:linear-gradient(to right,#b71c28 0%,#490b10 100%);" id="stop">STOP</a>');
			$('#stop').on('click', function(){
				window.location.reload()
			})
		}else{
			$.notify(T('Wrong Mode choice'))
			$.notify(T('Needs to be: 1-6/low/high'))
		}
		
	})
})

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