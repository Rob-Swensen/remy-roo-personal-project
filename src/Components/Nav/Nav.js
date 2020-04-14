import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

function Nav(props){

const handleLogout = () => {
    axios.get('/api/logout')
}

    return(
        <div>
            <Link to='/login'>
                <button>Sign In</button>
            </Link>
            <Link to='/register'>
                <button>Register</button>
            </Link>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Nav;