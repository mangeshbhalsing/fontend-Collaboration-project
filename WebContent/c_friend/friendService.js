'use strict'
app.service('friendService',['$http','$q','$rootScope',function($http,$q,$rootScope){
	var BASE_URL = 'http://localhost:8092/CollaborationRestServices' 
	
		
		var factory = {
			fetchAllFriends: fetchAllFriends,
			pendingFriendRequests: pendingFriendRequests,
			addFriend:addFriend,
			approveFriend:approveFriend,
			rejectFriend:rejectFriend,
	        unFriend:unFriend
	       
	    };

	 return factory;
	 
	    function fetchAllFriends() {
	        var deferred = $q.defer();
	       
	        $http.get(BASE_URL+'/friends/'+$rootScope.currentUser.id+'/')
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	                console.log('Inside fetchAllFriends with current user '+$rootScope.currentUserId);
	            },
	            function(errResponse){
	            	
	                console.error('Error while fetching friends..');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
	    
	    function pendingFriendRequests() {
	        var deferred = $q.defer();
	        
	        $http.get(BASE_URL+'/pendingFriendRequests/'+$rootScope.currentUser.id+'/')
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while fetching pending friendrequests..');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
	    
	    function addFriend(friendId) {
	        var deferred = $q.defer();
	        console.log('Inside addFriend with current user '+$rootScope.currentUser.id);
	        $http.get(BASE_URL+'/addFriend/'+friendId+'/'+$rootScope.currentUser.id+'/')
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while adding friend..');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
	    
	    function approveFriend(friendId) {
	        var deferred = $q.defer();
	        $http.get( BASE_URL+'/approveFriend/'+friendId+'/'+$rootScope.currentUser.id)
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while approving friend..');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
	    
	    function rejectFriend(friendId) {
	        var deferred = $q.defer();
	        $http.get(BASE_URL+'/rejectFriend/'+friendId+'/'+$rootScope.currentUser.id)
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while rejecting friend..');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
	    
	    function unFriend(friendId) {
	        var deferred = $q.defer();
	        $http.get(BASE_URL+'/unFriend/'+friendId+'/'+$rootScope.currentUser.id+'/')
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while unfriending friend..');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
	 
	    
}]);