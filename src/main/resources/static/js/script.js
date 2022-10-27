$(document).contextmenu(function(){
    return false;
});

$(document).ready(function() {
	$(window).click(function(event) {
		if ($(event.target).is($("#myModal")) && $("#myModal").is(":visible")) {
	    	$("#myModal").removeClass("show").addClass("hide");
	  	}
	});

	let cloudinaryDetails = {
		uploadPreset: 'wpvsxpyx',
		apiKey: '493351181962539',
		cloudName: 'disl5oe7o'
	};
	
	$('#submitMessage').click(function(e){
		e.preventDefault();
		processImpl();
	});

	function uploadToCloud(file) {
		let imageUrl = null;
		let request = new XMLHttpRequest();

		let formData = new FormData();
		formData.append('file', file);
		formData.append('upload_preset', cloudinaryDetails.uploadPreset);
		formData.append('tags', 'upload');

		request.onreadystatechange = function() {
			if (request.readyState === 4) {
				imageUrl = JSON.parse(request.response).secure_url;
			}
		};
		request.open("POST", `https://api.cloudinary.com/v1_1/${cloudinaryDetails.cloudName}/upload`, false);
		request.send(formData);

		return imageUrl;
	}
	
	function processImpl() {
		const MAX_FILE_SIZE = 4000000;
		let fullname = $('#fullname').val();
		let message = $('#message').val();
		let image = $('#image')[0].files[0];
		const SEND_MESSAGE_ENDPOINT = "/api/v1/send";

		if(image.size <= MAX_FILE_SIZE) {
			let imageURL = uploadToCloud(image);

			let userDTO = {
				'firstname': fullname,
				'lastname': fullname,
				'imageLink': imageURL
			};

			let messageDTO = {
				'message': message,
				'userDTO': userDTO
			};

			$.ajax({
				type: "POST",
				url: SEND_MESSAGE_ENDPOINT,
				contentType: "application/json; charset=utf-8",
				// dataType: 'json',
				processData: false,
				data: JSON.stringify(messageDTO),
				cache: false,
				timeout: 600000,
				success: function (data) {
					console.log(data);
				},
				error: function(data) {
					console.log("--->> Payload", messageDTO);
					console.log("--->> Error", data);
				}
			});
		} else {

		}
	}
});