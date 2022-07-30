import React from 'react'
import estilo from "./styles/landingPage.module.css"
import { Link } from "react-router-dom"
import circle from "../imgs/Home.png"
import joystick from "../imgs/joystick.png"




export const landingPage = () => {
  return (
    <div className={estilo.fondo}>
      <div className={estilo.container}>

      </div>
      <div className={estilo.homeButton}>
        <img className={estilo.image} src={circle} alt="homeButton" />
        <img className={estilo.joystick} src={joystick} alt="joystick" />
        <Link to="/home"><button className={estilo.button} >START</button></Link>
        {/* <Link to="/home"><h1 className={estilo.home} >Home</h1></Link> */}
        </div>
          <h1 className={estilo.header}>PRESS START TO ENTER</h1>
    </div>
  )
}
