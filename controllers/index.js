var router = require('express').Router();

router.use('/xping', require('./xping'));
router.use('/workouts', require('./workouts'));

module.exports = router;