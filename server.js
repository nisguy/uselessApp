const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

app.set('view engine', 'hbs');

app.use((req, res, next)=> {
    // res.render('maintenance.hbs');
    next();
});

app.use(express.static(__dirname + '/public'));

app.use((req, res, next)=> {
    const now = new Date().toString();
    let details = `${now}: ${req.method},path: "${req.path}" from ip: ${req.ip}`;
    console.log(details);
    fs.appendFile('server.log', details + '\n', (err)=> {
        console.log(err);
    });
    next();
});


hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', ()=> {
    return new Date().getFullYear();
});

app.get('/', (req, res)=> {
    res.render('home.hbs', {
        pageTitle: 'New Home Page',
        welcomeMsg: 'Welcome aboard!',
    });
});
app.get('/about', (req, res)=> {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});
app.get('/bad', (req, res)=> {
    res.send({
        errorMessage: "Error handling request"
    });
});
app.listen(3000);