'use strict'
app.controller(
		'blogcommentController',
		 [
		  '$scope',
		  'blogcommentService',
		  '$location',
		  '$rootScope',
		  '$http',
		  function($scope,blogcommentService,$location,$rootScope,$http) {
			  console.log("Inside blogCommentController ");

			  var self = this;
			    self.comment={errorCode:'',errorMessage:'',commentId:'',blogId:$rootScope.currentBlogId,description:'',userId:$rootScope.currentUser.id,rating:'',commentDate:new Date().toDateString()};
			    self.comments=[];
			 
			    self.submit = submit;
			    self.edit = edit;
			    self.remove = remove;
			    self.reset = reset;
			    
			    
			    
			    
			    console.log("self initialized.."+self.comment.description);
			    fetchAllComments();
			 
			    function fetchAllComments(){
			        blogcommentService.fetchAllCommentsOnBlog($rootScope.currentBlogId)
			            .then(
			       
			            function(d) {
			            	 console.log("fetching comments and asigning to self.."+d.length);
			                self.comments = d;
			                $scope.comments =d ;
			            },
			            function(errResponse){
			                console.error('Error while fetching Comments');
			            }
			        );
			    }
			    
			 
			    function createComment(comment){
			    	 console.log('Inside create comment...');
			    	blogcommentService.createComment(comment)
			            .then(
			            fetchAllComments,
			            $location.path('/blogDetails'),
			            function(errResponse){
			                console.error('Error while creating Comment');
			            }
			        );
			    }
			 
			    function updateComment(comment, commentId){
			    	blogcommentService.updateComment(comment, commentId)
			            .then(
			            fetchAllComments,
			            function(errResponse){
			                console.error('Error while updating Comment');
			            }
			        );
			    }
			 
			    function deleteComment(commentId){
			    	blogcommentService.deleteComment(commentId)
			            .then(
			            fetchAllComments,
			            function(errResponse){
			                console.error('Error while deleting Comment');
			            }
			        );
			    }
			 
			    function submit() {
			    	 console.log('Inside submit...');
			    	 console.log('comment', self.comment.description);
			       /* if(self.user.userId===null){*/
			            createComment(self.comment);
		/*	        }else{
			            updateUser(self.user, self.user.userId);
			            console.log('User updated with id ', self.user.userId);
			        }*/
			        reset();
			    }
			 
			    function edit(id){
			        console.log('id to be edited', id);
			        for(var i = 0; i < self.comments.length; i++){
			            if(self.comments[i].commentId === id) {
			                self.comment = angular.copy(self.comments[i]);
			                break;
			            }
			        }
			    }
			 
			    function remove(id){
			        console.log('comment id to be deleted', id);
			        if(self.comment.id === id) {//clean form if the user to be deleted is shown there.
			            reset();
			        }
			        deleteComment(id);
			    }
			 
			 
			    function reset(){
			    	self.comment={errorCode:'',errorMsg:'',commentId:'',blogId:'',description:'',userId:'',rating:'',commentDate:''};
			        $scope.commentForm.$setPristine(); //reset Form
			    }
			  	
}]);