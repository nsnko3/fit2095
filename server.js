var express = require('express'); //Use express middleware for this application. Import the libraries
var app = express(); //Set the app to an express app
const body = require('body-parser'); //Import body-parser middleware libraries
const middlewares = [ //Create an array of the selected middlewares to apply to the application
    body.urlencoded()
];
app.engine('html', require('ejs').renderFile); //Set the app to use the html engine and use ejs to allow you to create html markups for the application with plain JS
app.set('view engine', 'html'); //Set the app to display through the html code on the other pages
app.use(express.static(__dirname + '/public')); //Set the directory where everything is stored so the app knows where to look for resources

let db = []; //Create the task array
var Name = ""; //Create your name, due date, and description vatiables
var Due = "";
var Desc = "";

app.get('/', function (req, res) { //When you enter localhost:8080/ it then defaults to index.html.
    res.render('index.html'); //The render method is then used to display the index.html page
});

app.get('/newtask', function (req, res) {//Entering this into the url following the 8080 will take you to the new task page
    res.render('newtask.html'); //This html page will be rendered and displayed 
    Name = req.query.taskname;//Read the input for the task name and store it into the Name variable. the taskname if the name of the input field in the html document this belongs to
    Due = req.query.taskdue;//Read the input for the due date and store it
    Desc = req.query.taskdesc;//Perform the same task as the above two

    db.push({ //Push the three extracted values from above to the array you created 
        TaskName: Name,
        TaskDue: Due,
        TaskDesc: Desc
    });

    console.log(db.length); //Display the database array length 
});

app.get('/listtasks', function (req, res) { //This url will take you to the list task page
    res.render('listtasks.html', { tasksDb: db }); //The page is rendered but this time the current instance of the db array is pushed to the html page so that those tasks of looping through and listing can be performed 
});

app.listen(8080);