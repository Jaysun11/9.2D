import React from 'react'

import db from "./firebase"

import { PricingTable, PricingSlot, PricingDetail } from 'react-pricing-table';
import axios from 'axios';

import { query, collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";

import {
  Elements,
  ElementsConsumer,
  CardElement
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SubscriptionSuccess from './SubscriptionSuccess';




const stripePromise = loadStripe("pk_test_51LdZgaGH599OltwtN4RnVntnlVRSiojogyZP7QdvXEfBAHPdYo3zdYQeNrcw9wmDT6NLqTwOSrBG4W7AXegocYgH001f8KEsIt");

class PaymentForm extends React.Component<any> {

  constructor() {
    super();
    this.state = {
      userID: "",
      paid: "no"
    };

  }


  handleSubmit = async () => {
    const { elements, stripe } = this.props;
    const cardElement = elements.getElement(CardElement);

    const first = query(
      collection(db, "users"),
    );
    const snapshot = await getDocs(first);
    var users = snapshot.docs.map(doc => doc.data());
    var foundUser;

    users.forEach(user => {

      if (localStorage.getItem("email") === user.email) {
        foundUser = user;
      }

    });

    this.setState({
      userID: foundUser.id
    })


    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });


    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);

      //FOR TEST USE FAKE PM
      //const res = await axios.post('http://localhost:5000/sub', {'payment_method': paymentMethod.id, 'email': foundUser.email});
      const res = await axios.post('http://localhost:5000/sub', { 'payment_method': 'pm_card_visa', 'email': foundUser.email });

      const { client_secret, status } = res.data;

      if (status === 'requires_action') {
        stripe.confirmCardPayment(client_secret).then(function (result) {
          if (result.error) {
            console.log('Subscription Setup Failure');
            console.log(result.error);
          } else {
            console.log('Success!');
            this.setState({
              paid: "yes"
            })

          }
        });
      } else {
        console.log('Success!');
        this.setState({
          paid: "yes"
        })
      }


    }
  };

  render() {
    return (
      <div>
        {this.state.paid === "yes" &&
          <SubscriptionSuccess />
        }
        {this.state.paid === "no" &&
          <div>
            < CardElement />
            <div className="Pay_Button" onClick={this.handleSubmit} style={{marginLeft: 'auto', marginRight: 'auto'}}>Sign Up</div>
          </div>
        }
      </div>
    );
  }
}

export default class StripePaymentForm extends React.Component {
  render() {
    return (
      <div style={{width: "30%", marginLeft: "auto", marginRight: "auto"}}>
        <PricingTable highlightColor='#1976D2'>

          <PricingSlot highlighted shouldDisplayButton={false} buttonText='SIGN UP' title='PREMIUM' priceText='$9.99/month'>
          
          <PricingDetail>
            <div>
            <Elements stripe={stripePromise} >
              <ElementsConsumer>
                {(ctx: any) => <PaymentForm {...ctx} />}
              </ElementsConsumer>
            </Elements>
            </div>
          </PricingDetail>
          </PricingSlot>
        </PricingTable>


      </div>
    );


  }
}