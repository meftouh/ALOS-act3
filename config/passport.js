
const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secret;
module.exports=passport=>{
     passport.use(
  new JwtStrategy(opts,(payload,done)=>{
    if (payload.id && payload.name &&payload.email ) {
      
        return done(null, {
          id: payload.id,
          name: payload.name,
          email: payload.email,

        });
      } else {
        return done(null, false);
      }
  })

); 
};
