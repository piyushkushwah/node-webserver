const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

app.use((req,res,next)=>{
    var date = new Date().toDateString();
    var log = `${date}:${req.method}${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log('unable to append to serer.log');
        }
    });
    next();
    
});
app.use((req,res,next)=>{
    res.render('maintenance.hbs');


});
app.use(express.static(__dirname+'/public'));
hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text;
});

app.get('/',(req,res)=>{
    res.render('home.hbs',{
      page:'Home Page',
      currentYear:new Date().getFullYear(),
      welcomeMessage:'welcome to my website'
    });
});
app.get('/projects',(req,res)=>{
    res.render('project.hbs',{
        pageTitle:'Project'
    });
});





app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        page:'About Page',
        currentYear:new Date().getFullYear()

    });
});

app.get('/bad',(req,res)=>{
    res.send({bad:'Cannot GET'});
});

app.listen(port,()=>{
    console.log(`server is up on port ${port}`);
});