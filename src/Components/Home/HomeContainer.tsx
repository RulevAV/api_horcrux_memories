import {connect} from "react-redux";
import Home from "./Home";
import {compose} from "redux";


let mapStateToProps = (state:any)=>{
    return {
    }
};
let mapDispatchToProps = (dispatch:any)=>{
    return{
    }
};

let HomeCompose = compose(
    connect(mapStateToProps,mapDispatchToProps)
)(Home);
export default HomeCompose;
