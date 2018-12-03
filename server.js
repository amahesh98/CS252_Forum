var express=require('express')
var app=express();
var mongoose=require('mongoose')
var bodyParser=require('body-parser')
var path=require('path')
var bcrypt=require('bcryptjs')

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/public/dist/public')))

var NUM_SALTS=10

mongoose.connect('mongodb://localhost/OpenForum')

var UserSchema = new mongoose.Schema({
    user_name:{type:String, required:[true,"Username is required"],minlength:[3,"Username must be 3 characters"]},
    first_name:{type:String, required:[true, "First name is required"]},
    last_name:{type:String, required:[true, "Last name is required"]},
    email:{type:String, required:[true, "Email is required"]},
    password:{type:String, required:[true, "Password is required"], minlength:[8, "Password must be 8 characters"]}
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
                var newUser=new User({user_name:user_name,first_name:first_name,last_name:last_name,email:email,password:hashed_Password});
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

app.all("*", function(request, response){
    return response.sendFile(path.resolve('./public/dist/public/index.html'))
})
app.listen(8000, function(){
    console.log("Listening on port 8000")
})