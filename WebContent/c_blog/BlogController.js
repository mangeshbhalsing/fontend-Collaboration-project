'use strict';


app.controller('BlogController', [ '$scope', 'BlogService','$location','$rootScope','$cookieStore','$http',
		  function($scope,BlogService,$location,$rootScope,$cookieStore,$http) 
		  {
			console.log("Inside blogController");
			  
			  var self = this;
			  $scope.blog = {errorCode:"",errorMessage:"",id:"",title:"",description:"",userID:$rootScope.currentUser.id,blogDate:new Date().toDateString(),noOfViews:"28",status:"",reason:"NA",likes:"30",dislikes:"40"};
			  self.blog = {errorCode:"",errorMessage:"",id:"",title:"",description:"",userID:$rootScope.currentUser.id,blogDate:new Date().toDateString(),noOfViews:"28",status:"",reason:"NA",likes:"30",dislikes:"40"};
			  self.blogs=[];
			  $scope.blogs =[];
			  
			  self.blogsp=[];
			  $scope.blogsp =[];
			  
			    self.submit = submit;
			    self.edit = edit;
			    self.remove = remove;
			    self.reset = reset;
			    
			    self.isloggedBlog;
			    
			    console.log("self initialized.."+self.blog.description);
			  
			  getAllBlogs();
			  
			  getAllPendingBlogs()
			  
			  function getAllBlogs(){
				  console.log("in fetch all blogs..")
				  BlogService.fetchAllBlogs()
				       		.then(
				       				function(d){
				       					
				       				$scope.blogs =d;
				       				console.log("blogs array length is .."+d.length) ;
				       				},
				       				function(errResponse){console.error('Error while getting blogs');});
				       				
			  }
			  
			  function getAllPendingBlogs(){
				  console.log("in fetch all Pending  blogs..")
				  BlogService.fetchAllPendingBlogs()
				       		.then(
				       				function(d){
				       					
				       				$scope.blogsp =d;
				       				console.log("blogs array length is .."+d.length) ;
				       				},
				       				function(errResponse){console.error('Error while getting blogs');});
				       				
			  }
			   
			   $scope.getBlog = function getBlog(id){
				   
				   BlogService.getBlog(id)
			            .then(
			            function(d) {
			                /*$scope.currentBlog = d;*/
			                $location.path('/blogDetails');
			                console.log("getting blog with id .."+id +'/'+d.title) ;
			                $rootScope.currentBlog = d; 
			                $rootScope.currentBlogId = id; 
			            },
			            function(errResponse){
			                console.error('Error while fetching current blog');
			            }
			        );
			    }
			   
			   
			    function createBlog(blog){
			    	 console.log('Inside create blog...');
			    	 BlogService.createBlog(blog)
			            .then(function(d) {
							window.alert("The Blog Has been Created Succesfully Waiting For the Admin AppRoval");
							$rootScope.isloggedBlog=true;
						},
						function(errResponse) {
							console
									.error('Error while creating User.');
						});
			    }
			    
			    
			   $scope.updateBlog = function updateBlog(blog, blogId){
				   BlogService.updateBlog(blog, blogId)
			            .then(
			            getAllBlogs,
			            function(errResponse){
			                console.error('Error while updating blog');
			            }
			        );
			    }
			   
			   $scope.deleteBlog = function deleteBlog(blogId){
				   BlogService.deleteBlog(blogId)
			            .then(
			            getAllBlogs,
			            function(errResponse){
			                console.error('Error while deleting Blog');
			            }
			        );
			    }
			   
			   $scope.accept = function accept(id) {
					console.log("accept...")
					UserService.accept(id).then(
									getAllPendingBlogs,
										//$location.path("/requestuser");
									function(errResponse) {
										console.error('Error while updating User.');
									});
					alert("You have succesfully Created the Comment")
				};

				$scope.reject = function(id) {
					console.log("reject...")
					var reason = prompt("Please enter the reason");
					UserService.reject(id, reason).then(
								getAllPendingBlogs,
								//$location.path("/requestuser")

								function(errResponse) {
									console
											.error('Error while fetch profile.');
								});
				};
			   
			    function submit() {
					{
						console.log('Saving New User', self.user);
						createBlog(self.blog);
					}
					reset();
				};
			   
			   function edit(id){
			        console.log('id to be edited', id);
			        for(var i = 0; i < self.blogs.length; i++){
			            if(self.blogs[i].blogId === id) {
			                self.blog = angular.copy(self.blogs[i]);
			                break;
			            }
			        }
			    }
			 
			    function remove(id){
			        console.log('id to be deleted', id);
			        if(self.blog.blogId === id) {//clean form if the user to be deleted is shown there.
			            reset();
			        }
			        deleteBlog(id);
			    }
			 
			 
			    function reset(){
			    	self.blog = {
			    			errorCode:"",errorMessage:"",id:"",title:"",description:"",userID:$rootScope.currentUser.id,blogDate:new Date().toDateString(),noOfViews:"28",status:"",reason:"NA",likes:"30",dislikes:"40"
			    				};
			    
			    
			    	$scope.blog = {errorCode:"",errorMessage:"",id:"",title:"",description:"",userID:$rootScope.currentUser.id,blogDate:new Date().toDateString(),noOfViews:"28",status:"",reason:"NA",likes:"30",dislikes:"40"};
			        $scope.blogForm.$setPristine(); //reset Form
			    }
			   
 
			  	
}]);