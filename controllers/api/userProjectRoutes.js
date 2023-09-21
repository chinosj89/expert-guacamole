// DASHBOARD

const router = require('express').Router();
const { Project } = require('../../models');
const withAuth = require('../../utils/auth');


//Create new project
router.post('/', withAuth, async (req, res) => {
    try {
        const newProject = await Project.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(201).json(newProject);
    } catch (err) {
        // Handle any errors that occur during project creation
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Edit project
router.put('/:id', withAuth, async (req, res) => {
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
router.delete('/:id', withAuth, async (req, res) => {
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

module.exports = router;