import {http} from './http'

export const getCars = () =>{
    return http.get('cars');
}
