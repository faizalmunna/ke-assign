import React, { Component } from 'react'
import './Header.css'
import {connect} from "react-redux"
import {loadAlbums} from '../api/redux/actions'
import FontAwesome from 'react-fontawesome'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchText: ''
        }
    }
    render(){
        const {selectedPage} = this.props
            , {searchText} = this.state
            ,buttons = [{name:'search', key: 'search'}, {name:'favorite', key: 'star'}]
        return(
            <header className={`header`}>
                <div className={`search-wrapper`}>
                    <FontAwesome name={`search`}/>
                    <input autoFocus={true} value={searchText} onChange={this._onchange}  placeholder="type artist name to find your album..." className="search" type="text"/>
                </div>
                <h1 className={`header-title`}>
                    {buttons.map(b => {
                        const activeClass = selectedPage === b.name ? 'logo logo-big': 'logo'
                        return(<span key={b.key} className={activeClass}>{b.name}</span>)
                    })}
                </h1>
            </header>
        )
    }

    _onchange = (e) => {
        const { loadAlbums } = this.props
            , searchText = e.target.value
        this.setState({searchText}, () => {
            if(searchText.length > 0) {
                console.log('search triggerd')
                loadAlbums(searchText)
            }
        })

    }
}

const mapState = state  => {
    return {
        searchedArtist: state.searchedArtist,
        selectedPage: state.selectedPage
    }
}

export default connect(mapState, {loadAlbums})(Header)