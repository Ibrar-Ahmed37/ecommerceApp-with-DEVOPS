import React from 'react'
import { useSelector,useDispatch, connect} from 'react-redux'
import {userAction} from '../redux/actions/userAction';
import { userReducer } from '../redux/reducers/userReducer';
const Register = (props) => {

    const handleClick = () => {
        console.log(props)
        console.log('inasd')
        props.userAction('ibrar');
    }
    console.log(props.userId);
return (
    <div>
        <input placeholder='enter your name'/>
        <br/>
        <button onClick={handleClick}>Register</button>
        <h1>Register</h1>
        The user id is {props.userId}
    </div>
  )
}
const mapStateToProps  = (state) => {
    console.log( {state})
    return {
        userId : state?.userReducer.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return{userAction: (name) => dispatch(userAction(name))}
}

export default connect(mapStateToProps ,mapDispatchToProps)(Register)