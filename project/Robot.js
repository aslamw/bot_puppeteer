const pup = require('puppeteer');

const url = "https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops";
const data = {};

(async () => {

    //const browser = await pup.launch({headless: false}); // formato visual
    const browser = await pup.launch();
    const page = await browser.newPage();

    console.log('start');

    //entrando na URL
    await page.goto(url);
    console.log('start url');

    //pausa para esperar a página carregar
    await page.waitForTimeout(2000);

    //pegar os links dos notebooks e filtrar para Lenovo
    const links = await page.$$eval('.caption  h4  a' , item => item.filter( link => link.innerText.includes('Lenovo') ).map(item => item.href));
    
    //entra em cada um dos links filtrados e pega os dados de valor e Descrição
    for(const link of links){
        await page.goto(link);

        const description = await page.$eval('.description', element => element.innerText);
        const description_product = description.split(',')

        if(description_product[0].includes('Lenovo')){
            const value = await page.$eval('.caption h4 ', element => element.innerText);

            const description_product = description.split(',')

            data[description_product[0]] = [value, description_product]
        }
        

    }

    await browser.close();

    //coloca os dados em um json
    const fs = require("fs")

    fs.writeFile("data_computer.json", JSON.stringify(data), err => {
     
    // Verificando erros
    if (err) throw err; 
   
    console.log("Done writing");
    
});

})();