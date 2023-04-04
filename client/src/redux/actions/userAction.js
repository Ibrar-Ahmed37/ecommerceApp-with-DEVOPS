import { CREATE_USER } from "./types"

export const userAction = (name)  => {    
    // const response =  await axios.get('')
    console.log("the name is "+ name)
    return({
        type: 'CREATE_USER',
        payload: name
    })
}

