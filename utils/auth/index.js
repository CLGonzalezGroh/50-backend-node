const passport = require('passport');

const LocalStrategy = require('./strategies/localStrategies');
const JwtStrategy = require('./strategies/jwtStrategy');

passport.use(LocalStrategy);
passport.use(JwtStrategy);
