import React, { Component } from 'react';
import {
  UncontrolledCarousel,
  Container,
  Row,
  Col,
  Jumbotron,
  Button
} from 'reactstrap';
import header from '../images/headerAboutUs.jpg';
import icon from '../images/bg_aboutUs.jpg';
import president from '../images/MC_president.jpg';
import vpwelfare from '../images/MC_vp_welfare.jpg';
import vpcommlife from '../images/MC_vp_commlife.jpg';
import honfinsec from '../images/MC_honfinsec.jpg';
import hongensec from '../images/MC_hongensec.jpg';
import fopdirector from '../images/MC_fod.jpg';
import presidentComm from '../images/USC_prcomm.jpg';
import vpwelfareComm from '../images/USC_welfarecomm.jpg';
import vpcommlifeComm from '../images/USC_commlifecomm.jpg';
import honfinsecComm from '../images/USC_financecomm.jpg';
import hongensecComm from '../images/USC_secretariat.jpg';
import fopdirectorComm from '../images/USC_fopcomm.jpg';
import ursaia from '../images/House_Ursaia.jpg';
import nocturna from '../images/House_Nocturna.jpg';
import ianthe from '../images/House_Ianthe.jpg';
import triton from '../images/House_Triton.jpg';
import ankaa from '../images/House_Ankaa.jpg';
import saren from '../images/House_Saren.jpg';

var mcHeaderStyle = {
  backgroundColor: 'orange',
};

var uscHeaderStyle = {
  backgroundColor: 'dodgerblue',
};

var uscCommHeaderStyle = {
  backgroundColor: 'darkgrey',
};

var uscCommTitleStyle = {
  color: 'dodgerblue',
};

var uscCommNameStyle = {
  color: 'darkgrey',
};

