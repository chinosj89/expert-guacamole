const router = require('express').Router();
const { User, Project } = require('../models');
// const withAuth = require('../utils/auth');
const sequelize = require('../config/config');

// GET all user projects

router.get('/', /*withAuth,*/ async (req, res) => {
    try {
        const dbProjectData = await Project.findAll({
            attributes: ['title', 'description'],
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const projects = dbProjectData.map((project) =>
            project.get({ plain: true })
        );

        res.render('dashboard', {
            projects,
            loggedIn: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// POST new projects
router.post('/create', async (req, res) => {
    try {
        const newUserProject = await Project.create({
            title: req.body.title,
            description: req.body.description,
        });

        res.status(201).json(newUserProject);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// PUT method to edit projects
router.put('/update/:id', async (req, res) => {
    try {
        const updatedUserProject = await UserProject.update(
            {
                title: req.body.title,
                description: req.body.description,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );

        res.status(200).json(updatedUserProject);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// DELETE method to delete projects
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedUserProject = await UserProject.destroy({
            where: {
                id: req.params.id,
            },
        });

        res.status(200).json(deletedUserProject);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;