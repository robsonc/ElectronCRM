(function () {
    'use strict';

    angular
        .module('TodoList')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$moment', 'Sale', '$filter', 'SaleService', '_'];

    function DashboardController($moment, Sale, $filter, SaleService, _) {
        var vm = this;

        vm.labels = $moment.months();
        vm.data = [];
        vm.series = [];

        vm.labelsLastDays = [];
        vm.dataLastDays = [];
        vm.seriesLastDays = [];

        vm.labelsLast30Days = [];
        vm.dataLast30Days = [];
        vm.seriesLast30Days = [];

        vm.options = {
            responsive: true,
            maintainAspectRatio: false
        };

        activate();

        function activate() {
            SaleService.getTotalSalesByMonth().then(function (results) {
                //view logic
                //fill chart data with default value
                for (var i = 0; i <= 12; i++) {
                    vm.data[i] = 0;
                }

                //fill chart data with database value
                results.forEach(function (r) {
                    vm.data[r._id - 1] = r.amount;
                });
            }, function (err) {
                console.error(err);
            });

            //fill the array of labels
            //fill the array of data with default values
            //find the indexes that corresponds to the results _id
            //fill the positions with the value in result data

            SaleService.getTotalSalesByLast7Days().then(function (results) {
                //view logic
                var days = [];
                //fill labels and data
                for (var i = 0; i <= 7; i++) {
                    vm.labelsLastDays[i] = $moment().subtract(i, 'days').format('DD/MM');
                    days[i] = $moment().subtract(i, 'days').format('YYYY-MM-DD');
                    vm.dataLastDays[i] = 0;
                }

                _.reverse(vm.labelsLastDays);
                _.reverse(days);

                //fill chart data with database value
                results.forEach(function (r) {
                    var index = _.findIndex(days, function (day) {
                        return ($moment(day).date() == r._id);
                    });

                    vm.dataLastDays[index] = r.amount;
                });
            }, function (err) {
                console.error(err);
            });

            SaleService.getTotalSalesByLast30Days().then(function (results) {
                //view logic
                var days = [];
                //fill labels and data
                for (var i = 0; i <= 30; i++) {
                    vm.labelsLast30Days[i] = $moment().subtract(i, 'days').format('DD/MM');
                    days[i] = $moment().subtract(i, 'days').format('YYYY-MM-DD');
                    vm.dataLast30Days[i] = 0;
                }

                _.reverse(vm.labelsLast30Days);
                _.reverse(days);

                //fill chart data with database value
                results.forEach(function (r) {
                    var index = _.findIndex(days, function (day) {
                        return (($moment(day).date() === r._id) && ($moment(day).month() + 1 === r.month));
                    });

                    vm.dataLast30Days[index] = r.amount;
                });
            }, function (err) {
                console.error(err);
            });

            vm.d3Options = {
                chart: {
                    type: 'multiBarChart',
                    height: 450,
                    x: function (d) { return d.label; },
                    y: function (d) { return d.value; },
                    //yErr: function(d){ return [-Math.abs(d.value * Math.random() * 0.3), Math.abs(d.value * Math.random() * 0.3)] },
                    showControls: true,
                    showValues: true,
                    duration: 500,
                    xAxis: {
                        showMaxMin: false
                    },
                    yAxis: {
                        axisLabel: 'Values',
                        tickFormat: function (d) {
                            return d3.format(',.2f')(d);
                        }
                    },
                    tooltip: {
                        valueFormatter: function (d) {
                            return $filter('currency')(d, 'R$ ');
                        }
                    }
                }
            };

            vm.d3Data = [
                {
                    "key": "Series1",
                    "color": "#d62728",
                    "values": [
                        {
                            "label": "Group A",
                            "value": -1.8746444827653
                        },
                        {
                            "label": "Group B",
                            "value": -8.0961543492239
                        },
                        {
                            "label": "Group C",
                            "value": -0.57072943117674
                        },
                        {
                            "label": "Group D",
                            "value": -2.4174010336624
                        },
                        {
                            "label": "Group E",
                            "value": -0.72009071426284
                        },
                        {
                            "label": "Group F",
                            "value": -0.77154485523777
                        },
                        {
                            "label": "Group G",
                            "value": -0.90152097798131
                        },
                        {
                            "label": "Group H",
                            "value": -0.91445417330854
                        },
                        {
                            "label": "Group I",
                            "value": -0.055746319141851
                        }
                    ]
                },
                {
                    "key": "Series2",
                    "color": "#1f77b4",
                    "values": [
                        {
                            "label": "Group A",
                            "value": 25.307646510375
                        },
                        {
                            "label": "Group B",
                            "value": 16.756779544553
                        },
                        {
                            "label": "Group C",
                            "value": 18.451534877007
                        },
                        {
                            "label": "Group D",
                            "value": 8.6142352811805
                        },
                        {
                            "label": "Group E",
                            "value": 7.8082472075876
                        },
                        {
                            "label": "Group F",
                            "value": 5.259101026956
                        },
                        {
                            "label": "Group G",
                            "value": 0.30947953487127
                        },
                        {
                            "label": "Group H",
                            "value": 0
                        },
                        {
                            "label": "Group I",
                            "value": 0
                        }
                    ]
                }
            ];
        }

        /////////////////////////////////////
    }
})();