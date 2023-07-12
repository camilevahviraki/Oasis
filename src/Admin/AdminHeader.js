import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiColor } from 'react-icons/bi';
import { TbReportMoney } from 'react-icons/tb';
import { SlGraph } from 'react-icons/sl';
import { MdStorefront, MdClose } from 'react-icons/md';
import { ImLocation } from 'react-icons/im';
import { SiAdminer } from 'react-icons/si';
import { GrCapacity } from 'react-icons/gr';
import { GiMaterialsScience } from 'react-icons/gi';
import { RxSize } from 'react-icons/rx';
import './AdminHeader.css';

const AdminHeader = () => {
  const [showMenu, setShowMenu] = useState(false);

  const links = [
    { name: 'Currencies', icon: <TbReportMoney />, path: '../admin/currency' },
    { name: 'Countries', icon: <ImLocation />, path: '../admin/country' },
    { name: 'Store Types', icon: <MdStorefront />, path: '../admin/store/categories' },
    { name: 'Item color', icon: <BiColor />, path: '../admin/item/color' },
    { name: 'Item size', icon: <RxSize />, path: '../admin/item/size' },
    { name: 'Item material', icon: <GiMaterialsScience />, path: '../admin/item/material' },
    { name: 'Item capacity', icon: <GrCapacity />, path: '../admin/item/capacity' },
  ];
  const currenPath = window.location.pathname;
  return (
    <div>
      <button type="button" onClick={() => setShowMenu(!showMenu)} className="admin-hamburger-icon">
        {!showMenu
          ? (
            <>
              <SiAdminer className="user-Icon" />
              <span>App Administration</span>
            </>
          )
          : (
            <>
              <MdClose cclassName="user-Icon" />
              <span>Close menu</span>
            </>
          )}
      </button>

      {showMenu
        ? (
          <div className="insight-data-header header-menue">
            <div className="insight-data-header-store-desc">
              <h2 style={{ marginTop: '40px' }}>
                Administration
              </h2>
            </div>
            <div className="insight-data-header-links">
              {
                links.map((link) => (
                  <div
                    key={link.path}
                    style={{ padding: '0 10px' }}
                    className={currenPath.substring(1) !== link.path.replace(/(\.\.\/)/g, '')
                      ? 'insight-data-header-link-wrapper'
                      : 'insight-data-header-link-wrapper insight-data-link-active'}
                  >
                    <Link
                      className="insight-data-header-link"
                      to={link.path}
                      onClick={() => setShowMenu(false)}
                    >
                      {' '}
                      <span>{link.icon}</span>
                      {' '}
                      {link.name}
                    </Link>
                    {
                      currenPath.substring(1) === link.path.replace(/(\.\.\/)/g, '')
                        ? (<div className="insight-data-header-link-triangle-show" />) : (<></>)
                    }
                  </div>
                ))
              }
            </div>
          </div>
        )
        : (<></>)}
    </div>
  );
};

export default AdminHeader;
