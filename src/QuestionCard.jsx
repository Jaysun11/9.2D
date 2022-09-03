
import React from 'react'
import { Card, Icon } from 'semantic-ui-react'

import db from "./firebase"
import { doc, deleteDoc } from "firebase/firestore";

import Draggable from 'react-draggable';


import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";



class QuestionCard extends React.Component {

  constructor() {
    super();
    this.state = {
      open: false
    };
  }

  deleteQuestion = async (id) => {

    await deleteDoc(doc(db, "Questions", id));
    window.location.reload(false);

  }

  openQuestion = () => {

    if (this.state.open) {
      this.setState({ open: false })
    } else {
      this.setState({ open: true })
    }


  }

  render() {

    return (


      <Draggable handle=".handle">


        <Card className='handle'>
          <Card.Content>
            <Icon name='trash' style={{ float: 'right', cursor: 'pointer' }} onClick={() => this.deleteQuestion(this.props.id)} />
            <Card.Header>{this.props.title}</Card.Header>
            {this.props.code === 'true' && <Card.Description style={{ cursor: 'pointer' }} onClick={() => this.openQuestion()}>
              {this.state.open === false && <div>{this.props.textforcode.substr(0, 40) + "..."}</div>}
              {this.state.open === false && <CodeMirror name = "problem" value={this.props.problem.substr(0, 40) + "..."}options={{editable: false}} extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}  />}

              {this.state.open === true && <div>{this.props.textforcode}</div>}
              {this.state.open === true &&<CodeMirror name = "problem" value={this.props.problem} options={{editable: false}} extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}  />}

            </Card.Description>}
            {this.props.code === 'false' && <Card.Description style={{ cursor: 'pointer' }} onClick={() => this.openQuestion()}>
              {this.state.open === false && <div>{this.props.problem.substr(0, 80) + "..."}</div>}
              {this.state.open === true && <div>{this.props.problem}</div>}

            </Card.Description>}
          </Card.Content>
          <Card.Content extra>
            <h3>
              <Icon name='tags' />
              <span>{this.props.tags}</span>
            </h3>
            <h4 style={{ marginTop: '5px' }}>{this.props.date}</h4>
          </Card.Content>
        </Card>

      </Draggable>

    )
  }

} export default QuestionCard;
