
var	issueURL = "https://secure.artegence.com/redmine/issues/%s";
var	searchURL = "https://secure.artegence.com/redmine/searching?esearch=%s";

var urls = {
		
	setIssueUrl : function(newUrl){
		console.log('set url to: ' + newUrl)
		chrome.storage.local.set({'issueURL': newUrl});
		issueURL = newUrl
		console.log('stored!')

	}, 
	getIssueUrl : function(){
		return issueURL
	}
};

chrome.commands.onCommand.addListener(function(command) {

//	
	chrome.windows.create({
				url: 'popup.html', 
				type: 'popup',
				width : 500,
				height : 150
			});
	
});
