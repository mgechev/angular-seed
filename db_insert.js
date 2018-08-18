const Datastore = require('@google-cloud/datastore');
const fs = require('fs');

let datastore = new Datastore({
    projectId: 'climb-on-the-way-1487535946897'
});

var lines = fs.readFileSync('db_rows','utf8').split('\n');

lines.forEach(row => {
    let cols = row.split(', ');

    let data = {
        name: cols[0].substr(1, cols[0].length - 2), 
        lat: parseFloat(cols[1]),
        long: parseFloat(cols[2]),
        verified: true
    };

    if (data.name === '') {
     return;
    }
    
    let key = datastore.key(['Location', data.name+'-'+data.season]);
    datastore.insert({ key, data });
})
  
