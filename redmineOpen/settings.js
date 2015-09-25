var root = chrome.extension.getBackgroundPage();
//bkg.callFunction();


$(function() {
		
	$('#issueUrl').val(root.urls.getIssueUrl());
	
	$('#cancelBtn').click(function() {
		window.close();
	});

	$('#saveConfigBtn').click(function() {
		saveConfig();
	});

});


function saveConfig(){
	
	root.urls.setIssueUrl($('#issueUrl').val());
	
}


