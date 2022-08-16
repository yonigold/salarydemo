const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/SalaryDB', {useNewUrlParser: true}, (err) => {
    if (!err) {console.log('mongoDB connection is working')}
     else {
        {console.log('error in DB connention' + err)}
    }
});

require('./salary.model')