/**
 * Master Controller
 */

angular.module('RDash')
    .controller('MasterCtrl', ['$scope', '$cookieStore', '$timeout', MasterCtrl]);

function MasterCtrl($scope, $cookieStore, $timeout) {

	$scope.dataList = [
		{type:"query",text:"Hello, What can I do for you?"},
		{type:"query",text:"1. To add an expense, type expense"},
		{type:"query",text:"2. To add an account, type account"},
		{type:"query",text:"3. To add an income, type income"},
	];
	
	$scope.response = {};
	
	$scope.submitQuery = function(){
		$scope.response.type="response";
		$scope.dataList.push($scope.response);
		var text = $scope.response.text;
		$timeout(function(){$scope.dataList.push(evaluateQuery(text))},2000);
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
	console.log(response);
	reply.type="query";
	var filler=["Okay! ","Perfect! ","Got it! "];
	
	switch(response){
	case "expense":reply.text = "Expense has been added";
		break;
	case "income":reply.text = "Income has been added";
		break;
	case "account":reply.text = "Account has been added";
		break;
	}
	
	return reply;
};
