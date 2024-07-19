/********************************************************************************
* WEB322 – Assignment 04
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: Babak Ghafourigivi Student ID: 165118233 Date: 19 July 2024
*
* Published URL: https://github.com/syntheticvision/web322-assignment-4.git
*
********************************************************************************/
const express = require('express');
const path = require('path');
const legoData = require('./module/legoSets');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('home', { page: '/' });
});

app.get('/about', (req, res) => {
    res.render('about', { page: '/about' });
});

app.get('/lego/sets', (req, res) => {
    const theme = req.query.theme;
    if (theme) {
        legoData.getSetsByTheme(theme)
            .then((sets) => {
                if (sets.length > 0) {
                    res.render('sets', { sets, page: '/lego/sets' });
                } else {
                    res.status(404).render('404', { message: `No sets found for the theme: ${theme}` });
                }
            })
            .catch((err) => res.status(404).render('404', { message: err }));
    } else {
        legoData.getAllSets()
            .then((sets) => res.render('sets', { sets, page: '/lego/sets' }))
            .catch((err) => res.status(404).render('404', { message: err }));
    }
});

app.get('/lego/sets/:setNum', (req, res) => {
    const setNum = req.params.setNum;
    legoData.getSetByNum(setNum)
        .then((set) => {
            if (set) {
                res.render('set', { set, page: '' });
            } else {
                res.status(404).render('404', { message: `No set found with the number: ${setNum}` });
            }
        })
        .catch((err) => res.status(404).render('404', { message: err }));
});

app.use((req, res) => {
    res.status(404).render('404', { message: "I'm sorry, we're unable to find what you're looking for" });
});

legoData.initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to initialize data:', err);
        process.exit(1);
    });
