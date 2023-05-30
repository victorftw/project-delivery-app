import React, { useState, useEffect, useContext } from 'react';
import Context from '../../contextAPI/context';

const resolveError = 1;
const type = 'application/json';

function Users() {
  const { newUserRegisterByAdmin } = useContext(Context);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user'));
    const { token } = data;
    async function fetchUsers() {
      const response = await fetch('http://localhost:3001/user', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': type,
          Authorization: token,
        },
      });
      setUsers(await response.json());
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user'));
    const { token } = data;
    async function fetchUsers() {
      if (newUserRegisterByAdmin) {
        const response = await fetch('http://localhost:3001/user', {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': type,
            Authorization: token,
          },
        });
        setUsers(await response.json());
      }
    }

    fetchUsers();
  }, [newUserRegisterByAdmin]);

  const handleDeleteUser = async (id) => {
    const adminData = JSON.parse(localStorage.getItem('user'));
    const { token } = adminData;
    await fetch(`http://localhost:3001/admin/delete/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': type,
        Authorization: token,
      },
    });
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <div
      data-testid="customer_element-order-table"
    >
      <div>
        <h3>Lista de usuários</h3>
        <table className="table-users">
          <thead>
            <tr>
              {resolveError && (
                <>
                  <th>Item</th>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Tipo</th>
                  <th>Excluir</th>
                </>
              )}
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={ index + 1 }
              >
                <td
                  className="table-id"
                  data-testid={ `admin_manage__element-user-table-item-number-${index}` }
                >
                  { index + 1 }
                </td>
                <td
                  className="table-name"
                  data-testid={ `admin_manage__element-user-table-name-${index}` }
                >
                  { user.name }
                </td>
                <td
                  className="table-email"
                  data-testid={ `admin_manage__element-user-table-email-${index}` }
                >
                  { user.email }
                </td>
                <td
                  className="table-role"
                  data-testid={ `admin_manage__element-user-table-role-${index}` }
                >
                  { user.role }
                </td>
                <td
                  className="table-remove"
                  data-testid={ `admin_manage__element-user-table-remove-${index}` }
                >
                  <button
                    style={ { backgroundColor: 'transparent',
                      border: 'none',
                      color: 'white' } }
                    type="button"
                    onClick={ () => handleDeleteUser(user.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
