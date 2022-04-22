# velero-notifications

Check Velero auctions and send notifications if these are available.
👋 Hi, @minstn publishes his demo project to GitHub

This code requires ```memcached``` service running on localhost port ```11211```

## Configuration .env file

```
SENDGRID_KEY - Sendgrid API key, we use Sendgrid to send notification Emails
RECEIVERS - Comma separared list of Emails to notify
TARGET_CSS_CLASS - CSS class to search in the HTML code, contains all the values we need
SENDER_EMAIL_ADDRESS - Example: Velero DAO <velero@clickon.ch>
LIQUIDATION_URL - https://liquidation.velero.finance
USER_AGENT - Example: Mozilla/5.0 (Macintosh; Intel Mac OS X 12_3_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.3 Safari/605.1.15
```

## Code block with auctions

```
<div class="css-dk15xm">
  <div class="css-1qwfh8v">
    <div class="css-uliqdc">
      <div class="css-10nf7hq">
        <div class="css-1izcjul"></div>
        <div class="css-oxlkfa">Active</div>
      </div>
      <div class="css-u7eeer">Auction ID 154</div>
    </div>
    <div class="css-uliqdc">
      <div class="css-16zob4e">
        <svg viewBox="0 0 16 16" display="inline-block" focusable="false" role="presentation" class="css-1ac20o7">
          <g>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.09994 1.1626C4.31653 1.1626 4.49212 1.33818 4.49212 1.55478V1.94696H6.8452V1.55478C6.8452 1.33818 7.02082 1.1626 7.23738 1.1626C7.45395 1.1626 7.62956 1.33818 7.62956 1.55478V1.94696H9.98265V1.55478C9.98265 1.33818 10.1583 1.1626 10.3748 1.1626C10.5914 1.1626 10.767 1.33818 10.767 1.55478V1.94696H11.1592C12.6754 1.94696 13.9045 3.17605 13.9045 4.69222V11.7515C13.9045 13.2676 12.6754 14.4967 11.1592 14.4967H3.31558C1.79941 14.4967 0.570312 13.2676 0.570312 11.7515V4.69222C0.570312 3.17605 1.79941 1.94696 3.31558 1.94696H3.70776V1.55478C3.70776 1.33818 3.88334 1.1626 4.09994 1.1626ZM4.49212 2.73132H6.8452V3.1235C6.8452 3.34009 7.02082 3.51568 7.23738 3.51568C7.45395 3.51568 7.62956 3.34009 7.62956 3.1235V2.73132H9.98265V3.1235C9.98265 3.34009 10.1583 3.51568 10.3748 3.51568C10.5914 3.51568 10.767 3.34009 10.767 3.1235V2.73132H11.1592C12.2422 2.73132 13.1201 3.60925 13.1201 4.69222V5.47658H1.35467V4.69222C1.35467 3.60925 2.2326 2.73132 3.31558 2.73132H3.70776V3.1235C3.70776 3.34009 3.88334 3.51568 4.09994 3.51568C4.31653 3.51568 4.49212 3.34009 4.49212 3.1235V2.73132ZM1.35467 6.26095V11.7515C1.35467 12.8344 2.2326 13.7124 3.31558 13.7124H11.1592C12.2422 13.7124 13.1201 12.8344 13.1201 11.7515V6.26095H1.35467Z" fill="#1AAB9B" stroke="#1AAB9B" stroke-width="0.6"></path>
          </g>
        </svg>
        <div class="css-k6mnr8">11 Apr 2022, 13:51 UTC</div>
      </div>
      <div data-testid="countdown timer" class="css-rqqmxq">
        <svg viewBox="0 0 16 16" display="inline-block" focusable="false" role="presentation" class="css-1ac20o7">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3846 8C13.3846 10.9738 10.9738 13.3846 8 13.3846C5.02616 13.3846 2.61538 10.9738 2.61538 8C2.61538 5.02616 5.02616 2.61538 8 2.61538C10.9738 2.61538 13.3846 5.02616 13.3846 8ZM15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8ZM7.5 9C7.22386 9 7 8.77614 7 8.5V4.5C7 4.22386 7.22386 4 7.5 4C7.77614 4 8 4.22386 8 4.5V8H11.5C11.7761 8 12 8.22386 12 8.5C12 8.77614 11.7761 9 11.5 9H7.5Z" fill="currentColor"></path>
        </svg>
        <div class="css-k6mnr8">2:00:59 remaining</div>
      </div>
    </div>
  </div>
  <div class="css-1qwfh8v">
    <div class="css-1df3faq">
      <div class="css-oxlkfa">Initial Collateral</div>
      <div class="css-u7eeer">--</div>
    </div>
    <div class="css-uliqdc">
      <div class="css-oxlkfa">Collateral Available</div>
      <div class="css-u7eeer">979.000000000000000000 VLX</div>
    </div>
  </div>
  <div class="css-1qwfh8v">
    <div class="css-uliqdc">
      <div class="css-oxlkfa">Vault Owner</div>
      <a href="https://evmexplorer.velas.com/address/0xf63F395Cdc50d96dC5f4A3bBB7B7d93e40F5e128" target="_blank" class="css-1ye661s">
        <div class="css-hmhis3">0xf63F3...e128</div>
      </a>
    </div>
    <div class="css-uliqdc">
      <div class="css-oxlkfa">USDV per VLX</div>
      <div class="css-vurnku">0.266667647716977092</div>
    </div>
  </div>
  <button class="css-963gjo">Place a bid</button>
  <div class="css-3j2kqe">
    <div class="css-uliqdc">
      <div data-reach-tooltip-trigger="" class="css-oxlkfa">Dust limit</div>
      <div class="css-vurnku">113.00 USDV</div>
    </div>
    <div class="css-uliqdc">
      <div data-reach-tooltip-trigger="" class="css-oxlkfa">Auction price</div>
      <div class="css-gqkwza">261.07 USDV</div>
    </div>
  </div>
</div>
```

Auctions are grouped by asset name, URL schema https://{host}/auctions/{asset_name}-A

Example: https://liquidation.velero.finance/auctions/VLX-A

