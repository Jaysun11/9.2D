import React from 'react'
import { Input, Menu } from 'semantic-ui-react'
import { Link } from "react-router-dom";

class LoginHeader extends React.Component {

  constructor() {
    super();
    this.state = {
      authenticated: false
    };
  }

  componentDidMount() {
    const loggedIn = localStorage.getItem("authenticated");

    if(loggedIn === 'true'){
      this.setState({
        authenticated: true
      });
    }
 }

 logOutClick = () => {
  this.setState({authenticated: false});
  localStorage.setItem("authenticated", false)
};

  render() {

    return (

      <Menu>

      <Link to="/"><Menu.Item><h1>Dev @ Deakin</h1></Menu.Item></Link>

        <Input className="headerSearch" icon='search' placeholder='Search...' />
             

        <Menu.Menu position="right">

        <Menu.Item 
          name='findQuestion'
        >
          <Link to="/find_question">Find Question</Link>
        </Menu.Item>

        <Menu.Item 
          name='post'
        >
          <Link to="/post">Post</Link>
        </Menu.Item>

        </Menu.Menu>
      </Menu>

    )
  }
} export default LoginHeader
