const initialState = {
    customer_id: '',
    first_name: '',
    last_name: '',
    cart_id: 0
};

const GET_CUSTOMER = 'GET_CUSTOMER';
const LOGOUT_CUSTOMER = 'LOGOUT_CUSTOMER';

export function getCustomer(customerInfo){
    const {customer_id, first_name, last_name, cart_id} = customerInfo;
    return{
        type: GET_CUSTOMER,
        payload: {customer_id, first_name, last_name, cart_id}
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
            console.log(payload)
            return {
                ...state,
                customer_id: payload.customer_id,
                first_name: payload.first_name,
                last_name: payload.last_name,
                cart_id: payload.cart_id
            };
        case LOGOUT_CUSTOMER:
            return {
                ...initialState
            }
        default:
            return state;
    }
}

