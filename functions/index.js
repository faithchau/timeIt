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

		const payload = {
			notification: {
				title: 'your time is up', 
				body: 'times up !'
			}
		}; 

		admin.database().ref('fcmTokens').once('value').then(allTokens=>{
			if (allTokens.val()){
				const tokens = Object.keys(allTokens.val());
				admin.messaging().sendToDevice(tokens,payload);
			}
		})
	});

	timer.start();


	//console.log ('the value is'+ event.data.val());

	return event.data.ref.parent.child('state').set ('done');

}); 
