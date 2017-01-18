var liftoff = angular.module('liftoff', []);

liftoff.controller('CountdownListController', function CountdownListController($scope, $interval) {
    // Create an update loop; exit if we already have one
    var update_loop;
    if (angular.isDefined(update_loop)) {
        return;
    }

    update_loop = $interval(() => {
        
        $scope.countdowns = [
            new Countdown('University - Spring \'17', new Date(2017, 0, 17, 15, 30), new Date(2017, 4, 11, 18, 5)),
            new Countdown('Week #1', new Date(2017, 0, 17, 15, 30), new Date(2017, 0, 20, 19)),
            new Countdown('Week #2', new Date(2017, 0, 23, 16, 5), new Date(2017, 0, 27, 19)),
            new Countdown('Week #3', new Date(2017, 0, 30, 16, 5), new Date(2017, 1, 3, 19)),
            new Countdown('Trump Presidency', new Date(2017, 0, 20), new Date(2021, 0, 20))
        ];
        
    }, 100);

    // Stop the update loop when the scope is destroyed.
    $scope.$on('$destroy', () => {
        $interval.cancel(update_loop);
    });

});


class Countdown {
    constructor(name, start, end) {
        this.name = name;
        this.start = start;
        this.end = end;
    }

    get percent() {
        var percent = 100 * ((new Date() - this.start) / (this.end - this.start));
        return Math.max(0, Math.min(100, percent));
    }

    get percent_rounded() {
        var PLACES = Math.pow(10, 4);
        return Math.round(this.percent * PLACES) / PLACES;
    }
}
