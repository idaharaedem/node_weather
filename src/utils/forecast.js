const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d36af846f38d9a0308f4d2204437f2fc&query=' + latitude + ',' + longitude

    request({url, json:true}, (error, {body}) => {
        if(error) {
            callback('Struggled to connect to the API')
        }
        else if(body.error) 
        {
            callback('cannot find given coordinates')
        }
        else 
        {
            callback(undefined,  'It is currently ' + body.current.temperature + ' degrees. Feels like ' + body.current.feelslike  + 'degrees')
        }
    })
}

module.exports = forecast