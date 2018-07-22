function save_options() {
    var dateField = document.getElementById('inputDateField').value;
    var jobField = document.getElementById('inputJobField').value;
    var projectField = document.getElementById('inputProjectField').value;
    var durationField = document.getElementById('inputDurationField').value;
    var checkboxDayOnly = document.getElementById('checkboxDayOnly').checked;
    
    chrome.storage.sync.set({
      dateField: dateField,
      jobField: jobField,
      projectField: projectField,
      durationField: durationField,
      checkboxDayOnly: checkboxDayOnly
    }, function() {
      toastr["success"]("Speichern erfolgreich.")
    });
  }
  
  function restore_options() {
    chrome.storage.sync.get({
      dateField: "",
      jobField: "",
      projectField: "",
      durationField: "",
      checkboxDayOnly: false
    }, function(items) {
      document.getElementById('inputDateField').value = items.dateField
      document.getElementById('inputJobField').value = items.jobField
      document.getElementById('inputProjectField').value = items.projectField
      document.getElementById('inputDurationField').value = items.durationField
      document.getElementById('checkboxDayOnly').checked = items.checkboxDayOnly
    });
  }
  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click', save_options);