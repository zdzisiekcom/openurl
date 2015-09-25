console.log('Init application');

var cfg;

chrome.commands.onCommand.addListener(function(command) {

	console.log(command)

	chrome.windows.create({
		url : 'popup.html?time',
		type : 'popup',
		width : 500,
		height : 150
	});

});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.message == "open issue") {
		openIssue(request.issue);
	}
	if (request.message == 'save settings') {
		saveSettings(request.settings);
	}
});

function openIssue(issue) {

	console.log('Open: ' + issue);
	console.log('Using: ' + cfg.issueURL);

	if (issue.match(/[0-9]+/)) {
		url = cfg.issueURL.replace("%s", issue);
	} else {
		url = cfg.searchURL.replace("%s", issue);
	}

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
						searchURL : 'https://secure.artegence.com/redmine/search?q?=%s',
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