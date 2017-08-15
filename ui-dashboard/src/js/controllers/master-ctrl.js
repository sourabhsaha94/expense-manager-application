/**
* Master Controller
*/

angular.module('RDash')
.controller('MasterCtrl', ['$scope', '$cookieStore', '$timeout','$stateParams', MasterCtrl]);

function MasterCtrl($scope, $cookieStore, $timeout, $stateParams) {

  $scope.accountData=[
    {id:0,name:"PNC",type:"Debit",amount:"500"},
    {id:1,name:"Discover",type:"Credit",amount:"0",limit:"2000"},
    {id:2,name:"Capital One",type:"Credit",amount:"0",limit:"500"}
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

  $scope.newAccountData={};

  $scope.addAccount = function(){

    var valid = false;

    if($scope.newAccountData.type && $scope.newAccountData.name && $scope.newAccountData.amount){
      if($scope.newAccountData.type==="Credit"){
        if(parseInt($scope.newAccountData.limit)>0){
          valid=true;
        }else{
          valid=false;
        }
      }else{
        valid=true;
      }
    }else{
      valid=false;
    }
    if(valid){
      $scope.newAccountData.id = getRandomID(Math.random()*999+1,Math.random()*999+1);
      $scope.accountData.push($scope.newAccountData);
    }
    $scope.editAccountFlag=false;
    $scope.newAccountData={};
    console.log($scope.accountData);
  };

  $scope.deleteAccount = function(accountId){
      var accountInfo={};
      for(var i=0;i<$scope.accountData.length;i++){
        if($scope.accountData[i].id===accountId){
          accountInfo = $scope.accountData.splice(i,1)[0];
          break;
        }
      }
      console.log($scope.accountData);
      return accountInfo;
  };

  $scope.editAccount = function(accountId){
    $scope.newAccountData = $scope.deleteAccount(accountId);
    console.log($scope.newAccountData);
    $scope.editAccountFlag=true;
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

  $scope.newAccount = function(){
    if($stateParams.addNewAccount==="true" || $scope.editAccountFlag){
      return true;
    }
    else {
      return false;
    }
    console.log($scope.accountData);
  }

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
  };

  function getRandomID(start,end){
    return Math.floor(Math.random()*end+start);
  }
};
