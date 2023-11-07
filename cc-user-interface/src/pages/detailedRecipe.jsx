import React from 'react'
import './detailedRecipe.css';
import { useState} from 'react';
import Modal from 'react-modal';

const DetailedRecipe = ({ closeDetailed, recipe }) => {

    //check if the user is logged in to give them the option to rate or favorite
    //users do not need to be logged in to report recipes
    const [loggedIn, setLoggedIn] = useState(true)
    const [issue, setIssue] = useState("");
    const [reportOpen, setReportOpen] = useState(false);
    const [reportMessage, setReportMessage] = useState("");


    function openReport(){
        setReportOpen(true);
    }

    function closeReport(){
        setReportOpen(false);
    }

    function reportSubmit(){
        if (issue.length==0) {
            setReportMessage('Must enter an issue before submitting');
        } else{
            setReportMessage('Thank you! We will review your report shortly.')
        }
    }

    return(
        <div className='detailedRecipeBackground'>
            <div className='detailedRecipeContainer'>
                <div className='titleBar'>
                    <h1>Detailed View: {recipe.name}</h1>
                    <button className='reportBtn' onClick={openReport}>Report</button>
                </div>

                <div className='body'>
                    <p>{recipe.description}</p>
                </div>

                <div className='footer'>
                <button onClick={() => closeDetailed(false)}>Close</button>
                </div>
                <Modal size="md" isOpen={reportOpen} onRequestClose={closeReport} className="Modal" backdrop="static" maskClosable={false} shouldCloseOnOverlayClick={false}>
                    {
                    <div className='ReportModal'>
                        <h1>Describe your issue with this recipe:</h1>
                        <input type="issue" name="issue" value={issue} onChange={(e) => setIssue(e.target.value)} />
                        <button onClick={reportSubmit}>Submit</button>
                        <br/>
                        <button onClick={closeReport}>Close</button>
                        <p>{reportMessage}</p>
                    </div>
                    }
                </Modal>
            </div>
        </div>
    )
}

export default DetailedRecipe
