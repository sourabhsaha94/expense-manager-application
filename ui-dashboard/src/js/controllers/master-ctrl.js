/**
 * Master Controller
 */

angular.module('RDash').controller(
		'MasterCtrl',
		[ '$scope', '$cookieStore', '$timeout', '$stateParams', '$http',
				MasterCtrl ]);

function MasterCtrl($scope, $cookieStore, $timeout, $stateParams, $http) {

	$http.get('database.json').then(function(response) {
		$scope.user = response.data[0];
		$scope.accountData = $scope.user.data[0].accountData;
		$scope.incomeData = $scope.user.data[1].incomeData;
		$scope.expenseData = $scope.user.data[2].expenseData;
//		$scope.tags = $scope.user.data[3].tags;
		console.log($scope.user);
	});
	
	$scope.tags = {
		names : [ "Food", "Shopping" ],
		amounts : [ "30", "30" ]
	};

	$scope.newAccountData = {};
	$scope.newExpenseData = {};
	$scope.newIncomeData = {};

	$scope.addAccount = function() {

		var valid = false;

		if ($scope.newAccountData.type && $scope.newAccountData.name
				&& $scope.newAccountData.amount) {
			if ($scope.newAccountData.type === "Credit") {
				if (parseInt($scope.newAccountData.limit) > 0) {
					valid = true;
				} else {
					valid = false;
				}
			} else {
				valid = true;
			}
		} else {
			valid = false;
		}
		if (valid) {
			$scope.newAccountData.id = getRandomID(Math.random() * 999 + 1,
					Math.random() * 999 + 1);
			$scope.accountData.push($scope.newAccountData);
		}
		$scope.editAccountFlag = false;
		$scope.newAccountData = {};
		console.log($scope.accountData);
	};

	$scope.deleteAccount = function(accountId) {
		var accountInfo = {};
		for (var i = 0; i < $scope.accountData.length; i++) {
			if ($scope.accountData[i].id === accountId) {
				accountInfo = $scope.accountData.splice(i, 1)[0];
				break;
			}
		}
		console.log($scope.accountData);
		return accountInfo;
	};

	$scope.editAccount = function(accountId) {
		$scope.newAccountData = $scope.deleteAccount(accountId);
		console.log($scope.newAccountData);
		$scope.editAccountFlag = true;
	};

	$scope.getAccountsTable = function(accountName) {
		var results = [];
		results = $scope.incomeData.filter(function(element) {
			return element.account === accountName;
		});
		$scope.expenseData.filter(function(element) {
			return element.account === accountName;
		}).forEach(function(element) {
			results.push(element);
		});
		return results;
	};
	
	$scope.getAccountNames = function(){
		var results=[];
		$scope.accountData.forEach(function(element){
			results.push(element.name);
		});
		return results;
	}

	$scope.newExpense = function() {
		if ($stateParams.addNewExpense === "true" || $scope.editExpenseFlag) {
			return true;
		} else {
			return false;
		}
	}

	$scope.getAccountsTotal = function(account) {
		var results = $scope.getAccountsTable(account.name);
		var total = parseInt(account.amount);
		if (account.type === 'Debit') {
			results.forEach(function(element) {
				switch (element.type) {
				case "Income":
					total = total + parseInt(element.amount);
					break;
				case "Expense":
					total = total - parseInt(element.amount);
					break;
				}
			});
		} else {
			results.forEach(function(element) {
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

	
	$scope.addExpense = function() {

		var valid = false;

		if ($scope.newExpenseData.source && $scope.newExpenseData.account
				&& $scope.newExpenseData.amount && $scope.newExpenseData.date) {
			valid = true;
		} else {
			valid = false;
		}
		if (valid) {
			$scope.newExpenseData.id = getRandomID(Math.random() * 999 + 1,
					Math.random() * 999 + 1);
			$scope.newExpenseData.type="Expense";
			$scope.expenseData.push($scope.newExpenseData);
		}
		$scope.editExpenseFlag = false;
		console.log(valid);
		$scope.newExpenseData = {};
	};

	$scope.deleteExpense = function(expenseId) {
		var expenseInfo = {};
		for (var i = 0; i < $scope.expenseData.length; i++) {
			if ($scope.expenseData[i].id === expenseId) {
				expenseInfo = $scope.expenseData.splice(i, 1)[0];
				break;
			}
		}
		return expenseInfo;
	};

	$scope.editExpense = function(expenseId) {
		$scope.newExpenseData = $scope.deleteExpense(expenseId);
		$scope.editExpenseFlag = true;
	};

	function getRandomID(start, end) {
		return Math.floor(Math.random() * end + start);
	}
};
