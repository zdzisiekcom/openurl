var root = chrome.extension.getBackgroundPage();

$(function() {

	$('#issueId').focus();
	document.execCommand('paste');
	document.execCommand('selectAll');

	$('#issueId').keyup(function(event) {
		if (event.which === 13) {
			defaultAction($('#issueId').val());
		}
		updateAvaiableLinks();
	});
	
	$('#newWindow').prop('checked', root.newWindow);

	$('#timeEntry').click(function() {
		timeEntry();
	});

	$('#showIssue').click(function() {
		openIssue();
	});

	$('#search').click(function() {
		searchFor();
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
	val = $('#issueId').val();
	if (val.match(/^[0-9]+$/)) {
		defaultAction = openIssue;
		$('#timeEntry').fadeIn()
		$('#showIssue').fadeIn()
		$('#search').fadeIn()
		updateDefaultLink();
	} else {
		defaultAction = searchFor;
		$('#timeEntry').fadeOut()
		$('#showIssue').fadeOut()
		matchNewWindow(root.cfg.searchURL)
	}
}

function updateDefaultLink() {
	if (root.issueAction == 'open'){
		$('#showIssue').addClass('bold');
		$('#timeEntry').removeClass('bold');
		matchNewWindow(root.cfg.issueURL)
	} else {
		$('#showIssue').removeClass('bold');
		$('#timeEntry').addClass('bold');
		matchNewWindow(root.cfg.timeEntryURL)
	}
}

function matchNewWindow(searchFor){
	console.log('Match: ' + searchFor.replace("%s", "*"));
	chrome.tabs.query({
		currentWindow : true,
		active : true,
		url : searchFor.replace("%s", "*")
	}, function (tabs){
		$('#newWindow').prop('checked', tabs.length == 0);
	})
}

function openIssue() {
	chrome.runtime.sendMessage({
		message : 'open',
		issue : $('#issueId').val(),
		window : $('#newWindow').is(':checked')
	});
}

function timeEntry() {
	chrome.runtime.sendMessage({
		message : 'time',
		issue : $('#issueId').val(),
		window : $('#newWindow').is(':checked')
	});
}

function searchFor() {
	chrome.runtime.sendMessage({
		message : 'search',
		query : $('#issueId').val(),
		window : $('#newWindow').is(':checked')
	});
}

var defaultAction = openIssue;

