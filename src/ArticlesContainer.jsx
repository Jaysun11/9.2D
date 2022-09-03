
import React from 'react'
import { Card } from 'semantic-ui-react'
import Articlebox from './Articlebox';

import db from "./firebase"
import { collection, query, getDocs } from "firebase/firestore";

class ArticlesContianer extends React.Component {

    constructor() {
        super();
        this.state = {
            articles: []
        };
        this.gatherArticles();
    }

    gatherArticles = async () => {

        const search = query(
            collection(db, "articles"),
        );

        const snapshot = await getDocs(search);


        const articleList = snapshot.docs.map((doc, index) =>
            <Articlebox key={index}
                name={doc.title}
                img={doc.data().image}
                abstract={doc.data().abstract}
                text={doc.data().text}
                tags={doc.data().tags}
            />
        );


        this.setState({ articles: articleList });

    }



    render() {

        return (

            <Card.Group className='centered'>

                {this.state.articles}

            </Card.Group>

        )

    }

}
export default ArticlesContianer