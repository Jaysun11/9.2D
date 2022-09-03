
import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


import { Card, Input } from 'semantic-ui-react'
import QuestionCard from './QuestionCard';
import Header from './Header';

import db from "./firebase"
import { collection, query, getDocs } from "firebase/firestore";


class FindQuestions extends React.Component {

    constructor() {
        super();
        this.state = {
            questions: null,
            SearchBox: "",
            searchDate: null,
            empty: false
        };
        this.gatherQuestions();
    }

    gatherQuestions = async () => {

        const search = query(
            collection(db, "Questions"),
        );

        const snapshot = await getDocs(search);

        const questionList = snapshot.docs.map((doc, index) =>
            <QuestionCard key={index}
                id={doc.id}
                title={doc.data().title}
                problem={doc.data().problem}
                tags={doc.data().tags}
                date={doc.data().creationDate}
                code={doc.data().code}
                textforcode={doc.data().textforcode}
            />
        );

        this.setState({ questions: questionList, empty: false });

        if (questionList.length === 0) {
            this.setState({ empty: true });
        }
    }

    filterQuestions = async () => {

        const search = query(
            collection(db, "Questions"),
        );

        const snapshot = await getDocs(search);

        var questions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        var Searchresult = null;
        var searchboxValue = null;

        //Date Selected
        if (this.state.searchDate !== null) {
            var SearchresultDate = questions.filter(question => (question.creationDate) === `${this.state.searchDate.getDate()}/${this.state.searchDate.getMonth() + 1}/${this.state.searchDate.getFullYear()}`)

            if (this.state.SearchBox !== "") {
                searchboxValue = this.state.SearchBox;
                Searchresult = SearchresultDate.filter(question => (question.title).includes(searchboxValue) || (question.tags).includes(searchboxValue));
            } else {
                Searchresult = SearchresultDate;
            }
            //Date not selected
        } else {
            if (this.state.SearchBox !== "") {
                searchboxValue = this.state.SearchBox;
                Searchresult = questions.filter(question => (question.title).includes(searchboxValue) || (question.tags).includes(searchboxValue));

            } else {
                //No search
                Searchresult = questions;
            }

        }

        if (Searchresult !== null && Searchresult.length > 0) {

            const questionList = Searchresult.map((question, index) =>
                <QuestionCard key={index}
                    id={question.id}
                    title={question.title}
                    problem={question.problem}
                    tags={question.tags}
                    date={question.creationDate}
                    code = {question.code}
                />

            );
            this.setState({ questions: questionList, empty: false });
        } else {
            this.setState({ empty: true, questions: [] });
        }

    }


    updateSearch = e => {
        this.setState({
            [e.target.name]: e.target.value
        });

        this.filterQuestions();

    }

    setSearchDate(date) {

        this.setState({ searchDate: date });
        this.filterQuestions();

    }



    render() {

        return (
            <div>
                <Header />
                <div className='questionSearchContainer'>
                    <Input className="questionSearch" value={this.state.SearchBox} name='SearchBox' icon='search' onChange={this.updateSearch} placeholder='Search for a question by title or tag...' />
                    <div style={{ marginLeft: '20px' }}>
                        <h4 style={{ marginTop: '-3px', marginBottom: '5px' }}>Search by Date</h4>
                        <DatePicker selected={this.state.searchDate} onSelect={(date) => this.setSearchDate(date)} />
                    </div>

                </div>

                {this.state.empty && <div className="questionSearchContainer"><h1>No Questions to Display</h1></div>}


                    <Card.Group className='centered'>
                        {this.state.questions}
                    </Card.Group>




            </div >

        )
    }
}
export default FindQuestions

