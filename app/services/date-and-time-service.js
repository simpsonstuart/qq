angular.module('QQ')
    .factory('DateAndTimeService', DateAndTimeService);

function DateAndTimeService(moment) {
    return {
        formatDate: formatDate,
        currentQuarter: currentQuarter,
        daysTill: daysTill
    };

    function formatDate(date) {
        return moment(date);
    }

    function currentQuarter() {
        return moment().quarter();
    }
    function daysTill(date) {
        return moment().to(date);
    }
}
