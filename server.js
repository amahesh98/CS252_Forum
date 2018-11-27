var express=require('express')
var app=express();
var mongoose=require('mongoose')
var bodyParser=require('body-parser')
var path=require('path')

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/public/dist/public')))

app.all("*", function(request, response){
    return response.sendFile(path.resolve('./public/dist/public/index.html'))
})
app.listen(8000, function(){
    console.log("Listening on port 8000")
})