chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.data) {
        var dataFromClipboard = JSON.parse(request.data)
        chrome.storage.sync.get({
            dateField: "",
            jobField: "",
            projectField: "",
            durationField: "",
            checkboxDayOnly: false
          }, function(items) {
            if(!dataFromClipboard) {
                return
            }

            if(dataFromClipboard.date){
                var dateString = dataFromClipboard.date
                if(items.checkboxDayOnly){
                    dateString = moment(dateString).date()
                }

                $('#'+items.dateField).val(dateString)
                $('.'+items.dateField).val(dateString)
                $('[name='+items.dateField+']').val(dateString)
            }
        
            if(dataFromClipboard.description){
                $('#'+items.jobField).val(dataFromClipboard.description)
                $('.'+items.jobField).val(dataFromClipboard.description)
                $('[name='+items.jobField+']').val(dataFromClipboard.description)
            }
        
            if(dataFromClipboard.project){
                $('#'+items.projectField).val(dataFromClipboard.project)
                $('.'+items.projectField).val(dataFromClipboard.project)
                $('[name='+items.projectField+']').val(dataFromClipboard.project)
            }

            if(dataFromClipboard.duration){
                $('#'+items.durationField).val(dataFromClipboard.duration)
                $('.'+items.durationField).val(dataFromClipboard.duration)
                $('[name='+items.durationField+']').val(dataFromClipboard.duration)
            }

        toastr.info("Daten eingefügt.")
        });
    }
});

function addTimeTrackerButton() {
    var jiraIssueRegex = /\[(([A-Z]|\d){2,}-\d+)\](:|-)?(.*)?(- Jira)/
    var match = jiraIssueRegex.exec(document.title)
    var currentTimeTrackerButton = $('#timetracker')
    if(match && currentTimeTrackerButton.length <= 0) {
        var issueKey = match[1]
        var issueSummery = match[4]
        var iconUrl = chrome.runtime.getURL("icon/logo16.png");
        var newTimeTrackerbutton = $('<a id="timetracker" class="aui-button toolbar-trigger" href="tt://issuekey='+issueKey+'&issuesummery='+issueSummery+'" resolved="" original-title="Neue Aufgabe in der TimeTracker App starten">'+
        '<img src="'+iconUrl+'" class="tt-icon"> TimeTracker</a>')
        $('.aui-toolbar2-secondary > div').prepend(newTimeTrackerbutton)
    }
}

var mainDiv = document.getElementById('main');
const config = { attributes: false, childList: true, subtree: true }
const callback = function(mutationsList, observer) {
    addTimeTrackerButton()
}

const observer = new MutationObserver(callback)
observer.observe(mainDiv, config)


addTimeTrackerButton()
