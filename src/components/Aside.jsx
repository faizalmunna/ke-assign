import React, { Component } from 'react'
import Album from '../pure-components/Album'

export default class Aside extends Component {
    render(){
        const favorite = [1,2,3]
        return(
            <section className={`aside`}>
                {favorite.map(f => {
                    return <Album/>
                })}
            </section>
        )
    }
}