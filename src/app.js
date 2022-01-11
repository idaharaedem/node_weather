const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//paths for express config
const publicDirPath = path.join(__dirname, '../public')
const template = path.join(__dirname, '../template/views')
const partialPath = path.join(__dirname, '../template/partials')

//setup for handlebars engine and views location
app.set('views', template)
app.set('view engine', 'hbs')
hbs.registerPartials(partialPath)

//Static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Bobby Brown',
        createdBy: 'Lenny Cravits'
    })
})

app.get('/about', (req,res)=> {
    res.render('about', {
        title: 'About!!',
        name: 'Bobby Brown',
        createdBy: 'Jacobs McMuffin'
    })
})

app.get('/help', (req, res)=> {
    res.render('help', {
        example: 'This is example text to help things out',
        title: 'Help',
        name: 'John Doe',
        createdBy: 'Lucy Lu'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
           error: 'No address provided. Please provide an address' 
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}= {}) => {
        if(error){
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forData) => {
            if(error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forData,
                location: location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: 24,
    //     location: 'Mexico City',
    //     address: req.query.address
    // })
})

app.get('/products', (req,res) => {
    if(!req.query.search){
       return res.send({
            error: 'You must provide search term'
        })
    }
    console.log(req.query)

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404error', {
        error: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404error', {
        error: 'Page not found'
    })
})

app.listen(3000, ()=> {
    console.log('Server is on port 3000')
})
