const puppeteer = require('puppeteer')

async function BON(inputVal) {
    try {
        const URL = 'https://www.bonappetit.com/search'
        const browser = await puppeteer.launch({headless: true,
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

 async function BBC(inputVal) {
    try {
        const URL = 'https://www.bbc.co.uk/food'
        const browser = await puppeteer.launch({headless: true,
            args: [`--window-size=1000,700`,'--no-sandbox',
            '--disable-setuid-sandbox'],
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
        const browser = await puppeteer.launch({headless: true,
            args: [`--window-size=1000,700`,'--no-sandbox',
            '--disable-setuid-sandbox'],
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


module.exports = {
    BON,
    BBC,
    GOOD
}