
import Cookies from 'js-cookie'

export default () => {

    return {
        addSaveVehicle: (id) => {
            Cookies.set(`saved-${id}`, JSON.stringify({ id }), { expires: 15 })
        },


        addRecentVehicle: (id) => {
            Cookies.set(`recent-${id}`, JSON.stringify({id, timeStamp: + new Date() }), { expires: 2 })
        },

        isSaved: (id) => {
            const saved = Cookies.get(`saved-${id}`)
            return saved ? true : false
        },
      
        removeSaveVehicle: (id) => {
            const saved = Cookies.get(`saved-${id}`)
            if (saved) Cookies.remove(`saved-${id}`)
        }


    }
}