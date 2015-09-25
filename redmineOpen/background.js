console.log('Init application');

var cfg;
var issueAction = 'open'
var newWindow = true;

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
	if (request.message == "open") {
		openIssue(request.issue, request.window);
	}
	if (request.message == "time") {
		openTimelog(request.issue, request.window);
	}
	if (request.message == "search") {
		searchFor(request.query, request.window);
	}
	if (request.message == 'save settings') {
		saveSettings(request.settings);
	}
});

function openIssue(issue, newWindow) {
	issueAction = 'open'
	url = cfg.issueURL.replace("%s", issue);
	openUrl(url, newWindow);
}

function openTimelog(issue, newWindow) {
	issueAction = 'time'
	url = cfg.timeEntryURL.replace("%s", issue);
	openUrl(url, newWindow);
}

function searchFor(query, newWindow) {
	url = cfg.searchURL.replace("%s", query);
	openUrl(url, newWindow);
}

function openUrl(url, inNewWindow){
	if (inNewWindow) {
		chrome.tabs.create({
			url : url,
			active : true
		});
		newWindow = inNewWindow;
	} else {
		chrome.tabs.update({
			url : url,
			active : true
		});
		newWindow = inNewWindow;
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