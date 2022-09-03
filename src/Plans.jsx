import React, { Component } from 'react'
import Header from './Header';
import { Navigate } from "react-router-dom";

import { PricingTable, PricingSlot, PricingDetail } from 'react-pricing-table';
import StripePaymentForm from './StripePaymentForm';


export default class Plans extends Component {


  constructor() {
    super();
    this.state = {
      Signup: false,
      free: false,
      paying: localStorage.getItem("paying") === 'true'
    };
  }


  redirect_home = () => {
    this.setState({ free: true });
  };

  setPay = () => {
    this.setState({ Signup: true });
  };


  render() {

    if (this.state.free) {
      return <Navigate to={'/'} />;
    }


    return (


      <div>
        <Header />
        {this.state.paying && <PricingTable highlightColor='#1976D2'>

          <PricingSlot highlighted shouldDisplayButton={false} buttonText='SIGN UP' title='PREMIUM' priceText='Congratulations'>

            <PricingDetail>
              you are already a paid member! You can access...
            </PricingDetail>
            <PricingDetail> <b>View</b> Questions</PricingDetail>
              <PricingDetail> <b>Post</b> Questions</PricingDetail>
              <PricingDetail> <b>Post</b> Articles</PricingDetail>
              <PricingDetail > <b>Themes</b></PricingDetail>
              <PricingDetail > <b>Dashboard</b></PricingDetail>
          </PricingSlot>
        </PricingTable>}

        {!this.state.paying && <div>
          {!this.state.Signup && <PricingTable highlightColor='#1976D2'>
            <PricingSlot onClick={this.redirect_home} buttonText='TRY IT FREE' title='FREE' priceText='$0/month'>
              <PricingDetail> <b>View</b> Questions</PricingDetail>
              <PricingDetail> <b>Post</b> Questions</PricingDetail>
              <PricingDetail> <b>Post</b> Articles</PricingDetail>
              <PricingDetail strikethrough> <b>Themes</b></PricingDetail>
              <PricingDetail strikethrough> <b>Dashboard</b></PricingDetail>
            </PricingSlot>
            <PricingSlot highlighted onClick={this.setPay} buttonText='SIGN UP' title='PREMIUM' priceText='$9.99/month'>
              <PricingDetail> <b>View</b> Questions</PricingDetail>
              <PricingDetail> <b>Post</b> Questions</PricingDetail>
              <PricingDetail> <b>Post</b> Articles</PricingDetail>
              <PricingDetail > <b>Themes</b></PricingDetail>
              <PricingDetail > <b>Dashboard</b></PricingDetail>
            </PricingSlot>
          </PricingTable>}


          {this.state.Signup &&

            <StripePaymentForm />

          }
        </div>
        }


      </div>


    )
  }
}