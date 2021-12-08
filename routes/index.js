var express = require('express');
var router = express.Router();
const { body, validationResult, check } = require('express-validator');
var foodScraper = require('../Scraper2')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'FoodSearch', authorized: req.user });
});




router.get('/instructions', function(req, res, next) {
  res.render('instructions', {title: 'Instructions', authorized: req.user})
})
/*
router.post('/loading',[
  body('ingredient').trim().isLength({ min: 1 }).escape().withMessage('Main ingredient must be specified.')
  .not().isNumeric().withMessage('Main ingredient must not contain numbers.'),
], function(req, res){
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // There are errors. Render form again with sanitized values/errors messages.
    res.render('index', { title: 'FoodSearch', ing_input: req.body, errors: errors.array(), authorized: req.user});
    return;
  } else {

    var diet = '';
    if (req.body.vegetarian != undefined) {
        diet += req.body.vegetarian
    }
    if (req.body.vegan != undefined) {
        diet += req.body.vegan
    }
    if (req.body.lactose != undefined) {
        diet += req.body.lactose
    }
    if (req.body.food_radio != undefined) {
        diet += req.body.food_radio
    }
    if (req.body.ingredient != undefined) {
        diet = diet + ' ' + req.body.ingredient
    }
    res.render('loading', {title: 'Loading...', diet_input: diet})
  }

});
*/

router.post('/results',[
  body('ingredient').trim().isLength({ min: 1 }).escape().withMessage('Main ingredient must be specified.')
  .not().isNumeric().withMessage('Main ingredient must not contain numbers.'),
], async function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // There are errors. Render form again with sanitized values/errors messages.
    await res.render('index', { title: 'FoodSearch', ing_input: req.body, errors: errors.array(), authorized: req.user});
    return;
  }
  else {

    var diet = '';
    if (req.body.vegetarian != undefined) {
        diet += req.body.vegetarian
    }
    if (req.body.vegan != undefined) {
        diet += req.body.vegan
    }
    if (req.body.lactose != undefined) {
        diet += req.body.lactose
    }
    if (req.body.food_radio != undefined) {
        diet += req.body.food_radio
    }
    if (req.body.ingredient != undefined) {
        diet = diet + ' ' + req.body.ingredient
    }
  
    var scraper_input = await String(diet);

          //perform foodScraper
      
    //list_BON = await foodScraper.BON(scraper_input);
    list_TASTY = await foodScraper.TASTY(scraper_input);
    list_JAMIE = await foodScraper.JAMIE(scraper_input);
    list_BBC = await foodScraper.BBC(scraper_input);
    list_GOOD = await foodScraper.GOOD(scraper_input);
     
    await res.render('results', {title: 'FoodSearch - Results', /*epi_list: list_BON,*/ tasty_list: list_TASTY, jamie_list: list_JAMIE, bbc_list: list_BBC, good_list: list_GOOD, authorized: req.user});
  }
});

module.exports = router;