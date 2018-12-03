var express=require('express')
var app=express();
var mongoose=require('mongoose')
var bodyParser=require('body-parser')
var path=require('path')
var bcrypt=require('bcryptjs')

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/public/dist/public')))

var NUM_SALTS=10
var default_picture = "data:image/jpeg;base64,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";




mongoose.connect('mongodb://localhost/OpenForum')

var UserSchema = new mongoose.Schema({
    user_name:{type:String, required:[true,"Username is required"],minlength:[3,"Username must be 3 characters"]},
    first_name:{type:String, required:[true, "First name is required"]},
    last_name:{type:String, required:[true, "Last name is required"]},
    email:{type:String, required:[true, "Email is required"]},
    password:{type:String, required:[true, "Password is required"], minlength:[8, "Password must be 8 characters"]},
    profile_picture:{type:String}
}, {timestamps:true})
mongoose.model('User', UserSchema)
var User=mongoose.model('User')

var CommentSchema = new mongoose.Schema({
    userID:{type:String, required:[true, "UserID is required"]},
    questionID:{type:String, required:[true, "QuestionID is required"]},
    comment:{type:String, required:[true, "Comment is required"]},
    username:{type:String, required:[true, "Username is required"]}
}, {timestamps:true})
mongoose.model('Comment', CommentSchema)
var Comment=mongoose.model('Comment')

var QuestionSchema = new mongoose.Schema({
    userID:{type:String, required:[true, "UserID is required"]},
    subject:{type:String, required:[true, "Subject is required"], minlength:[5, "Minimum subject length is 5"]},
    question:{type:String, required:[true, "A question is required"], minlength:[10, "Minimum question length is 10"]},
    username:{type:String, required:[true, "Username of poster is required"]},
    category:{type:String, required:[true, "Category is required"]},
    comments:[CommentSchema] 
}, {timestamps:true})
mongoose.model('Question', QuestionSchema)
var Question=mongoose.model('Question')

app.post('/processRegister', function(request, response){
    var user_name=request.body['user_name'];
    var first_name=request.body['first_name'];
    var last_name=request.body['last_name'];
    var password=request.body['password'];
    var email=request.body['email'];

    User.findOne({email:email}, function(error,user){
        if(error){
            return response.json({success:500,message:'Server error',error:error});
        }else{
            if(user!=null){
                return response.json({success:400,message:'A user already exists with this email'});
            }else{
                var hashed_Password=bcrypt.hashSync(password, NUM_SALTS);
                var newUser=new User({user_name:user_name,first_name:first_name,last_name:last_name,email:email,password:hashed_Password,profile_picture:default_picture});
                newUser.save(function(error){
                    if(error){
                        return response.json({success:400,message:'There was an error registering. Check your input',error:error});
                    }else{
                        return response.json({success:201,message:"User Created"});
                    }
                })
            }
        }
    })
    
})
app.post('/updateProfilePic',function(request,response){
    var userID=request.body['userID'];
    var picture_url =request.body['picture_url'];
    console.log("Picture url: ",picture_url)
    User.findOne({_id:userID},function(error,user){
        if(error){
            return response.json({success:500,messsage:'Server Error',error:error});
        }else{
            if(user==null){
                return response.json({success:401,message:'User does not exist'});
            }else{
                user.profile_picture = picture_url;
                console.log("pic ",picture_url)
                user.save(function(error){
                    if(error){
                        return response.json({success:500,messsage:'Server Error',error:error});
                    }else{
                        return response.json({success:200,message:'Successfully added profile picture'});
                    }
                })
            }
        }
    })
})

