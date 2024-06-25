import PropTypes from 'prop-types'
const ListTask =({props1,props2})=>{
    return(
        <h1>{props1} y {props2}</h1>
    )
}
export default ListTask

ListTask.prototype ={
    props1:PropTypes.string,
    props2:PropTypes.number
}

