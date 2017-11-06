var app = require('./server'),
    db = require('../app/models');

db.sequelize.sync({force: true}).complete(function(err) {
    if (err) {
        throw err[0];
    } else {
        require('../db/seed')(db);

        app.listen(app.get('port'),function() {
            console.log('express listening on ' + app.get('port'));
        });
    }
});