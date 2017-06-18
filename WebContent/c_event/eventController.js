
'use strict'
app.controller(
		'eventController',
		 [
		  '$scope',
		  'eventService',
		  '$location',
		  '$rootScope',
		  '$http',
		  function($scope,eventService,$location,$rootScope,$http) {
			  console.log("Inside eventController ");

			  var self = this;
			    self.event={errorCode:'',errorMessage:'',id:'',name:'',venue:'',description:'',eventDate:''};
			    $scope.event={errorCode:'',errorMessage:'',id:'',name:'',venue:'',description:'',eventDate:''};
			    self.events=[];
			 
			    self.submit = submit;
			    self.edit = edit;
			    self.remove = remove;
			    self.reset = reset;
			 
			    console.log("self initialized.."+self.event.eventLocation);
			    fetchAllEvents();
			 
			    function fetchAllEvents(){
			        eventService.fetchAllEvents()
			            .then(
			       
			            function(d) {
			            	 console.log("fetching events and asigning to self.."+d.length);
			                self.events = d;
			                $scope.events =d ;
			            },
			            function(errResponse){
			                console.error('Error while fetching Events..');
			            }
			        );
			    }
			    
			 

			 
			     function createEvent(event){
			    	 console.log('Inside create event...');
			    	eventService.createEvent(event)
			            .then(
			            fetchAllEvents,
			            
			            function(errResponse){
			                console.error('Error while creating Events');
			            }
			        );
			    }
			 
			    $scope.updateEvent = function updateEvent(event, id){
			    	eventService.updateEvent(event, id)
			            .then(
			            fetchAllEvents,
			            function(errResponse){
			                console.error('Error while updating Event');
			            }
			        );
			    }
			 
			    $scope.deleteEvent  = function deleteEvent(id){
			    	eventService.deleteEvent(id)
			            .then(
			            fetchAllEvents,
			            function(errResponse){
			                console.error('Error while deleting Event');
			            }
			        );
			    }
			 
			    function submit() {
			    	 console.log('Inside submit...');
			    	 
			       /* if(self.user.userId===null){*/
			            createEvent(self.event);
		/*	        }else{
			            updateUser(self.user, self.user.userId);
			            console.log('User updated with id ', self.user.userId);
			        }*/
			        reset();
			    }
			 
			    function edit(id){
			        console.log('id to be edited', id);
			        for(var i = 0; i < self.events.length; i++){
			            if(self.events[i].id === id) {
			                self.event = angular.copy(self.events[i]);
			                break;
			            }
			        }
			    }
			 
			    function remove(id){
			        console.log('id to be deleted', id);
			        if(self.event.eventId === id) {//clean form if the user to be deleted is shown there.
			            reset();
			        }
			        deleteEvent(id);
			    }
			 
			 
			    function reset(){
			    	self.event={errorCode:'',errorMessage:'',id:'',name:'',venue:'',description:'',eventDate:''};
			        $scope.eventForm.$setPristine(); //reset Form
			    }
			  	
}]);