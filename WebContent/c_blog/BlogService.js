'use strict';

app.service('BlogService',['$http','$q','$rootScope',function($http,$q,$rootScope){
	
	console.log("Blog Services")
	
	var BASE_URL='http://localhost:8092/CollaborationRestServices'
		
		/*
		return{
		
		fetchAllBlogs:function()
		{
			
			console.log("I ma inside the BlogServices")
			
			$http.get(BASE_URL+'/blogs').then(function(response){return response.data;},null);	
			
		},
		
		createBlog: function (blog) {
	        
			console.log("calling create user")
			
	        $http.post(BASE_URL+'/CreateBlog', blog)
	            .then(
	            function (response) {
	            	 window.alert("You have posted blog successfully !");
	                return (response.data);
	            },
	            function(errResponse){
	                console.error('Error while posting blog');
	                	$q.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
		
		
		
		
	}
		
		
		*/
		
		
	
		var factory = {
	        fetchAllBlogs: fetchAllBlogs,
	        fetchAllPendingBlogs:fetchAllPendingBlogs,
	        getBlog:getBlog,
	        createBlog: createBlog,
	        updateBlog:updateBlog,
	        deleteBlog:deleteBlog,
	        accept:accept,
	        reject,reject
	       // getCurrentBlog:getCurrentBlog
	    };

		return factory;

		function fetchAllBlogs() {
	        var deferred = $q.defer();
	        $http.get(BASE_URL+'/blogs')
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while fetching Blogs');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
		
		function fetchAllPendingBlogs() {
	        var deferred = $q.defer();
	        $http.get(BASE_URL+'/blogsPending')
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while fetching  Blogs');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
		
		
		
		function getBlog(id) {
	        var deferred = $q.defer();
	        $http.get(BASE_URL+'/blog/'+id)
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while fetching the Blog');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
		
		function createBlog(blog) {
	        var deferred = $q.defer();
	        $http.post(BASE_URL+'/CreateBlog', blog)
	            .then(
	            function (response) {
	            	// window.alert("You have posted blog successfully !");
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while posting blog');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
		
		function updateBlog(blog, id) {
	        var deferred = $q.defer();
	        $http.put(BASE_URL+'/updateBlog/'+id, blog)
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while updating blog');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
		
		function deleteBlog(id) {
	        var deferred = $q.defer();
	        $http.get(BASE_URL+'/deleteBlog/'+id)
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while deleting Blog');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
		
		 function accept(id) {
         	console.log("calling approve ")
                 return $http.get(BASE_URL+'/acceptBlog/'+id)
                         .then(
                                 function(response){
                                     return response.data;
                                 }, 
                                 function(errResponse){
                                     console.error('Error while accept registration');
                                    
                                 }
                         );
         }
         
          function reject(id, reason) {
         	console.log("calling reject ")
                 return $http.get(BASE_URL+'/rejectBlog/'+id+'/'+reason)
                         .then(
                                 function(response){
                                     return response.data;
                                 }, 
                                 null
                         );
         }
		
}]);