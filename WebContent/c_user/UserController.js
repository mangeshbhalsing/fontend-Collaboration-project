'use strict';

app.controller('UserController',['$scope','UserService','$location','$rootScope','$cookieStore','$http',
						function($scope, UserService, $location, $rootScope,$cookieStore, $http) {
							console.log("UserController...")
							var self = this;
							this.user = {id : '',name : '',password : '',mobile : '',address : '',email : '',isOnline : '',role : '',errorCode : '',errorMessage : '',status : '',reason :'',imageUrl : ''};
							this.currentUser = { id : '',name : '',password : '',mobile : '',address : '',email : '',isOnline : '',role : '',errorCode : '',errorMessage : '',status : '',reason :'',imageUrl : ''};

							self.users=[];
							  $scope.users =[];
							
							self.islogged;

							$scope.orderByMe = function(x) {
								$scope.myOrderBy = x;
							}
							
							fetchPendingUsers();

							this.fetchAllUsers = function() {
								console.log("fetchAllUsers...")
								UserService.fetchAllUsers().then(
												function(d) {
													$scope.users = d;
												},
												function(errResponse) {
													console
															.error('Error while fetching Users');
												});
							};
							
							function fetchPendingUsers() {
								console.log("fetchAllUses that are Pending...")
								UserService.fetchPendingUsers().then(
												function(d) {
													$scope.users = d;
												},
												function(errResponse) {
													console
															.error('Error while fetching Users');
												});
							};

							// self.fatchAllUsers();

							self.createUser = function(user) {
								console.log("createUser...")
								UserService.createUser(user).then(
												function(d) {
													alert("Thank you for registration")
													$location.path("/")
												},
												function(errResponse) {
													console
															.error('Error while creating User.');
												});
							};

							self.myProfile = function() {
								console.log("myProfile...")
								UserService.myProfile().then(function(d) {
													self.user = d;
													$location.path("/myProfile")
												},
												function(errResponse) {
													console
															.error('Error while fetch profile.');
												});
							};

							$scope.accept = function accept(id) {
								console.log("accept...")
								UserService.accept(id).then(
												/*self.user = d;*/
													fetchPendingUsers,
													function(errResponse) {
													console
															.error('Error while updating User.');
												});
								//$location.path("/requestuser");
								alert("You have Succesfully Accepted the User");
							};

							$scope.reject = function(id) {
								console.log("reject...")
								var reason = prompt("Please enter the reason");
								UserService.reject(id, reason).then(
											fetchPendingUsers,
											/*$location.path("/requestuser")*/
											/*alert(self.user.errorMessage)*/

											function(errResponse) {
												console
														.error('Error while fetch profile.');
											});
								
							};

							self.updateUser = function(currentUser) {
								console.log("updateUser...")
								UserService.updateUser(currentUser).then(
										self.fetchAllUsers, null);
							};

							self.update = function() {
								{
									console.log('Update the user details',
											$rootScope.currentUser);
									self.updateUser($rootScope.currentUser);
								}
								self.reset();
							};

							self.authenticate = function(user) {
								console.log("authenticate...")
								UserService.authenticate(user).then(

												function(d) {

													self.user = d;
													console
															.log("user.errorCode: "
																	+ self.user.errorCode)
													if ((d.id == user.id) && (d.password == user.password)
															&& (d.status == 'A'))

													{
														
												console.log("Valid credentials. Navigating to home page")
												
												window.alert('Welcome '
																		+ d.name
																		+ ' ! You are logged in successfully ');
													
												

													console.log('Current user : '+ self.user)
													$rootScope.currentUser = self.user;

													//$rootScope.islogged= true;
													
													$cookieStore.put('currentUser',self.user);
													$http.defaults.headers.common['Authorization'] = 'Basic '
															+ $rootScope.currentUser;
													
													$location.path('/home');
													
														
														
													} else { 
														
														window.alert('The Credentials are Wrong or User is Still not accepted by Admin');
															
														//	$rootScope.islogged= false;
															
															self.user.id = "";
															self.user.password = "";
															
															


													}

												},
												function(errResponse) {

													console.error('Error while authenticate Users');
												});
							};

							self.logout = function() {
								console.log("logout");	
											UserService.logout($rootScope.currentUser.id).then
											(
											function(d){
											self.user=d;			
											$rootScope.currentUser = {};
											$cookieStore.remove('currentUser');
											//$rootScope.isLogged = false;
											
											$location.path('/');
											//$location.reload('/');
											console
											.log('You are logged out successfully in registerController ');
									
									window
											.alert('You are logged out successfully ');
											},
											function(errResponse) {
												console
														.error('Error while updating User.');
											});
							}

							// self.fetchAllUsers(); //calling the method

							// better to call fetchAllUsers -> after login ???

							self.login = function() {
								{
									console.log('login validation????????',
											self.user);
									self.authenticate(self.user);
								}

							};

							self.submit = function() {
								{
									console.log('Saving New User', self.user);
									self.createUser(self.user);
								}
								self.reset();
							};

							self.reset = function() {
								self.user = {
									id : '',
									name : '',
									password : '',
									mobile : '',
									address : '',
									email : '',
									isOnline : '',
									errorCode : '',
									errorMessage : ''
								};
								$scope.myForm.$setPristine(); // reset Form
							};

						} ]);
