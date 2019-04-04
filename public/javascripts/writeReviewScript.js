function check(event) {
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
