var root = chrome.extension.getBackgroundPage();

var defaultAction = 'openIssue';

$(function() {

	localizeHtmlPage();
	
	$('#issueId').focus();
	document.execCommand('paste');
	document.execCommand('selectAll');

	$('#issueId').keyup(function(event) {
        if (event.which === 13) {
			executeOpen(defaultAction);
        }
        updateAvaiableLinks();
	});
	
	$('.actionItem').click(function(event) {
		executeOpen(event.toElement.id);
	});

	$('#openSettings').click(function() {
		if (chrome.runtime.openOptionsPage) {
			chrome.runtime.openOptionsPage();
		} else {
			window.open(chrome.runtime.getURL('options.html'));
		}
	});
});

var issueActions = ['openIssue', 'openIssueNew', 'openTimelog'];

function updateAvaiableLinks(){
	val = $('#issueId').val();
	if (val.match(/^[0-9]+$/)) {
		defaultAction = root.issueAction;
		showIssueActions();
		updateDefaultLink();
	} else {
		defaultAction = 'searchFor';
		hideIssueActions();
	}
}

function showIssueActions(){
	issueActions.forEach(function(action){
		$('#'+action).show();
	})
	$('#search').removeClass('bold')
}

function hideIssueActions(){
	issueActions.forEach(function(action){
		$('#'+action).hide();
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
	chrome.tabs.query({
		currentWindow : true,
		active : true,
		url : searchFor.replace("%s", "*")
	}, function (tabs){
		$('#newWindow').prop('checked', tabs.length == 0);
	})
}


function executeOpen(action) {
	chrome.runtime.sendMessage({
        action : 'open',
		message : action,
        query : $('#issueId').val(),
	});
}

function localizeHtmlPage()
{
    //Localize by replacing __MSG_***__ meta tags
    var objects = document.getElementsByTagName('html');
    for (var j = 0; j < objects.length; j++)
    {
        var obj = objects[j];

        var valStrH = obj.innerHTML.toString();
        var valNewH = valStrH.replace(/__MSG_(\w+)__/g, function(match, v1)
        {
            return v1 ? chrome.i18n.getMessage(v1) : "";
        });

        if(valNewH != valStrH)
        {
            obj.innerHTML = valNewH;
        }
    }
}
