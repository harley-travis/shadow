
	var ShadowUser = {
		Init: function(){
			window.setTimeout(function() {  
				ShadowUser.Widget.SearchUser();
			}, 3000);
		},
		Widget: {
			SearchUser: function(){
				
				// on key execute function
				$('#searchShadowUsers').on("keyup", (function(event){

					// grab entry store in val
					var shadowEntry = $('#searchShadowUsers').val();
					console.log('shadowEntry: ' + shadowEntry);

					// store empty val at init
					$('#shadowUsersResults').html('');

					// make ajax call and loop through results
					$.ajax({
						url: '/rp/v1/users/search?name='+shadowEntry,
						type: 'GET',
						data: "{ 'UserAssociation': '"+shadowEntry+"' }",
						contentType: "application/json",
						dataType: "json",
						success: function(data){
							$.each(data.results, function(key, value){
								
								var shadowUserName = value.userName; // store the username 
								var shadowNameAtt = $('shadowList[name="'+shadowUserName+'"]'); // grab the name attribute 
								
								$('#shadowUsersResults').append('<li id="shadowList" name="'+shadowUserName+'" style="list-style:none;padding:10px 0;border-bottom:1px solid gray;"><a href="#">'+ value.userName +'</a></li>');
								
								// if they click the user send them to the verify function
								$('#shadowList[name="'+shadowUserName+'"]').click(function(){
									ShadowUser.Widget.VerifyShadowUser(shadowUserName);
								});
								
								// remove append if there is no val
								if(shadowEntry <= 0){
									$('#shadowUsersResults').remove("#shadowList");
								}
							});
						}
					});
					
					//execute the menu option
					ShadowUser.Widget.MenuChange();
				}));
			},
			VerifyShadowUser: function(shadowUserName){
				// verify if the user is correct 
				console.log('Shadow Username = '+shadowUserName);
				if (confirm('Are you sure you want to login as ' + shadowUserName)) {
				$.ajax({
					url: 'https://jared-dev.rizepoint.com/api/theshadowknows?username='+shadowUserName,
					type: 'POST',
					contentType: 'application/json',
					dataType: 'json',
					success: function(data, status, xhr){
						console.log(data);
						console.log(status);
					}
				});
				}
			},
			MenuChange: function(){
				// change the color of the menu CSS
				$('#header-navigation-menu-container').css("background-color", "purple");
			}
		}
	}
	
	$(document).ready(function(){
		ShadowUser.Init();
	});

