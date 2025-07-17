import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useState } from 'react';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [filterRole, setFilterRole] = useState('');
  
  const { data: users = [], refetch } = useQuery({
    queryKey: ['users', filterRole],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users${filterRole ? `?role=${filterRole}` : ''}`);
      return res.data;
    },
  });

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axiosSecure.patch(`/users/${userId}`, { role: newRole });
      Swal.fire('Success!', 'Role updated', 'success');
      refetch();
    } catch (err) {
      Swal.fire('Error', 'Could not update role', 'error');
    }
  };

  const handleDelete = async (userId) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/users/${userId}`);
      Swal.fire('Deleted!', 'User has been deleted.', 'success');
      refetch();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Users</h2>
        <select
          className="border px-3 py-1 rounded text-gray-700"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">#</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-2">{idx + 1}</td>
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="border rounded px-2 py-1 cursor-pointer"
                  >
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-5 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
