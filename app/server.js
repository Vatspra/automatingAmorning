
var express = require('express');
var cors = require('cors')
var app = express();
var mongoose = require('mongoose');
app.use(cors());
mongoose.connect('mongodb://alarm:alarm@ds135444.mlab.com:35444/alarmdata');
var userschema = mongoose.Schema({
  alarmTime:String
});
var Todo = mongoose.model('Todo',userschema)

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

d = new Date();
var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
var nd = new Date(utc + (3600000*+5.5));
var ist =  nd.toLocaleString();
console.log("IST now is : " +ist);

var d = new Date();
var h = parseInt(addZero(d.getHours()))+5;
      if(h>=24){
          h = h-24;
    }
var m = parseInt(addZero(d.getMinutes()))+30;
    if(m>=59){
      h = h+1;
      m = m-60;
       
    }
 
   if(h<10){
     h ="0"+h;
   }
   if(m<10){
        m = "0"+m;
    }
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
   }


var final =h.toString() + ":" + m.toString(); 

  console.log("it is"+final);
console.log("IST now is : " +ist);


app.get('/',function(req,res){
  res.send("plz visit https://misty-flock.glitch.me/checkalarmtim");
})

app.get('/checkalarmtim',function(req,res){
    console.log("hey"+final)
     Todo.findOne({alarmTime:final},function(err,data){
        if(err){
          throw err
        }
       else{
         if(Boolean(data)==true){
           console.log(final)
           res.send("1")
         }
         else{
           console.log(final)
           res.send("0")
         }
       }
  
})
})

app.get('/setAlarm/:data',function(req,res){
  var timex = req.params.data.toString();
  var a = timex.replace(/[\])}[{(]/g, '');
  var b = a.replace(/\"/g, "");
  var c = b.split(',');
  console.log(c)
  if(c.length==1){
    
  var itmeone = Todo({
      alarmTime:b
    
}).save(function(err){
  if(err){
    throw err
  }
  else{
    console.log("Data saved in database")
  }
  })
  }
  
  else{
  for(var i =0;i<c.length;i++){
    //console.log(c[i])
    
          
             var itmeone = Todo({
                alarmTime:c[i].toString()
                  }).save(function(err){
               if(err){
                 throw err
               }
               else{
                 console.log("time saved in database");
               }
             }) 
    
     }
  }
  
  
    
      console.log(c[0]);
      //console.log("final is" +final);
  console.log("alarm has been saved for "+final)
  res.send("Alarm created")
  
   });

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

