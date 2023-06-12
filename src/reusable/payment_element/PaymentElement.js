import React, { useState, useEffect } from 'react';
import './PaymentElement.css';
import { AiOutlineCreditCard, AiOutlineDown } from 'react-icons/ai';
import { TbBuildingBank, TbTransferIn } from 'react-icons/tb';
import { GiPayMoney } from 'react-icons/gi';
import { RiShoppingBag3Line } from 'react-icons/ri';
import { IoMdWallet } from 'react-icons/io';

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

// List of payment method types with links to each implementation.
const PaymentElement = () => {
  const CARDS = 'Cards';
  const BANK_DEBITS = 'Bank debits';
  const BANK_REDIRECTS = 'Bank redirects';
  const BANK_TRANSFERS = 'Bank transfers';
  const BUY_NOW_PAY_LATER = 'Buy now pay later';
  const VOUCHERS = 'Vouchers';
  const WALLETS = 'Wallets';
  const categories = [
    {
      name: CARDS,
      logo: <AiOutlineCreditCard />,
    },
    {
      name: BANK_DEBITS,
      logo: <TbBuildingBank />,
    },
    {
      name: BANK_REDIRECTS,
      logo: <TbBuildingBank />,
    },
    {
      name: BANK_TRANSFERS,
      logo: <TbTransferIn />,
    },
    {
      name: BUY_NOW_PAY_LATER,
      logo: <GiPayMoney />,
    },
    {
      name: VOUCHERS,
      logo: <RiShoppingBag3Line />,
    },
    {
      name: WALLETS,
      logo: <IoMdWallet />,
    },
  ];

  const paymentMethods = [
    {
      path: <Card />,
      name: 'Card',
      docs: 'https://stripe.com/docs/payments/payment-intents',
      fact_sheet: 'https://stripe.com/payments/payment-methods-guide#cards',
      category: CARDS,
    },
    {
      path: <UsBankAccountDebit />,
      name: 'US bank account - ACH debits',
      docs: 'https://stripe.com/docs/ach',
      fact_sheet:
        'https://stripe.com/payments/payment-methods-guide#ach-debits',
      category: BANK_DEBITS,
    },
    {
      path: <AcssDebit />,
      name: 'Pre-authorized debit in Canada (ACSS)',
      docs: 'https://stripe.com/docs/payments/acss-debit/accept-a-payment',
      fact_sheet: '',
      category: BANK_DEBITS,
    },
    {
      path: <BecsDebit />,
      name: 'Bacs Direct Debit',
      docs: 'https://stripe.com/docs/payments/payment-methods/bacs-debit',
      fact_sheet:
        'https://stripe.com/payments/payment-methods-guide#bacs-direct-debit',
      category: BANK_DEBITS,
    },
    {
      path: <BecsDebit />,
      name: 'BECS Direct Debit',
      docs: 'https://stripe.com/docs/payments/au-becs-debit',
      fact_sheet:
        'https://stripe.com/payments/payment-methods-guide#becs-direct-debit',
      category: BANK_DEBITS,
    },
    {
      path: <SepaDebit />,
      name: 'SEPA Direct Debit',
      docs: 'https://stripe.com/docs/payments/sepa-debit',
      fact_sheet:
        'https://stripe.com/payments/payment-methods-guide#sepa-direct-debit',
      category: BANK_DEBITS,
    },
    {
      path: <Bancontact />,
      name: 'Bancontact',
      docs: 'https://stripe.com/docs/payments/bancontact',
      fact_sheet:
        'https://stripe.com/payments/payment-methods-guide#bancontact',
      category: BANK_REDIRECTS,
    },
    {
      path: <Eps />,
      name: 'EPS',
      docs: 'https://stripe.com/docs/payments/eps',
      fact_sheet: 'https://stripe.com/payments/payment-methods-guide#eps',
      category: BANK_REDIRECTS,
    },
    {
      path: <Fpx />,
      name: 'FPX',
      docs: 'https://stripe.com/docs/payments/fpx',
      fact_sheet: 'https://stripe.com/payments/payment-methods-guide#FPX',
      category: BANK_REDIRECTS,
    },
    {
      path: <Giropay />,
      name: 'giropay',
      docs: 'https://stripe.com/docs/payments/giropay',
      fact_sheet: 'https://stripe.com/payments/payment-methods-guide#giropay',
      category: BANK_REDIRECTS,
    },
    {
      path: <Ideal />,
      name: 'iDEAL',
      docs: 'https://stripe.com/docs/payments/ideal',
      fact_sheet: 'https://stripe.com/payments/payment-methods-guide#ideal',
      category: BANK_REDIRECTS,
    },
    {
      path: <P24 />,
      name: 'Przelewy24 (P24)',
      docs: 'https://stripe.com/docs/payments/p24',
      fact_sheet: 'https://stripe.com/payments/payment-methods-guide#p24',
      category: BANK_REDIRECTS,
    },
    {
      path: <Sofort />,
      name: 'Sofort',
      docs: 'https://stripe.com/docs/sources/sofort',
      fact_sheet: 'https://stripe.com/payments/payment-methods-guide#sofort',
      category: BANK_REDIRECTS,
    },
    {
      path: <ApplePay />,
      name: 'ACH credit transfers',
      docs: 'https://stripe.com/docs/sources/ach-credit-transfer',
      fact_sheet:
        'https://stripe.com/payments/payment-methods-guide#ach-credit-transfers',
      category: BANK_TRANSFERS,
    },
    {
      path: <ApplePay />,
      name: 'Multibanco',
      docs: 'https://stripe.com/docs/sources/multibanco',
      fact_sheet:
        'https://stripe.com/payments/payment-methods-guide#multibanco',
      category: BANK_TRANSFERS,
    },
    {
      path: <JPBankTransfer />,
      name: 'JP Bank transfer',
      docs: 'https://stripe.com/docs/payments/bank-transfers',
      category: BANK_TRANSFERS,
    },
    {
      path: <AfterpayClearpay />,
      name: 'Afterpay / Clearpay',
      docs: 'https://stripe.com/docs/payments/afterpay-clearpay',
      fact_sheet: '',
      category: BUY_NOW_PAY_LATER,
    },
    {
      path: <Klarna />,
      name: 'Klarna',
      docs: 'https://stripe.com/docs/sources/klarna',
      fact_sheet: 'https://stripe.com/payments/payment-methods-guide#klarna',
      category: BUY_NOW_PAY_LATER,
    },
    {
      path: <Boleto />,
      name: 'Boleto',
      docs: 'https://stripe.com/docs/payments/boleto',
      fact_sheet: 'https://stripe.com/payments/payment-methods-guide#boleto',
      category: VOUCHERS,
    },
    {
      path: <Oxxo />,
      name: 'OXXO',
      docs: 'https://stripe.com/docs/payments/oxxo',
      fact_sheet: 'https://stripe.com/payments/payment-methods-guide#oxxo',
      category: VOUCHERS,
    },
    {
      path: <Konbini />,
      name: 'Konbini',
      docs: 'https://stripe.com/docs/payments/konbini',
      fact_sheet: 'https://stripe.com/payments/payment-methods-guide',
      category: VOUCHERS,
    },
    {
      path: <Alipay />,
      name: 'Alipay',
      docs: 'https://stripe.com/docs/payments/alipay',
      fact_sheet: 'https://stripe.com/payments/payment-methods-guide#alipay',
      category: WALLETS,
    },
    {
      path: <ApplePay />,
      name: 'Apple Pay',
      docs: 'https://stripe.com/docs/apple-pay',
      fact_sheet: 'https://stripe.com/payments/payment-methods-guide#apple-pay',
      category: WALLETS,
    },
    {
      path: <GooglePay />,
      name: 'Google Pay',
      docs: 'https://stripe.com/docs/google-pay',
      fact_sheet:
        'https://stripe.com/payments/payment-methods-guide#google-pay',
      category: WALLETS,
    },
    {
      path: <GrabPay />,
      name: 'GrabPay',
      docs: 'https://stripe.com/docs/payments/grabpay',
      fact_sheet: '',
      category: WALLETS,
    },
    {
      path: <GooglePay />,
      name: 'Microsoft Pay',
      docs: 'https://stripe.com/docs/microsoft-pay',
      fact_sheet:
        'https://stripe.com/payments/payment-methods-guide#secure-microsoft-pay',
      category: WALLETS,
    },
    {
      path: <WeChatPay />,
      name: 'WeChat Pay',
      docs: 'https://stripe.com/docs/sources/wechat-pay',
      fact_sheet:
        'https://stripe.com/payments/payment-methods-guide#wechat-pay',
      category: WALLETS,
    },
  ];

  const [categorySeleted, setCategorySelected] = useState(categories[0]);
  const [showCategories, setShowCategories] = useState(false);
  const [banksList, setBanksList] = useState(
    paymentMethods.filter(
      (payment) => payment.category === categorySeleted.name,
    ),
  );
  const [selectedBank, setSelectedBank] = useState(banksList[0]);
  const [showBanks, setShowBanks] = useState(false);

  useEffect(() => {
    setBanksList(
      paymentMethods.filter(
        (payment) => payment.category === categorySeleted.name,
      ),
    );
    setSelectedBank(banksList[0]);
  }, [categorySeleted.name]);

  return (
    <div className="payment-element-container">
      <div
        className="payment-element-selected-category-wrapper"
        onClick={() => {
          setShowCategories(!showCategories);
          setShowBanks(false);
        }}
      >
        <h3>{categorySeleted.name}</h3>
        <div className="arrow-down-wrapper">
          <AiOutlineDown
            className={
              showCategories ? 'currency-arrow-turned' : 'currency-arrow'
            }
            color="#707070"
          />
        </div>
        {showCategories ? (
          <ul className="payment-element-categories-wrapper">
            {categories.map((category) => (
              <div
                key={category.name}
                className={
                    category.name === categorySeleted.name
                      ? 'payment-element-category-wrapp payment-selected-category-in-list'
                      : 'payment-element-category-wrapp'
                  }
                onClick={() => {
                  setCategorySelected(category);
                  setShowCategories(false);
                  setShowBanks(false);
                }}
              >
                <div>{category.logo}</div>
                <h3>{category.name}</h3>
              </div>
            ))}
          </ul>
        ) : (
          <></>
        )}
      </div>

      <div
        className="payment-element-selected-category-wrapper"
        onClick={() => {
          setShowBanks(!showBanks);
          setShowCategories(false);
        }}
      >
        <h3>{selectedBank.name}</h3>
        <div className="arrow-down-wrapper">
          <AiOutlineDown
            className={showBanks ? 'currency-arrow-turned' : 'currency-arrow'}
            color="#707070"
          />
        </div>
        {showBanks ? (
          <ul className="payment-element-categories-wrapper">
            {banksList.map((bank) => (
              <div
                key={bank.name}
                className={
                    bank.name === selectedBank.name
                      ? 'payment-element-category-wrapp payment-selected-category-in-list'
                      : 'payment-element-category-wrapp'
                  }
                onClick={() => {
                  setSelectedBank(bank);
                  setShowBanks(false);
                  setShowCategories(false);
                }}
              >
                <h3>{bank.name}</h3>
              </div>
            ))}
          </ul>
        ) : (
          <></>
        )}
      </div>
      <div className="selected-bank-container">{selectedBank.path}</div>
    </div>
  );
};

export default PaymentElement;
