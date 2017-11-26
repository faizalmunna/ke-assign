import {
    LOAD_ALBUMS_STARTED,
    LOAD_ALBUMS_DONE,
    LOAD_ALBUMS_FAILED,
    SELECT_ALBUM_STARTED,
    SELECT_ALBUM_DONE,
    SELECT_ALBUM_REMOVED,
    MODIFY_FAVORITE,
    SWITCH_PAGE,
    FILTER_ARTIST
} from './common'

const _switchFav = (_favorites, album) => {
    let favorite = _favorites.slice()
    if(favorite.find(_album => _album.collectionId === album.collectionId)){
        return favorite.filter(_album => _album.collectionId !== album.collectionId)
    }
    favorite.push(album)
    return favorite
}

export const loadAlbums = searchedArtist => {
    return{
        type: LOAD_ALBUMS_STARTED,
        searchedArtist
    }
}

export const albumsLoaded = albums => {
    return {
        type: LOAD_ALBUMS_DONE,
        albums
    }
}

export const selectAlbum = payload => {
    return {
        type: SELECT_ALBUM_STARTED,
        payload
    }
}

export const selectedAlbumLoaded = selectedAlbum => {
    return {
        type: SELECT_ALBUM_DONE,
        selectedAlbum
    }
}

export const switchFavorite = (album, likedAlbums) => {
    const albums = _switchFav(likedAlbums, album)
    return {type: MODIFY_FAVORITE, likedAlbums: albums}
}

export const switchPage = selectedPage => {
    return { type: SWITCH_PAGE, selectedPage }
}

export const filterFavoriteArtists = favoriteArtistsIds => {
    return { type: FILTER_ARTIST, favoriteArtistsIds }
}

export const selectedAlbumRemove = () => {
    return { type: SELECT_ALBUM_REMOVED }
}

export const erroHappened = error => {
    return {
        type: LOAD_ALBUMS_FAILED,
        error
    }
}