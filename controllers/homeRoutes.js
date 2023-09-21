const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

// Homepage will have all user's projects
router.get('/', async (req, res) => {
    try {
        const projectsData = await Project.findAll({
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

//render each project
router.get('/project/:id', async (req, res) => {
    try {
        const projectData = await Project.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const project = projectData.get({ plain: true });

        res.render('project', {
            ...project,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Project }],
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            loggedIn: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Login route
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect to the homepage
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    // Otherwise, render the 'login' template
    res.render('login');
});



module.exports = router;