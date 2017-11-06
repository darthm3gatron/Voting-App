var Vote = sequelize.define('Vote', {
    ip: DataTypes.STRING
}, {
    classMethods: {
        associate: function(models) {

        }
    }
});

var Choice = sequelize.define('Choice', {
    text: DataTypes.STRING,
    description: DataTypes.STRING
}, {
    classMethods: {
        associate: function(models) {
            Choice.hasMany(models, Vote, { as : 'votes' });
        }
    }
});

var Poll = sequelize.define('Poll', {
    question: DataTypes.STRING
}, {
    classMethods: {
        associate: function(models) {
            Poll.hasMany(models.Choice, { as: 'choices' });
        }
    }
});

var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    var Vote, Poll, Choice;

    return [Vote, Poll, Choice];
};

findCount: function(choiceId, callback) {
    Vote.count({
        where: { 'ChoiceId': choiceId }
    }).success(function(count) {
        callback(null, count);
    });
}

addVote: function(ip, choice, callback) {
    Poll.findAll({ where: Sequelize.and(
      {
        'choices.id': choice
      },
      {id: 
        { in:
          Sequelize.literal('select "Choices"."PollId" from "Votes", "Choices" where "Votes"."ChoiceId" = "Choices"."id" and "Votes"."ip" = \'' + ip + '\'')
        }
      }),
        include: [ {
          model: Choice, as: 'choices',
          include: [{ model: Vote, as: 'votes' }]}]
      }).success(function(votes) {
        if (!votes || votes.length === 0) {
          Vote.create({
            ip: ip,
            ChoiceId: choice
          })
            .success(function(vote) {
              callback(null, vote);
            });
        } else {
          callback("Vote already exists");
        }
      });
  },