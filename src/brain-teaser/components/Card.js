import React from 'react'
import styles from '../css/main.min.module.css'


export default function Card ({children,className}){
const classes= `${styles.card} ${className}`

    return (
        <div className={classes}>
          
{children}
        </div>
    )
}

