// Inventory Querries

const GET_INVENTORY = `
query {
  Inventory {
    data {
      _id
      title
    }
  }
}`

const CREATE_VEHICLE = `
mutation {
	createVehicle(
    data: {
        updated_by: $updated_by,
        added_by: $added_by,

        timeStamp: $timeStamp,
        last_update: $last_update,
        arrival: $arrival,
        title: $title,
        
        saves: $saves,
        body: $body,
        trans: $trans,
        request: $request,
        location: $location,
        history: $history,
        price_visible: $price_visible,
        model: $model,
        mileage: $mileage,

        features: $features,
        isFeatured: $isFeatured,
        price: $price,
        year: $year,
        price_cond: $price_cond,
        color: $color,
        engine_no: $engine_no,

        id: $stock,
        chassis: $chassis,
        isVisible: $isVisible,
        media: $media,

        make: $make,
        isAvailable: $isAvailable,
        submodel: $submodel,
        engine_size: $engine_size
    }) {
      _id,
      title
    }
}`

const UPDATE_VEHICLE = `
`

const DELETE_VEHICLE = `
`

const GET_VEHICLE = `
`

const GET_FILE = `
`

const CREATE_FILE = `
`

const DELETE_FILE = `
`

const CREATE_FEATURE = `
`

const UPDATE_FEATURE = `
`

const DELETE_FEATURE = `
`

// User Querries

const CREATE_USER = `
mutation {
  createUser({
    firstName: $firstName,
    lastName: $lastName, 
    fullName: $fullName,
    access_level: $access_level,
    uid: $uid,
    position: $position,
    recent_activities: $recent_activities,
    email: $email,
    added_by: $added_by
  }) {
    _id
    uid
    fullName
    email
    position
    access_level
    recent_activities
  }
}`

const UPDATE_USER = `
mutation {
  updateUser({
    firstName: $firstName,
    lastName: $lastName, 
    fullName: $fullName,
    access_level: $access_level,
    position: $position,
    recent_activities: $recent_activities,
    email: $email
  }) {
    _id
    uid
    fullName
    email
    position
    access_level
    recent_activities
  }
}`

const DELETE_USER = `
query {
  deleteUser(id: $id) {
    _id
    fullName
    email
  }
  }
`

const CREATE_ACTIVITY = `
mutation {
	createActivity({
     id: $id,
     timeStamp: $timeStamp,
     title: $title,
     user: $user,
     description: $description 
  }) {
    _id
    id
    timeStamp
    title
    user
  }
}
`

const GET_USER = `
query {
  findUserByID(id: $id) {
    _id
    uid
    fullName
    email
    position
    access_level
    recent_activities
  }
  }
`

const GET_ALL_USERS = `
query {
  allUsers {
    data{
			_id
      uid
      fullName
      email
      position
      access_level
      recent_activities
    }
  }
}`

// Request Querries

const UPDATE_REQUEST = `
`

const DELETE_REQUEST = `
`

const GET_REQUEST = ` 
`

const GET_ALL_REQUESTS = `
`



module.exports = {
  GET_INVENTORY,
  CREATE_VEHICLE,
  CREATE_USER,
  UPDATE_USER,
  GET_USER,
  GET_ALL_USERS,
  DELETE_USER,
  CREATE_ACTIVITY
}