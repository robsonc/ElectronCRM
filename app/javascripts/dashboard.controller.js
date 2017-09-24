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

        //chart options
        vm.d3Options = {
            chart: {
                type: 'multiBarChart',
                height: 200,
                x: function (d) { return d.label; },
                y: function (d) { return d.value; },
                showControls: false,
                showValues: true,
                duration: 500,
                xAxis: {
                    axisLabel: 'Dias',
                    showMaxMin: false
                },
                yAxis: {
                    axisLabel: 'Total de Vendas',
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

        activate();

        //fill the array of labels
        //fill the array of data with default values
        //find the indexes that corresponds to the results _id
        //fill the positions with the value in result data

        function activate() {
            SaleService.getTotalSalesByMonth().then(function (results) {
                //view logic
                var data = [];
                //fill chart data with default value
                for (var i = 0; i <= 12; i++) {
                    data.push({
                        label: $moment.months(i),
                        value: 0
                    });
                }

                //fill chart data with database value
                results.forEach(function (r) {
                    data[r._id - 1].value = r.amount;
                });

                vm.data = [
                    {
                        "key": "Series",
                        "color": "#2d77b3",
                        "values": data
                    }
                ];
            }, function (err) {
                console.error(err);
            });

            SaleService.getAverageTicketByMonth().then(function (results) {
                //view logic
                var data = [];
                //fill chart data with default value
                for (var i = 0; i <= 12; i++) {
                    data.push({
                        label: $moment.months(i),
                        value: 0
                    });
                }

                //fill chart data with database value
                results.forEach(function (r) {
                    data[r._id - 1].value = r.amount;
                });

                vm.dataAverageTicketByMonth = [
                    {
                        "key": "Series",
                        "color": "#2d77b3",
                        "values": data
                    }
                ];
            }, function (err) {
                console.error(err);
            });

            SaleService.getAverageTicket().then(function (results) {
                console.log('Average:', results);
                vm.averageTicket = results[0].amount;
            }, function (err) {
                console.error(err);
            });

            SaleService.getTotalSales().then(function (results) {
                console.log('Total Sales:', results);
                vm.totalSales = results[0].amount;
            }, function (err) {
                console.error(err);
            });

            SaleService.getCountSales().then(function (result) {
                console.log('Count Sales:', result);
                vm.countSales = result;
            }, function (err) {
                console.error(err);
            });

            SaleService.getTotalSalesByLastDays(7).then(function (results) {
                //view logic
                var days = [];
                var dados = [];
                var currentDate = null;
                //fill labels and data
                for (var i = 0; i <= 7; i++) {
                    currentDate = $moment().subtract(i, 'days');

                    days[i] = currentDate.format('YYYY-MM-DD');

                    dados.push({
                        label: currentDate.format('DD/MM'),
                        value: 0
                    });
                }

                _.reverse(days);
                _.reverse(dados);

                //fill chart data with database value
                results.forEach(function (r) {
                    var index = _.findIndex(days, function (day) {
                        return ($moment(day).date() == r._id);
                    });

                    dados[index].value = r.amount;
                });

                vm.dataLastDays = [
                    {
                        "key": "Series",
                        "color": "#1f77b4",
                        "values": dados
                    }
                ];
            }, function (err) {
                console.error(err);
            });

            SaleService.getTotalSalesByLastDays(30).then(function (results) {

                //view logic
                var days = [];
                var dados = [];
                var currentDate = null;
                //fill labels and data
                for (var i = 0; i <= 30; i++) {
                    currentDate = $moment().subtract(i, 'days');

                    days[i] = currentDate.format('YYYY-MM-DD');

                    dados.push({
                        label: currentDate.format('DD/MM'),
                        value: 0
                    });
                }

                _.reverse(days);
                _.reverse(dados);

                results.forEach(function (r) {
                    var index = _.findIndex(days, function (day) {
                        return (($moment(day).date() === r._id) && ($moment(day).month() + 1 === r.month));
                    });

                    dados[index].value = r.amount;
                });

                vm.dataLast30Days = [
                    {
                        "key": "Series",
                        "color": "#1f77b4",
                        "values": dados
                    }
                ];
            }, function (err) {
                console.error(err);
            });
        }

        /////////////////////////////////////
    }
})();