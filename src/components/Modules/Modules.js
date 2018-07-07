import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  Jumbotron, Button,
  Container, Row, Col,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input, FormFeedback,
  InputGroupAddon, InputGroup,
  TabContent, TabPane, Nav, NavItem, NavLink,
  Card, CardTitle, CardText
} from 'reactstrap';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { getModules } from '../../utils/actions'
import { formatModulesIntoTypes } from '../../utils/utils'
import { withRouter } from 'react-router-dom'
import ModuleCard from './ModuleCard'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import classnames from 'classnames';
import _ from 'lodash'

class Modules extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  componentWillMount() {
    const { firestore } = this.context.store
    getModules(firestore, true)
  }

  componentWillReceiveProps(newProps) {
    const { modules } = newProps
    const moduleTypes = _.keys(modules)

    if (_.keys(this.props.modules).length !== moduleTypes) {
      this.setState({
        activeTab: moduleTypes[0]
      })
    }
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  renderModules = () => {
    const { modules, moduleTypes } = this.props

    const moduleTabs = []

    _.forEach(_.keys(modules), (typeID) => {
      const moduleCards = []
      _.forEach(modules[typeID], (module) => {
          moduleCards.push(<Col xs="12" md="6" key={module.id}>
            <ModuleCard module={module} />
          </Col>)
      })

      moduleTabs.push(<TabPane key={typeID} tabId={typeID} className="m-3">
        <Row>
          { moduleCards }
        </Row>
      </TabPane>)
    })

    return(<TabContent activeTab={this.state.activeTab}>
      { moduleTabs }
    </TabContent>)
  }

  renderModuleTypeTabs = () => {
    const { modules, moduleTypes } = this.props

    const moduleTypeTabs = []

    _.forEach(_.keys(modules), (moduleID) => {
      const moduleType = moduleTypes[moduleID]

      moduleTypeTabs.push(<NavItem key={moduleID}>
        <NavLink
          className={classnames({ active: this.state.activeTab === moduleID })}
          onClick={() => { this.toggle(moduleID); }}
        >
          { moduleType.name }
        </NavLink>
      </NavItem>)
    })

    return(<Nav tabs>
      {
        moduleTypeTabs
      }
      </Nav>)
  }

  render() {
    const { modules, moduleTypes } = this.props

    return(<Container>
      <Row>
        <Col>
          <div className="d-flex">
            <div className="p-2"><h1 style={{fontWeight: 300}}>Modules</h1></div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          { moduleTypes ? this.renderModuleTypeTabs() : <h4><FontAwesomeIcon icon="spinner" spin /> Loading Modules...</h4> }
        </Col>
      </Row>
      <Row>
        <Col>
          { modules ? this.renderModules() : '' }
        </Col>
      </Row>
    </Container>)
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    modules: formatModulesIntoTypes(state.firestore),
    moduleTypes: state.firestore.data.moduleTypes
  }
}

export default withRouter(compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(Modules))
