import { useState, useMemo, useEffect } from "react"

import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.min.css'

import Modal from "react-modal"

import { addHours, differenceInSeconds } from 'date-fns/esm'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

import { useUiStore, useCalendarStore } from "../../hooks"


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

  const { isDateModalOpen, closeDateModal } = useUiStore()
  const { activeEvent, startSavingEvent } = useCalendarStore()

  const [formSubmited, setFormSubmited] = useState(false)

  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours( new Date(), 2 )
  })

  const titleClass = useMemo(() => {
    if ( !formSubmited ) return ''
    return ( formValues.title.length > 0 )
        ? ''
        : 'is-invalid'
  },[ formValues.title, formSubmited ])

  useEffect(() => {
    if( activeEvent !== null ){
        setFormValues({ ...activeEvent })
    }

  }, [activeEvent])
  


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
    closeDateModal()
  }

  const onSubmit = async ( event ) => {
    event.preventDefault()
    setFormSubmited(true)

    const difference = differenceInSeconds( formValues.end, formValues.start )

    if ( isNaN( difference ) || difference <= 0) {
        Swal.fire('Incorrect dates', 'Please check the input dates', 'error')
        return
    }

    if ( formValues.title.length <= 0 ) return
    
    await startSavingEvent( formValues )
    closeDateModal()
    setFormSubmited(false)

  }

  return (
    <Modal
        isOpen={ isDateModalOpen }
        onRequestClose={ onCloseModal }
        style={customStyles}
        className="modal"
        overlayClassName="modal-background"
        closeTimeoutMS={ 200 }
    >
        <h1> New event </h1>
        <hr />
        <form className="container" onSubmit={ onSubmit }>

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
                    className={ `form-control ${ titleClass }` }
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
