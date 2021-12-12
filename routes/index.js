var express = require('express');
var router = express.Router();
const { body, validationResult,} = require('express-validator');
var foodScraper = require('../Scraper2')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'FoodSearch', authorized: req.user });
});




router.get('/instructions', function(req, res, next) {
  res.render('instructions', {title: 'Instructions', authorized: req.user})
})


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

    let scraper_input = diet;
    console.log(scraper_input)

    //perform foodScraper
    let [list_BON,  list_JAMIE, list_TESCO,  list_BBC, list_GOOD] = await Promise.all([foodScraper.BON(scraper_input), foodScraper.JAMIE(scraper_input), foodScraper.TESCO(scraper_input), foodScraper.BBC(scraper_input), foodScraper.GOOD(scraper_input)])
   
     
    await res.render('results', {title: 'FoodSearch - Results', epi_list: list_BON, tesco_list: list_TESCO, jamie_list: list_JAMIE, bbc_list: list_BBC, good_list: list_GOOD, authorized: req.user});
  }
});

module.exports = router;