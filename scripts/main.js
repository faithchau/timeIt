/**--window.onload = function(){
	window.timeIt = new TimeIt(); 
}


function TimeIt(){
	this.initFirebase();
}


TimeIt.prototype.initFirebase = function(){
	this.database = firebase.database();
	this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
}

TimeIt.prototype.saveTime = function(e){
	e.preventDefault();


}--**/


function startIt(){
	//console.log(document.getElementById("min").value+" "
		//+document.getElementById("sec").value);

	//console.log ("hi this works!");
	var min = document.getElementById("min").value;
	var sec = document.getElementById("sec").value; 


	firebase.database().ref('time').push({
		minutes: min,
		seconds: sec 
	}).catch(function(error){
		console.error("Error writing to FB", error);
	});

	
}