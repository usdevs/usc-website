import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
  Button,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { connect } from 'react-redux';
import Img from 'react-image'
import { headerAboutUs as header } from '../../resources/images.js'

var uscHeaderStyle = {
  backgroundColor: 'dodgerblue',
};

var uscCommTitleStyle = {
  color: 'dodgerblue',
};

class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const mcMembers = (committees, modal) => {
      var commTags = []
      committees.map((member) => {
        commTags.push(
        <Col key={member.name} xs={!modal ? null : "6" } md={!modal ? null : "4" }>
          <div className="text-center">
            <Img src={member.image} className="img-fluid rounded-circle" />
            <h5>{member.title}</h5>
            <p className="lead">{member.name}</p>
          </div>
        </Col>)
        return('')
      })

      return commTags
    };

    const uscCommittees = this.props.uscCommittees.map((committee) =>
      <Col key={committee.name} xs="6" sm="4">
        <Img src={committee.image} className="img-fluid rounded" />
        <h3 className="pb-0 mb-0">{committee.name}
        </h3>
        <small className="text-muted">Headed by <em>{committee.headedBy}</em></small>
        <br/>
        <br/>
        {
          committee.teams.map((team) =>
            <div key={team.name}>
              <p className="lead" style={uscCommTitleStyle}>{team.name}<br/>
              <small className="text-muted">{team.members}</small></p>
            </div>
          )
        }
      </Col>
    );

    const houseCommittees = this.props.houseCommittees.map((committee) =>
      <Col key={committee.name} xs="6" sm="4">
        <div className="text-left">
          <Img src={committee.image} className="img-fluid rounded" />
          <h3>{committee.name}
          </h3>
          {
            committee.members.map((member) =>
              <div key={member.name}>
                <p className="lead" style={uscCommTitleStyle}>{member.title}<br/>
                <small className="text-muted">{member.name}</small></p>
              </div>
            )
          }
        </div>
      </Col>
    );

    const previousMCMembersModal =
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Previous Management Committees</ModalHeader>
          <ModalBody>
            <Container>
              {
                Object.keys(this.props.mcMembers).map((mcNo) =>
                <div key={mcNo}>
                  <Row>
                    <Col>
                      <h1 className="display-4">{mcNo + " Management Committee"}</h1>
                    </Col>
                  </Row>
                  <Row>
                    { mcMembers(this.props.mcMembers[mcNo], true) }
                  </Row>
                </div>
                )
              }
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>

    return (<Container>
      <Row>
        <Col>
          <Img src={header} className="img-fluid" />
        </Col>
      </Row>
      <Row>
        <Col>
          <h1 style={{fontWeight: 300}}>About Us</h1>
            <p className="lead">The University Scholars Club (USC) is a community of students enrolled in the National University of Singapore (NUS) University Scholars Programme (USP), which is a multidisciplinary, partially residential academic programme for NUS undergraduates.</p>
            <p>Members of the USC come from a wide array of majors spanning 7 faculties, ranging from computer science, to business, to philosophy. Possessing diverse interests and passions, members of the USC are marked by their intellectual curiosity, and are enthusiastic about learning and thinking critically, much of which stems from their daily interactions with peers and faculty.</p>
            <p>They seek to emerge from NUS as graduates with the intellectual rigour, initiative, and innovative spirit to make significant contributions to society.</p>
          <hr className="my-2" />
          <h2>Our Mission</h2>
            <p className="lead">To facilitate the creation of a cohesive community of leaders and thinkers through stronger student, faculty and alumni engagement.</p>
          <h2>Our Vision</h2>
          <ol>
            <li>To Promote Informal Learning</li>
            <li>To Bridge the Students, Faculty & Alumni</li>
            <li>To encourage and facilitate ground up initiatives</li>
          </ol>
          <a href="http://bit.ly/USConsitution">
              <Button color="primary">View Our Constitution</Button>
          </a>
          <br/>
          <br/>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="p-3 mb-2 bg-dark text-white">
            <h3 className="mb-0">18th Management Committee</h3>
          </div>
        </Col>
      </Row>
      <Row>{ mcMembers(this.props.mcMembers['18th'], false) }</Row>
      <Row>
        <Col>
          <Button color="primary" onClick={this.toggle}>View Previous</Button>
          { previousMCMembersModal }
          <br/>
          <br/>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="p-3 mb-2 text-white" style={uscHeaderStyle}>
            <h3 className="mb-0">USC Committees</h3>
          </div>
        </Col>
      </Row>
      <Row>{ uscCommittees }</Row>
      <Row>
        <Col>
          <div className="p-3 mb-2 text-white" style={uscHeaderStyle}>
            <h3 className="mb-0">House Committees</h3>
          </div>
        </Col>
      </Row>
      <Row>{ houseCommittees }</Row>
    </Container>);
    }
}

const mapStateToProps = state => {
  return {
    mcMembers: state.mcMembers,
    uscCommittees: state.uscCommittees,
    houseCommittees: state.houseCommittees
  }
}

AboutUs.propTypes = {
  mcMembers: PropTypes.shape({
    byId: PropTypes.objectOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
  }))}).isRequired,
  uscCommittees: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    headedBy: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    teams: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      members: PropTypes.string.isRequired,
    })).isRequired
  })).isRequired,
  houseCommittees: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })).isRequired
  })).isRequired
}

export default connect(mapStateToProps)(AboutUs);
