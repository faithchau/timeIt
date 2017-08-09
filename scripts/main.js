

/**

TimeIt.prototype.saveTime = function(e){
	e.preventDefault();
}


function TimeIt(){
	this.initFirebase();
}

TimeIt.prototype.initFirebase = function(){
	this.database = firebase.database();
	//this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
}

window.onload = function(){
	window.timeIt = new TimeIt(); 
}-**/

function startIt(){
	//console.log(document.getElementById("min").value+" "
		//+document.getElementById("sec").value);

	//console.log ("hi this works!");

	//get time input
	var min = document.getElementById("min").value;
	var sec = document.getElementById("sec").value; 

	//convert to ms
	var time = (min * 60000) + (sec * 1000); 


	//push to firebase database
	firebase.database().ref('times').push({
		time: time
	}).catch(function(error){
		console.error("Error writing to FB", error);
	});

	saveMessagingDeviceToken();

	};

//save device token to database
function saveMessagingDeviceToken (){
		firebase.messaging().getToken().then(function(currentToken){
		if(currentToken){
			console.log ('got FCM device token', currentToken);
			firebase.database().ref('/fcmTokens').child(currentToken).set("hey this works");
		}else{
			requestNotificationsPermissions();
		}

		}.bind(this)).catch(function(error){
			console.error("unable to get messaging token", error);
		});
	};

//request for permission popup
function requestNotificationsPermissions(){
	console.log('request Notifications Permissions...');
	firebase.messaging().requestPermission().then(function(){
		this.saveMessagingDeviceToken();
	}.bind(this)).catch(function(error){
		console.error('unbale to get Permissions to notify', error);
	});
	
};



	
