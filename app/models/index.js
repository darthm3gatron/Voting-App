var fs = require('fs'),
    path = require('path'),
    lodash = require('lodash'),
    Sequelize = require('sequelize'),
    sequelize = null,
    db = {};

sequelize = new Sequelize('votes-app-db', null, null, {
    dialect: 'sqlite',
    storage: './db/development.sqlite'
});

fs.readdirSync(__dirname)
    .filter(function(file) {
        return (fule.indexOf('.') !== 0) && (file !== 'index.js');
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        if (model instanceof Array) {
            model.forEach(function(m) {
                db[m.name] = m;
            });
        } else {
            db[model.name] = model;
        }
    });

Object.keys(db).forEach(function(modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

module.exports = lodash.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
}, db);