function checkTask(event) {
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

function checkReview(event) {
	// Get Values
	var rating = document.getElementById('rating' ).value;
	var rdate = document.getElementById('rdate').value;

	// Simple Check
	if(isNaN(rating)) {
		alert("Rating should be a number between 1 and 5");
		event.preventDefault();
		event.stopPropagation();
		return false;
	}
	if(rdate.length != 8) {
		alert("Enter review date in YYYYMMDD format");
		event.preventDefault();
		event.stopPropagation();
		return false;
	}
	alert("New review added successfully!");
}

function checkContract(event) {
	alert("New contract created successfully!");
}
