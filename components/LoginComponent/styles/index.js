const styles ={
    GridResponsiveness: {
        minH: '100vh',
        templateColumns: 'repeat(12,1fr)',
        templateRows: 'repeat(8,1fr)',
        justifyContent: 'center',
        alignItems: 'center'
    },


    GridItemResponsiveness: {
        rowStart: { base: 1, md: 2 },
        rowEnd: { base: 9, md: 8 },
        colStart: { base: 1, md: 3, lg: 4 },
        colEnd: { base: 13, md: 11, lg: 10 }
    },


    Card: {
        background: 'rgba(255, 255, 255, 0.4)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
    }
}


export default styles