(function() {
  module.exports = function(robot) {

    var Auth = require('../lib/auth.js');
    var auth = new Auth();
    var Regexp = require('../lib/regexp.js');
    var reg = new Regexp(robot.name);

    robot.hear(reg.exp('!help$', 'i'), function(res) {
      var doc = [
        res.message.user.name, // DO NOT REMOVE
        ':sparkling_heart: Hi! Most commands work in chat and in private.',
        'You can upvote things with `+1`. You can say `derp get <thing>` to retrieve a score, or `derp top` to see winners.',
        'To create a poll, say `!vote <thing>` and then a list of options. Each option should start with a backslash. Like:',
        '`!vote Who is the best pop artist? \\Taylor Swift\\Taylor Swift\\Also Taylor Swift`',
        'Votes last ten minutes by default, but you can specify a time like this: ',
        '`!vote +30 Question \\Answer\\Answer` (set a 30 minute timer)',
        'You\'ll receive more info on polls when you create one.',
        'You can also say `!roll` to roll dice. If you want, you can roll multiple dice using RPG notation: `!roll 2d12`'
      ];
      if (auth.isAdmin(res.message.user.name)) {
        doc.push(
          ':toot: _Hey,_ aren\'t you special? Someone gave you admin privs, so you can also ...',
          '`say <dest> <text>` to send messages to channels or other users',
          '`derp set <thing> <score>` to manually adjust the scoreboard. People will see you doing this, so don\'t abuse it.'
        );
      }
      return robot.messageRoom.apply(
        robot,
        doc
      );
    });

  }

}).call(this);
