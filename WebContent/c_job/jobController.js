
'use strict'
app.controller(
		'jobController',
		 [
		  '$scope',
		  'jobService',
		  '$location',
		  '$rootScope',
		  '$http',
		  function($scope,jobService,$location,$rootScope,$http) {
			  console.log("Inside jobController ");

			  var self = this;
			    self.job={errorCode:'',errorMsg:'',jobId:null,salary:'',description:'',profile:'',location:'',qualification:'',slectionProcess:''};
			    $scope.job={errorCode:'',errorMsg:'',jobId:null,salary:'',description:'',profile:'',location:'',qualification:'',slectionProcess:''};
			    self.jobs=[];
			 
			    self.submit = submit;
			    self.edit = edit;
			    self.remove = remove;
			    self.reset = reset;
			 
			    console.log("self initialized.."+self.job.description);
			    fetchAllJobs();
			 
			    function fetchAllJobs(){
			        jobService.fetchAllJobs()
			            .then(
			       
			            function(d) {
			            	 console.log("fetching jobs and asigning to self.."+d.length);
			                self.jobs = d;
			                $scope.jobs =d ;
			            },
			            function(errResponse){
			                console.error('Error while fetching Jobs..');
			            }
			        );
			    }
			    
			 

			 
			     function createJob(job){
			    	 console.log('Inside create job...');
			    	jobService.createJob(job)
			            .then(
			            fetchAllJobs,
			            
			            function(errResponse){
			                console.error('Error while creating Jobs');
			            }
			        );
			    }
			 
			    $scope.updateJob = function updateJob(job, id){
			    	jobService.updateJob(job, id)
			            .then(
			            fetchAllJobs,
			            function(errResponse){
			                console.error('Error while updating Job');
			            }
			        );
			    }
			 
			    $scope.deleteJob  = function deleteJob(id){
			    	jobService.deleteJob(id)
			            .then(
			            fetchAllJobs,
			            function(errResponse){
			                console.error('Error while deleting Job');
			            }
			        );
			    }
			 
			    function submit() {
			    	 console.log('Inside submit...');
			    	 
			       /* if(self.user.userId===null){*/
			            createJob(self.job);
		/*	        }else{
			            updateUser(self.user, self.user.userId);
			            console.log('User updated with id ', self.user.userId);
			        }*/
			        reset();
			    }
			 
			    function edit(id){
			        console.log('id to be edited', id);
			        for(var i = 0; i < self.jobs.length; i++){
			            if(self.jobs[i].jobId === id) {
			                self.job = angular.copy(self.jobs[i]);
			                break;
			            }
			        }
			    }
			 
			    function remove(id){
			        console.log('id to be deleted', id);
			        if(self.job.jobId === id) {//clean form if the user to be deleted is shown there.
			            reset();
			        }
			        jobEvent(id);
			    }
			 
			 
			    function reset(){
			    	 self.job={errorCode:'',errorMsg:'',jobId:null,salary:'',description:'',profile:'',location:'',qualification:'',slectionProcess:''};
			        $scope.jobForm.$setPristine(); //reset Form
			    }
			  	
}]);