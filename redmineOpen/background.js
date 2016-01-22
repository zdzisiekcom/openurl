console.log('Init application');

var cfg;
var issueAction = 'showIssue'

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
	if (request.message == "showIssue") {
		openIssue(request.issue);
	}
	if (request.message == "showIssueNew") {
		openIssueNew(request.issue);
	}
	if (request.message == "timeEntry") {
		openTimelog(request.issue);
	}
	if (request.message == "search") {
		searchFor(request.query);
	}
	if (request.message == 'save settings') {
		saveSettings(request.settings);
	}
});

function openIssue(issue) {
	issueAction = 'showIssue'
	url = cfg.issueURL.replace("%s", issue);
	openUrl(url, false);
}

function openIssueNew(issue) {
	issueAction = 'showIssueNew'
	url = cfg.issueURL.replace("%s", issue);
	openUrl(url, true);
}

function openTimelog(issue) {
	issueAction = 'timeEntry'
	url = cfg.timeEntryURL.replace("%s", issue);
	openUrl(url, false);
}

function searchFor(query) {
	url = cfg.searchURL.replace("%s", query);
	openUrl(url, false);
}

function openUrl(url, inNewWindow){
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