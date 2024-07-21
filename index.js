// Variables for buttons 

const playBtn = document.querySelector(".startStopBtn");
const lapBtn = document.querySelector(".lapBtn");
const resetBtn =document.querySelector(".resetBtn");

//  Variables for time values

let seconds = 0;
let minutes = 0;
let hours = 0;

// Variables for leading zeros

let leadingMinutes = 0;
let leadingHours = 0;

// Variables for set intervals ans status

let timerInterval = null;
let timerStatus = "stopped";

// Variables for lap time

const laps = document.querySelector(".laps");
const clearLapsBtn = document.querySelector(".lap-clear-btn"); 
let lapItem = 0;

// Variables for animation

const bg = document.querySelector(".circle");


// Toggle button function

const toggleBtn = () => {
	lapBtn.classList.remove("hidden");
	resetBtn.classList.remove("hidden");
	clearLapsBtn.classList.remove("hidden");
}

// StopWatch function 

function stopWatch() {
	seconds++
	if(seconds/100 ===1){
		seconds = 0;
		minutes++;

		if(minutes/60 ===1){
			minutes = 0;
			hours++;
		}
	}

	if(minutes < 10) {
		leadingMinutes = "0" + minutes.toString();
	}
	else{
		leadingMinutes = minutes;
	}
	if(hours < 10) {
		leadingHours = "0" + hours.toString();
	}
	else{
		leadingHours = hours;
	}

	let displayTimer = document.getElementById('timer').innerText = leadingHours + ":" + leadingMinutes + ":" + seconds;
}

// Event Listeners of buttons

// Play Pause Button

playBtn.addEventListener("click", function() {

	if(timerStatus === "stopped"){
		bg.classList.add("animation-bg");
		timerInterval = window.setInterval(stopWatch, 10);
		document.getElementById("play").innerHTML = '<i class="fa-solid fa-pause"></i>';
		timerStatus = "started";
	}
	else{
		bg.classList.remove("animation-bg");
		window.clearInterval(timerInterval);
		document.getElementById("play").innerHTML = '<i class="fa-solid fa-play"></i>';
		timerStatus = "stopped";
	}
	toggleBtn();
});

// Reset Button

resetBtn.addEventListener("click", function(){
	window.clearInterval(timerInterval);
	seconds = 0;
	minutes = 0;
	hours = 0;
	document.getElementById("timer").innerHTML = "00:00:00";
	document.getElementById("play").innerHTML = '<i class="fa-solid fa-play"></i>';
	timerStatus = "stopped";
	lapBtn.classList.add("hidden");
	resetBtn.classList.add("hidden");
	clearLapsBtn.classList.add("hidden");
	bg.classList.remove("animation-bg");
	laps.innerHTML = '';
	laps.append(clearLapsBtn);
	lapItem = 0;
});

// Lap Button

lapBtn.addEventListener("click", function() {
	const li = document.createElement("li");
	const number = document.createElement("span");
	const timeStamp = document.createElement("span");

	li.setAttribute("class", "lap-item");
	number.setAttribute("class", "number");
	timeStamp.setAttribute("class", "time-stamp");
	lapItem++
	timeStamp.innerText = "#" + lapItem  + " " + leadingHours + ":" + leadingMinutes + ":" + seconds;
	li.append(number, timeStamp);
	laps.append(li);
});

// Lap Clear All Button

clearLapsBtn.addEventListener("click", function() {
	laps.innerHTML = '';
	laps.append(clearLapsBtn);
	lapItem = 0;
});