import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Capacity from '../products/attributes/capacity/Capacity';
import Material from '../products/attributes/material/Material';
import Size from '../products/attributes/size/Size';
import Color from '../products/attributes/colors/Color';
import Currency from '../currencies/Currency';
import Country from '../countries/Country';
import StoreCategoriesList from '../stores/store-categories-list/StoreCategoriesList';
import AdminHeader from '../AdminHeader';

const AdminRoutes = () => (
  <>
    <AdminHeader />
    <Routes>
      <Route path="admin/currency" element={(<Currency />)} />
      <Route path="admin/country" element={(<Country />)} />
      <Route path="admin/item/size" element={<Size />} />
      <Route path="admin/item/color" element={<Color />} />
      <Route path="admin/item/capacity" element={<Capacity />} />
      <Route path="admin/item/material" element={<Material />} />
      <Route path="admin/store/categories" element={<StoreCategoriesList />} />
    </Routes>
  </>

);

export default AdminRoutes;
