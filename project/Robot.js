const pup = require('puppeteer');

const url = "https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops";
const data = {};
const value_product = [];
const data_product = [];

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

        //faz uma segunda filtragem
        if(description_product[0].includes('Lenovo')){
            const value = await page.$eval('.caption h4 ', element => element.innerText);

            const description_product = description.split(',')

            const clear_value = parseFloat(value.replace('$',''))

            value_product.push(clear_value)
            data[clear_value] = description_product
        }
    }

    const Value = value_product.sort((a, b) => a - b)

    //coloca os dados em ordem
    for(let i = 0; i < Value.length; i++){

        let name = data[Value[i]][0]
        let money = `$${String(Value[i])}`

        data_product.push({[name] : [money,data[Value[i]]]})
    }

    await browser.close();

    //coloca os dados em um json
    const fs = require("fs")

    fs.writeFile("data_computer.json", JSON.stringify(data_product), err => {
     
    // Verificando erros
    if (err) throw err; 
   
    console.log("Done writing");
    
});

})();