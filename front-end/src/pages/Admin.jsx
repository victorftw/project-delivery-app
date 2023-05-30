import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AdminNavbar from './components/AdminNavbar';
import Users from './components/Users';
import '../css/Admin.css';
import FormRegister from './components/FormRegister';

function Admin() {
  const { push } = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    const redirect = (us) => {
      if (us.role === 'customer') push('/customer/products');
      if (us.role === 'seller') push('/seller/orders');
      if (us.role === 'administrator') push('/admin/manage');
    };

    if (user?.email) {
      redirect(user);
    } else push('/login');
  }, [push]);

  return (
    <div>
      <div>
        <AdminNavbar />
      </div>

      <div className="container">
        <FormRegister />
        <Users />
      </div>
    </div>
  );
}

export default Admin;
