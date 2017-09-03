function TimeIt(){
	var deviceToken; 

	firebase.messaging().onMessage(function(payload){
		console.log("message received", payload);
		alert ("Your time is up!");
	});
}


function startIt(){
	//console.log(document.getElementById("min").value+" "
		//+document.getElementById("sec").value);
	//console.log ("hi this works!");

	//get time input
	var min = document.getElementById("min").value;
	var sec = document.getElementById("sec").value; 

	//console.log("min "+ min);
	//console.log("sec "+sec);

	if (min<0 || sec<0 || min == "" || sec == ""){
		alert("Please enter valid time");
	}else{

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
			alert("Sorry! something went wrong !");
		});

	}

	document.getElementById("inputForm").reset();

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
			alert("Sorry! Something went wrong!");
		});
	};

//request for permission popup
function requestNotificationsPermissions(){
	console.log('request Notifications Permissions...');
	firebase.messaging().requestPermission().then(function(){
		this.saveMessagingDeviceToken();
	}.bind(this)).catch(function(error){
		console.error('unable to get Permissions to notify', error);
	});
	
};


function signIn(){
	console.log('user is signning in');

	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function(result){
		document.getElementById("username").innerHTML = 'Welcome back! '+result.user.displayName; 
		//document.getElementById("username").removeAttribute('hidden');
		document.getElementById("signedIn").removeAttribute('hidden');
		document.getElementById("signedOut").setAttribute('hidden', true);
		document.getElementById("startIt").removeAttribute('disabled');

		saveMessagingDeviceToken();
		
	}).catch (function(error){
		console.error("user sign in unsuccessful", error);
		alert("Sorry! Something went wrong!");
	}); 
};

function signOut (){
	console.log('user is signning out');

	firebase.auth().signOut().then(function(){
		console.log('user signed out successful');
		//document.getElementById("username").setAttribute('hidden', true);
		document.getElementById("signedIn").setAttribute('hidden', true);
		document.getElementById("signedOut").removeAttribute('hidden');
		document.getElementById("startIt").setAttribute('disabled', true);
	}).catch(function(error){
		console.error ("user sign out unsuccessful", error);
		alert("Sorry! Something went wrong!");
	});
};


window.onload = function(){
	window.timeIt = new TimeIt(); 
}




	
