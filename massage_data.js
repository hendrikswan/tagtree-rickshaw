print("finding all sightings");
var all = db.ufo_awesome.find({}).toArray();
print("found " + all.length + " stightings");

function parseDate(dateString){
    if(dateString && dateString != ""){
        // print(dateString)
        var year = dateString.substring(0,4);
        var month = dateString.substring(4,6);
        var day = dateString.substring(6,8);

        return {
            year: parseInt(year),
            month: parseInt(month),
            day: parseInt(day)
        };
    }
}

all.forEach(function(sighting){
    //print(sighting.duration);

    // var reportedAt  = parseDate(sighting.reported_at);
    // var sightedAt  = parseDate(sighting.sighted_at);

    // db.ufo_awesome.update({_id: sighting._id}, {$set: {reported_at_date: reportedAt, sighted_at_date: sightedAt}});

    var reportedInt = sighting.reported_at_date.year + 
        sighting.reported_at_date.month + 
        sighting.reported_at_date.day;


    var sightedInt = sighting.sighted_at_date.year + 
        sighting.sighted_at_date.month + 
        sighting.sighted_at_date.day;

   if(reportedInt < sightedInt){
    db.ufo_awesome.update({_id: sighting._id}, {$set: {corrupt: true}});
   }
})