const request = require('request');

const forecast = (lattitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f7fce2826bd086c3fa159f938a05b40c&query=' + lattitude + ',' + longitude;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the weather API', undefined);
        } else if (body.error) {
            callback('Unable to fetch weather data. Try another search!', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.');
        }
    });
}

module.exports = forecast;