import React from 'react'
import { useRouter } from 'next/router'

import { Grid, GridItem, HStack, Button, Divider } from '@chakra-ui/react'
import Select from 'react-select'

import FeatherIcon from 'feather-icons-react'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const options = require('../../content/select.options')


function SearchInventoryForm({ makes }) {


    var makeOptions = [{ value: "", label: "Select Make" }]
    makeOptions = [...makeOptions, ...makes.map(make => { return { value: make.make, label: make.make } })]
    const [modelOptions, setModelOptions] = React.useState([{ value: "", label: "Select Make" }])
    const [minYearOptions, setMinYearOptions] = React.useState(options.year)
    const [maxYearOptions, setMaxYearOptions] = React.useState(options.year)

    

    const handleYearChange = ({ min, max }) => {
        if (min) {
            const maxYear = options.year.filter((option) => option.value >= min | option.value === '')
            setMaxYearOptions(maxYear)
        }

        if (max) {
            const minYear = options.year.filter((option) => option.value <= max | option.value === '')
            setMinYearOptions(minYear)
        }
    }

    const handleMakeChange = (e) => {
        const match = makes.filter((make) => {
            return make.make === e.value
        })

        if (match.length > 0) {
            setModelOptions([{ value: "", label: "Select Make" }, ...match[0].models.map(model => { return { value: model, label: model } })])
        } else {
            setModelOptions([{ value: "", label: "Select Make" }])
        }
    }

    const router = useRouter()

    const schema = yup.object().shape({
        make: yup.string(),
        model: yup.string(),
        trans: yup.string(),
        yearMin: yup.string(),
        yearMax: yup.string(),
        body: yup.string(),
        location: yup.string()
    })

    const { handleSubmit, control, reset } = useForm({ resolver: yupResolver(schema) })

    const handleFormSubmit = (data) => {
        var isQuery = false
        var query = {}
        for (const [key, value] of Object.entries(data)) {
            if (value && value != '') {
                query[key] = value
                isQuery = true
            }
        }

        if (isQuery) {
            const params = new URLSearchParams(query)
            router.push('/inventory/query?' + params.toString())
            return;
        }

        router.push('/inventory')
    }

    return (
        <form onSubmit={handleSubmit(data => handleFormSubmit(data))}>
            <Grid my={5} gap={3} templateColumns={'repeat(12, 1fr)'} >

                <GridItem colSpan={{ base: 12, md: 4 }}>
                    <Controller
                        name='make'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Select
                                classNamePrefix="form-select-index"
                                options={makeOptions}
                                onChange={(e) => { onChange(e.value); handleMakeChange(e) }}
                                placeholder={'Make'}
                            />
                        )}
                    />
                </GridItem>
                <GridItem colSpan={{ base: 12, md: 4 }}>
                    <Controller
                        name='model'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Select
                                classNamePrefix="form-select-index"
                                options={modelOptions}
                                placeholder={'Model'}
                                onChange={(e) => onChange(e.value)}
                            />
                        )} />
                </GridItem>
                <GridItem colSpan={{ base: 12, md: 4 }}>
                    <Controller
                        name='trans'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Select
                                classNamePrefix="form-select-index"
                                options={options.trans}
                                placeholder={'Transmission'}
                                onChange={(e) => onChange(e.value)}
                            />)} />
                </GridItem>
            </Grid>
            <Grid my={5} gap={3} templateColumns={'repeat(12, 1fr)'} >
                <GridItem colSpan={{ base: 12, md: 3 }}>
                    <Controller
                        name='body'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Select
                                classNamePrefix="form-select-index"
                                options={options.body}
                                placeholder={'Type'}
                                onChange={(e) => onChange(e.value)}
                            />)} />
                </GridItem>
                <GridItem colSpan={{ base: 12, md: 3 }}>
                    <Controller
                        name='location'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Select
                                classNamePrefix="form-select-index"
                                options={options.location}
                                placeholder={'Location'}
                                onChange={(e) => onChange(e.value)}
                            />)} />
                </GridItem>
                <GridItem colSpan={{ base: 12, md: 3 }}>
                    <Controller
                        name='yearMin'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Select
                                classNamePrefix="form-select-index"
                                options={minYearOptions}
                                placeholder={'Year Min'}
                                onChange={(e) => { onChange(e.value); handleYearChange({ min: e.value }) }}
                            />)} />
                </GridItem>
                <GridItem colSpan={{ base: 12, md: 3 }}>
                    <Controller
                        name='yearMax'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Select
                                classNamePrefix="form-select-index"
                                options={maxYearOptions}
                                placeholder={'Year Max'}
                                onChange={(e) => { onChange(e.value); handleYearChange({ max: e.value }) }}
                            />)} />
                </GridItem>
            </Grid>

            <HStack mt={10} justifyContent={'flex-end'}>
                {/* <Button onClick={() => reset()}>Reset</Button> */}
                <Button type='submit' rightIcon={<FeatherIcon size={16} icon='search' />}>Search</Button>
            </HStack>
        </form>
    )
}


export default SearchInventoryForm
