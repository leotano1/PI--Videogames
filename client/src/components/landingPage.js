import React from 'react'
import estilo from "./styles/landingPage.module.css"
import { Link } from "react-router-dom"
import circle from "../imgs/Home.png"




export const landingPage = () => {
  return (
    <div className={estilo.fondo}>
      <div className={estilo.container}>

        <div className={estilo.cartita}></div>
        <div className={estilo.cartita}></div>
        <div className={estilo.cartita}></div>  
        <div className={estilo.cartita}></div>      
        <div className={estilo.cartita}></div>  
        <div className={estilo.cartita}></div>  
        <div className={estilo.cartita}></div>  
        <div className={estilo.cartita}></div>  
        <div className={estilo.cartita}></div>  
        <div className={estilo.cartita}></div>  
        <div className={estilo.cartita}></div>  
        <div className={estilo.cartita}></div>
        <div className={estilo.cartita}></div>  
        <div className={estilo.cartita}></div>
        <div className={estilo.cartita}></div>
        <div className={estilo.cartita}></div>
        <div className={estilo.cartita}></div>
        <div className={estilo.cartita}></div>
        <div className={estilo.cartita}></div>
        <div className={estilo.cartita}></div>
        <div className={estilo.cartita}></div>
        <div className={estilo.cartita}></div>
        


      </div>
      <div className={estilo.homeButton}>
        <img className={estilo.image} src={circle} alt="homeButton" />
        <img className={estilo.imageReflex} src={circle} alt="homeReflex" />
        <Link to="/home"><a className={estilo.home} >HOME</a></Link>
        </div>
    </div>
  )
}
