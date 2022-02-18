import React from "react"

export class Content {
    constructor() {

        this.banner = [
            "Superior Quality",
            "Supreme Service"
        ]
        this.header_images = [
            "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=983&q=80",
            "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=825&q=80",
            "https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80"
        ]

        this.header_type_animation = [
            "We're your best bet for",
            "Superior Quality and",
            "Supreme Service.",
            "Let Us Guide the Way",
            "Great People Drive",
            "Great Cars"
        ]

        this.company_content = [
            {
                header: "Heading 1",
                content: "This is the content",
                image: "https://images.unsplash.com/photo-1634752418134-5cb9228057e9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=384&q=80"
            },
            {
                header: "Heading 1",
                content: "This is the content",
                image: "https://images.unsplash.com/photo-1634752418134-5cb9228057e9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=384&q=80"
            },
            {
                header: "Heading 1",
                content: "This is the content",
                image: "https://images.unsplash.com/photo-1634752418134-5cb9228057e9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=384&q=80"
            },

        ]

        this.contacts = [
            {
                view: "1 876 356-1017",
                tel: "18763561017"
            }
        ]

        this.footer_content = {
            address: () => {
                return (
                    <>
                        Four Paths,<br />May Pen<br />Clarendon, Jamaica WI<br />
                    </>
                )
            }
            ,
            contacts: this.contacts
        }

        this.year_options = [
            { value: "", label: "Any" },
            { value: 2010, label: "2010" },
            { value: 2011, label: "2011" },
            { value: 2012, label: "2012" },
            { value: 2013, label: "2013" },
            { value: 2014, label: "2014" },
            { value: 2015, label: "2015" },
            { value: 2016, label: "2016" },
            { value: 2017, label: "2017" },
            { value: 2018, label: "2018" },
            { value: 2019, label: "2019" },
            { value: 2020, label: "2020" },
            { value: 2021, label: "2021" },
            { value: 2022, label: "2022" }
        ]

        this.location_options = [
            { value: "", label: "Any" },
            { value: "Transit", label: "In Transit" },
            { value: "On Lot", label: "On Lot" },
        ]

        this.body_options = [
            { value: "", label: "Any" },
            { value: "Sedan", label: "Sedan" },
            { value: "Hatchback", label: "Hatchback" },
            { value: "Coupe", label: "Coupe" },
            { value: "Pickup", label: "Pick-up" },
            { value: "SUV", label: "SUV" },
            { value: "Truck", label: "Truck" },
            { value: "Bus", label: "Bus" },
        ]

        this.trans_options = [
            { value: "", label: "Any" },
            { value: "Automatic", label: "Automatic" },
            { value: "Manual", label: "Manual" },
            { value: "Tiptronic", label: "Tiptronic" },
        ]


        this.sort_options = [
            { value: "", label: "default" }
        ]

        this.mileage_options = [
            { value: "", label: "default" }
        ]

        this.price_options = [
            { value: "", label: "default" }
        ]
    }
}