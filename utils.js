var data = require('./data.json');

var utils = {

    getAllData: function () {
        return data;
    },

    getTabs: function () {
        return data.tabs;
    },

    dataByPeriodAndSportName: function(period, sportName) {
        var period = period;
        var sport = data.sports.filter(function(sport){
            if(sport.alias == sportName) {
                return sport;
            }
        })[0];
        var events = data.events.filter(function(event){
            if(event.sportId == sport.id) {
                return event;
            }
        });
        sport.events = events;
        return {'sports': [sport]};
    }

};

exports.utils = utils;