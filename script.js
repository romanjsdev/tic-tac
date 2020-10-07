$(function(){

	let arr = [];
	startNewGame();

	function startNewGame(){
		arr = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
		$('.header').text('players move...');
		$('.cell').bind( "click", clickCell );
		render(arr);
		if(!localStorage.winrate){
			localStorage.winrate = JSON.stringify({win:0, lose:0, draw:0});
		}
		getWinrate();
		$('.cell').removeClass('winCell');

	}
	
	function render(array){
		array.forEach((i)=>{
			$('.cell').text((i,text)=>{
				return text = array[i];
			})
		})
	}

	function getWinrate(){
		let winrate = JSON.parse(localStorage.winrate);
		let win = Math.round(winrate.win/(winrate.win+winrate.draw+winrate.lose)*100);
		let lose = Math.round(winrate.lose/(winrate.win+winrate.draw+winrate.lose)*100)
		$('#win').text(win+'%');
		$('#draw').text(100-(win+lose)+'%');
		$('#lose').text(lose+'%');
	}

	function ligthWinCells(array){
		$('.cell').addClass((index,currentClass)=>{
			for (let i=1; i <array.length; i++) {
				if(index==array[i]){
					return 'winCell';
				}
			}
		})
	}

	function getEmptyCells(array) {
		let emptyCells = [];
		let idx = array.indexOf(' ');
		while (idx != -1) {
		  emptyCells.push(idx);
		  idx = array.indexOf(' ', idx + 1);
		}
		return emptyCells;
	}

	function generateRandomEmptyCells(emptyCellsArray) {
		return Math.round(Math.random()*(emptyCellsArray.length-1));
	}

	function computerMove(array){
		let emptyCells = getEmptyCells(array);
		if(emptyCells.length!=0) {
			let rdm = emptyCells[generateRandomEmptyCells(emptyCells)];
			array[rdm] = 'O';
			return array;
		}
		else{
			console.log('game over');
			return array;
		}
	}

	function getWinner(arr){
		let emptyCells = getEmptyCells(arr);

		if(arr[0]===arr[1]&&arr[0]===arr[2]&&arr[0]!=' '){
			let array = [arr[0],0,1,2];
			return array;
		}
		else if(arr[3]===arr[4]&&arr[4]===arr[5]&&arr[5]!=' '){
			let array = [arr[3],3,4,5];
			return array;
		}
		else if(arr[6]===arr[7]&&arr[7]===arr[8]&&arr[8]!=' '){
			let array = [arr[6],6,7,8];
			return array;
		}
		else if(arr[0]===arr[3]&&arr[6]===arr[0]&&arr[6]!=' '){
			let array = [arr[0],0,3,6];
			return array;
		}
		else if(arr[1]===arr[4]&&arr[7]===arr[1]&&arr[7]!=' '){
			let array = [arr[1],4,7,1];
			return array;
		}
		else if(arr[2]===arr[5]&&arr[8]===arr[2]&&arr[2]!=' '){
			let array = [arr[2],2,5,8];
			return array;
		}
		else if(arr[0]===arr[4]&&arr[0]===arr[8]&&arr[8]!=' '){
			let array = [arr[0],4,0,8];
			return array;
		}
		else if(arr[2]===arr[4]&&arr[4]===arr[6]&&arr[6]!=' '){
			let array = [arr[2],2,4,6];
			return array;
		}
		else if(emptyCells.length==0){
			return 'draw';
		}
		else {
			return false;
		}
	}

    function nextMove(cell){
    	if (cell.textContent==' ') {
	    	if(!getWinner(arr)){
				arr[cell.dataset.value]='X';
				$('.cell').unbind( "click", clickCell );
				$('.header').text('computer move...');
				render(arr);
			}
			if (!getWinner(arr)) {
				setTimeout(()=>{
					render(computerMove(arr));
					$('.cell').bind( "click", clickCell );
					$('.header').text('players move...');
				},500);
			}
			setTimeout(()=>{
				let array = getWinner(arr);
				if(array[0]=='X') {
					$('.header').text('player win!');
					let winrate = JSON.parse(localStorage.winrate);
					localStorage.winrate = JSON.stringify({win: winrate.win+1,lose:winrate.lose, draw:winrate.draw});
					getWinrate();
					ligthWinCells(array);
				}
				if(array[0]=='O'){
					$('.header').text('computer win!');
					let winrate = JSON.parse(localStorage.winrate);
					localStorage.winrate = JSON.stringify({win: winrate.win,lose:winrate.lose+1, draw:winrate.draw});
					getWinrate();
					ligthWinCells(array);

				}
				if (array=='draw') {
					$('.header').text('draw');
					let winrate = JSON.parse(localStorage.winrate);
					localStorage.winrate = JSON.stringify({win: winrate.win,lose:winrate.lose, draw:winrate.draw+1});
					getWinrate();
				}
			},501);
		}
    }

	function clickCell (e) {
		nextMove(e.currentTarget);
	};

	$('.newGameButton').click(function(){
		startNewGame();
	});
})