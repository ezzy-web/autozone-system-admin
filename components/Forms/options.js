export const options = () => {
    return {
        type: [
            { value: 'Sedan', label: 'Sedan' },
            { value: 'Hatchback', label: 'Hatchback' },
            { value: 'SUV', label: 'SUV' },
            { value: 'Coupe', label: 'Coupe' },
            { value: 'Van', label: 'Van' },
            { value: 'Mini-Van', label: 'Mini-Van' },
            { value: 'Bus', label: 'Bus' },
            { value: 'Truck', label: 'Truck' }
        ],

        year: [
            { value: 2010, label: 2010 },
            { value: 2011, label: 2011 },
            { value: 2012, label: 2012 },
            { value: 2013, label: 2013 },
            { value: 2014, label: 2014 },
            { value: 2015, label: 2015 },
            { value: 2016, label: 2016 },
            { value: 2017, label: 2017 },
            { value: 2018, label: 2018 },
            { value: 2019, label: 2019 },
            { value: 2020, label: 2020 },
            { value: 2021, label: 2021 },
            { value: 2022, label: 2022 },
        ],

        trans: [
            { value: 'Automatic', label: 'Automatic' },
            { value: 'Manual', label: 'Manual' },
            { vlaue: 'Tiptronic', label: 'Tiptronic' },
            { value: 'CVT', label: 'CVT' }
        ],

        locations: [
            { value: 'On Lot', label: 'On Lot' },
            { value: 'Transit', label: 'Transit' }
        ],

        history: [
            { value: 'Imported', label: 'Imported' },
            { value: 'Pre-owned', label: 'Pre-owned'}
        ],

        condition: [
            { value: 'Negotiable', label: 'Negotiable' },
            { value: 'Non-Negotiable', label: 'Non-Negotiable'}
        ]
    }
}