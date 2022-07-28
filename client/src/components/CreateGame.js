import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSearch, createGame, getAllGenres } from "../actions";
import { Link } from "react-router-dom"
import estilo from "./styles/createGame.module.css"

export default function CreateGame() {

    //////////////////////////////////////     ESTADO GLOBAL    ////////////////////////////////////////////////////    

    const dispatch = useDispatch()
    const { allGenres } = useSelector(state => state)
    useEffect(() => {
        dispatch(getAllGenres())
        dispatch(clearSearch())
    }, [dispatch])

    ////////////////////////////////////// ESTADO LOCAL PARA EL DORMULARIO ////////////////////////////////////////////////////    

    const [errors, setErrors] = useState({})
    const [disable, setDisable] = useState(true)
    const [form, setForm] = useState({
        name: "",
        image: "",
        description: "",
        genre: [],
        platforms: [],
        rating: "",
        date: ""
    })


    ////////////////////////////////////////////// VALIDACION ///////////////////////////////////////////////////////////////////

    function validate(form) {
        let expression = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
        let errors = {};

        if (!form.name) {
            errors.name = 'Name is required  x';
        }
        if (!form.image) {
            errors.image = 'Image is required  x';
        } else if (!expression.test(form.image)) {
            errors.image = 'URL is invalid  x';
        }
        if (!form.description) {
            errors.description = 'Description is required  x';
        } else if (form.description.length < 20) {
            errors.description = "Description is too short  x"
        }
        if (!form.rating) {
            errors.rating = "Rate your game  x"
        }
        if (form.genre.length === 0) {
            errors.genre = "Genre is required  x"
        }
        if (form.platforms.length === 0) {
            errors.platforms = "Platform is required  x"
        }

        const objkeys = Object.keys(errors)

        if (objkeys.length === 0) { setDisable(false) }
        else { setDisable(true) }

        return errors;
    }

    ////////////////////////////////////// FUNCTION ON CHANGE DEL FORMULARIO ////////////////////////////////////////////////////    

    function onChange(e) {
        if (e.target.name === "rating") {
            if (e.target.value === "Rate Game 🟊") { return }
        }
        setForm({ ...form, [e.target.name]: e.target.value })
        setErrors(validate({ ...form, [e.target.name]: e.target.value }))
    }


    ///////////////////////////////////////// FUNCTION CHECKBOXES VALUE  /////////////////////////////////////////////////////

    function checkBoxCheck(e) {
        if (e.target.checked) {
            setForm({
                ...form,
                [e.target.name]: [...form.genre, e.target.value]
            })
            setErrors(validate({ ...form, [e.target.name]: e.target.value }))

        } else {
            setForm({ ...form, [e.target.name]: form.genre.filter(g => g !== e.target.value) })
            setErrors(validate({ ...form, [e.target.name]: form.genre.filter(g => g !== e.target.value) }))
        }

    }

    function checkBoxCheck2(e) {
        if (e.target.checked) {
            setForm({
                ...form,
                [e.target.name]: [...form.platforms, e.target.value]
            })
            setErrors(validate({ ...form, [e.target.name]: e.target.value }))
        } else {
            setForm({ ...form, [e.target.name]: form.platforms.filter(g => g !== e.target.value) })
            setErrors(validate({ ...form, [e.target.name]: form.platforms.filter(g => g !== e.target.value) }))
        }
    }


    ///////////////////////////////////////// FUNCTION ON SUBMIT DEL FORMULARIO  //////////////////////////////////////////////

    function onSubmit(e) {
        dispatch(createGame(form))
        setForm({
            name: "",
            image: "",
            description: "",
            genre: [],
            platforms: [],
            rating: "",
            date: ""
        })
    }

    let plataformas = ["Linux", "PC", "Xbox One", "PlayStation 2", "PlayStation 3", "PlayStation 4", "PlayStation 5", "Xbox 360", "macOS", "Nintendo Switch", "Xbox Series S/X", "Wii U", "Nintendo 3DS", "iOS", "PS Vita", "Android", "Xbox", "Web", "Dreamcast"]



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    

    return (
        <div className={estilo.radial}>
            <div className={estilo.createGame}>


                <div className={estilo.container}>

                    <div className={estilo.buttonContainer}>
                        <Link to="/home"><button className={estilo.button}><i className="fa-solid fa-house-chimney"></i> Home </button></Link>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className={estilo.contenedor}>
                            <input className={estilo.cajaTextoBarras} autoComplete="off" placeholder="Name of your game" type="text" name="name" value={form.name} onChange={onChange}></input>
                            {errors.name && (<label className={estilo.errors}>{errors.name}</label>)}
                        </div>
                        <div className={estilo.contenedor}>
                            <input className={estilo.cajaTextoBarras} autoComplete="off" placeholder="Img URL for the game" type="text" name="image" value={form.image} onChange={onChange}></input>
                            {errors.image && (<label className={estilo.errors}>{errors.image}</label>)}
                        </div>
                        <div className={estilo.contenedor}>
                            <textarea className={estilo.cajaTextoBarras} placeholder="Put a description!" type="text" name="description" value={form.description} onChange={onChange}></textarea>
                            {errors.description && (<label className={estilo.errors}>{errors.description}</label>)}
                        </div>

                        <div className={estilo.contenedor}>
                            <input className={estilo.cajaTexto} type="date" name="date" value={form.date} onChange={onChange}></input>
                            <select className={estilo.cajaTexto} name="rating" value={form.rating} onChange={onChange}>
                                <option>Rate Game 🟊</option>
                                <option value={1}> 1🟊</option>
                                <option value={2}> 2🟊</option>
                                <option value={3}> 3🟊</option>
                                <option value={4}> 4🟊</option>
                                <option value={5}> 5🟊</option>
                            </select>
                            {errors.rating && (<label className={estilo.errors}>{errors.rating}</label>)}
                        </div>
                        <div>
                            <label>Genres:</label>
                            <div className={estilo.checkBoxes}>
                                {allGenres.map((e, index) =>
                                    <div className={estilo.individualCheck} key={index}>
                                        <label>{e.name}</label><input key={e.id} className={estilo.box} type="checkbox" value={e.name} name="genre" onClick={checkBoxCheck}></input>
                                    </div>
                                )}
                            </div>
                            {errors.genre && (<label className={estilo.errorsSS}>{errors.genre}</label>)}
                        </div>
                        <label>Platforms:</label>
                        <div className={estilo.checkBoxes}>
                            {plataformas.map((e, index) =>
                                <div className={estilo.individualCheck} key={index} >
                                    <label>{e}</label><input key={e} className={estilo.box} type="checkbox" value={e} name="platforms" onClick={checkBoxCheck2}></input>
                                </div>
                            )}
                        </div>
                        {errors.platforms && (<label className={estilo.errorsS}>{errors.platforms}</label>)}

                        <button className={estilo.button} disabled={disable} type="submit"><i className="fa-solid fa-circle-plus"></i> Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}