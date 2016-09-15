var events = require('../data/events.json');
var sports = require('../data/sports.json');
var tabs = require('../data/tabs.json');

var ALL_SPORTS_ID = 100;

function getDeepObjectCopy (object) {
    return JSON.parse(JSON.stringify(object));
}

function isSportIdEqual(sportId1, sportId2) {
    return sportId1 == sportId2 || sportId2 == ALL_SPORTS_ID;
}

var unique = function(xs) {
    return xs.filter(function(x, i) {
        return xs.indexOf(x) === i;
    })
};

var data = {

    getTabs: function () {
        return tabs;
    },

    getSports: function () {
        return sports;
    },

    getEvents: function () {
        return events;
    },

    getEventById: function (eventId) {
        var event = {};
        for (var i = 0; i < events.length; i++) {
            if (events[i].id == eventId) {
                event = getDeepObjectCopy(events[i]);
                break;
            }
        }
        return event;
    },

    getSportIdByAlias: function (sportAlias) {
        var id = ALL_SPORTS_ID;
        var sport = this.getSportByAlias(sportAlias);
        if (sport) {
            id = sport.id;
        }
        return id;
    },

    getSportByAlias: function (sportAlias) {
        var sport = {};
        for (var i = 0; i < sports.length; i++) {
            if (sports[i].alias == sportAlias) {
                sport = getDeepObjectCopy(sports[i]);
                break;
            }
        }
        return sport;
    },

    getSportById: function (sportId) {
        var sport = {};
        for (var i = 0; i < sports.length; i++) {
            if (sports[i].id == sportId) {
                sport = getDeepObjectCopy(sports[i]);
                break;
            }
        }
        return sport;
    },

    getSportEventsByTabId: function (tabId) {
        var events = [];

        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].id == tabId) {
                events = getDeepObjectCopy(tabs[i].events);
                break;
            }
        }
        return events;
    },

    getSportEventsByTabAndSportId: function (tabId, sportId) {
        var result = [];
        var events = this.getSportEventsByTabId(tabId);

        for (var i = 0; i < events.length; i++) {
            var fullEvent = this.getEventById(events[i].id);
            if (isSportIdEqual(fullEvent.sportId, sportId)) {
                result.push(events[i]);
            }
        }

        return result;
    },

    getSportEventsByTabAndSportAlias: function (tabId, sportAlias) {
        return this.getSportEventsByTabAndSportId(tabId, this.getSportIdByAlias(sportAlias));
    },

    getFullSportEventsByTabAndSportId: function (tabId, sportId) {
        var allEvents = [];
        var tabEvents = this.getSportEventsByTabAndSportId(tabId, sportId);
        var i = 0,
            event;

        for (i = 0; i < tabEvents.length; i++) {

            event = this.getEventById(tabEvents[i].id);
            var sport = this.getSportById(event.sportId);

            if (isSportIdEqual(sport.id, sportId)) {
                event.bets = tabEvents[i].bets;
                event.sportName = sport.name;
                event.sportAlias = sport.alias;

                allEvents.push(event);
            }
        }

        for (i = 0; i < allEvents.length; i++) {
            event = allEvents[i];
            event.bets_value = this.getBetPopularity(allEvents, event);
        }

        return allEvents;
    },

    getFullSportEventsByTabAndSportAlias: function (tabId, sportAlias) {
        return this.getFullSportEventsByTabAndSportId(tabId, this.getSportIdByAlias(sportAlias));
    },

    getAllSportsWithEventsForTabAndSportId: function (tabId, sportId) {
        var allSports = this.getSportsWithEventsForTabId(tabId),
            i = 0;

        for (i = 0; i < allSports.length; i++) {
            if (isSportIdEqual(allSports[i].id, sportId)) {
                allSports[i].events = this.getFullSportEventsByTabAndSportId(tabId, sportId);
                allSports[i].selected = isSportIdEqual(allSports[i].id, sportId);
                break;
            }
        }

        for (i = 0; i < allSports.length; i++) {
            allSports[i].tab_id = tabId;
        }

        return allSports;
    },

    getAllSportsWithEventsForTabAndSportAlias: function (tabId, sportAlias) {
        return this.getAllSportsWithEventsForTabAndSportId(tabId, this.getSportIdByAlias(sportAlias));
    },

    getSportsWithEventsForTabId: function(tabId) {
        var nonEmptySports = [];
        var sports_tmp = getDeepObjectCopy(sports);
        var sportsEvents = this.getSportEventsByTabId(tabId);
        var i = 0;
        var sportIds = [ALL_SPORTS_ID];

        for (i = 0; i < sportsEvents.length; i++) {
            var event = this.getEventById(sportsEvents[i].id);
            sportIds.push(event.sportId);
        }

        sportIds = unique(sportIds);

        for (i = 0; i < sports_tmp.length; i++) {
            if (sportIds.indexOf(sports_tmp[i].id) > -1) {
                nonEmptySports.push(sports_tmp[i]);
            }
        }

        return nonEmptySports;
    },

    getBetPopularity: function (allEvents, event) {
        var popularity = 0;

        var bets = [];
        var eventBets = event.bets;
        
        for (var i = 0; i < allEvents.length; i++) {
            bets.push(allEvents[i].bets);
        }

        var max = Math.max.apply(Math, bets);

        popularity = Math.ceil(eventBets * 100 / max);

        return popularity;
    }

};

exports.data = data;