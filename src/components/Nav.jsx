import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import {switchPage} from '../api/redux/actions'
import {connect} from 'react-redux'
import './Nav.css'

class Nav extends Component{

    render(){
        const {switchPage, selectedPage} = this.props
            , buttons = [{name:'search', key: 'search-plus'}, {name:'favorite', key: 'star'}]
        return(
            <nav className="main-nav">
                <ul className="main-menu">
                    {buttons.map(b => {
                        const activeClass = selectedPage === b.name ? 'active': ''
                        return(
                            <li key={b.key} className={activeClass}><button onClick={(e) => {e.preventDefault(); switchPage(b.name)}} className="btn"><FontAwesome name={b.key}/></button></li>
                        )
                    })}

                </ul>
            </nav>
        )

    }
}

const mapProps = state => {
    return {
        selectedPage: state.selectedPage
    }
}

export default connect(mapProps, {switchPage})(Nav)