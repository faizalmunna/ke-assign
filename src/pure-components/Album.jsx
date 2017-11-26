import React from 'react'
import PropTypes from 'prop-types'
import Star from './Star'
import './Album.css'
import FontAwesome from 'react-fontawesome'
import {connect} from "react-redux"
import {selectAlbum, switchFavorite} from '../api/redux/actions'
const Album = ({album, selectAlbum, switchFavorite, likedAlbums, selectedAlbum}) => {
    const imgSrc = album.artworkUrl100.replace('100', '310').replace('100', '310')
        , isFavorite = likedAlbums.find(a => a.collectionId === album.collectionId)
        , isSelected = selectedAlbum ? (selectedAlbum[0].collectionId === album.collectionId ? 'album-selected' : '') : ''
    return (
        <article className={`album ${isSelected}`}>
            <div className="thumb">
                <img src={imgSrc} alt="thumb" />
            </div>
            <button onClick={e=>{ e.preventDefault(); switchFavorite(album, likedAlbums) }} className={isFavorite ? `btn btn-favourite btn-is-favourite` : `btn btn-favourite`}>
                <Star/>
            </button>
            <div className={`description`}>
                <div className="main-content">
                    <h3 className="album-name">{album.collectionName}</h3>
                    <h4 className="album-artist">{album.artistName}</h4>
                </div>
                <footer className="album-footer">
                    <span className="price">Price {album.collectionPrice} {album.currency}</span>
                    <button onClick={(e) => {e.preventDefault(); selectAlbum(album)}} className="btn"><FontAwesome name="chevron-right"/></button>
                </footer>
            </div>
        </article>
    )
}

Album.propTypes = {
    album: PropTypes.object.isRequired
}

const mapState = state  => {
    return {
        likedAlbums: state.likedAlbums,
        selectedAlbum: state.selectedAlbum
    }
}

export default connect(mapState, {selectAlbum, switchFavorite}) (Album)