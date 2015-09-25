var root = chrome.extension.getBackgroundPage();

console.log('Open popup');

$(function() {

	$('#issueId').focus();
	document.execCommand('paste');
	document.execCommand('selectAll');

	$('#issueId').keypress(function(event) {
		if (event.which === 13) {
			openIssue($('#issueId').val());
		}
		updateAvaiableLinks();
	});

	$('#timeEntry').click(function() {
		timeEntry($('#issueId').val());
	});

	$('#showIssue').click(function() {
		openIssue($('#issueId').val());
	});

	$('#search').click(function() {
		searchFor($('#issueId').val());
	});


	$('#openSettings').click(function() {
		if (chrome.runtime.openOptionsPage) {
			chrome.runtime.openOptionsPage();
		} else {
			window.open(chrome.runtime.getURL('options.html'));
		}
	});
});

function updateAvaiableLinks(){
	
}

function openIssue(issueVal) {
	chrome.runtime.sendMessage({
		message : 'open',
		issue : issueVal
	});
}

function timeEntry(issueVal) {
	chrome.runtime.sendMessage({
		message : 'time',
		issue : issueVal
	});
}

function searchFor(query) {
	chrome.runtime.sendMessage({
		message : 'search',
		query : query
	});
}