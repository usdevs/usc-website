import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Alert, Card, Button, InputGroup, Input, InputGroupAddon, FormFeedback } from 'reactstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import _ from 'lodash'
import UserCard from '../Users/UserCard'
import { getUserByEmail } from '../../actions/UsersActions'
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom'

class UserForm extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      profile: null,
      submitting: false,
    }
  }

  componentDidMount() {
  }


  addMember = () => {
    const { email } = this.state
    const { firestore } = this.context.store

    this.setState({
      submitting: true,
    })

    getUserByEmail(firestore, email, (snapshot) => {
      if (!snapshot.empty) {
        const profileDoc = snapshot.docs[0]
        const profile = profileDoc.data()

        const {
          fieldApi,
          onChange,
          onBlur
        } = this.props
        const {
          setValue,
          setTouched
        } = fieldApi;

        setValue(profileDoc.id)
        setTouched()

        if (onChange) {
          onChange(profileDoc.id)
        }

        if (onBlur) {
          onBlur(profileDoc.id)
        }

        this.setState({
          submitting: false,
          profile: {
            ...profile,
            id: profileDoc.id
          }
        })
      }
    })
  }

  removeMember = () => {
    const {
      fieldApi,
      onChange,
      onBlur
    } = this.props
    const {
      setValue,
      setTouched
    } = fieldApi;

    setValue(null)
    setTouched()

    if (onChange) {
      onChange(null)
    }

    if (onBlur) {
      onBlur(null)
    }

    this.setState({
      profile: null
    })
  }

  render() {
    const { email, profile, submitting } = this.state
    const { leader, fieldState, errortext } = this.props

    if(profile) {
      return (<div className="mb-3">
        <UserCard user={profile} leader={leader} />
        { fieldState.error ? <Alert color="danger" className="mt-1 mb-1">{ errortext ? errortext : fieldState.error}</Alert> : null }
        <Button color="danger" className="mt-2" outline onClick={this.removeMember}>
          <FontAwesomeIcon icon="trash-alt" />
        </Button>
      </div>)
    }

    return (
      <Card className="p-3 mb-3" outline color="primary">
          <h5 className="mb-0" style={{color: 'dodgerblue'}}>{ leader ? 'Leader' : 'Member'}</h5>
          <InputGroup>
            <Input
                type="email"
                placeholder="Member Email"
                value={email}
                onChange={e => this.setState({email: e.target.value})}
                disabled={submitting}
                invalid={ fieldState.error ? true : false } />
            <InputGroupAddon addonType="append">
              <Button color="info" onClick={this.addMember}>
                { submitting ? <FontAwesomeIcon icon="spinner" spin /> : ''} Add
              </Button>
            </InputGroupAddon>
            { fieldState.error ? <FormFeedback>{ errortext ? errortext : fieldState.error}</FormFeedback> : null }
          </InputGroup>
        </Card>)
  }

}

const mapStateToProps = state => {
  return {
    userProfile: state.firestore.data.userProfile,
  }
}

export default withRouter(compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(UserForm))
