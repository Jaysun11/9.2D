import React, { Component } from 'react'
import { Form, Radio } from 'semantic-ui-react'
import TypeContainer from './TypeContainer';
import AskOrShareHeader from './AskOrShareHeader'

export default class PostTypeSelector extends Component {
  constructor() {
    super()
    this.state = { typeSelected: "Question" }
  }

  RadioClicked = (e, { value }) => this.setState({ typeSelected: value })

  render() {
    return (
      <div>
      <Form className='postSelector'>
        <h3 style={{marginRight:"15px"}}>Select Post Type: </h3>
          <Radio style={{marginRight: "20px"}}
            label='Question'
            value='Question'
            name='radioButtons'
            checked={this.state.typeSelected === 'Question'}
            onChange={this.RadioClicked}
          />
          <Radio
            label='Article'
            value='Article'
            name='radioButtons'
            checked={this.state.typeSelected === 'Article'}
            onChange={this.RadioClicked}
          />
      </Form>

      <AskOrShareHeader />
      <TypeContainer typeSelected={this.state.typeSelected} />

      </div>


    )
  }
}