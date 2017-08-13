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

  $scope.accountData=[
    {name:"PNC",type:"Debit",amount:"500"},
    {name:"Discover",type:"Credit",amount:"0",limit:"2000"},
    {name:"Capital One",type:"Credit",amount:"0",limit:"500"}
  ];

  $scope.incomeData=[
    {account:"PNC",source:"Red Hat",amount:"1800",date:"15 June 2017",type:"Income"},
    {account:"PNC",source:"Red Hat",amount:"1800",date:"15 June 2017",type:"Income"},
    {account:"PNC",source:"Red Hat",amount:"1800",date:"15 June 2017",type:"Income"}
  ];

  $scope.expenseData=[
    {account:"PNC",source:"Plaza",amount:"10",date:"15 June 2017",type:"Expense",tag:"Food"},
    {account:"Discover",source:"Bojangles",amount:"20",date:"15 June 2017",type:"Expense",tag:"Food"},
    {account:"Capital One",source:"Amazon",amount:"30",date:"15 June 2017",type:"Expense",tag:"Shopping"}
  ];

  $scope.tags = {
    names:["Food","Shopping"],
    amounts:["30","30"]
  };

  $scope.getAccountsTable = function(accountName){
    var results = [];
    results = $scope.incomeData.filter(function(element){
      return element.account===accountName;
    });
    $scope.expenseData.filter(function(element){
      return element.account===accountName;
    }).forEach(function(element){
      results.push(element);
    });
    return results;
  };

  $scope.getAccountsTotal = function(account){
    var results = $scope.getAccountsTable(account.name);
    var total = parseInt(account.amount);
    if(account.type==='Debit'){
      results.forEach(function(element){
        switch (element.type) {
          case "Income":
          total = total + parseInt(element.amount);
          break;
          case "Expense":
          total = total - parseInt(element.amount);
          break;
        }
      });
    }else{
      results.forEach(function(element){
        switch (element.type) {
          case "Income":
          total = total - parseInt(element.amount);
          break;
          case "Expense":
          total = total + parseInt(element.amount);
          break;
        }
      });
    }

    return total;
  }

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