class AboutUs extends Component {
  render() {

    return (<Container>
      <Row>
        <Col>
          <img src={header} className="img-fluid" />
        </Col>
      </Row>
      <Row>
        <Col>
          <h1 className="display-3">About Us</h1>
            <p className="lead">The University Scholars Club (USC) is a community of students enrolled in the National University of Singapore (NUS) University Scholars Programme (USP), which is a multidisciplinary, partially residential academic programme for NUS undergraduates.</p>
            <p>Members of the USC come from a wide array of majors spanning 7 faculties, ranging from computer science, to business, to philosophy. Possessing diverse interests and passions, members of the USC are marked by their intellectual curiosity, and are enthusiastic about learning and thinking critically, much of which stems from their daily interactions with peers and faculty.</p>
            <p>They seek to emerge from NUS as graduates with the intellectual rigour, initiative, and innovative spirit to make significant contributions to society.</p>
          <hr className="my-2" />
          <h4 className="display-4">Our Mission</h4>
            <p className="lead">To facilitate the creation of a cohesive community of leaders and thinkers through stronger student, faculty and alumni engagement.</p>
          <h4 className="display-4">Our Vision</h4>
          <ol>
            <li>To Promote Informal Learning</li>
            <li>To Bridge the Students, Faculty & Alumni</li>
            <li>To encourage and facilitate ground up initiatives</li>
          </ol>
          <a href="http://www.nususc.com/USC_Constitution.zip">
              <Button color="primary">View Our Constitution</Button>
          </a>
          <br/>
          <br/>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="p-3 mb-2 bg-dark text-white">
            <h1 className="text-center display-4">17th Management Committee</h1>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="text-center">
            <img src={president} className="img-fluid" />
            <h5>President</h5>
            <p className="lead">THAM Jun Han</p>
          </div>
        </Col>
        <Col>
          <div className="text-center">
            <img src={vpwelfare} className="img-fluid" />
            <h5>Vice-President (Welfare)</h5>
            <p className="lead">WOO Qiyun</p>
          </div>
        </Col>
        <Col>
          <div className="text-center">
            <img src={vpcommlife} className="img-fluid" />
            <h5>Vice-President (Community Life)</h5>
            <p className="lead">TEE Shu Yun</p>
          </div>
        </Col>
        <Col>
          <div className="text-center">
            <img src={hongensec} className="img-fluid" />
            <h5>Honorary General Secretary</h5>
            <p className="lead">Jeremy JEE De Sheng</p>
          </div>
        </Col>
        <Col>
          <div className="text-center">
            <img src={honfinsec} className="img-fluid" />
            <h5>Honorary Financial Secretary</h5>
            <p className="lead">Melissa TANG Shou Hui</p>
          </div>
        </Col>
        <Col>
          <div className="text-center">
            <img src={fopdirector} className="img-fluid" />
            <h5>Freshmen Orientation Director</h5>
            <p className="lead">ZHANG Quyi</p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="p-3 mb-2 text-white" style={uscHeaderStyle}>
            <h1 className="text-center display-4">USC Committees</h1>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <img src={presidentComm} className="img-fluid" />
          <h3 className="pb-0 mb-0">Public Relations
          </h3>
          <small className="text-muted">Headed by <em>Tham Jun Han, President</em></small>
          <br/>
          <br/>
          <p className="lead" style={uscCommTitleStyle}>Communications Team<br/>
          <small className="text-muted">Royston Chua (Communications Secretary),<br/>Koh Kai Qian & Nur Ridhuan</small></p>
          <p className="lead" style={uscCommTitleStyle}>Alumni Relations Team<br/>
          <small className="text-muted">Shien Hian Lim & Marcus Ng</small></p>
        </Col>
        <Col>
          <div className="text-left">
            <img src={vpwelfareComm} className="img-fluid" />
            <h3 className="pb-0 mb-0">Student Welfare
            </h3>
            <small className="text-muted">Headed by <em>Woo Qiyun, Vice-President (Welfare)</em></small>
            <br/>
            <br/>
            <p className="lead" style={uscCommTitleStyle}>Welfare Projects Team<br/>
            <small className="text-muted">Wan Nur Syafiqa B Syed Yusoff (Director),
              Charmaine Lee (Deputy Director), Sanchita Sachdev (Deputy Director),
              Ong Ci Wen, Jaymee Mariano Justiniano, Melanie Chng, Wee Su-Ann, Jasmie Liew, Kagen Lim, Jade Ng & Lee Chun Min</small></p>
            <p className="lead" style={uscCommTitleStyle}>Academic Team<br/>
            <small className="text-muted">Atharv Joshi (Director), Melvin Soh, Deter Thng, Devesh Narayanan & Loh Xiang Bin</small></p>
          <p className="lead" style={uscCommTitleStyle}>Residential Welfare Team<br/>
          <small className="text-muted">Wang Chiew Hui (Spaces Director), Pang Chee Him (Dining Hall Director), Seah Wan Yu & Philina Lai</small></p>
        <p className="lead" style={uscCommTitleStyle}>House Captains Team<br/>
        <small className="text-muted">Gerald Seet (Ursaia), Kelvin Neo (Nocturna), Engracia Loh (Ianthe), Myat Thu Kyaw (Triton), Ng Jingrong (Ankaa), Arnold Teo (Saren) with Tan Kit Yung (Coordinating Director - Interhouse Events)</small></p>
          </div>
        </Col>
        <Col>
          <div className="text-left">
            <img src={vpcommlifeComm} className="img-fluid" />
            <h3 className="pb-0 mb-0">Community Life
            </h3>
            <small className="text-muted">Headed by <em>Tee Shu Yun, Vice-President (Community Life)</em></small>
            <br/>
            <br/>
            <p className="lead" style={uscCommTitleStyle}>Deputy Directors (Community Life)<br/>
            <small className="text-muted">Tan Yan Tyng & Joyce Foo</small></p>
            <p className="lead" style={uscCommTitleStyle}>Sports Director<br/>
            <small className="text-muted">Jeremy Png</small></p>
            <p className="lead" style={uscCommTitleStyle}>IG Coordinators<br/>
            <small className="text-muted">Edward Goh (Sports) & Andrea Tan (Non-Sports)</small></p>
            <p className="lead" style={uscCommTitleStyle}>GUI Coordinators<br/>
            <small className="text-muted">Kathy Tan (Social, Cultural & Sports),<br/>
            Jazreel Low (Social, Cultural & Sports),<br/>
            Loh Xiang Bin (Welfare & Acad) & Teoh Xin Yi (Community Service)</small></p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <img src={hongensecComm} className="img-fluid" />
          <h3 className="pb-0 mb-0">Secretariat
          </h3>
          <small className="text-muted">Headed by <em>Jeremy Jee, Honorary General Secretary</em></small>
          <br/>
          <br/>
          <p className="lead" style={uscCommTitleStyle}>Spaces Design Team<br/>
          <small className="text-muted">Matthew Lee (Lead), Chia Yu Xuan (Lead), Chu Khoon Hwa & Andrea Tan</small></p>
          <p className="lead" style={uscCommTitleStyle}>Visual Design Team<br/>
          <small className="text-muted">Carina Lim (Lead), Vandhana Jeyaram, Dong Yunfan, & Andrea Tan</small></p>
          <p className="lead" style={uscCommTitleStyle}>Technology Development Team<br/>
          <small className="text-muted">Yuan Yuchuan (Lead), Varun Patro, Ahan Gupta, Sean Ng, Low Yew Woei & Chik Cheng Yao</small></p>
          <p className="lead" style={uscCommTitleStyle}>Operations Manager<br/>
          <small className="text-muted">Gwyneth Cheng</small></p>
        </Col>
        <Col>
          <div className="text-left">
            <img src={vpwelfareComm} className="img-fluid" />
            <h3 className="pb-0 mb-0">Finance
            </h3>
            <small className="text-muted">Headed by <em>Melissa Tang, Honorary Financial Secretary</em></small>
            <br/>
            <br/>
            <p className="lead" style={uscCommTitleStyle}>Deputy Honorary Financial Secretary<br/>
            <small className="text-muted">Maria Teresa Boey</small></p>
            <p className="lead" style={uscCommTitleStyle}>Business Development Executives<br/>
            <small className="text-muted">Low Yew Woei (External) & Rachel Thomas (Internal)</small></p>
          <p className="lead" style={uscCommTitleStyle}>Marketing Executives<br/>
          <small className="text-muted">Ng Shi Kai & Michelle Quek</small></p>
          <p className="lead" style={uscCommTitleStyle}>Financial Attaches<br/>
          <small className="text-muted">Quek Siying (Secretariat & Public Relations), Pang Chee Him (Welfare) & Andrea Chou Lim (Community Life)</small></p>
          </div>
        </Col>
        <Col>
          <div className="text-left">
            <img src={vpcommlifeComm} className="img-fluid" />
            <h3 className="pb-0 mb-0">Freshmen Orientation
            </h3>
            <small className="text-muted">Headed by <em>Zhang Quyi, Freshmen Orientation Director</em></small>
            <br/>
            <br/>
            <p className="lead" style={uscCommTitleStyle}>Deputy Director<br/>
            <small className="text-muted">Annina Zhang</small></p>
            <p className="lead" style={uscCommTitleStyle}>Directors<br/>
            <small className="text-muted">Jazreel Low (Finance), Joyce Yeo (Creative), Merilynn Seng (Public Relations) & Jesmine Woon (Operations)</small></p>
            <p className="lead" style={uscCommTitleStyle}>Project Directors<br/>
            <small className="text-muted">Beatrice Low (Camp), Jenn (O’Week), Kathy Tan (Events), Jadyn Teo (Batch Project) & Teoh Xinyi (Community Engagement)</small></p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="p-3 mb-2 text-white" style={uscHeaderStyle}>
            <h1 className="text-center display-4">House Committee</h1>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="text-left">
            <img src={ursaia} className="img-fluid" />
            <h3>Ursaia
            </h3>
            <p className="lead" style={uscCommTitleStyle}>House Captain<br/>
            <small className="text-muted">Gerald Seet</small></p>
            <p className="lead" style={uscCommTitleStyle}>Vice House Captain<br/>
            <small className="text-muted">Pratyay Jaidev</small></p>
            <p className="lead" style={uscCommTitleStyle}>Chief Orientation Group Leader<br/>
            <small className="text-muted">Taira Robles</small></p>
            <p className="lead" style={uscCommTitleStyle}>Vice Chief Orientation Group Leader<br/>
            <small className="text-muted">Samantha Rin</small></p>
          </div>
        </Col>
          <Col>
            <div className="text-left">
              <img src={ursaia} className="img-fluid" />
              <h3>Ursaia
              </h3>
              <p className="lead" style={uscCommTitleStyle}>House Captain<br/>
              <small className="text-muted">Gerald Seet</small></p>
              <p className="lead" style={uscCommTitleStyle}>Vice House Captain<br/>
              <small className="text-muted">Pratyay Jaidev</small></p>
              <p className="lead" style={uscCommTitleStyle}>Chief Orientation Group Leader<br/>
              <small className="text-muted">Taira Robles</small></p>
              <p className="lead" style={uscCommTitleStyle}>Vice Chief Orientation Group Leader<br/>
              <small className="text-muted">Samantha Rin</small></p>
            </div>
          </Col>
            <Col>
              <div className="text-left">
                <img src={ursaia} className="img-fluid" />
                <h3>Ursaia
                </h3>
                <p className="lead" style={uscCommTitleStyle}>House Captain<br/>
                <small className="text-muted">Gerald Seet</small></p>
                <p className="lead" style={uscCommTitleStyle}>Vice House Captain<br/>
                <small className="text-muted">Pratyay Jaidev</small></p>
                <p className="lead" style={uscCommTitleStyle}>Chief Orientation Group Leader<br/>
                <small className="text-muted">Taira Robles</small></p>
                <p className="lead" style={uscCommTitleStyle}>Vice Chief Orientation Group Leader<br/>
                <small className="text-muted">Samantha Rin</small></p>
              </div>
            </Col>
      </Row>
    </Container>);
    }
}

export default AboutUs;
