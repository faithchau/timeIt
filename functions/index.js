const functions = require('firebase-functions');
const admin = require ('firebase-admin');

var Stopwatch = require ('timer-stopwatch')
admin.initializeApp(functions.config().firebase);



exports.countDown = functions.database.ref('/times/{timeId}').onCreate(event =>{

	console.log("hey this works");

	const snapshot = event.data;

	var time = snapshot.val().time;

	//console.log(time);

	var name = snapshot.val().user; 

	var token = snapshot.val().fcmtoken; 

	var timer = new Stopwatch(time);
	
	timer.onDone(function(){
		console.log('Timer is complete');

		const payload = {
			notification: {
				title: name +', your time is up', 
				body: 'times up !'
			}
		}; 

	admin.messaging().sendToDevice(token,payload);

		
	});

	timer.start();


	//console.log ('the value is'+ event.data.val());

	return snapshot.ref.child('state').set ('done');

}); 
