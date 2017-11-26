import React, { Component } from 'react'
import Album from '../pure-components/Album'
import './Main.css'
import {connect} from "react-redux"
import Select from 'react-select'
import Single from './Single'
import 'react-select/dist/react-select.css'
import {filterFavoriteArtists} from '../api/redux/actions'
import {uniqBy} from 'lodash'

class Main extends Component {
    render() {
        const {albums, likedAlbums, activeTab, filterFavoriteArtists, favoriteArtistsIds} = this.props
            , isFavoritePage = activeTab === 'favorite'
            , collections = !isFavoritePage ? albums : likedAlbums.filter(a => { return favoriteArtistsIds.length > 0 ? favoriteArtistsIds.includes(a.artistId) : true })
        let artists = this._filterArtistsFromFavorites(likedAlbums)
        artists = artists || []
        return (
            <section className={`main`}>
                <Single/>
                {isFavoritePage && <Select
                    name="form-field-name"
                    value={favoriteArtistsIds}
                    placeholder="Filter by artist"
                    options={artists}
                    multi={true}
                    onChange={(e) => {const values = e.map(f => f.value); filterFavoriteArtists(values)}}
                /> }

                {collections.map((a, i) => {
                    return <Album key={i} album={a}/>
                })}
            </section>
        )
    }

    _filterArtistsFromFavorites = (favorite) => {
        let atrists = favorite.map(f => {
            return {label: f.artistName, value:f.artistId, artistId: f.artistId}
        })
        // no duplicate
        return uniqBy(atrists, 'artistId')
    }
}


const mapState = state  => {
    return {
        albums: state.albums,
        likedAlbums: state.likedAlbums,
        activeTab: state.selectedPage,
        favoriteArtistsIds: state.favoriteArtistsIds
    }
}

export default connect(mapState, {filterFavoriteArtists})(Main)
