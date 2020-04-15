const initialState = {
    customer_id: '',
    first_name: '',
    last_name: ''
};

const GET_CUSTOMER = 'GET_CUSTOMER';
const LOGOUT_CUSTOMER = 'LOGOUT_CUSTOMER';

export function getCustomer(customerInfo){
    const {customer_id, first_name, last_name} = customerInfo;
    console.log(customerInfo)
    return{
        type: GET_CUSTOMER,
        payload: {customer_id, first_name, last_name}
    };
}

export function logoutCustomer() {
    return {
        type: LOGOUT_CUSTOMER,
        payload: {}
    };
}


export default function reducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_CUSTOMER:
            return {
                ...state,
                customer_id: payload.customer_id,
                first_name: payload.first_name,
                last_name: payload.last_name
            };
        case LOGOUT_CUSTOMER:
            return {
                ...initialState
            }
        default:
            return state;
    }
}

