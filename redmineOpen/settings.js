var root = chrome.extension.getBackgroundPage();

function save_options() {

	chrome.runtime.sendMessage({
		message : 'save settings',
		settings : {
			issueURL : $('#issueUrl').val(),
			searchURL : $('#searchUrl').val(),
			timeEntryURL : $('#timeEntryUrl').val()
		}
	});

}

function restore_options() {

	$('#saveButton').click(save_options);

	chrome.storage.sync
			.get(
					{
						issueURL : 'https://secure.artegence.com/redmine/issues/%s',
						searchURL : 'https://secure.artegence.com/redmine/search?q?=%s',
						timeEntryURL : 'https://secure.artegence.com/redmine/issues/%s/time_entries/new'
					}, function(items) {
						$('#issueUrl').val(items.issueURL);
						$('#searchUrl').val(items.searchURL);
						$('#timeEntryUrl').val(items.timeEntryURL);
					});
}

$(restore_options);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.message == "settings saved") {
		$('#msg').fadeIn();
		setTimeout(window.close, 1500);
	}
});
