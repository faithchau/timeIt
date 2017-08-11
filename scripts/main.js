

/**

TimeIt.prototype.saveTime = function(e){
	e.preventDefault();
}



function initFirebase (){
	this.auth = firebase.auth();
	this.database = firebase.database();
	this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
}

-**/
function TimeIt(){
	//initFirebase();

	var deviceToken; 
}


function startIt(){
	//console.log(document.getElementById("min").value+" "
		//+document.getElementById("sec").value);

	//console.log ("hi this works!");

	//get time input
	var min = document.getElementById("min").value;
	var sec = document.getElementById("sec").value; 

	//convert to ms
	var time = (min * 60000) + (sec * 1000); 


	var userName = firebase.auth().currentUser.displayName; 

	//push to firebase database
	firebase.database().ref('times').push({
		time: time, 
		fcmtoken: deviceToken,
		user: userName || 'Hey there!'
	}).catch(function(error){
		console.error("Error writing to FB", error);
	});

};

function saveMessagingDeviceToken (){
		firebase.messaging().getToken().then(function(currentToken){
		if(currentToken){
			console.log ('got FCM device token', currentToken);
			//firebase.database().ref('/fcmTokens').child(currentToken).set(firebase.auth().currentUser.uid);
			this.deviceToken = currentToken;  
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


function signIn(){
	console.log('user is signning in');

	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function(result){
		document.getElementById("username").innerHTML = result.user.displayName; 
		document.getElementById("username").removeAttribute('hidden');
		document.getElementById("signOut").removeAttribute('hidden');
		document.getElementById("signIn").setAttribute('hidden', true);

		saveMessagingDeviceToken();
		
	}).catch (function(error){
		console.error("user sign in unsuccessful", error);
	}); 
};

function signOut (){
	console.log('user is signning out');

	firebase.auth().signOut().then(function(){
		console.log('user signed out successful');
		document.getElementById("username").setAttribute('hidden', true);
		document.getElementById("signOut").setAttribute('hidden', true);
		document.getElementById("signIn").removeAttribute('hidden');
	}).catch(function(error){
		console.error ("user sign out unsuccessful", error);
	});
};


window.onload = function(){
	window.timeIt = new TimeIt(); 
}




	
