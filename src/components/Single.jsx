import React, { Component } from 'react'
import moment from 'moment'
import './Single.css'
import loader from './ajax-loader.gif';
import {connect} from 'react-redux'
import {selectedAlbumRemove} from '../api/redux/actions'
import FontAwesome from 'react-fontawesome'


class Single extends Component {

    constructor(props) {
        super(props)
        this.state = {
            imageLoaded: false
        }
    }

    getPreloader = () => {
        const {imageLoaded} = this.state
            , {album} = this.props
        return !imageLoaded && album ? <img style={{width: '16px', maxWidth:'16px'}} src={loader} alt="pre loader"/> : null
    }

    render() {
        const { album, selectedAlbumRemove } = this.props
            , cover  =  album ? album.find(a => a.wrapperType === 'collection' ) : []
            , tracks = album ? album.filter( a => a.wrapperType === 'track') : []
            , metas = cover ? this._getMetas(cover) : []
            , thumbSrc = cover.artworkUrl100 ? cover.artworkUrl100.replace('100', '650').replace('100', '650') : 'https://source.unsplash.com/random/310x310'
        return album ? (
            <section className="single">
                <button className="close" onClick={selectedAlbumRemove}>
                     <FontAwesome name="times"/>
                </button>
                <div className="thumb">
                    {this.getPreloader()}
                    <img src={thumbSrc} onLoad={() => { this.setState({imageLoaded:true})} } alt={cover ? cover.collectionName : ''}/>
                </div>
                <div className="description">
                    <div className="meta">
                        <h3 className="album-name">{cover ? cover.collectionName : ''}</h3>
                        <h5 className="album-artist">{cover ? cover.artistName : ''}</h5>
                        {metas.map( (m, i) => {
                            return(
                                <span key={i} className="meta-group">
                                    <span className="meta-title">{m.name}</span>
                                    <span className="meta-value">{m.value}</span>
                                </span>
                            )
                        })}

                    </div>
                    <div className="list">
                        <h4>Tracks</h4>
                        <ol>
                        {tracks.map(t => {
                            return (
                                <li>{t.trackName}</li>
                            )
                        })}
                        </ol>
                    </div>
                </div>
            </section>
        ): ''
    }

    _getMetas(cover){
        return [
            {name: 'Type', value: cover.collectionType}
            ,{name: 'Track Count', value: cover.trackCount}
            //,{name: 'copyright', value: cover.copyright}
            ,{name: 'Country', value: cover.country}
            ,{name: 'Genre', value: cover.primaryGenreName}
            ,{name: 'Release Date', value: moment(cover.releaseDate).format('MMMM Do YYYY')}
            ,{name: 'Price', value: `${cover.collectionPrice} ${cover.currency}`}
            ]
    }
}

const mapState = state => {
    return {
        album: state.selectedAlbum
    }
}

export default connect(mapState, {selectedAlbumRemove})(Single)
