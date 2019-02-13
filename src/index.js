import React from 'react';
import ReactDOM from 'react-dom';
import { PlayerManager }
from './PlayerManager';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { Navigator }
from './Navigator';
import { SessionManager }
from './SessionManagement/SessionManager';
import { HistoryManager }
from './HistoryManagement/HistoryManager'
import logo from './assets/logo.png';
import { colorBranding }
from './styles/ColorBranding';
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import "./styles/mainpage.css";
import crewService from "./DatabaseServices/CrewDbService";
document.body.style = 'background: ' + colorBranding.primaryBackground;
class Index extends React.Component {

    constructor(props) {
        super(props);
        this.onNavPlayer = this.onNavPlayer.bind(this);
        this.onNavSession = this.onNavSession.bind(this);
        this.onNavHistory = this.onNavHistory.bind(this);
        this.state = {nav: "player", crewId: null, admin: null, newCrewName: "", newCrewEmail: "", newCrewPassword: "", newCrewAdminPassword: "", crewName: "", crewPassword: ""};
        this.checkAuth = this.checkAuth.bind(this);
        this.onNewCrewName = this.onNewCrewName.bind(this);
        this.onNewCrewEmail = this.onNewCrewEmail.bind(this);
        this.onNewCrewPassword = this.onNewCrewPassword.bind(this);
        this.onNewCrewAdminPassword = this.onNewCrewAdminPassword.bind(this);
        this.onCrewSubmit = this.onCrewSubmit.bind(this);
        this.onCrewSubmitSuccess = this.onCrewSubmitSuccess.bind(this);
        this.onCrewName = this.onCrewName.bind(this);
        this.onCrewPassword = this.onCrewPassword.bind(this);
        this.onLoginMember = this.onLoginMember.bind(this);
        this.onLoginAdmin = this.onLoginAdmin.bind(this);
        this.onCrewLoginSuccess = this.onCrewLoginSuccess.bind(this);
        this.onCrewId = this.onCrewId.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.onLogoutSuccess = this.onLogoutSuccess.bind(this);
    }

    componentDidMount() {
        crewService.getCrewId(this.onCrewId, this.noCookie);
    }

    onNavPlayer() {
        this.setState({nav: "player"});
    }

    onNavSession() {
        this.setState({nav: "session"});
    }

    onNavHistory() {
        this.setState({nav: "history"});
    }

    onLoginMember() {
        crewService.login(false, this.state.crewName, this.state.crewPassword, this.onCrewLoginSuccess, this.onCrewLoginError);
    }

    onCrewLoginSuccess(response) {
        crewService.getCrewId(this.onCrewId, this.noCookie);
    }

    onCrewId(response) {

        this.setState({crewId: response.data.id, admin: response.data.admin});
    }

    noCookie() {
    }

    onCrewLoginError(error) {
        alert("Invalid login credentials.");
    }

    onLoginAdmin() {
        crewService.login(true, this.state.crewName, this.state.crewPassword, this.onCrewLoginSuccess, this.onCrewLoginError);
    }

    onCrewName(e) {
        const crewname = e.target.value;
        this.setState({crewName: crewname});
    }

    onCrewPassword(e) {
        const crewpw = e.target.value;
        this.setState({crewPassword: crewpw});
    }

    onNewCrewName(e) {
        const crewname = e.target.value;
        this.setState({newCrewName: crewname});
    }

    onNewCrewEmail(e) {
        const crewmail = e.target.value;
        this.setState({newCrewEmail: crewmail});
    }

    onNewCrewPassword(e) {
        const crewpw = e.target.value;
        this.setState({newCrewPassword: crewpw});
    }

    onNewCrewAdminPassword(e) {
        const crewapw = e.target.value;
        this.setState({newCrewAdminPassword: crewapw});
    }

    onCrewSubmit(e) {

        const crewname = this.state.newCrewName;
        const crewemail = this.state.newCrewEmail;
        const password = this.state.newCrewPassword;
        const adminpassword = this.state.newCrewAdminPassword;
        crewService.postCrew(crewname, crewemail, password, adminpassword, this.onCrewSubmitSuccess, this.onCrewSubmitError);
        this.setState({newCrewName: "", newCrewEmail: "", newCrewPassword: "", newCrewAdminPassword: ""});
    }

    onCrewSubmitError() {
        alert("Crew name or email already in use.");
    }

    onCrewSubmitSuccess() {
        alert("Your crew was successfully created, please log in.");
    }

