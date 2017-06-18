'use strict'
app.service('jobService',['$http','$q','$rootScope',function($http,$q,$rootScope){
	var REST_SERVICE_URI = 'http://localhost:6200/AlmaBridgeB' 
	
		
		var factory = {
	        fetchAllJobs: fetchAllJobs,
	        createJob: createJob,
	        updateJob:updateJob,
	        deleteJob:deleteJob,
	        
	    };

	 return factory;
	 
	    function fetchAllJobs() {
	        var deferred = $q.defer();
	        $http.get(REST_SERVICE_URI+'/jobDetails')
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while fetching jobs');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
	 
	    function createJob(job) {
	        var deferred = $q.defer();
	        $http.post(REST_SERVICE_URI+'/postJobDetails', job)
	            .then(
	            function (response) {
	            	 window.alert("New Job has been created ");
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while creating Job');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
	 
	 
	    function updateJob(job, id) {
	        var deferred = $q.defer();
	        $http.put(REST_SERVICE_URI+'/updateJobDetails/'+id, job)
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while updating Job');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
	    
	    
	    
	 
	    function deleteJob(id) {
	        var deferred = $q.defer();
	        $http.get(REST_SERVICE_URI+'/removeJobDetails/'+id)
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while deleting Job');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
}]);