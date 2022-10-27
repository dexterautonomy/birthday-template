$(document).contextmenu(function(){
    return false;
});

$(document).ready(function(){
	var table = "";

	$(window).click(function(event) {
		if ($(event.target).is($("#myModal")) && $("#myModal").is(":visible")) {
	    	$("#myModal").removeClass("show").addClass("hide");
	    	var table = "";
	  	}
	});
	
	$('#search_button').click(function(e){
		processImpl();
	});
	
	//Listen to enter keypress
	$("#input_field").on('keyup', function (e) {
	    if (e.key === 'Enter' || e.keyCode === 13) {
	        processImpl();
	    }
	});
	
	function processImpl(){
		var username = $('#input_field').val();
		
		if(username.trim() !== ""){
			$('#display_results').html("");
			$('#display_results').removeClass("ext").addClass("spinnerA");
			$('#data_table_DIV').removeClass("show").addClass("hide");
			$('#bookmark').removeClass("show").addClass("hide");
			
			$("#input_field").attr("disabled", "disabled");
			$("#search_button").attr("disabled", "disabled");
			
			var queryUrl = "/github-repo-analytics/rest/v1/search?user="+username;
			
			$.ajax({
	            url: queryUrl,
	            type: "GET",
	            timeout: 600000,
	            success: function (data){
	            	$("#input_field").removeAttr("disabled");
					$("#search_button").removeAttr("disabled");
					
	                var dataSet = data.data;
	                
	                if(dataSet.length !== 0){
	                	$('#display_results').html("");
	                	$('#data_table_DIV').removeClass("hide").addClass("show");
						$('#display_results').removeClass("spinnerA").addClass("ext");
						$('#bookmark').removeClass("hide").addClass("show");
	                
	                	table = $('#example').DataTable( {
	                		destroy: true,
					        data: dataSet,
					        columns: [
					            { title: "Project" },
					            { title: "Description" },
					            { title: "Size" },
					            { title: "Watchers" },
					            { title: "Language" },
					            { title: "Forks" },
					            { title: "D. Branch" },
					            { title: "Owner" }
					        ]
					    });
					    
					    $('#example tbody').on('click', 'tr', function () {
					    	$("#myModal").removeClass("hide").addClass("show");
					    	
					    	$("#loader_dx").removeClass("hide").addClass("show");
					    	$("#info").removeClass("show").addClass("hide").html("");
					    	$("#konTENT_").removeClass("show").addClass("hide");
					    	
					        var tableRowData = table.row(this).data();
					        var projectName = tableRowData[0];
							var projectOwner = tableRowData[7];
							
					        var queryProjectUrl = "/github-repo-analytics/rest/v1/search-project?name="+projectName+"&owner="+projectOwner;
					        
					        $.ajax({
					        	url: queryProjectUrl,
					            type: "GET",
					            timeout: 600000,
					            success: function (data_){
					            	$("#loader_dx").removeClass("show").addClass("hide");
					            	$("#konTENT_").removeClass("hide").addClass("show");
					            	
					            	var projectDetails = data_.data;
					            	var projectDTO = projectDetails.projectDTO;
					            	var committers = projectDetails.committers;

									$("#createdOn").html("<span class='dateClass'>Created On: "+ projectDTO.created_at +"</span>");
									$("#updatedOn").html("<span class='dateClass'>Last Updated On: "+ projectDTO.updated_at +"</span>");
					            	$("#prf_px").html("<img src='"+ projectDTO.owner.avatar_url +"' class='avatar' alt='github_avatar'/>");
					            	$('#repo_x_nx').html("<h2>"+ projectDTO.name  +"</h2>");
					            	$('#det_name_x').html(projectDTO.owner.login);
					            	
					            	if(projectDTO.description){
					            		$('#desc_x').removeClass("hide").addClass("show").html("<div><div class='desc_jv'>Description</div>" + projectDTO.description + "</div><hr style='margin-top: 7px; margin-bottom: 7px'>");
					            	}
					            	else{
					            		$('#desc_x').removeClass("show").addClass("hide").html("");
					            	}
					            	
					            	if(committers.length !== 0){
					            		$("#tbl_hd_sh").removeClass("hide").addClass("show");
					            		$("#no_data_x").removeClass("show").addClass("hide").html("");
					            	
					            		var tableData = "";
					            	
						            	for(var count = 0; count < committers.length; count++){
						            		tableData += "<tr><td>"+ committers[count].login  +"</td><td>"+ committers[count].contributions  +"</td><td>"+ committers[count].totalContributions  +"</td><td><img src='"+ committers[count].avatar_url +"' class='avatar2' alt='committer_github_avatar'/></td></tr>";
						            	}
						            	
						            	$("#table_body").html(tableData);
					            	}
					            	else{
					            		$("#tbl_hd_sh").removeClass("show").addClass("hide");
					            		$("#no_data_x").removeClass("hide").addClass("show").html("No data for analytic purpose");
					            	}
					            },
					            error: function(){
									$("#loader_dx").removeClass("show").addClass("hide");
									$("#info").removeClass("hide").addClass("show").addClass("info_x").html("Could not retrieve data...");
					            }
					        });
					    });
	                }
	                else{
	                	$('#data_table_DIV').removeClass("show").addClass("hide");
	                	$('#bookmark').removeClass("show").addClass("hide");
	                	$('#display_results').addClass("info_x").html("No data found...");
						$('#display_results').removeClass("spinnerA").addClass("ext");
						
						$("#input_field").removeAttr("disabled");
						$("#search_button").removeAttr("disabled");
	                }
	            },
	            error: function(data){
	            	$('#data_table_DIV').removeClass("show").addClass("hide");
	            	$('#bookmark').removeClass("show").addClass("hide");
	                $('#display_results').addClass("info_x").html("Could not retrieve data...");
					$('#display_results').removeClass("spinnerA").addClass("ext");
					
					$("#input_field").removeAttr("disabled");
					$("#search_button").removeAttr("disabled");
	            }
	        });
		}
		else{
			$('#data_table_DIV').removeClass("show").addClass("hide");
			$('#bookmark').removeClass("show").addClass("hide");
			$('#display_results').addClass("info_x").html("Please enter username...");
			$('#display_results').removeClass("spinnerA").addClass("ext");
		}
	}
	
	//Contrived for bookmarking
	$("#bookmark_button").click(function() {
    	alert('Press ' + (navigator.userAgent.toLowerCase().indexOf('mac') != - 1 ? 'Command/Cmd' : 'CTRL') + ' + D to bookmark this page.');
	});
	
	
	
});