import React from 'react'
import ReactDOM from 'react-dom'
import User from './components/user'

ReactDOM.render(
    <User id={document.querySelector("#container").getAttribute("data-id")} />,
    document.querySelector("#container")
)