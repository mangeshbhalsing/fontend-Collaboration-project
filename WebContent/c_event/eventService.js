'use strict'
app.service('eventService',['$http','$q','$rootScope',function($http,$q,$rootScope){
	var BASE_URL = 'http://localhost:8092/CollaborationRestServices' 
	
		
		var factory = {
	        fetchAllEvents: fetchAllEvents,
	        createEvent: createEvent,
	        updateEvent:updateEvent,
	        deleteEvent:deleteEvent,
	        
	    };

	 return factory;
	 
	    function fetchAllEvents() {
	        var deferred = $q.defer(); //A new instance of deferred is constructed by calling $q.defer(),A service that helps you run functions asynchronously, and use their return values (or exceptions) when they are done processing.
	        $http.get(BASE_URL+'/events')
	            .then(
	            function (response) {
	                deferred.resolve(response.data);// resolves the derived promise with the value.
	            },
	            function(errResponse){
	                console.error('Error while fetching Events');
	                deferred.reject(errResponse); // rejects the derived promise with the reason
	            }
	        );
	        return deferred.promise;
	    }
	 
	    function createEvent(event) {
	        var deferred = $q.defer();
	        $http.post(BASE_URL+'/CreateEvent', event)
	            .then(
	            function (response) {
	            	 window.alert("New Event has been created ");
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while creating Event');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
	 
	 
	    function updateEvent(event, id) {
	        var deferred = $q.defer();
	        $http.put(BASE_URL+'/updateEvent/'+id, event)
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while updating Event');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
	    
	    
	    
	 
	    function deleteEvent(id) {
	        var deferred = $q.defer();
	        $http.get(BASE_URL+'/deleteEvent/'+id)
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while deleting Eent');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
}]);