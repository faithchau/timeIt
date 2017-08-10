const functions = require('firebase-functions');
const admin = require ('firebase-admin');

var Stopwatch = require ('timer-stopwatch')
admin.initializeApp(functions.config().firebase);



exports.countDown = functions.database.ref('/times/{timeId}/time').onCreate(event =>{

	console.log("hey this works");

	//var seconds = functions.database.ref('/time/{timeId}/seconds').val();
	//console.log('the seconds: '+seconds);
	var time = event.data.val();

	var timer = new Stopwatch(time);

	timer.onDone(function(){
		console.log('Timer is complete');

		//TODO: send notif here
	});

	timer.start();


	//console.log ('the value is'+ event.data.val());

	return event.data.ref.parent.child('state').set ('done');

}); 
