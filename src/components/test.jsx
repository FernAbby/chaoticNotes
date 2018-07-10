import React, {Component} from 'react';
import Utils from '../assets/js/utils'

class Test extends Component{
    constructor(props){
        super(props);
        this.data = {
            name: '期末考试成绩',
            grade: '二年纪',
            number: ['a',9,'6','ceshi',{name:'wanghu',age:8}],
            banji: [{
                test_001:{
                    wenzhen: [{
                        math: 100,
                        english: 99,
                        chinese: 98,
                    },{
                        zhengzhi: 100,
                        dili: 99,
                        wuli: 98,
                    }],
                    wanglei: {
                        math: 0,
                        english: 9,
                        chinese: 5,
                    },
                    zhaosi: [{
                        math: 80,
                        english: 69,
                        chinese: 75,
                    }],
                    zhangsan:  [{
                        math: 65,
                        english: 49,
                        chinese: 82,
                    }],
                },
                test_002: [{
                    wangyan: [{
                        math: 85,
                        english: 89,
                        chinese: 93,
                    }],
                    zhangjing: [{
                        math: 48,
                        english: 64,
                        chinese: 73,
                    }],
                    lilu: [{
                        math: 92,
                        english: 95,
                        chinese: 98,
                    }],
                    qingjing:  [{
                        math: 62,
                        english: 54,
                        chinese: 89,
                    }],
                }]
            }],
        }
        console.log(Utils.deepClone([1,9,2,4,5,4,3,8]));
        console.log(Utils.param(this.data));
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