$(document).contextmenu(function(){
    return false;
});

$(document).ready(function() {
	let resetKey = false;
	let cloudinaryDetails = {
		uploadPreset: 'wpvsxpyx',
		apiKey: '493351181962539',
		cloudName: 'disl5oe7o'
	};
	
	$('#submitMessage').click(function(e) {
		e.preventDefault();
		processImpl();
	});

	function sendMessage(fullname, message, file) {
		let imageURL = null;
		let request = new XMLHttpRequest();
		let formData = new FormData();
		formData.append('file', file);
		formData.append('upload_preset', cloudinaryDetails.uploadPreset);
		formData.append('tags', 'upload');

		request.onreadystatechange = function() {
			if (request.readyState === 4) {
				resetKey = true;
				imageURL = JSON.parse(request.response).secure_url;
				const SEND_MESSAGE_ENDPOINT = "/api/v1/send";

				let userDTO = {
					'fullname': fullname,
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
					processData: false,
					data: JSON.stringify(messageDTO),
					cache: false,
					timeout: 600000,
					success: function (data) {
						let msg = "<h4>" + data + "</h4><p>Thank you!</p>"
						$("#loader_div").removeClass("show_").addClass("hide_");
						$("#info").removeClass("hide_").addClass("show_");
						$("#info").html(msg);
					},
					error: function(data) {
						let msg = "<h4>Message Delivery Failed</h4><p>Kindly try again later</p>"
						$("#loader_div").removeClass("show_").addClass("hide_");
						$("#info").removeClass("hide_").addClass("show_");
						$("#info").html(msg);
					}
				});
			}
		};

		request.open("POST", `https://api.cloudinary.com/v1_1/${cloudinaryDetails.cloudName}/upload`, true);
		request.send(formData);
	}
	
	function processImpl() {
		$("#myModal_").removeClass("hide_").addClass("show_");
		$("#loader_div").removeClass("hide_").addClass("show_");

		const MAX_FILE_SIZE = 25000000;
		const MAX_MESSAGE_LENGTH = 450;
		let fullname = $('#fullname').val();
		let message = $('#message').val();
		let image = $('#image')[0].files[0];

		if(image) {
			if(image.size <= MAX_FILE_SIZE) {
				if(validateImageFormat(image.name)) {
					if(message.length === 0) {
						resetKey = false;
						let msg = "<h4>No Message To Send</h4><p>Kindly write a concise goodwill message.</p>"
						$("#loader_div").removeClass("show_").addClass("hide_");
						$("#info").removeClass("hide_").addClass("show_");
						$("#info").html(msg);
					} else if(message.length > 0 && message.length <= MAX_MESSAGE_LENGTH) {
						if(fullname.match(/^([A-Za-z -']+)$/)) {
							sendMessage(fullname, message, image);
						} else {
							resetKey = false;
							let msg = "<h4>Invalid Fullname</h4><p>Kindly use valid characters in you name(s).</p>"
							$("#loader_div").removeClass("show_").addClass("hide_");
							$("#info").removeClass("hide_").addClass("show_");
							$("#info").html(msg);
						}
					} else{
						resetKey = false;
						let msg = "<h4>Message Too Long</h4><p>Kindly make your message concise and resend.</p>"
						$("#loader_div").removeClass("show_").addClass("hide_");
						$("#info").removeClass("hide_").addClass("show_");
						$("#info").html(msg);
					}
				} else {
					resetKey = false;
					let msg = "<h4>Invalid Image</h4><p>Image format not allowed. Kindly upload jpg or png format</p>"
					$("#loader_div").removeClass("show_").addClass("hide_");
					$("#info").removeClass("hide_").addClass("show_");
					$("#info").html(msg);
				}
			} else {
				resetKey = false;
				let msg = "<h4>Image Quite Large</h4><p>Image size is too large, required size should be less than 25MB</p>"
				$("#loader_div").removeClass("show_").addClass("hide_");
				$("#info").removeClass("hide_").addClass("show_");
				$("#info").html(msg);
			}
		} else {
			resetKey = false;
			let msg = "<h4>Image Required</h4><p>Kindly upload a picture of you</p>"
			$("#loader_div").removeClass("show_").addClass("hide_");
			$("#info").removeClass("hide_").addClass("show_");
			$("#info").html(msg);
		}
	}

	function reset() {
		$("#info").html("");
		$('#message').val("");
		$('#fullname').val("");
		$($('#image')[0]).val("");
	}

	function validateImageFormat(fileName) {
		return fileName.endsWith(".jpg") || fileName.endsWith(".png") || fileName.endsWith(".jpeg")
			|| fileName.endsWith(".JPG") || fileName.endsWith(".PNG") || fileName.endsWith(".JPEG")
			|| fileName.endsWith(".webp")
	}

	$(window).click(function(event) {
		if ($(event.target).is($("#myModal_")) && $("#myModal_").is(":visible")) {
			if(resetKey) {
				reset();
			}

			$("#info").html("");
			$("#info").removeClass("show_").addClass("hide_");
			$("#myModal_").removeClass("show_").addClass("hide_");
		}
	});
});