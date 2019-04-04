function check(event) {
	// Get Values
	var tid = document.getElementById('tid' ).value;
	var tdate = document.getElementById('tdate').value;

	// Simple Check
	if(isNaN(tid)) {
		alert("Task ID should be a number");
		event.preventDefault();
		event.stopPropagation();
		return false;
	}
	if(tdate.length != 8) {
		alert("Enter tdate in YYYYMMDD format");
		event.preventDefault();
		event.stopPropagation();
		return false;
	}
	alert("New task added successfully!");
}
