import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {UtilityService} from '../utility/utility.service';

@Component({
  selector: 'app-payment-request',
  templateUrl: './payment-request.component.html',
  styleUrls: ['./payment-request.component.scss']
})
export class PaymentRequestComponent implements AfterViewInit {
  @Input() amount: number;
  @Input() label: string;

  public element: any;
  public paymentRequest: any;
  public prButton: any;

  @ViewChild('payElement') payElement;

  constructor(private pmt: UtilityService) { }

  ngAfterViewInit() {
    this.paymentRequest = this.pmt.stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        amount: this.amount,
        label: this.label
      }
    });

    this.element = this.pmt.stripe.elements();

    this.paymentRequest.on('source', async (event) => {
      console.log(event);
      setTimeout(() => {
        event.complete('success')
      }, 1000)
    });

    this.prButton = this.element.create('paymentRequestButton', {
      paymentRequest: this.paymentRequest,
      style: {
        paymentRequestButton: {
          type: 'buy',
          theme: 'dark'
        }
      }
    });

    (async () => {
      // Check the availability of the Payment Request API first.
      const result = await this.paymentRequest.canMakePayment();
      if (result) {
        this.prButton.mount('#payment-request-button');
      } else {
        // this.prButton.mount('#payment-request-button');
        document.getElementById('payment-request-button').style.backgroundColor = 'orange';
      }
    })();

  }
}
