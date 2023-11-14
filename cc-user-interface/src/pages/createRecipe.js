import './createRecipe.css'
import {useState} from 'react'
import Select from "react-select"
import Modal from 'react-modal'
import {Link} from 'react-router-dom'
import { useRef, createRef } from 'react';
import AppContext from '../AppContext';
import { useContext } from 'react';

export default function CreateRecipe() {

    const optionList = [
        { value: "gin", label: "Gin" },
        { value: "rum", label: "Rum" },
        { value: "tequila", label: "Tequila" },
        { value: "vermouth", label: "Vermouth" },
        { value: "vodka", label: "Vodka" }
    ];

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    var loggedIn;
    const context = useContext(AppContext);
    loggedIn = (context.token !== 'no token');
    var routeString;
    if (loggedIn){
        routeString = "/home2"
    }else {
        routeString = "/"
    }
    console.log(context.token);

    function submitClick(e){
        setModalOpen(true);
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        console.log(...formData)
    }

    function closeModal() {
        setModalOpen(false);
    }


    function handleSelect(data) {
        setSelectedOptions(data);
        selectedOptions.map((ingredient) => <li>{ingredient['label']}</li>);
    }

    return(
        <div className="CreateRecipeFields">
            <h1>Create your own recipe!</h1>
            <form onSubmit={submitClick} class="recipeForm">
                <label className = "entryField">
                Recipe Name: <input name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                </label>
                <br/>
                <label className = "entryFieldLong">
                Recipe Description: <textArea className="descriptionField" name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                </label>
                <div className="ingredient-container">
                    <Select
                        options={optionList}
                        value={selectedOptions}
                        onChange={handleSelect}
                        isSearchable={true}
                        isMulti
                        placeholder="Select ingredients"
                    />
                </div>
                {selectedOptions.map((ingredient, i) => 
                    <div className='quantityField'>
                        <label className='quantityLabel'>
                            {ingredient['label']} Amount: <input name={ingredient['value'] + 'Amount'}/>
                        </label>
                        <label className='quantityLabel'>
                            Quantity (tbs, ml, etc): <input name={ingredient['value'] + 'Quantity'}/>
                        </label>
                    </div>
                )}
                <button type='submit' className='submitBtn'>Submit</button>
            </form>
            <Modal isOpen={modalOpen} onRequestClose={closeModal} className="Modal">
              <h2>Recipe Successfully Created!</h2>
              <br/>
              <Link to={routeString}><button onClick={closeModal}>Head to home page</button></Link>
            </Modal>
        </div>

    )
}