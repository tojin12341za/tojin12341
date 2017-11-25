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



var inserthtml = '<div class="long-bet bot-panel" style="justify-content: left; align-items: center;"><svg style="float:left !important; margin-left: 20px" height="35" width="35"><polyline points="7.5,12.5 17.5,25 27.5,12.5" stroke="#fff" stroke-width="3" fill="none"/></svg><h3 style="vertical-align:middle; display: inline-block">BOT-Panel</h3><svg version="1.1" xmlns="http://www.w3.org/2000/svg" id="colorsvg" style="margin-left:10px "width="26" height="30" viewbox="0 0 25.980762113533157 30" ><path id="color" d="M12.990381056766578 0L25.980762113533157 7.5L25.980762113533157 22.5L12.990381056766578 30L0 22.5L0 7.5Z"></path></svg></div><div class="long-bet roulette-tab" style="display:none"><a class="button" style="background:linear-gradient(to right,#1F39A3 0%,#152772 100%);" id="martingaleroulette">MARTINGALE</a><a class="button" style="background:linear-gradient(to right,#39A31F 0%,#226112 100%);" id="autoroulette">AUTOBET</a><a class="button" style="background:linear-gradient(to right,#891FA3 0%,#521261 100%);" id="multiroulette">GREEN+RED/BLACK</a><a class="button" style="background: linear-gradient(to right,#a31f39 0%,#28282a 100%);" id="rainbow">RAINBOW</a><a class="button" style="background: linear-gradient(to right,#B7AB1C 0%,#807713 100%);" id="random">RANDOM</a></div>'

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

$('#colorsvg').on('mouseOver', function(){
	document.getElementById('color').style.fill = "none"
})
$('#martingaleroulette').on('click', function(){
	$('#martingaleroulette, #autoroulette, #multiroulette, #random, #rainbow').hide()
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
	$('#martingaleroulette, #autoroulette, #multiroulette, #random, #rainbow').hide()
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
		onecolor($('#bot-input').val(),$chosencolor)
		$('.roulette-tab').append('<a class="button" style="background:linear-gradient(to right,#b71c28 0%,#490b10 100%);" id="stop">STOP</a>');
		$('#stop').on('click', function(){
			window.location.reload()
		})
	})
})
$('#multiroulette').on('click', function(){
	$('#martingaleroulette, #autoroulette, #multiroulette, #random, #rainbow').hide();
	$('.roulette-tab').append('<a class="button multimode" style="background:linear-gradient(to right,#1F39A3 0%,#152772 100%);" id="1">MULTI MARTINGALE</a><a class="button multimode" style="background:linear-gradient(to right,#39A31F 0%,#226112 100%);" id="2">MULTI AUTOBET</a>')
	$('.multimode').on('click', function(){
		$('.multimode').hide()
		$mode = $(this).attr('id')
		$('.roulette-tab').append('<a class="button red" style="background: linear-gradient(to right,#a31f39 0%,#750012 100%);"></a><a class="button black" style="background:linear-gradient(to right,#4b4b4b 0%,#28282a 100%);"></a><input type="number" id="bot-input" placeholder="Base bet R/B" style="margin: 0 20px; width:150px"/><input type="number" id="green-input" placeholder="Base bet GREEN" style="margin: 0 20px; width:150px"/><a class="button" style="background:linear-gradient(to right,#74be62 0%,#4cac35 100%);" id="start">START</a>')
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
			$('#bot-input').hide()
			multi($('#bot-input').val(), $('#green-input').val(), $chosencolor,  $mode)
			$('.roulette-tab').append('<a class="button" style="background:linear-gradient(to right,#b71c28 0%,#490b10 100%);" id="stop">STOP</a>');
			$('#stop').on('click', function(){
				window.location.reload()
			})
		})	
	})

})
$('#random').on('click', function(){
	$('#martingaleroulette, #autoroulette, #multiroulette, #random, #rainbow').hide()
	$('.roulette-tab').append('<a class="button randommode" style="background:linear-gradient(to right,#1F39A3 0%,#152772 100%);" id="1">RANDOM MARTINGALE</a><a class="button randommode" style="background:linear-gradient(to right,#39A31F 0%,#226112 100%);" id="2">RANDOM AUTOBET</a>')
	$('.randommode').on('click', function(){
		$('.randommode').hide()
		$mode = $(this).attr('id')
		$('.roulette-tab').append('<input type="number" id="bot-input" placeholder="Base bet" style="margin: 0 20px; width:150px"/><a class="button" style="background:linear-gradient(to right,#74be62 0%,#4cac35 100%);" id="start">START</a>')
		
		$('#start').on('click', function(){
			$(this).hide()
			$('#bot-input').hide()
			random($('#bot-input').val(), $mode)
			$('.roulette-tab').append('<a class="button" style="background:linear-gradient(to right,#b71c28 0%,#490b10 100%);" id="stop">STOP</a>');
			$('#stop').on('click', function(){
				window.location.reload()
			})
		})	
	})
	
})
$('#rainbow').on('click', function(){
	$('#martingaleroulette, #autoroulette, #multiroulette, #random, #rainbow').hide()
	$('.roulette-tab').append('<input type="number" id="bot-input" placeholder="Base bet" style="margin: 0 20px; width:150px"/><a class="button" style="background:linear-gradient(to right,#74be62 0%,#4cac35 100%);" id="start">START</a>')
	
	$('#start').on('click', function(){
		$(this).hide()
		$('#bot-input').hide()
		rainbow($('#bot-input').val())
		$('.roulette-tab').append('<a class="button" style="background:linear-gradient(to right,#b71c28 0%,#490b10 100%);" id="stop">STOP</a>');
		$('#stop').on('click', function(){
			window.location.reload()
		})
	})
})
//Roulette
//---------------------------------------------------------
function init(){
	setInterval(function(){
		if(service.roulette.color == 'red'){
			$color = 1;
			document.getElementById("color").style.fill = '#a31f39'
		}else if(service.roulette.color == 'black'){
			$color = 2;
			document.getElementById("color").style.fill = '#4b4b4b'
		}else if(service.roulette.color == 'green'){
			$color = 3;
			document.getElementById("color").style.fill = '#0e603e'
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
	$.notify(T('BOT RUNNING'))
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
	$.notify(T('BOT RUNNING'))
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
				if($mycolor == 1){
					$mycolor = 2
				}else{
					$mycolor = 1
				}
				console.log('Loss')
				$bet = $bet*2;
				bet($bet, $mycolor)
				$betcolor  = $mycolor;
			});
			$event.addEventListener('win', function () { 
				if($mycolor == 1){
					$mycolor = 2
				}else{
					$mycolor = 1
				}
				console.log('Win')
				$bet = $base;
				bet($bet, $mycolor)
				$betcolor  = $mycolor;
			});	
	}else{
		$event.addEventListener('newRound', function () { 
					

					if(!$firstbet){
						bet($bet, $mycolor)//1(red), 2(black), 3(green)
						$firstbet = true;
						$betcolor = $mycolor;
							$event.addEventListener('lose', function () {
								if($mycolor == 1){
									$mycolor = 2
								}else{
									$mycolor = 1
								}
								console.log('Loss')
								$bet = $bet*2;
								bet($bet, $mycolor)
								$betcolor  = $mycolor;

							});
							$event.addEventListener('win', function () { 
								if($mycolor == 1){
									$mycolor = 2
								}else{
									$mycolor = 1
								}
								console.log('Win')
								$bet = $base;
								bet($bet, $mycolor)
								$betcolor  = $mycolor;
							});	
						
					}
			});
	}
}

