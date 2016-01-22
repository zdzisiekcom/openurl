console.log('Init application');

var cfg;
var issueAction = 'openIssue';

chrome.commands.onCommand.addListener(function(command) {

	console.log(command)

	chrome.windows.create({
		url : 'popup.html',
		type : 'popup',
		width : 500,
		height : 200
	});

});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

	if (request.action == 'open'){
		window[request.message](request.query);
	}

	if (request.message == 'save settings') {
		saveSettings(request.settings);
	}
});

function openIssue(issue) {
	url = cfg.issueURL.replace("%s", issue);
	openUrl(url, false);
	issueAction = 'openIssue';
}

function openIssueNew(issue) {
	url = cfg.issueURL.replace("%s", issue);
	openUrl(url, true);
	issueAction = 'openIssueNew';
}

function openTimelog(issue) {
	url = cfg.timeEntryURL.replace("%s", issue);
	openUrl(url, false);
	issueAction = 'openTimelog';
}

function searchFor(query) {
	url = cfg.searchURL.replace("%s", query);
	openUrl(url, false);
}

function openUrl(url, inNewWindow){
	console.log('Open url in browser: ' + url )

	if (inNewWindow) {
		chrome.tabs.create({
			url : url,
			active : true
		});
	} else {
		chrome.tabs.update({
			url : url,
			active : true
		});
	}
}

function loadSettings() {
	chrome.storage.sync
			.get(
					{
						issueURL : 'https://secure.artegence.com/redmine/issues/%s',
						searchURL : 'https://secure.artegence.com/redmine/searching?esearch=%s',
						timeEntryURL : 'https://secure.artegence.com/redmine/issues/%s/time_entries/new'
					}, function(items) {
						cfg = items;
						console.log('updated settings');
					});

}

function saveSettings(settings) {
	chrome.storage.sync.set(settings, function() {
		cfg = settings;
		console.log('settings saved');
		chrome.runtime.sendMessage({
			message : 'settings saved'
		});
	});
}

loadSettings();