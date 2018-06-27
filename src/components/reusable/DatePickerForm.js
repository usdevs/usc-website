import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, FormText
} from 'reactstrap';
import PropTypes from 'prop-types'
import moment from 'moment'
import '../../resources/react-datepicker.css';

const dateOnlyFormat = 'DD/MM/YYYY'
const dateTimeFormat = 'DD/MM/YYYY hh:mm a'
const timeOnlyFormat = 'hh:mm a'

class DatePickerForm extends Component {

  render () {

    const date = moment(this.props.value)
    const dateText = date.format( this.props.dateOnly ? dateOnlyFormat : this.props.timeOnly ? timeOnlyFormat : dateTimeFormat)

    return (
      <Input
        type="text"
        name={this.props.name}
        id={this.props.id}
        onClick={this.props.onClick}
        value={ dateText }
        readOnly />
    )
  }
}

DatePickerForm.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string
};

export default DatePickerForm
