
import React from 'react'
import {Card, Icon, Image} from 'semantic-ui-react'


function Articlebox(props){

    return (

        <Card>
        <Image src={props.img} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{props.name}</Card.Header>
          <Card.Description>
          {props.abstract}
          </Card.Description>
          <Card.Description>
         <div style={{marginTop: "10px"}}>{props.text}</div>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <h3>
            <Icon name='tags' />
            <span>{props.tags}</span>
          </h3>
        </Card.Content>
      </Card>

    )
   
}
export default Articlebox