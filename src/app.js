const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const { query } = require('express');


const app = express();
const port = process.env.PORT || 3000;

// Configure Express
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup views engine and location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// Setup static serve up
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Daniel Tran'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Daniel Tran'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Daniel Tran',
        message: 'What can we do for you?'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You need to provide an address'
        });
    }

    geocode(req.query.address, (error, { lattitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(lattitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        });
    })

});

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You need to provide a search term'
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Daniel Tran',
        message: 'Help article not found'
    })
});

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Daniel Tran',
        message: 'Page not found'
    })
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})