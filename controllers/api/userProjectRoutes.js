// Homepage function: GET all user projects, logout, go to dashboard
// POST, PUT, DELETE methods
// Creating a new project, being able to update the content, and deleting the project
const router = require('express').Router();
const { Project } = require('../../models');

//Create new project
router.post('/', async (req, res) => {
    try {
        const newProject = await Project.create({
            ...req.body
        });

        res.status(201).json(newProject);
    } catch (err) {
        // Handle any errors that occur during project creation
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Edit project
router.put('/:id', async (req, res) => {
    try {
        const projectData = await Project.findByPk(req.params.id);
        if (!projectData) {
            return res.status(404).json({ message: 'No project found with the provided ID' });
        }
        await Projectroject.update(req.body);
        res.status(200).json(projectData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete project
router.delete('/:id', async (req, res) => {
    // delete a category by its `id` value
    try {
        const projectData = await Project.destroy({
            where: {
                id: req.params.id
            },
        });

        if (!categoryData) {
            res.status(404).json({ message: 'No project found with the provided ID' });
            return;
        }

        res.status(200).json(projectData);
    } catch (err) {
        res.status(500).json(err);
    }
});
