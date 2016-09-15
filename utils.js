function Utils() {

    this.dataByPeriodAndSportName = function(data, period, sportName) {
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

exports.utils = new Utils();