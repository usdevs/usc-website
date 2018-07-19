import React from 'react'
import { Input, FormFeedback, Label, FormGroup } from 'reactstrap'
import { asField } from 'informed';
import DatePicker from 'react-datepicker'
import DatePickerForm from './DatePickerForm'
import GroupAutocomplete from './GroupAutocomplete'
import IntlProgAutocomplete from './IntlProgAutocomplete'
import UserForm from './UserForm'
import ImageUploader from './ImageUploader'
import MultiImageUploader from './MultiImageUploader'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import moment from 'moment'
import { config } from '../../resources/config'

export const validateNotEmpty = value => {
  return !value ? 'Field cannot be empty' : null;
}

export const duplicateValidation = (value, values) => {
  return values.filter( v => v === value ).length > 1 ? 'This field must be unique.' : null;
}

export const TextInput = asField(({ fieldState, fieldApi, ...props }) => {
  const {
    value
  } = fieldState;
  const {
    setValue,
    setTouched
  } = fieldApi;
  const {
    onChange,
    onBlur,
    forwardedRef,
    ...rest
  } = props

  return (<React.Fragment>
    <Input
        {...rest}
        ref={forwardedRef}
        type="text"
        value={!value && value !== 0 ? '' : value}
        onChange={e => {
          setValue(e.target.value)
          if (onChange) {
            onChange(e)
          }
        }}
        onBlur={e => {
          setTouched()
          if (onBlur) {
            onBlur(e)
          }
        }}
        hidden={props.hidden}
        invalid={ fieldState.error ? true : false } />
    { fieldState.error ? <FormFeedback>{props.errortext ? props.errortext : fieldState.error}</FormFeedback> : null }
  </React.Fragment>)
});

export const TextAreaInput = asField(({ fieldState, fieldApi, ...props }) => {
  const {
    value
  } = fieldState;
  const {
    setValue,
    setTouched
  } = fieldApi;
  const {
    onChange,
    onBlur,
    forwardedRef,
    ...rest
  } = props

  return (<React.Fragment>
    <Input
        {...rest}
        ref={forwardedRef}
        type="textarea"
        hidden={props.hidden}
        value={!value && value !== 0 ? '' : value}
        onChange={e => {
          setValue(e.target.value)
          if (onChange) {
            onChange(e)
          }
        }}
        onBlur={e => {
          setTouched()
          if (onBlur) {
            onBlur(e)
          }
        }}
        invalid={ fieldState.error ? true : false } />
    { fieldState.error ? <FormFeedback>{props.errortext ? props.errortext : fieldState.error}</FormFeedback> : null }
  </React.Fragment>)
});

export const DropdownInput = asField(({ fieldState, fieldApi, ...props }) => {
  const {
    value
  } = fieldState;
  const {
    setValue,
    setTouched
  } = fieldApi;
  const {
    onChange,
    onBlur,
    forwardedRef,
    ...rest
  } = props

  return (<React.Fragment>
    {props.loading ? <FontAwesomeIcon icon="spinner" className="mr-2" spin /> : '' }
    <Input
        {...rest}
        type="select"
        ref={forwardedRef}
        loading={props.loading ? props.loading.toString() : null}
        value={!value && value !== 0 ? '' : value}
        onChange={e => {
          setValue(e.target.value)
          if (onChange) {
            onChange(e)
          }
        }}
        onBlur={e => {
          setTouched()
          if (onBlur) {
            onBlur(e)
          }
        }}
        invalid={ fieldState.error ? true : false }>
      <option value=''>{props.placeholder}</option>
      {
        props.options.map((option) => <option key={ option.id } value={ option.id }>{ option.display }</option>)
      }
      { props.others ? <option value='Others'>Others</option> : ''}
    </Input>
{ fieldState.error ? <FormFeedback>{props.errortext ? props.errortext : fieldState.error}</FormFeedback> : null }
  </React.Fragment>)
});

export const CheckboxInput = asField(({ fieldState, fieldApi, ...props }) => {
  const {
    value
  } = fieldState;
  const {
    setValue,
    setTouched
  } = fieldApi;
  const {
    onChange,
    onBlur,
    forwardedRef,
    ...rest
  } = props


  return (<React.Fragment>
    <FormGroup check inline>
      <Label check>
        <Input
            {...rest}
            ref={forwardedRef}
            type="checkbox"
            checked={ value ? true : false}
            onChange={e => {
              setValue(!value)
              if (onChange) {
                onChange(!value)
              }
            }}
            onBlur={e => {
              setTouched()
              if (onBlur) {
                onBlur(value)
              }
            }}
            invalid={ fieldState.error ? true : false } />
          { props.text }
      </Label>
    </FormGroup>
{ fieldState.error ? <FormFeedback>{props.errortext ? props.errortext : fieldState.error}</FormFeedback> : null }
  </React.Fragment>)
});

