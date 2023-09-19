//HOMEPAGE route
const router = require('express').Router();
const { User, Projects } = require('../../models')


// Login route
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect to the homepage
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    // Otherwise, render the 'login' template
    res.render('login');
});


// Homepage will have all user's projects
router.get('/', async (req, res) => {
    try {
        const projectsData = await Projects.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                    exclude: ['email', 'id', 'password']
                },
            ],
        });

        const projects = projectsData.map((project) =>
            project.get({ plain: true })
        );
        // Send over the 'loggedIn' session variable to the 'homepage' template
        res.render('homepage', {
            projects,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});