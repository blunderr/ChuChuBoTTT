exports.commands = {
    g: function(arg, by, room) {
        if (!checkGame(room)) return false;
        var game = checkGame(room);
        if (['anagram', 'trivia', 'hangman', 'kunc', 'statspread'].indexOf(game) > -1) {
            Commands['guess' + game].call(this, arg, by, room);
        }
    },
    start: function(arg, by, room) {
        if (!checkGame(room)) return false;
        var game = checkGame(room);
        if (['blackjack', 'crazyeights', 'ambush', 'passthebomb'].indexOf(game) > -1) {
            Commands[game].call(this, 'start', by, room);
        }
    },
    autostart: function(arg, by, room) {
        if (!Bot.canUse('signups', room, by)) return false;
        var game = checkGame(room);
        var time = arg.replace(/[^0-9]/g, '');
        if (!time || parseInt(time) < 30) return Bot.say(by, room, 'Invalid time/Choose a time above 30 seconds.');
        if (['blackjack', 'crazyeights', 'ambush', 'passthebomb'].indexOf(game) > -1) {
            Bot.say(by, room, 'Starting the game of ' + game + ' in ' + time + ' seconds!')
            setTimeout(function() {
                if (checkGame(room) && checkGame(room) === game) {
                    Commands[game].call(this, 'start', config.nick, room);
                }
            }, time * 1000);
        }
    },
    end: function(arg, by, room) {
        if (!checkGame(room)) return false;
        var game = checkGame(room);
        if (['blackjack', 'crazyeights', 'ambush', 'passthebomb'].indexOf(game) > -1) {
            Commands[game].call(this, 'end', by, room);
        }
        if (['anagram', 'trivia', 'hangman', 'kunc', 'statspread'].indexOf(game) > -1) {
            Commands[game + 'end'].call(this, arg, by, room);
        }
    },
    join: function(arg, by, room) {
        if (!checkGame(room)) return;
        var game = checkGame(room);
        if (['blackjack', 'crazyeights', 'ambush', 'passthebomb'].indexOf(game) > -1) {
            Commands[game].call(this, 'join', by, room);
        }
    },
    leave: function(arg, by, room) {
        if (!checkGame(room)) return false;
        var game = checkGame(room);
        if (['blackjack', 'crazyeights', 'ambush', 'passthebomb'].indexOf(game) > -1) {
            Commands[game].call(this, 'leave', by, room);
        }
    },
    players: function(arg, by, room) {
        if (!checkGame(room)) return false;
        var game = checkGame(room);
        if (['blackjack', 'crazyeights', 'ambush', 'passthebomb'].indexOf(game) > -1) {
            Commands[game].call(this, 'players', by, room);
        }
    },
    skip: function(arg, by, room) {
        if (!checkGame(room)) return false;
        var game = checkGame(room);
        if (['kunc', 'statspread'].indexOf(game) > -1) {
            Commands[game].call(this, '', by, room, 'skip' + game);
        }
    },
    signups: function(arg, by, room) {
        var game = toId(arg.split(',')[0]);
        arg = arg.split(',').slice(1).join(',').trim();
        switch (game) {
            case 'bj':
            case 'blackjack':
            case 'blowjob':
                Commands.blackjack.call(this, 'new', by, room);
                break;
            case 'crazyeights':
            case 'c8':
                Commands.crazyeights.call(this, 'new', by, room);
                break;
            case 'trivia':
                Commands.trivia.call(this, arg, by, room);
                break;
            case 'hangman':
                Commands.hangman.call(this, arg, by, room);
                break;
            case 'anagrams':
                Commands.anagrams.call(this, arg, by, room);
                break;
            case 'kunc':
                Commands.kunc.call(this, arg, by, room, 'kunc');
                break;
            case 'statspread': case 'ss':
                Commands.statspread.call(this, arg, by, room, 'statspread');
                break;
            case 'ambush':
                Commands.ambush.call(this, 'new', by, room);
                break;
            case 'bomb':
            case 'passthebomb':
            case 'ptb':
                Commands.passthebomb.call(this, 'new', by, room);
                break;
        }
    },
    points: function(arg, by, room) {
        if (!checkGame(room)) return false;
        var game = checkGame(room);
        if (['kunc', 'statspread', 'trivia', 'anagram'].indexOf(game) > -1) {
            Commands[game + 'points'].call(this, arg, by, room);
        }
    },
    randgame: 'randomgame',
    randomgame: function(arg, by, room) {
        if (!Bot.canUse('signups', room, by)) return false;
        var gameCount = 8;
        var rand = ~~(Math.random() * gameCount);
        switch (rand) {
            case 0:
                Commands.blackjack.call(this, 'new', '~', room);
                break;
            case 1:
                Commands.trivia.call(this, arg, '~', room);
                break;
            case 2:
                Commands.hangman.call(this, arg, '~', room);
                break;
            case 3:
                Commands.anagrams.call(this, arg, '~', room);
                break;
            case 4:
                Commands.crazyeights.call(this, 'new', '~', room);
                break;
            case 5:
                Commands.kunc.call(this, '5', '~', room, 'kunc');
                break;
            case 6:
                Commands.statspread.call(this, '5', '~', room, 'statspread');
                break;
            case 7:
                Commands.ambush.call(this, 'new', '~', room);
                break;
            case 8:
                Commands.passthebomb.call(this, 'new', '~', room);
                break;
        }
    },
};

/****************************
 *       For C9 Users        *
 *****************************/
// Yes, sadly it can't be done in one huge chunk w/o undoing it / looking ugly :(

/* globals toId */
/* globals checkGame */
/* globals Commands */
/* globals Bot */
