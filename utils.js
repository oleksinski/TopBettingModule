var data = require('./data.json');

var utils = {

    getAllData: function () {
        return data;
    },

    getTabs: function () {
        return data.tabs;
    },

    getMockData: function () {
        return data.sports;
    },

    getDataByTabAndSport: function (tabId, sportId) {
        var result = [];

        var sports = data.sports;
        var tabs = data.tabs;
        var events = data.events;

        var i, j, k;

        //
        result = sports;
        for (i = 0; i < tabs.length; i++) {
            var tab = tabs[i];
            if (tab.id === tabId) {
                var tabEvents = tab.events;

                //for (j = 0; j < )
            }
        }

        return result;
    },

    getTab: function(period) {
        return this.getTabs().filter(function(tab){
            if(tab.id == period) {
                return tab;
            }
        })[0];
    },

    getSport: function(sportName){
       return data.sports.filter(function(sport){
            if(sport.alias == sportName) {
                return sport;
            }
        })[0];
    },

    getTabEvents: function(period){
        return this.getTab(period).events;
    },

    getEventsBySport: function(sport) {
        return data.events.filter(function(event){
            if(event.sportId == sport.id) {
                return event;
            }
        });
    },

    extendEventByBets: function(tabEvents, event) {
        tabEvents.filter(function(tabEvent){
            if(event.id == tabEvent.id) {
                event.bets = tabEvent.bets
            }
        });
    },

    dataByPeriodAndSportName: function(period, sportName) {

        var tabEvents = this.getTabEvents(period);
        var sport = this.getSport(sportName);
        var events = this.getEventsBySport(sport);
        var self = this;
        var eventsWithBet = events.map(function(event){
            self.extendEventByBets(tabEvents, event);
            return event;
        });
        sport.events = eventsWithBet;
        return {'sports': [sport]};
    }

};

exports.utils = utils;