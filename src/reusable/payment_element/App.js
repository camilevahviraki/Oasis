import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Index page with list of payment methods.
import List from './PaymentElement';

// Payment method components.
import AcssDebit from './banks/AcssDebit';
import AfterpayClearpay from './banks/AfterpayClearpay';
import Alipay from './banks/Alipay';
import ApplePay from './banks/ApplePay';
import Bancontact from './banks/Bancontact';
import BecsDebit from './banks/BecsDebit';
import Boleto from './banks/Boleto';
import Card from './banks/Card';
import Eps from './banks/Eps';
import Fpx from './banks/Fpx';
import Giropay from './banks/Giropay';
import GooglePay from './banks/GooglePay';
import GrabPay from './banks/GrabPay';
import Ideal from './banks/Ideal';
import Klarna from './banks/Klarna';
import Oxxo from './banks/Oxxo';
import P24 from './banks/P24';
import SepaDebit from './banks/SepaDebit';
import Sofort from './banks/Sofort';
import UsBankAccountDebit from './banks/UsBankAccountDebit';
import WeChatPay from './banks/WeChatPay';
import Konbini from './banks/Konbini';
import { JPBankTransfer } from './banks/JPBankTransfer';

function App(props) {
  return (
    <>
      <a href="/">home</a>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/alipay" element={<Alipay />} />
          <Route path="/acss-debit" element={<AcssDebit />} />
          <Route path="/us-bank-account-debit" element={<UsBankAccountDebit />} />
          <Route path="/apple-pay" element={<ApplePay />} />
          <Route path="/afterpay-clearpay" element={<AfterpayClearpay />} />
          <Route path="/bancontact" element={<Bancontact />} />
          <Route path="/becs-debit" element={<BecsDebit />} />
          <Route path="/boleto" element={<Boleto />} />
          <Route path="/card" element={<Card />} />
          <Route path="/eps" element={<Eps />} />
          <Route path="/fpx" element={<Fpx />} />
          <Route path="/giropay" element={<Giropay />} />
          <Route path="/grabpay" element={<GrabPay />} />
          <Route path="/google-pay" element={<GooglePay />} />
          <Route path="/ideal" element={<Ideal />} />
          <Route path="/klarna" element={<Klarna />} />
          <Route path="/oxxo" element={<Oxxo />} />
          <Route path="/p24" element={<P24 />} />
          <Route path="/sepa-debit" element={<SepaDebit />} />
          <Route path="/sofort" element={<Sofort />} />
          <Route path="/wechat-pay" element={<WeChatPay />} />
          <Route path="/konbini" element={<Konbini />} />
          <Route path="/jp-bank-transfer" element={<JPBankTransfer />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
