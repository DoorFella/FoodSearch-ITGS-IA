const puppeteer = require('puppeteer')


async function BON(inputVal) {
   try {
       const URL = 'https://www.bonappetit.com/search'
       const browser = await puppeteer.launch({headless: false,
        args: [`--window-size=1000,700`],
       defaultViewport: {
         width:1000,
         height:700
       }})
       const page = await browser.newPage()

       await page.goto(URL)

       await page.waitForSelector("#onetrust-button-group-parent");
       await page.click("#onetrust-accept-btn-handler")

       await page.type('input[name=terms]', inputVal,)
       await page.click("button.submit")


       await page.waitForSelector("h4 > a")
       await page.waitFor(3000);

       let data = await page.evaluate(() => {
           let results = []
           let items = document.querySelectorAll('article.recipe-content-card')
           items.forEach((item) => {
               results.push({
                   url: item.querySelector('h4 > a').href,
                   title: item.querySelector('h4 > a').innerText,
               })
           })
           return results
       })
      // console.log('Bon')
     //   console.log(data)
       await browser.close()
       return data
   } catch (error) {
       console.error(error)
       return []
   }
   
}


async function TASTY(inputVal) {
    try {
        const URL = 'https://tasty.co/'
        const browser = await puppeteer.launch({headless: false,args: [`--window-size=1000,700`],
        defaultViewport: {
          width:1000,
          height:700
        }})
        const page = await browser.newPage()

        await page.goto(URL)

        //click accept cookies button
        await page.waitForSelector(".qc-cmp2-summary-buttons");
        await page.click(".css-15dhgct")

        await page.click('.nav__submenu-button')
        await page.click('#search-mobile')
        await page.type('.search-bar__input', inputVal,)
        await page.keyboard.press("Enter")
        

        await page.waitForSelector("#search-results-feed")



        let data = await page.evaluate(() => {
            let results = []
            let items = document.querySelectorAll('.feed-item')
            items.forEach((item) => {
                results.push({
                    url: item.querySelector('li > a').href,
                    title: item.querySelector('div.feed-item__title ').innerText,
                })
            })
            return results
        })
      //  console.log('tasty')
        //console.log(data)
        await browser.close()
        return data
    } catch (error) {
        console.error(error)
        return []
    }
    
}

async function JAMIE(inputVal) {
    try {
        const URL = 'https://www.jamieoliver.com/'
        const browser = await puppeteer.launch({headless: false,args: [`--window-size=1000,700`],
        defaultViewport: {
          width:1000,
          height:700
        }})
        const page = await browser.newPage()
 
        await page.goto(URL)
 
        //click accept cookies button
        await page.waitForSelector("#ccc-button-holder");
        await page.click("#ccc-recommended-settings")
 
        await page.click(".site-search")
        //search
        await page.type('.typeahead.input_text.clear_search.tt-input', inputVal,)
        await page.keyboard.press("Enter")
 
        // wait for page to load
        await page.waitForSelector("#search-isotope")

 
        let data = await page.evaluate(() => {
            let results = []
            let items = document.querySelectorAll('.col-lg-3.col-sd-4.col-md-4.col-sm-4.col-xs-6.result.all.recipe')
            items.forEach((item) => {
                results.push({
                    url: item.querySelector('a').href,
                    title: item.querySelector('a').title,
                })
            })
            return results
        })
     //   console.log('Jamie')
      //  console.log(data)
        await browser.close()
        return data
    } catch (error) {
        console.error(error)
        return []
    }
    
 }

 async function BBC(inputVal) {
    try {
        const URL = 'https://www.bbc.co.uk/food'
        const browser = await puppeteer.launch({headless: false,args: [`--window-size=1000,700`],
        defaultViewport: {
          width:1000,
          height:700
        }})
        const page = await browser.newPage()
 
        await page.goto(URL)
 

        await page.waitForSelector(".searchbar__input");
        await page.click(".searchbar__input")
 

        //search
        await page.type('.searchbar__input', inputVal,)
        await page.keyboard.press("Enter")
 
        // wait for page to load
        await page.waitForSelector(".gel-wrap")

 
        let data = await page.evaluate(() => {
            let results = []
            let items = document.querySelectorAll('a.promo')
            items.forEach((item) => {
                results.push({
                    url: item.href,
                    title: item.querySelector('h3').innerText,
                })
            })
            return results
        })
     //   console.log('BBC')
       // console.log(data)
        await browser.close()
        return data
    } catch (error) {
        console.error(error)
        return []
    }
    
 }



 async function GOOD(inputVal) {
    try {
        const URL = 'https://www.bbcgoodfood.com/'
        const browser = await puppeteer.launch({headless: false,
            args: [`--window-size=1000,700`],
            defaultViewport: {
              width:1000,
              height:700
            }})
        const page = await browser.newPage()
 
        await page.goto(URL)
 

        await page.waitForSelector(".css-1x23ujx");
        await page.click(".css-1x23ujx")


        await page.waitForSelector("#branded-section-search-input");

        
        //search
        await page.type('#branded-section-search-input', inputVal,)
        await page.keyboard.press("Enter")
 
        // wait for page to load
        await page.waitForSelector(".template-search-universal__result-list")

 
        let data = await page.evaluate(() => {
            let results = []
            let items = document.querySelectorAll('.standard-card-new.standard-card-new--skinny')
            items.forEach((item) => {
                results.push({
                    url: item.querySelector('a').href,
                    title: item.querySelector('h4 > a').innerText,
                })
            })
            return results
        })
    //    console.log('GOOD')
      //  console.log(data)
        await browser.close()
        return data
    } catch (error) {
        console.error(error)
        return []
    }
    
 }


//let bonappetit = async function (){
 //   await BON("pasta")
//}
//console.log(bonappetit)

//let BON_list = ['apple', 'orange'];

//JAMIE('beans')

module.exports = {
    BON,
    TASTY,
    JAMIE,
    BBC,
    GOOD
}