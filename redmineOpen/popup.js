var root = chrome.extension.getBackgroundPage();

console.log('Open popup ');

$(function() {

	$('#issueId').focus();
	document.execCommand('paste');
	document.execCommand('selectAll');

	$('#issueId').keypress(function(event) {
		if (event.which === 13) {
			openIssue($('#issueId').val());
		}
	});

	$('#openIssue').click(function() {
		openIssue($('#issueId').val());
	});

	$('#openSettings').click(function() {
		if (chrome.runtime.openOptionsPage) {
			chrome.runtime.openOptionsPage();
		} else {
			window.open(chrome.runtime.getURL('options.html'));
		}
	});
});

function openIssue(issueVal) {

	chrome.runtime.sendMessage({
		message : 'open issue',
		issue : issueVal
	});

}