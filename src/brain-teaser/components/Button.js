import React from 'react'
import styles from '../css/main.min.module.css'

export default function Button({text,className}) {
    const classes=`${styles.button} ${className}`
    return (
        <button className={classes}>
            {text}
        </button>
    )
}
