import supabase from "../../../controller/util/supabase.client"



const createMakeModel = async ({ make, model, submodel }) => {
    const { data, error } = await supabase
        .from('make-model')
        .select('id')
        .eq('make', make)
        .eq('model', model)
        .eq('submodel', submodel === '' ? null : submodel)

    if (error) throw new Error('Something went wrong')

    if (data.length === 0) {
        const { data, error } = await supabase
            .from('make-model')
            .insert([
                { make, model, submodel: submodel === '' ? null : submodel }
            ])

        if (error) throw new Error('Something went wrong')
        if (data) return data
    } else {
        return data
    }
}

const createVehicle = async ({ make, model, submodel, body, chassis, color, engine_no, engine_size, location, mileage, price, year, history }) => {

    const { data: modelReference } = await createMakeModel({ make, model, submodel }).catch( error)

    const { data: vehicle, error } = await supabase.from()
        .insert([
            { model: modelReference.id, body, chassis, color, engine_no, engine_size, location, mileage, price, year, history }
        ])

    if (error) throw new Error('Something went wrong')
    return vehicle
}


export default { createMakeModel, createVehicle }