    navState() {
        let component = <div/>;
        if (this.state.nav === "player") {
            component = <PlayerManager sessionId={this.state.sessionId} admin={this.state.admin} />;
        } else if (this.state.nav === "session") {
            component = <SessionManager />;
        } else {
            component = <HistoryManager />;
        }

        return component;
    }

    onLogout() {

        crewService.logout(this.onLogoutSuccess, this.onLogoutError);
    }

    onLogoutSuccess() {
        this.setState({crewId: null, admin: null});
    }

    onLogoutError() {

    }

    crewContent() {
        return (
                (
                        <div>
                            <Row>
                                <Navigator onNavPlayer={this.onNavPlayer} onNavSession={this.onNavSession} onNavHistory={this.onNavHistory} />
                            </Row>
                        
                            <Row>
                                <Col> </Col>
                                <Col xs={10} className="dummy" >
                        
                                { this.navState() }
                        
                                </Col>
                                <Col> </Col>               
                            </Row>
                        </div>)
                );
    }

    checkAuth() {
        const authContent = this.crewContent();
        const loginForm = (<Container>
            <Row>
                <Col className="auth-header">
                Welcome to the Court.
                </Col>
            </Row>
        
            <Container className="auth-cont-login">
                <Row>
                    <Col className="auth-header-sub">
                    Log in to existing Crew.
                    </Col>
                </Row>
                <Row>
                    <Col className="auth-label" xs={6}>
                    Crewname
                    </Col>
                    <Col className="auth-label" xs={6}>
                    Password
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                    <input onChange={this.onCrewName} className="auth-form-fullw"/>
                    </Col>
                    <Col xs={6}>
                    <input onChange={this.onCrewPassword} type="password" className="auth-form-fullw"/>
                    </Col>
                </Row>
                <Row><button onClick={this.onLoginMember} className="auth-button" >Login as Member</button></Row>
                <Row><button onClick={this.onLoginAdmin} className="auth-button" >Login as Admin</button></Row>
            </Container>
        
            <Container className="auth-cont-register">
                <Row>
                    <Col className="auth-header-sub">
                    Set up a new Crew.
                    </Col>
                </Row>
                <Row className="auth-row-space" >
                    <Col className="auth-label" xs={5}>
                    Name
                    </Col>
                    <Col xs={7}>
                    <input onChange={this.onNewCrewName} value={this.state.newCrewName} className="auth-form-fullw"/>
                    </Col>
                </Row>
                <Row className="auth-row-space" >
                    <Col className="auth-label" xs={5}>
                    Email
                    </Col>
                    <Col xs={7}>
                    <input onChange={this.onNewCrewEmail} value={this.state.newCrewEmail} className="auth-form-fullw"/>
                    </Col>
                </Row>
                <Row className="auth-row-space" >
                    <Col className="auth-label" xs={5}>
                    Member Password
                    </Col>
                    <Col xs={7}>
                    <input onChange={this.onNewCrewPassword} value={this.state.newCrewPassword} className="auth-form-fullw"/>
                    </Col>
                </Row>
                <Row className="auth-row-space" >
                    <Col className="auth-label" xs={5}>
                    Admin Password
                    </Col>
                    <Col xs={7}>
                    <input onChange={this.onNewCrewAdminPassword} value={this.state.newCrewAdminPassword} className="auth-form-fullw"/>
                    </Col>
                </Row>
                <Row><button onClick={this.onCrewSubmit} className="auth-button" >Create my Crew</button></Row>
            </Container>
        
            <Row>
                <Col className="auth-header">
                <h3>Disclaimer</h3>
                HTTPS/SSL not set up yet. Don't use any sensitive passwords, as they are not encrypted between client and server. Passwords are stored hashed on the Database.
                </Col>
            </Row>
        
        </Container>);
        if (this.state.crewId === null) {
            return loginForm;
        } else {
            return authContent;
        }
    }

    render() {
        return (
                (
                        <Container fluid={true} >
                        
                            <Row>
                                <Col>
                                <img  src={logo} className="logo"/>
                                {this.state.crewId !== null &&
                                                    <button className="button-logout" onClick={this.onLogout}>logout</button>
                                }
                                <h1 className="title">
                                    sportsMMR
                                </h1>
                        
                                </Col>
                            </Row>
                        
                            <Row>
                                <Col>
                                <h2 className="subtitle">
                                    Competitive for fun.
                                </h2>
                                </Col>
                            </Row>
                        
                            {this.checkAuth()}
                        
                        
                        </Container>
                        )
                );
    }

}


ReactDOM.render(
        <Index />,
        document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
