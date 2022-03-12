import React from 'react'



export default function Slider({ children }) {

    React.useEffect(() => {
        import('tiny-slider').then(({ tns }) => {
            tns({
                container: '.slider-container',
                navPosition: 'bottom',
                axis: 'horizontal',
                items: 1,
                controls: true,
                autoHeight: true,
                autoWidth: true,
                responsive: {
                    640: {
                        edgePadding: 0,
                        gutter: 20,
                        items: 2
                    },
                    700: {
                        gutter: 20
                    },
                    900: {
                        items: 3
                    }
                }
            })
        })
    }, [])
    return (
        <>
            <div className='slider-container'>
                {children}
            </div>
        </>
    )
}