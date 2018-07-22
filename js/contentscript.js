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
