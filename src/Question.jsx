
import React, {Component} from 'react'
import {Form, Button, Radio} from 'semantic-ui-react'

import db from "./firebase"
import { addDoc, collection } from 'firebase/firestore'

import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";






export default class Question extends Component {

  constructor() {
    super();
    this.state = {
      title: "",
      problem: "",
      textforcode: "",
      tags: "",
      code: "false"
    };
  }

  RadioClicked = (e, { value }) => this.setState({ code: value })

  

  CreateNewQuestion  = async () => {
    console.log(this.state.problem)
    console.log(this.state.tags)
    console.log(this.state.code)


    var date = new Date()
    const collectionRef = collection(db, 'Questions');
    const payload = {   title: this.state.title,
    problem: this.state.problem,
    tags: this.state.tags,
    creationDate: `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`,
    code: this.state.code,
    textforcode: this.state.textforcode
  }

  await addDoc(collectionRef, payload);

  this.setState({
    title: "",
    problem: "",
    tags: "",
    code: "false",
    textforcode: ""
  });

  console.log('Successfully Added Question');

}

updateInput = e => {
  this.setState({
    [e.target.name]: e.target.value
  });
}


  render(){

    return (

        <Form className="SelectedForm">
        <div className="formField">
        <h4 style={{marginRight: "10px"}}>Title</h4>
        <input value={this.state.title} name="title"  onChange={this.updateInput} placeholder='Enter a descriptive title' />
        </div>

        <Form.Field className='postSelector'>
        <h3 style={{marginRight:"15px"}}>Select Question Type: </h3>
          <Radio style={{marginRight: "20px"}}
            label='Text'
            value='false'
            name='radioButtons'
            checked={this.state.code === 'false'}
            onChange={this.RadioClicked}
          />
          <Radio
            label='Code'
            value='true'
            name='radioButtons'
            checked={this.state.code === 'true'}
            onChange={this.RadioClicked}
          />
      </Form.Field>

        
      <Form.Field style={{marginTop: "10px"}}>

      <h4 style={{marginBottom: "10px"}}>Describe your problem</h4>

        {this.state.code === 'true' && <textarea value={this.state.textforcode} name="textforcode"  onChange={this.updateInput}  placeholder='' />}
        
        {this.state.code === 'true' && <h4 style={{marginBottom: "10px"}}>Provide any code</h4>}
        
        {this.state.code === 'true' && <CodeMirror name = "problem" 
        value={this.state.value}
        extensions={[
          markdown({ base: markdownLanguage, codeLanguages: languages })
        ]}
        onChange={(value) => {
          this.setState({
            problem: value
          });
        }} />
        

        }

        {this.state.code === 'false' && <textarea value={this.state.problem} name="problem"  onChange={this.updateInput}  placeholder='' />}

        
      </Form.Field>
      <div className="formField">
          <h4 style={{marginBottom: "10px", marginRight: "10px", marginTop: "10px"}}>Tags</h4>
          <input value={this.state.tags} name="tags"  onChange={this.updateInput}  placeholder='Please add up to 3 tags to descript what your article is about e.g., Java' />
        </div>
      <Button style={{marginTop: "20px", float:"right", width: "170px"}} onClick={this.CreateNewQuestion}>Post</Button>
    </Form>


    )
   
}
}
