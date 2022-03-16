import React from 'react'
import Select from 'react-select'

import { useRouter } from 'next/router'

import { Box, FormLabel, HStack, Button } from '@chakra-ui/react'
import FeatherIcon from 'feather-icons-react'


import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const options = require('../../content/select.options')


export default function FilterInventory({ makes, setCurrentParams, setRefresh, currentParams }) {


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
        body: yup.string()
    })

    const { handleSubmit, control, reset } = useForm({
        defaultValues: {
            make: currentParams?.make ? currentParams.make : '',
            model: currentParams?.model ? currentParams.model : '',
            trans: currentParams?.trans ? currentParams.trans : '',
            yearMin: currentParams?.yearMin ? currentParams.yearMin : '',
            yearMax: currentParams?.yearMax ? currentParams.yearMax : '',
            body: currentParams?.body ? currentParams.body : ''
        },
        resolver: yupResolver(schema)
    })

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
            setCurrentParams(query)
            setRefresh(true)
            return;
        }

        router.push('/inventory')
        setCurrentParams(query)
    }


    return (
        <form onSubmit={handleSubmit(data => handleFormSubmit(data))}>
            <Box my={3}>
                <FormLabel fontSize={'xs'}>Make</FormLabel>
                <Controller
                    name='make'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Select
                            classNamePrefix="form-select-index"
                            options={makeOptions}
                            onChange={(e) => { onChange(e.value); handleMakeChange(e) }}
                            placeholder={'Any'}
                        />
                    )}
                />
            </Box>
            <Box my={3}>
                <FormLabel fontSize={'xs'}>Model</FormLabel>
                <Controller
                    name='model'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Select
                            classNamePrefix="form-select-index"
                            options={modelOptions}
                            placeholder={'Any'}
                            onChange={(e) => onChange(e.value)}
                        />
                    )} />
            </Box>
            <HStack justifyContent={'space-evenly'} width={'full'}>
                <Box width={'full'} my={3}>
                    <FormLabel fontSize={'xs'}>From</FormLabel>
                    <Controller
                        name='yearMin'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Select
                                classNamePrefix="form-select-index"
                                options={minYearOptions}
                                placeholder={'Any'}
                                onChange={(e) => { onChange(e.value); handleYearChange({ min: e.value }) }}
                            />)}
                    />
                </Box>
                <Box width={'full'} my={3}>
                    <FormLabel fontSize={'xs'}>To</FormLabel>
                    <Controller
                        name='yearMax'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Select
                                classNamePrefix="form-select-index"
                                options={maxYearOptions}
                                placeholder={'Any'}
                                onChange={(e) => { onChange(e.value); handleYearChange({ max: e.value }) }}
                            />)}
                    />
                </Box>
            </HStack>

            <Box my={3}>
                <FormLabel fontSize={'xs'}>Body Type</FormLabel>
                <Controller
                    name='body'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Select
                            classNamePrefix="form-select-index"
                            options={options.body}
                            placeholder={'Any'}
                            onChange={(e) => onChange(e.value)}
                        />)}
                />
            </Box>

            <Box my={3}>
                <FormLabel fontSize={'xs'}>Transmission</FormLabel>
                <Controller
                    name='trans'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Select
                            classNamePrefix="form-select-index"
                            options={options.trans}
                            placeholder={'Any'}
                            onChange={(e) => onChange(e.value)}
                        />)}
                />
            </Box>

            <Button type='submit' mt={10} width={'full'} rightIcon={<FeatherIcon size={18} icon={'filter'} />}>Filter Inventory</Button>
        </form>
    )
}