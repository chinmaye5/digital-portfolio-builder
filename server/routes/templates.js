const express = require('express');
const router = express.Router();

// Mock template data
const templates = [
  {
    id: 'template1',
    name: 'Minimalist',
    description: 'A clean and simple portfolio template',
    previewImage: '/templates/template1-preview.jpg',
    sections: ['about', 'skills', 'projects', 'contact']
  },
  {
    id: 'template2',
    name: 'Professional',
    description: 'A professional portfolio template with detailed sections',
    previewImage: '/templates/template2-preview.jpg',
    sections: ['about', 'skills', 'projects', 'experience', 'education', 'contact']
  },
  {
    id: 'template3',
    name: 'Creative',
    description: 'A creative portfolio template with modern design',
    previewImage: '/templates/template3-preview.jpg',
    sections: ['about', 'skills', 'projects', 'certifications', 'blog', 'contact']
  }
];

// @route   GET /api/templates
// @desc    Get all available templates
router.get('/', (req, res) => {
  res.json(templates);
});

// @route   GET /api/templates/:id
// @desc    Get template by ID
router.get('/:id', (req, res) => {
  const template = templates.find(t => t.id === req.params.id);
  if (!template) {
    return res.status(404).json({ message: 'Template not found' });
  }
  res.json(template);
});

module.exports = router; 