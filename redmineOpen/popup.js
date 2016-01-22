var root = chrome.extension.getBackgroundPage();

$(function() {

	$('#issueId').focus();
	document.execCommand('paste');
	document.execCommand('selectAll');

	$('#issueId').keyup(function(event) {
		if (event.which === 13) {
			execDefaultAction();
		}
		updateAvaiableLinks();
	});
	
	$('#timeEntry').click(function() {
		timeEntry();
	});

	$('#showIssue').click(function() {
		openIssue();
	});

	$('#showIssueNew').click(function() {
		openIssueNew();
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

var issueActions = ['showIssue', 'showIssueNew', 'timeEntry'];

function updateAvaiableLinks(){
	val = $('#issueId').val();
	if (val.match(/^[0-9]+$/)) {
		defaultAction = root.issueAction;
		showIssueActions();
		updateDefaultLink();
	} else {
		defaultAction = 'search';
		hideIssueActions();
	}
}

function showIssueActions(){
	issueActions.forEach(function(action){
		$('#'+action).fadeIn();
	})
	$('#search').removeClass('bold');
}

function hideIssueActions(){
	issueActions.forEach(function(action){
		$('#'+action).fadeOut();
	});
	$('#search').addClass('bold');
}

function updateDefaultLink() {
	issueActions.forEach(function(action){
		if (root.issueAction == action){
			$('#'+action).addClass('bold');
		} else {
			$('#'+action).removeClass('bold');
		}
	})
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
		message : 'showIssue',
		issue : $('#issueId').val(),
	});
}

function openIssueNew() {
	chrome.runtime.sendMessage({
		message : 'showIssueNew',
		issue : $('#issueId').val(),
	});
}


function timeEntry() {
	chrome.runtime.sendMessage({
		message : 'timeEntry',
		issue : $('#issueId').val(),
	});
}

function searchFor() {
	chrome.runtime.sendMessage({
		message : 'search',
		query : $('#issueId').val(),
	});
}

function execDefaultAction(){
	chrome.runtime.sendMessage({
		message : defaultAction,
		query : $('#issueId').val(),
	});
}

var defaultAction = 'showIssue';

