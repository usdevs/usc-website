import React, { Component } from 'react'
import { Input, FormGroup, FormFeedback } from 'reactstrap';
import PropTypes from 'prop-types'
import '../../resources/react-datepicker.css';

const dateOnlyFormat = 'DD/MM/YYYY'
const dateTimeFormat = 'DD/MM/YYYY hh:mm a'
const timeOnlyFormat = 'hh:mm a'

class DatePickerForm extends Component {

  render () {
    const { date, onClick, placeholder, invalid, errortext, onChange, onBlur, hidden } = this.props
    const dateText = date ? date.format( this.props.dateOnly ? dateOnlyFormat : this.props.timeOnly ? timeOnlyFormat : dateTimeFormat) : ''

    return (
      <FormGroup>
        <Input
          type={ hidden ? 'hidden' : "text"}
          onClick={ onClick }
          value={ dateText }
          placeholder={ placeholder }
          invalid={ invalid }
          onChange={ onChange }
          onBlur={ onBlur }
          readOnly />
        { invalid ? <FormFeedback hidden={ hidden ? true : false}>{errortext}</FormFeedback> : null }
      </FormGroup>
    )
  }
}

DatePickerForm.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string
};

export default DatePickerForm
