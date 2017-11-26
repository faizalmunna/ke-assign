import { Observable } from 'rxjs'
import { combineEpics } from 'redux-observable'
import {LOAD_ALBUMS_STARTED, SELECT_ALBUM_STARTED} from './common'
import {albumsLoaded, selectedAlbumLoaded, erroHappened} from './actions'

const loadAlbumsEpic = actions => {
    const api = `https://itunes.apple.com/search?`
        , search = artist => `${api}term=${artist}&entity=album`
        , ajax = artist => Observable.ajax.getJSON(search(artist))
    return actions
        .ofType(LOAD_ALBUMS_STARTED)
        .map(f => {
            console.log(f)
            return f
        })
        .debounceTime(500)
        .switchMap(({searchedArtist}) => {
            return ajax(searchedArtist)
                .map(response => {
                    if (response.results.length > 0){
                        return albumsLoaded(response.results)
                    }
                    return false
                })

        })

}

const loadSingleAlbumEpic = actions => {
    const api = `https://itunes.apple.com/lookup?`
        , search = album => `${api}id=${album.collectionId}&entity=song`
        , ajax = album => Observable.ajax.getJSON(search(album))
    return actions
        .ofType(SELECT_ALBUM_STARTED)
        .switchMap(({payload}) => {
            return ajax(payload)
                .map(response => {
                    return selectedAlbumLoaded(response.results)
                })
                .catch(error => {
                    return Observable.of(erroHappened(error))
                })
        })

}

export const rootEpic = combineEpics(loadAlbumsEpic, loadSingleAlbumEpic)