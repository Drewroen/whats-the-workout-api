var router = require('express').Router();

router.use('/xping', require('./xping'));
router.use('/workouts', require('./workouts'));
router.use('/users', require('./users'))

module.exports = router;