;(function (angular) {
    "use strict";

    angular.module("StarRating", [])
          .directive("starRating", ["$timeout", starRating]);

    function starRating($timeout) {
        return {
            restrict: "AE",
            template: '<ul class="star-rating" ng-mouseout="hover(-1)">' +
                      '  <li ng-repeat="star in stars" class="star" ng-class="{checked: star.checked, hover: star.hover}" ng-click="toggle($index)" ng-mouseover="hover($index)">' +
                      '    <i class="fa fa-star"></i>' +
                      '  </li>' +
                      '</ul>',
            scope: {
                rating: "=ngModel",
                max: "=?"
            },
            link: function ($scope, elem) {

                if (!$scope.max) {
                    $scope.max = 5;
                }

                $scope.stars = [];

                for (var x = 0; x < $scope.max; x++) {
                    $scope.stars.push({
                        checked: x < $scope.rating,
                        hover: false
                    });
                };

                $scope.update = function () {
                    for (var x = 0; x < $scope.max; x++) {
                        $scope.stars[x].checked = x < $scope.rating;
                    }
                }

                $scope.hover = function (index) {
                    for (var x = 0; x < $scope.max; x++) {
                        $scope.stars[x].hover = x <= index;
                    }
                };

                $scope.$watch("rating", function () {
                    $scope.update();
                }, true);

                $scope.toggle = function (index) {
                    var newValue = index + 1;

                    if (newValue === $scope.rating) {
                        return;
                    }
                    $scope.rating = newValue;
                    $scope.update();
                };
            }
        }
    }
})(angular);