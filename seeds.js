var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?auto=compress&cs=tinysrgb&h=350",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut mi justo. Nulla sit amet feugiat sapien. Vestibulum in ipsum eget ex viverra laoreet a quis quam. Ut sit amet ipsum ut turpis lacinia consequat a vel lacus. Donec mattis pulvinar risus. Suspendisse magna elit, posuere ac felis varius, aliquam convallis nisi. Integer ut sollicitudin lacus. Integer dapibus, mi quis eleifend laoreet, nunc tellus condimentum turpis, sed mattis libero mi non arcu. Maecenas accumsan mattis maximus. Fusce massa nunc, molestie vel ullamcorper vel, laoreet sollicitudin diam. Pellentesque sed eros pellentesque felis commodo pretium quis vel metus. Curabitur iaculis velit sit amet iaculis congue. Praesent ante erat, tincidunt ac lorem eget, aliquet sagittis quam."
    },
    
    {
        name: "Granite Hill",
        image: "https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?auto=compress&cs=tinysrgb&h=350",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut mi justo. Nulla sit amet feugiat sapien. Vestibulum in ipsum eget ex viverra laoreet a quis quam. Ut sit amet ipsum ut turpis lacinia consequat a vel lacus. Donec mattis pulvinar risus. Suspendisse magna elit, posuere ac felis varius, aliquam convallis nisi. Integer ut sollicitudin lacus. Integer dapibus, mi quis eleifend laoreet, nunc tellus condimentum turpis, sed mattis libero mi non arcu. Maecenas accumsan mattis maximus. Fusce massa nunc, molestie vel ullamcorper vel, laoreet sollicitudin diam. Pellentesque sed eros pellentesque felis commodo pretium quis vel metus. Curabitur iaculis velit sit amet iaculis congue. Praesent ante erat, tincidunt ac lorem eget, aliquet sagittis quam."
    },
    
    {
        name: "Lotsa Trees",
        image: "https://images.pexels.com/photos/6714/light-forest-trees-morning.jpg?auto=compress&cs=tinysrgb&h=350",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut mi justo. Nulla sit amet feugiat sapien. Vestibulum in ipsum eget ex viverra laoreet a quis quam. Ut sit amet ipsum ut turpis lacinia consequat a vel lacus. Donec mattis pulvinar risus. Suspendisse magna elit, posuere ac felis varius, aliquam convallis nisi. Integer ut sollicitudin lacus. Integer dapibus, mi quis eleifend laoreet, nunc tellus condimentum turpis, sed mattis libero mi non arcu. Maecenas accumsan mattis maximus. Fusce massa nunc, molestie vel ullamcorper vel, laoreet sollicitudin diam. Pellentesque sed eros pellentesque felis commodo pretium quis vel metus. Curabitur iaculis velit sit amet iaculis congue. Praesent ante erat, tincidunt ac lorem eget, aliquet sagittis quam."
    }
]

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Removed Campgrounds");
            //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("Added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet!",
                                author: "Homer"
                                
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Added new comment");
                                }
                            });
                    }
                }) 
            });
        }
    });
    
    //add a few comments
}
 
module.exports = seedDB;