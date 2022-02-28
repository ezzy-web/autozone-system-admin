

const puppeteer = require("puppeteer")
const { readFile } = require("fs-extra")
const { compile } = require("handlebars")
const { join } = require("path")
const formattedResponse = require("./utils/formattedResponse")
const { verify } = require('./utils/firebase/firebaseAuth')


const compileDoc = async (data) => {
    const filePath = join(process.cwd(), "functions/utils", "invoice.hbs")
    const html = await readFile(filePath, 'utf-8')
    return compile(html)(data)
}


exports.handler = async (event) => {

    const { token, customToken, ...data } = JSON.parse(event.body)
    const user = await verify(token, customToken)

    if (!user) {
        console.log("\n\n auth/required \n\n")
        return response(200, "auth/required", false)
    }
    try {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        const content = await compileDoc({ user: user.user, ... data})
        await page.setContent(content)

        const buffer = await page.pdf({
            path: './functions/utils/pdf/invoice.pdf',
            format: 'Letter'
        })
        await browser.close()

        return {
            statusCode: 200,
            body: JSON.stringify(content)
        }

    } catch (error) {
        return formattedResponse(200, "ERROR GENERATING INVOICE RELOAD AND TRY AGAIN", false)
    }

}