var express          = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    Campground      = require('./models/campground'),
    mongoose        = require('mongoose'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local'),
    Comment         = require('./models/comment'),
    methodOverride  = require('method-override'),
    User            = require('./models/user'),
    flash           = require('connect-flash'),
    seedDB          = require('./seeds');
    
var commentRoutes    = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    indexRoutes       = require('./routes/index');
    
//seedDB(); //seed the database
//var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp"
var url = "mongodb://localhost/yelp_camp_admin";
mongoose.connect(url);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIG
app.use(require('express-session')({
    secret: "Again noah is literally the cutest cat ever",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

//requiring routes
app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp has started");
});