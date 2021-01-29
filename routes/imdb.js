const express = require('express'),
    router = express.Router();

const imdbModel = require('../db');


router.get('/', (req, res) => {
    console.log(imdbModel);
    res.render ('template', {
       locals: {
           title: "IMDB Listings",
           data: imdbModel
       },
       partials: {
           body: 'partials/imdb-list',
       },

   })
});

router.get('/:imdbID', (req, res) => {
    const { imdbID } = req.params;
    const imdb = imdbModel.find((imdb) => {
        if (imdb.imdbID === imdbID) {
            return imdb;
        }
    })
    if (imdb) {
        res.render ('template', {
            locals: {
                title: "An IMDB Listing",
                imdb
            },
            partials: {
                body: 'partials/imdb-details',
            },
    });
    }else {
        res.status(404).send(`No IMDB listing found that matches id ${imdbID}`);
    }
});
    

module.exports = router;