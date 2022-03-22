

import React from 'react'
import { useRouter } from 'next/router'

import { SimpleGrid, Box, Button } from '@chakra-ui/react'
import Select from 'react-select'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'


const options = require('../../content/select.options')


function QuickSearchForm({ makes }) {
    var makeOptions = [{ value: "", label: "Select Make" }]
    makeOptions = [...makeOptions, ...makes.map(make => { return { value: make.make, label: make.make } })]

    const [modelOptions, setModelOptions] = React.useState([{ value: "", label: "Select Model" }])
    const handleMakeChange = (e) => {
        const match = makes.filter((make) => {
            return make.make === e.value
        })

        if (match.length > 0) {
            setModelOptions([{ value: "", label: "Select Model" }, ...match[0].models.map(model => { return { value: model, label: model } })])
        } else {
            setModelOptions([{ value: "", label: "Select Model" }])
        }
    }

    const router = useRouter()

    const schema = yup.object().shape({
        make: yup.string(),
        model: yup.string(),
        year: yup.string()
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
            <SimpleGrid minChildWidth={175} spacing={15}>
                <Box>
                    <Controller
                        name='year'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Select
                                classNamePrefix="form-select-over"
                                maxMenuHeight={'150px'}
                                options={options.year}
                                onChange={(e) => onChange(e.value)}
                                placeholder={'Select Year'}
                                isSearchable={false}
                            />
                        )}
                    />
                </Box>
                <Box>
                    <Controller
                        name='make'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Select
                                classNamePrefix="form-select-over"
                                maxMenuHeight={'200px'}
                                options={makeOptions}
                                onChange={(e) => { onChange(e.value); handleMakeChange(e) }}
                                placeholder={'Select Make'}
                                isSearchable={false}
                            />
                        )}
                    />
                </Box>
                <Box>
                    <Controller
                        name='model'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Select
                                classNamePrefix="form-select-over"
                                maxMenuHeight={'200px'}
                                options={modelOptions}
                                onChange={(e) => onChange(e.value)}
                                placeholder={'Select Model'}
                                isSearchable={false}
                            />
                        )}
                    />
                </Box>
                <Box>
                    <Button type='submit' borderRadius={0} width={'full'} >Search</Button>
                </Box>
            </SimpleGrid>
        </form>
    )
}

export default QuickSearchForm