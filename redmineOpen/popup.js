var root = chrome.extension.getBackgroundPage();

$(function() {
	
	$('#issueId').focus();
	document.execCommand('paste');
	document.execCommand('selectAll')

	$('#issueId').keypress(function(event) {
		if (event.which === 13) {
			openIssue();
		}
	});

	$('#openIssue').click(function() {
		openIssue();
	});
	
	$('#openSettings').click(function(){
		chrome.tabs.create({url: chrome.extension.getURL('settings.html')})
	});
});

function openIssue() {

	var val = $('#issueId').val();
	
	if (val.match(/[0-9]+/)){
		url = root.urls.getIssueUrl().replace("%s", val);
	} else {
		url = "https://secure.artegence.com/redmine/searching?esearch=%s".replace("%s", val);
	}
	
	chrome.tabs.create({
		url : url,
		active : true
	});

}