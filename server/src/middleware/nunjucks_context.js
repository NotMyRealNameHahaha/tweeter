/** @module nunjucks.context - Provides global variables for nunjucks templates
 */
import nunjucks from 'nunjucks'
import { IS_DEV } from '../constants'


export default app => {
    // @docs https://mozilla.github.io/nunjucks/api.html#environment
    const nunjucksEnv = new nunjucks.Environment(
        new nunjucks.FileSystemLoader('server/src/views/', {
            watch: true
        }),
        {
            autoescape: false
        }
    )

    templateContext(nunjucksEnv)
    nunjucksEnv.express(app)
    app.set('view engine', 'html')
    return app
}


const templateContext = nunjucksEnv => {
    nunjucksEnv.addGlobal('DEBUG', IS_DEV)

    // Mimick Jinja's "static()" function
    nunjucksEnv.addGlobal('staticUrl', filePath => `/static/${filePath}`)

    // Bundle loader helpers
    nunjucksEnv.addGlobal('loadBundle', bundleName => `
        <link href="/${bundleName}.bundle.css" rel="stylesheet">
        <script src="/${bundleName}.bundle.js"></script>
    `)
    nunjucksEnv.addGlobal('loadScript', bundleName => `
        <script src="/${bundleName}.bundle.js"></script>
    `)
    nunjucksEnv.addGlobal('loadStyle', bundleName => `
        <link href="/${bundleName}.bundle.css" rel="stylesheet">
    `)
}