function onecolor(amount, color){
	$.notify(T('BOT RUNNING'))
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

function multi(amount1, green, color1, mode){
	$.notify(T('BOT RUNNING'))
	$amount1 = amount1;
	$amount2 = green;
	$bet1 = $amount1;
	$bet2 = $amount2;
	$color1 = color1;
	$color2 = 3;
	
	if(mode == 1){
		if(service.roulette.state == "COUNTDOWN"){
			$betcolor = color1;
			bet($amount1, $color1)
			setTimeout(function(){
						bet($bet2, $color2)	
			},250)	
			$event.addEventListener('newRound', function () { 
				if(!$firstbet){
					bet($amount1, $color1)
					setTimeout(function(){
						bet($bet2, $color2)	
					},250)	
					$firstbet = true;
				}
			});
			$event.addEventListener('lose', function () {
					console.log('Loss')
					$bet1 = $bet1*2;
					bet($bet1, $color1)
					setTimeout(function(){
						bet($bet2, $color2)	
					},250)	
					
				});
			$event.addEventListener('win', function () { 
				console.log('Win')
				$bet1 = $amount1;
				bet($bet1, $color1)
				setTimeout(function(){
						bet($bet2, $color2)	
				},250)	
			});	
		}else{
			$event.addEventListener('newRound', function () { 
				if(!$firstbet){
					$bet1 = $amount1;
					bet($bet1, $color1)
					setTimeout(function(){
						bet($bet2, $color2)	
					},250)	
					$firstbet = true;
					$betcolor = color1;
				}
			$event.addEventListener('lose', function () {
					console.log('Loss')
					$bet1 = $bet1*2;
					bet($bet1, $color1)
					setTimeout(function(){
						bet($bet2, $color2)	
					},250)	
				});
			$event.addEventListener('win', function () { 
				console.log('Win')
				$bet1 = amount1;
				bet($bet1, $color1)
				setTimeout(function(){
						bet($bet2, $color2)	
				},250)	
			});

			});
		}
	}else{
		if(service.roulette.state == "COUNTDOWN"){
			$betcolor = color1;
			bet($amount1, $color1)
			setTimeout(function(){
						bet($bet2, $color2)	
			},250)	
			$event.addEventListener('newRound', function () { 
				
					bet($amount1, $color1)
					setTimeout(function(){
						bet($bet2, $color2)	
					},250)	
					$firstbet = true;
				
			});
			
		}else{
			$event.addEventListener('newRound', function () { 
					bet($amount1, $color1)
					setTimeout(function(){
						bet($bet2, $color2)	
					},250)	
					$firstbet = true;
					$betcolor = color1;
			});
		}
	}	
}

function random(amount, mode){
	 $.notify(T('BOT RUNNING'))
	$base = amount;
	$bet = $base;
	if(mode == 1){
		if(service.roulette.state == "COUNTDOWN"){
			var num = Math.floor((Math.random() * 14)+0);
			if(num == 0){
				bet($bet, 3)
				$mycolor = 3;$betcolor = $mycolor;
			}else if(num > 7){
				bet($bet, 2)
				$mycolor = 2;$betcolor = $mycolor;
			}else if(num <= 7 && num > 0){
				bet($bet, 1)
				$mycolor = 1;$betcolor = $mycolor;
			}	
			$event.addEventListener('lose', function () {
				console.log('Loss')
				$bet = $bet*2;
				var num = Math.floor((Math.random() * 14)+0);
				if(num == 0){
					bet($bet, 3)
					$mycolor = 3;$betcolor = $mycolor;
				}else if(num > 7){
					bet($bet, 2)
					$mycolor = 2;$betcolor = $mycolor;
				}else if(num <= 7 && num > 0){
					bet($bet, 1)
					$mycolor = 1;$betcolor = $mycolor;
				}
			});
			$event.addEventListener('win', function () { 
				console.log('Win')
				$bet = $base;
				var num = Math.floor((Math.random() * 14)+0);
				if(num == 0){
					bet($bet, 3)
					$mycolor = 3;$betcolor = $mycolor;
				}else if(num > 7){
					bet($bet, 2)
					$mycolor = 2;$betcolor = $mycolor;
				}else if(num <= 7 && num > 0){
					bet($bet, 1)
					$mycolor = 1;$betcolor = $mycolor;
				}
			});	
		}else{
			$event.addEventListener('newRound', function () { 
			if(!firstbet){
			var num = Math.floor((Math.random() * 14)+0);
			if(num == 0){
				bet($bet, 3)
				$mycolor = 3;$betcolor = $mycolor;
			}else if(num > 7){
				bet($bet, 2)
				$mycolor = 2;$betcolor = $mycolor;
			}else if(num <= 7 && num > 0){
				bet($bet, 1)
				$mycolor = 1;$betcolor = $mycolor;
			}	
			}	
			});	
			$event.addEventListener('lose', function () {
					console.log('Loss')
					$bet = $bet*2;
					var num = Math.floor((Math.random() * 14)+0);
					if(num == 0){
						bet($bet, 3)
						$mycolor = 3;$betcolor = $mycolor;
					}else if(num > 7){
						bet($bet, 2)
						$mycolor = 2;$betcolor = $mycolor;
					}else if(num <= 7 && num > 0){
						bet($bet, 1)
						$mycolor = 1;$betcolor = $mycolor;
					}
				});
			$event.addEventListener('win', function () { 
				console.log('Win')
				$bet = $base;
				var num = Math.floor((Math.random() * 14)+0);
				if(num == 0){
					bet($bet, 3)
					$mycolor = 3;$betcolor = $mycolor;
				}else if(num > 7){
					bet($bet, 2)
					$mycolor = 2;$betcolor = $mycolor;
				}else if(num <= 7 && num > 0){
					bet($bet, 1)
					$mycolor = 1;$betcolor = $mycolor;
				}
			});	
		}		
	}else{
		if(service.roulette.state == "COUNTDOWN"){
			var num = Math.floor((Math.random() * 14)+0);
				if(num == 0){
					bet(amount, 3)
				}else if(num > 7){
					bet(amount, 2)
				}else if(num <= 7 && num > 0){
					bet(amount, 1)
				}
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
}

init()