/**
 * Master Controller
 */

angular.module('RDash')
    .controller('MasterCtrl', ['$scope', '$cookieStore', '$timeout', MasterCtrl]);

function MasterCtrl($scope, $cookieStore, $timeout) {
	
	$scope.dataList = [
		{type:"query",text:"Hello"},
		{type:"query",text:"What can I do for you?"}
	];
	
	$scope.response = {};
	
	$scope.submitQuery = function(){
		$scope.response.type="response";
		$scope.dataList.push($scope.response);
		$timeout(function(){$scope.dataList.push(evaluateQuery($scope.response.text))},2000);
		$scope.response={};
	};
	
	
	/**
     * Sidebar Toggle & Cookie Control
     *
	var mobileView = 992;
    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };
    */
}

function evaluateQuery(response){
	var reply = {};
	reply.type="query";
	reply.text="Okay";
	return reply;
};
