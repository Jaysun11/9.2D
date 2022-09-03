
import React from 'react'
import Question from './Question';
import Article from './Article';

function TypeContainer(props){

    function Greeting(type) {
        
        if (type === "Question") {
          return <Question />;
        }
        return <Article />;
      }


    return (

        Greeting(props.typeSelected)

    )
   
}
export default TypeContainer