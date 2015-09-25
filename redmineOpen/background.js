console.log('Init application');

var cfg;

chrome.commands.onCommand.addListener(function(command) {

	console.log(command)

	chrome.windows.create({
		url : 'popup.html',
		type : 'popup',
		width : 500,
		height : 150
	});

});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.message == "open") {
		openIssue(request.issue);
	}
	if (request.message == "time") {
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
	url = cfg.issueURL.replace("%s", issue);
	chrome.tabs.create({
		url : url,
		active : true
	});
}

function openTimelog(issue) {
	url = cfg.timeEntryURL.replace("%s", issue);
	chrome.tabs.create({
		url : url,
		active : true
	});
}

function searchFor(query) {
	url = cfg.searchURL.replace("%s", query);
	chrome.tabs.create({
		url : url,
		active : true
	});
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