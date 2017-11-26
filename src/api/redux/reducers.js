import {
    LOAD_ALBUMS_STARTED,
    LOAD_ALBUMS_DONE,
    SELECT_ALBUM_DONE,
    SELECT_ALBUM_REMOVED,
    MODIFY_FAVORITE,
    SWITCH_PAGE,
    FILTER_ARTIST
} from './common'

const _state = {
    searchedArtist: '',
    selectedPage: 'search',
    likedAlbums: [],
    albums:[],
    selectedAlbum: null,
    favoriteArtistsIds: []
}

const mainReducer = (state = _state, action) => {
    switch (action.type) {
        case LOAD_ALBUMS_STARTED:
            return {...state, searchedArtist: action.searchedArtist, selectedAlbum: null}
        case LOAD_ALBUMS_DONE:
            return {...state, albums:action.albums, selectedPage: 'search'}
        case SELECT_ALBUM_DONE:
            return {...state, selectedAlbum: action.selectedAlbum}
        case MODIFY_FAVORITE:
            return {...state, likedAlbums: action.likedAlbums}
        case SWITCH_PAGE:
            return {...state, selectedPage: action.selectedPage}
        case FILTER_ARTIST:
            return {...state, favoriteArtistsIds: action.favoriteArtistsIds}
        case SELECT_ALBUM_REMOVED:
            return {...state, selectedAlbum: null}
        default:
            return {...state}
    }
}

export default mainReducer