app.post('/processLogin', function(request, response){
    var email = request.body['email'];
    var password=request.body['password'];
    User.findOne({email:email},function(error,user){
        if(error){
            return response.json({success:500,message:'Server Error',error:error});
        }else{
            if(user==null){
                return response.json({success:401,message:'Invalid login'});
            }else{
               
                if(bcrypt.compareSync(password,user.password)){
                    return response.json({success:200,message:'Login Successful',user:user});
                }else{
                    return response.json({success:401,message: 'Invalid login'});
                }
            }
        }
    })
})
app.post('/askQuestion', function(request, response){
    var title=request.body['title']
    var desc=request.body['desc']
    var userID=request.body['userID']
    var category=request.body['category']
    User.findOne({_id:userID}, function(error, user){
        if(error){
            return response.json({success:-1, message:'Server error'})
        }
        else if(user==null){
            return response.json({success:0, message:'No user found with this ID'})
        }
        else{
            var username=user.user_name
            var newQuestion = new Question({userID:userID, subject:title, question:desc, username:username, category:category})
            newQuestion.save(function(error){
                if(error){
                    return response.json({success:0, message:'Unable to save new question'})
                }
                else{
                    return response.json({success:1, message:'Successfully created question', question:newQuestion})
                }
            })
        }
    })
})
app.post('/fetchQuestions', function(request, response){
    var category=request.body['category']
    Question.find({category:category}, function(error, questions){
        if(error){
            return response.json({success:-1, message:"Server error"})
        }
        else{
            return response.json({success:1, message:'Successfully fetched questions', category:category, questions:questions})
        }
    })
})
app.post('/fetchSingleQuestion', function(request, response){
    var questionID=request.body['questionID']
    Question.findOne({_id:questionID}, function(error, question){
        if(error){
            return response.json({success:-1, message:'Server error'})
        }
        else if(question==null){
            return response.json({success:0, message:'Unable to fetch question with this id'})
        }
        else{
            return response.json({success:1, message:'Successfully fetched question', question:question})
        }
    })
})
app.post('/fetchUser',function(request,response){
    var userID=request.body['userID'];
    if(!userID){
        return response.json({success:-1,message:'Unable to find userID'});
    }
    User.findOne({_id:userID}, function(error,user){
        if(error){
            return response.json({success:-1,message:'Server error',error:error});
        }else if(user == null){
            return response.json({success:0,message:'Unable to fetch user with this id'});
        }else{
            return response.json({success:1, message:'Successfully fetched user', user:user});
        }
    })
})

app.post('/fetchUserQuestions', function(request,response){
    var userID=request.body['userID'];
    if(!userID){
        return response.json({success:-1,message:'Unable to find userID'});
    }
    Question.find({userID:userID}, function(error,question){
        if(error){
            return response.json({success:-1,message:'Server error',error:error});
        }else if(question == null){
            return response.json({success:0,message:'Unable to fetch users questions'});
        }else{
            return response.json({success:1,message:'Successfully fetched questions',questions:question});
        }
     })
})

app.post('/leaveComment', function(request, response){
    var userID=request.body['userID']
    var questionID=request.body['questionID']
    var comment=request.body['comment']
    
    User.findOne({_id:userID}, function(error, user){
        if(error){
            return response.json({success:-1, message:'Server error'})
        }
        else if(user==null){
            return response.json({success:0, message:'No user exists with this id'})
        }
        else{
            //Successfully found user
            var newComment = new Comment({userID:userID, questionID:questionID, comment:comment, username:user.user_name})
            newComment.save(function(error){
                if(error){
                    return response.json({success:0, message:'Unable to save new comment'})
                }
                else{
                    //Successfully saved comment, now push to question
                    Question.findOneAndUpdate({_id:questionID}, {$push:{comments:newComment}}, function(error, question){
                        if(error){
                            return response.json({success:-1, message:'Server error'})
                        }
                        else if(question==null){
                            return response.json({success:0, message:'No question exists with this id'})
                        }
                        else{
                            //Successfully found question and pushed Comment
                            return response.json({success:1, message:'Successfully placed comment', comment:newComment})
                        }
                    })
                }
            })
        }
    })
})

app.all("*", function(request, response){
    return response.sendFile(path.resolve('./public/dist/public/index.html'))
})
app.listen(8000, function(){
    console.log("Listening on port 8000")
})