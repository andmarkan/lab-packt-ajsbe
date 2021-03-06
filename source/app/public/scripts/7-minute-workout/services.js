+function (window, angular, sevenMinuteWorkout) {
    'use strict';
    
    sevenMinuteWorkout.factory('workoutHistoryTracker', ['$rootScope', function ($rootScope) {
        var MAX_HISTORY_ITEMS = 20; // Track for last 20 exercises

        var _workoutHistory = [],
            _currentWorkoutLog = null;
            
        var _service = {
            startTracking: function () {
                _currentWorkoutLog = { 
                    startedOn: new Date().toISOString(),
                    completed: false,
                    exercisesDone: 0 
                };
                
                if (_workoutHistory.length >= MAX_HISTORY_ITEMS)
                    _workoutHistory.shift();

                _workoutHistory.push(_currentWorkoutLog);
            },
            endTracking: function (completed) {
                _currentWorkoutLog.completed = completed;
                _currentWorkoutLog.endedOn = new Date().toISOString();
                _currentWorkoutLog = null;
            },
            getHistory: function () {
                return _workoutHistory;
            }
        };
        
        $rootScope.$on('$routeChangeSuccess', function (e, args) {
            // End the current tracking if in progress the route changes
            if (_currentWorkoutLog)
                _service.endTracking(false); 
        });
        
        return _service;
    }]);
}(this, this.angular, this.sevenMinuteWorkout);
