import { useState } from "react"

import Modal from "react-modal"
import { addHours } from 'date-fns/esm'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

  const [isOpen, setIsOpen] = useState(true)

  const [formValues, setFormValues] = useState({
    title: 'Alex',
    notes: 'LOREM IPSUM',
    start: new Date(),
    end: addHours( new Date(), 2 )
  })

  const onDateChange = ( event, changing ) => {
    setFormValues({
        ...formValues,
        [changing]: event
    })
  }

  const onInputChange = ({ target }) => {
    setFormValues({
        ...formValues,
        [target.name]: target.value
    })
  }

  const onCloseModal = () => {
    setIsOpen( false )
  }

  return (
    <Modal
        isOpen={ isOpen }
        onRequestClose={ onCloseModal }
        style={customStyles}
        className="modal"
        overlayClassName="modal-background"
        closeTimeoutMS={ 200 }
    >
        <h1> New event </h1>
        <hr />
        <form className="container">

            <div className="form-group mb-2">
                <label style={{ display: 'block' }}>Start date and time</label>
                <DatePicker 
                    selected={ formValues.start }
                    onChange={ (event) =>  onDateChange(event, 'start') }
                    className="form-control"
                    dateFormat="Pp"
                    showTimeSelect
                />
            </div>

            <div className="form-group mb-2">
                <label style={{ display: 'block' }}>End date and time</label>
                <DatePicker 
                    minDate={ formValues.start }
                    selected={ formValues.end }
                    onChange={ (event) =>  onDateChange(event, 'end') }
                    className="form-control"
                    dateFormat="Pp"
                    showTimeSelect
                />
            </div>

            <hr />
            <div className="form-group mb-2">
                <label>Title and notes</label>
                <input 
                    type="text" 
                    className="form-control"
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                    value={ formValues.title }
                    onChange={ onInputChange }
                />
                <small id="emailHelp" className="form-text text-muted">Short description</small>
            </div>

            <div className="form-group mb-2">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    value={ formValues.notes }
                    onChange={ onInputChange }
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Aditional information</small>
            </div>

            <div className="d-flex justify-content-end">
                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Save</span>
                </button>
            </div>

        </form>
    </Modal>
  )
}