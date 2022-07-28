import React from "react";
import estilo from "./styles/paginado.module.css"

export default function Paginacion (props) {

   let current = props.pagina

    let auxArr = []

     for(let i = 1; i <= props.maximo; i++) { 
        auxArr.push(i)}
     

    return (
        <div className={estilo.paginado}>
           
            {auxArr.map((e,index) => <div key={index} > <button className={e === current ? estilo.current : estilo.boton} key={e} onClick={()=>props.setPagina(e)}>{e}</button>  </div>)}
       
        </div>
    )
}