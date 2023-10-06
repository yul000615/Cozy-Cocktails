import './createRecipe.css'
import {useState} from 'react'
import Select from "react-select"
import Modal from 'react-modal'
import {Link} from 'react-router-dom'

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
    const [modalOpen, setModalOpen] = useState(false)


    function submitClick(){
        setModalOpen(true);
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
            <label className = "entryField">
            Recipe Name: <input name="name" value={name} onChange={(e) => setName(e.target.value)}/>
            </label>
            <br/>
            <label className = "entryFieldLong">
            Recipe Description: <textArea className="descriptionField" name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            </label>
            <div className="dropdown-container">
                <Select
                    options={optionList}
                    value={selectedOptions}
                    onChange={handleSelect}
                    isSearchable={true}
                    isMulti
                    placeholder="Select ingredients"
                />
            </div>
            {selectedOptions.map((ingredient) => 
                <div className='quantityField'>
                    <label className='quantityLabel'>
                        {ingredient['label']} Amount: <input />
                    </label>
                    <label className='quantityLabel'>
                        Quantity (tbs, ml, etc): <input />
                    </label>
                </div>
            )}
            <button className='submitBtn' onClick={submitClick}>Submit</button>
            <Modal isOpen={modalOpen} onRequestClose={closeModal} className="Modal">
              <h2>Recipe Successfully Created!</h2>
              <br/>
              <Link to="/"><button onClick={closeModal}>Head to home page</button></Link>
            </Modal>
        </div>

    )
}