export const DatePickerInput = asField(({ fieldState, fieldApi, ...props }) => {
  const {
    value
  } = fieldState;
  const {
    setValue,
    setTouched
  } = fieldApi;
  const {
    onChange,
    onBlur,
    forwardedRef,
    ...rest
  } = props

  var newValue = value

  if(value && !value._isAMomentObject) {
    newValue = moment(value)
  }

  return (<React.Fragment>
    <DatePicker
      {...rest}
      ref={forwardedRef}
      selected={newValue}
      onChange={e => {
        setValue(e)
        setTouched()
        if (onChange) {
          onChange(e)
        }
      }}
      onBlur={e => {
        setTouched()
        if (onBlur) {
          onBlur(e)
        }
      }}
      invalid={ fieldState.error ? true : false }
      customInput={
        <DatePickerForm
          date={newValue}
          hidden={props.hidden}
          dateOnly={props.dateOnly}
          timeOnly={props.timeOnly}
          invalid={ fieldState.error }
          errortext={props.errortext ? props.errortext : fieldState.error}/>}
          showTimeSelect={!props.dateOnly}
          timeFormat="hh:mm a"
          timeInterval={config.timeInterval}
          dateFormat="LLL"
          timeCaption="time" />
  </React.Fragment>)
});

export const GroupInput = asField(({ fieldState, fieldApi, ...props }) => {
  const {
    value
  } = fieldState;
  const {
    onChange,
    onBlur,
    forwardedRef,
    ...rest
  } = props

  return (<React.Fragment>
    <GroupAutocomplete
      {...rest}
      ref={forwardedRef}
      value={!value && value !== 0 ? '' : value}
      fieldState={fieldState}
      fieldApi={fieldApi}
    />
  </React.Fragment>)
});

export const IntlProgInput = asField(({ fieldState, fieldApi, ...props }) => {
  const {
    value
  } = fieldState;
  const {
    onChange,
    onBlur,
    forwardedRef,
    ...rest
  } = props

  return (<React.Fragment>
    <IntlProgAutocomplete
      {...rest}
      ref={forwardedRef}
      value={!value && value !== 0 ? '' : value}
      fieldState={fieldState}
      fieldApi={fieldApi}
    />
  </React.Fragment>)
});

export const ImageInput = asField(({ fieldState, fieldApi, ...props }) => {
  const {
    value
  } = fieldState;
  const {
    setValue,
    setTouched
  } = fieldApi;
  const {
    onChange,
    onBlur,
    forwardedRef,
    ...rest
  } = props

  return (<React.Fragment>
    <ImageUploader
        {...rest}
        ref={forwardedRef}
        fieldState={fieldState}
        onDrop={file => {
          setValue(file)
          setTouched()
          if (onChange) {
            onChange(file)
          }

          if (onBlur) {
            onBlur(file)
          }
        }}
        onDelete={() => {
          setValue(null)
          setTouched()

          if (onChange) {
            onChange(null)
          }

          if (onBlur) {
            onBlur(null)
          }
        }}
      />
  </React.Fragment>)
});

export const MultiImageInput = asField(({ fieldState, fieldApi, ...props }) => {
  const {
    value
  } = fieldState;
  const {
    setValue,
    setTouched
  } = fieldApi;
  const {
    onChange,
    onBlur,
    forwardedRef,
    ...rest
  } = props

  return (<React.Fragment>
    <MultiImageUploader
        {...rest}
        ref={forwardedRef}
        fieldState={fieldState}
        imageSrc={value ? value.preview ? value.preview : value : ''}
        onDrop={files => {
          setValue(files)
          setTouched()
          if (onChange) {
            onChange(files)
          }

          if (onBlur) {
            onBlur(files)
          }
        }}
        onDelete={() => {
          setValue(null)
          setTouched()

          if (onChange) {
            onChange(null)
          }

          if (onBlur) {
            onBlur(null)
          }
        }}
      />
  </React.Fragment>)
});

export const UserInput = asField(({ fieldState, fieldApi, ...props }) => {
  const {
    value
  } = fieldState;
  const {
    setValue,
    setTouched
  } = fieldApi;
  const {
    onChange,
    onBlur,
    forwardedRef,
    ...rest
  } = props

  return (<React.Fragment>
    <UserForm
      {...rest}
      ref={forwardedRef}
      fieldState={fieldState}
      fieldApi={fieldApi}
      value={value}
      onChange={e => {
        setValue(e)
        setTouched()
        if (onChange) {
          onChange(e)
        }
      }}
      onBlur={e => {
        setTouched()
        if (onBlur) {
          onBlur(e)
        }
      }} />
  </React.Fragment>)
});
