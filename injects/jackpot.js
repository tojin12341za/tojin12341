
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



var inserthtml = '<div class="long-bet bot-panel" style=" align-items: center;"><input id="snipebet" placeholder="Snipe bet"/><a class="button" style="background:linear-gradient(to right,#1F39A3 0%,#152772 100%);" id="start">START SNIPE BOT</a></div>'

var styling = '<style>.selected{transform:scale(1.3)}.button{border: none; cursor:pointer;color: white; margin:10px;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;}.col-s4{width:33.33%}.bot-panel{transition: background-color 0.5s ease;}.bot-panel:hover{background-color:#141414;}</style>'

$('head').append(styling);
$(inserthtml).insertAfter( $( ".betting" ) );


$('#start').on('click',function(){
	lastminute()
	$('.bot-panel').append('<a class="button" style="background:linear-gradient(to right,#b71c28 0%,#490b10 100%);" id="stop">STOP</a>');
	$('#stop').on('click', function(){
		window.location.reload()
	})
})
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
function lastminute(){
	$.notify(T('SNIPE BOT RUNNING'))
	jackpotinit()
$event.addEventListener('newRound', function(){
	console.log('New round')
	setTimeout(function(){
		service.socket.send({
            service: "jackpot",
            cmd: "deposit",
            amount: $('#snipebet').val()
        })
	},14000)
})
}