import React, {Component} from 'react';
import Utils from '../assets/js/utils'

class Test extends Component{
    constructor(props){
        super(props);
        console.log(Utils.deepClone([1,9,2,4,5,4,3,8]));
    }
    render(){
        return (
            <div className="test">
                这是测试页面,哈哈哈副部级!
            </div>
        );
    }
}

export default Test;