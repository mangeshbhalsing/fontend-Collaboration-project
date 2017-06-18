'use strict'
app.service('blogcommentService',['$http','$q','$rootScope',function($http,$q,$rootScope){
	
	var BASE_URL='http://localhost:8092/CollaborationRestServices'
	
		
		var factory = {
	        fetchAllCommentsOnBlog: fetchAllCommentsOnBlog,
	        fetchAllComments:fetchAllComments,
	        createComment: createComment,
	        updateComment: updateComment,
	        deleteComment: deleteComment,
	        getComment: getComment
	        
	    };

		return factory;

		function fetchAllComments() {
	        var deferred = $q.defer();
	        $http.get(BASE_URL+'/allCommets')
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while fetching Comments');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
		
		function getComment(id) {
	        var deferred = $q.defer();
	        $http.get(BASE_URL+'/comment/'+id)
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while fetching the Blog Comment');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
		function fetchAllCommentsOnBlog(id) {
	        var deferred = $q.defer();
	        $http.get(BASE_URL+'/blog_Comments/'+id)
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while fetching the Blog Comment');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
		
		function createComment(comment) {
	        var deferred = $q.defer();
	        $http.post(BASE_URL+'/createComment', comment)
	            .then(
	            function (response) {
	            	 window.alert("You are commented successfully !");
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while commenting..');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
		
		function updateComment(comment, id) {
	        var deferred = $q.defer();
	        $http.put(BASE_URL+'/updateCommnet/'+id, comment)
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while updating Comment');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
		
		function deleteComment(id) {
	        var deferred = $q.defer();
	        $http.get(BASE_URL+'/deleteComment/'+id)
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while deleting Comment');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
}]);