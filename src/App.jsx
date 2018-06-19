import React, {Component} from 'react';
import Test from './components/test'

class App extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
               <Test/>
            </div>
        );
    }
}

export default App;
