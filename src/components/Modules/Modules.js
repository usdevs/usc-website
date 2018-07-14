import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  Container, Row, Col,
  TabContent, TabPane, Nav, NavItem, NavLink
} from 'reactstrap';
import { firebaseConnect } from 'react-redux-firebase';
import { getModule, getModuleReviews } from '../../actions/ModulesActions'
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
      activeTab: ''
    };
  }

  componentWillMount() {
    const { firestore } = this.context.store
    getModuleReviews(firestore)
  }

  componentWillReceiveProps(newProps) {
    const { firestore } = this.context.store
    const { moduleReviews } = newProps

    if (!this.props.moduleReviews && moduleReviews) {
      const moduleCodes = _.map(_.uniqBy(moduleReviews, 'module'), (moduleReview) => moduleReview.module)

      var modules = {}
      var completed = 0
      _.forEach(moduleCodes, (moduleCode) => {
        getModule(firestore, moduleCode, (snapshot) => {
          var module = {
            ...snapshot.data(),
            id: moduleCode
          }

          if(modules[module.type]) {
            modules[module.type] = modules[module.type].concat(module)
          } else {
            modules[module.type] = [module]
          }

          completed += 1

          if(completed === moduleCodes.length) {
            this.setState({
              modules: modules,
              activeTab: _.keys(modules)[0]
            })
          }
        })
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
    const { modules } = this.state

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
    const { modules } = this.state
    const { moduleTypes } = this.props

    const moduleTypeTabs = []

    _.forEach(_.keys(modules), (moduleTypeID) => {
      const moduleType = moduleTypes[moduleTypeID]

      moduleTypeTabs.push(<NavItem key={moduleTypeID}>
        <NavLink
          className={classnames({ active: this.state.activeTab === moduleTypeID })}
          onClick={() => { this.toggle(moduleTypeID); }}
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
    const { modules } = this.state
    const { moduleTypes } = this.props

    return(<Container>
      <Row>
        <Col>
          <div className="d-flex">
            <div className="p-2">
              <h1 style={{fontWeight: 300}} className="mb-0">Modules</h1>
              <h4 className="mb-4 text-primary">Only Modules with Reviews are Displayed</h4>
            </div>
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
    moduleReviews: state.firestore.ordered.moduleReviews,
    modules: formatModulesIntoTypes(state.firestore),
    moduleTypes: state.firestore.data.moduleTypes
  }
}

export default withRouter(compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(Modules))
