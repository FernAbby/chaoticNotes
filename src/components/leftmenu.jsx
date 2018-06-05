import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {Request} from '../http/request';
import * as Actions from '../redux/Actions';
import Store from '../redux/Store';

import '../assets/css/cmc_submenu.css';

class LinkGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover_link: 0,
        }
    }

    mouseOver(id) {
        this.setState({
            hover_link: id
        });
    }

    render() {
        let {item_title, id, item_link, item_icon, item_icon_blue, link_id, selectedLink} = {...this.props};
        let classStr = (id === link_id ? 'leftLink selected' : 'leftLink');
        let linkElement = '';
        if(item_link=='/gis/index.html'){
            linkElement = (
                <a className="leftLink selected" target="_blank" href={item_link}>
                    <img src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==" alt=""/>
                    <span>{item_title}</span>
                </a>
            );
        }else{
            linkElement = (
                <Link to={item_link || '/404'} className={classStr} onClick={selectedLink}
                      onMouseEnter={this.mouseOver.bind(this, id)}
                      onMouseLeave={this.mouseOver.bind(this, 0)}>
                    <img src={this.state.hover_link || id === link_id ? item_icon_blue : item_icon} alt=""/>
                    <span>{item_title}</span>
                </Link>
            );
        }
        return linkElement;
    }
}


class Categorylink extends Component {
    constructor(props) {
        super(props);

        this.initClass = props.category.children.length === 0 ? 'leftmenu_list' : 'leftmenu_list category';
        let initOpen = (props.category_id === props.category.id);
        this.state = {
            isOpen: initOpen,
            menuClass: initOpen ? this.initClass + ' categoryOpen' : this.initClass,
            hover_link: 0
        }
    }
    mapStateToProps(state, ownProps) {
        return {
            link_id: state.leftmenu['link_id']
        }
    }

    mapDispatchToProps(dispatch, ownProps) {
        return {
            selectedLink: () => {
                dispatch(Actions.selected_link(ownProps.id,ownProps.parent_id));
            },
        }
    }

    changeCategory(_) {
        this.setState({
            menuClass: this.state.isOpen ? this.initClass : this.initClass + ' categoryOpen',
        });
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    mouseOver(id){
        this.setState({
            hover_link: id
        });
    }

    render() {
        const category = this.props.category;
        let Linkgroup = connect(this.mapStateToProps, this.mapDispatchToProps)(LinkGroup);

        let navLink;
        if (category.item_type === "category") {
            navLink = (
                <a className="leftLink category" onClick={this.changeCategory.bind(this)}
                   onMouseEnter={this.mouseOver.bind(this,category.id)}
                   onMouseLeave={this.mouseOver.bind(this,0)}>
                    <img src={category.id===this.state.hover_link?category.item_icon_blue:category.item_icon} alt=""/>
                    <span>{category.item_title}</span>
                </a>
            );
        } else if (category.item_type === "link") {
            navLink = (
                <Linkgroup {...category}/>
            );
        }
        return (
            <div className={this.state.menuClass}>
                {navLink}
                {
                    category.children.map((item, i) => {
                        return (
                            <Linkgroup key={i} {...item}/>
                        );
                    })
                }
            </div>
        );
    }
}

class Leftmenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display: props.display,
            category_id: 0,
            link_id: 0,
            position_index: 0,
            Menus: {
                title: '选题策划',
                list: []
            }
        }
    }
    componentDidMount() {
        function getBlueIcon(icon){
            return icon?icon.replace(/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/, '_blue.$1'):'';
        }
        Request.GetMenuList((data) => {
        // let data = Menus;
            if (data.code === 10000) {
                let leftmenu = JSON.parse(JSON.stringify(this.state));
                leftmenu.Menus.list = data.data.items;
                data.data.items.forEach(function (item, i) {
                    item.item_icon = item.item_icon ||'./img/active_admin.png';
                    item.item_icon_blue = getBlueIcon(item.item_icon);
                    if (item.url === window.location.hash.substr(1) && item.children.length === 0) {
                        leftmenu.link_id = item.id;
                    }
                    item.children.forEach(function (link, i) {
                        if(!link.item_icon){
                            link.item_icon = link.item_icon_blue = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==';
                        }else{
                            link.item_icon_blue = getBlueIcon(link.icon);
                        }
                        if (link.item_link === window.location.hash.substr(1)) {
                            leftmenu.link_id = link.id;
                            leftmenu.category_id = item.id;
                        }
                    });
                });
                this.setState(leftmenu, function () {
                    // console.log(this.state);
                });
                Store.dispatch(Actions.update_leftmenu(leftmenu));
            }else if(data.code=='20039' && data.status=='302'){
                window.location.href = window.CONFIG.CALLBACK_LOGIN;
            }
        });
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            display: nextProps.display
        });
    }
    handleScroll(event){
        event.preventDefault();
        event.stopPropagation();
        let offset = (document.getElementsByClassName('leftmenu_content-inner')[0].offsetHeight
            - document.getElementsByClassName('leftmenu_content')[0].offsetHeight);
        if(offset>0){
            let deta = event.deltaY;
            let index = this.state.position_index;
            if(deta > 0 && index+1>0 && index*50<offset){
                this.setState({
                    position_index: this.state.position_index+1
                });
            }
            if(deta < 0 && index>0){//向下
                this.setState({
                    position_index: this.state.position_index-1
                });
            }
        }
    }
    render() {
        return (
            <div id="lefter-menu" style={{width:(this.state.display?"180px":"50px")}}>
                <nav className={this.state.display?"main_leftmenu":"main_leftmenu short"}>
                    <div className="leftmenu_title">{this.state.Menus.title}</div>
                    <div className="leftmenu_content" onWheel={this.handleScroll.bind(this)}>
                        <div className="leftmenu_content-inner" style={{marginTop:-(this.state.position_index*50)+'px'}}>
                            {
                                this.state.Menus.list.map((item, i) => {
                                    return (
                                        <Categorylink key={i} category={item} category_id={this.state.category_id}/>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div className="leftmenu_changeDisplay" onClick={this.props.changeDisplay}></div>
                </nav>
            </div>
        );
    }
}

export default Leftmenu;
