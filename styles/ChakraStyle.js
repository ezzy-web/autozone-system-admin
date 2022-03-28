import "@fontsource/open-sans"
import "@fontsource/jost"


const { extendTheme } = require('@chakra-ui/react')

const StyleExt = extendTheme({
    fonts: {
        heading: 'jost',
        body: 'jost'
    },
    config: {
        cssVarPrefix: 'autozone-ja'
    },
    components: {
        Button: {
            baseStyle: {
                _focus: {
                    outline: 'none',
                    boxShadow: 'none'
                }
            }
        }
    }
})

module.exports = {
    StyleExt
}