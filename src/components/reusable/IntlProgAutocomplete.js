import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Input, Button, FormFeedback } from 'reactstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import Autosuggest from 'react-autosuggest';
import IntlCard from '../IntlProgs/IntlCard'
import { getIntlProgs, getIntlProg } from '../../actions/IntlProgsActions'
import { formatFirestoreData } from '../../utils/utils'
import { withRouter } from 'react-router-dom'
import { firebaseConnect } from 'react-redux-firebase';

class GroupAutocomplete extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      suggestions: [],
      searchText: '',
      selected: null
    }
  }

  componentDidMount() {
    const { firestore } = this.context.store
    const { fieldState, intlProgs } = this.props

    if(!intlProgs.isLoaded) {
      getIntlProgs(firestore)
    } else {
      const { value } = fieldState

      if(value && value !== '') {
        this.setState({
          selected: intlProgs.data[value]
        })
      }
    }
  }

  componentWillReceiveProps(newProps) {
    const { firestore } = this.context.store
    const { selected } = this.state
    const { value } = newProps

    if(value && value !== '' && selected && value !== selected.id) {
      getIntlProg(firestore, value, (snapshot) => {
        this.setState({
          selected: {
            ...snapshot.data(),
            id: value
          }
        })
      })
    } else if (!value) {
      this.setState({
        searchText: '',
        selected: null
      })
    }
  }

  getSuggestions = value => {
    const { intlProgs } = this.props

    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : intlProgs.ordered.filter(intlProg =>
      intlProg.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  getSuggestionValue = suggestion => {
    const {
      fieldApi
    } = this.props
    const {
      setValue,
      setTouched
    } = fieldApi;

    setValue(suggestion.id)
    setTouched()

    this.setState({
      selected: suggestion
    })

    return suggestion.name
  };

  renderSuggestion = suggestion => <span className="suggestion-content list-unstyled">
    <IntlCard
      key={suggestion.id}
      intlProg={suggestion}
      isHorizontal
      hideButtons
    />
  </span>

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  inputProps = () => {
    return ({
      placeholder: "Enter an International Programme Name",
      value: this.state.searchText,
      onChange: (event, { newValue }) => {
        this.setState({
          searchText: newValue
        });
      }
    })
  }

  renderInputComponent = inputProps => {
    const { selected } = this.state
    const { intlProgs, fieldApi, fieldState, errortext } = this.props

    var inputComponents = []

    if(!intlProgs.isLoaded) {
      inputComponents.push(<FontAwesomeIcon icon="spinner" className="mr-2" spin key="groupLoader" />)
    }

    if(selected && intlProgs.isLoaded) {
      inputComponents.push(
        <IntlCard
          intlProg={selected}
          key={selected.id + 'selected'}
          isHorizontal
          hideButtons
        />)
      inputComponents.push(
        <Button
          color="danger"
          className="mt-2"
          outline
          onClick={() => {
            fieldApi.setValue(null)
            this.setState({
              selected: null,
            })
          }}
          key='deleteSelection'>
          <FontAwesomeIcon icon="trash-alt" />
        </Button>)
    } else {
      inputComponents.push(<Input key="groupInput" type="text" {...inputProps} disabled={ !intlProgs.isLoaded } invalid={ this.props.fieldState.error ? true : false } />)
      if(fieldState.error) {
        inputComponents.push(<FormFeedback key="groupError">{ errortext ? errortext : fieldState.error}</FormFeedback>)
      }
    }


    return inputComponents
  }

  render() {
    const { suggestions } = this.state

    return(
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={this.inputProps()}
        renderInputComponent={this.renderInputComponent}
      />)
  }
}

const mapStateToProps = state => {
  return {
    intlProgs: formatFirestoreData(state.firestore, 'intlProgs')
  }
}

export default withRouter(compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(GroupAutocomplete))
