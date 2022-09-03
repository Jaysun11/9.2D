import React from 'react'
import { Input, Menu } from 'semantic-ui-react'
import { Link } from "react-router-dom";

import db from "./firebase"


import { query, collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";



class Header extends React.Component {

  constructor() {
    super();
    this.state = {
      authenticated: false,
      paying: false
    };
  }

  componentDidMount() {
    const loggedIn = localStorage.getItem("authenticated");

    if (loggedIn === 'true') {
      this.setState({
        authenticated: true
      });
    }

    this.updatePremium();
  }

  logOutClick = () => {
    this.setState({ authenticated: false });
    localStorage.setItem("authenticated", false);
    localStorage.setItem("email", "")
    localStorage.setItem("paying", false)
    this.setState({
      paying: false
    })
  };

  updatePremium = async () => {


    const first = query(
      collection(db, "users"),
    );

    var docData;

    const querySnapshot = await getDocs(first);
    querySnapshot.forEach(doc => {


      if (doc.data().email === localStorage.getItem('email')) {
        docData = doc.data()
      }
    });
    try {

      if (docData.premium === true) {
        this.setState({
          paying: true
        })
        localStorage.setItem("paying", 'true')
      } else {

        this.setState({
          paying: false
        })
        localStorage.setItem("paying", 'false')
      }

    } catch (error) {

      this.setState({
        paying: false
      })
      localStorage.setItem("paying", 'false')

    }


  }




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

          {this.state.authenticated === true &&
            <Menu.Item
              name='plans'
            >

              <Link to="/plans">Plans</Link>

            </Menu.Item>}



          {this.state.paying === true &&

            <Menu.Item
              name='themes'
            >
              <Link to="/themes">Themes</Link>


            </Menu.Item>

          }

          <Menu.Item
            name='login'
          >
            {this.state.authenticated === true && <span onClick={this.logOutClick}>Log Out</span>}
            {this.state.authenticated === false && <Link to="/login">Login</Link>}

          </Menu.Item>

        </Menu.Menu>
      </Menu>

    )
  }
} export default Header
