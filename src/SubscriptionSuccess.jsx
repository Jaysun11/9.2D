import React, { Component } from 'react'



import db from "./firebase"


import { query, collection} from "firebase/firestore";  
import {getDocs, updateDoc} from "firebase/firestore"; 



export default class SubscriptionSuccess extends Component {

  updatePremium = async () => {

    const first = query(
      collection(db, "users"),
    );

    var docData;
    var docRef;

    const querySnapshot = await getDocs(first);
    querySnapshot.forEach(doc => {

    if (doc.data().email === localStorage.getItem('email')){
      docRef = doc(db, "users", doc.id);
      docData = doc.data()
      
    }
    });
  
  
    await updateDoc(docRef, {
      firstName: docData.firstName,
      lastName: docData.lastName,
      email: docData.email,
      password: docData.password, 
      premium: true});
    localStorage.setItem("paying", 'true')


  }

  componentDidMount() {

    this.updatePremium();

  }


  render() {



    
    return (


      <div>
        Success
      </div>


    )
  }
}