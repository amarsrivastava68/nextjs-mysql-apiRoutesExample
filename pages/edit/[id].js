import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function EditUser() {
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState({
    name: '',
    email: '',
    hobbies: '',
    fathersName: '',
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`/api/getUser?id=${id}`);
        const data = await response.json();
        setUser(data[0]);
      } catch (error) {
        console.error('Error getting user:', error);
      }
    };

    if (id) {
      getUser();
    }
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/updateUser?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        console.log('User updated successfully');
        // Additional logic if needed
        router.push('/users');
      } else {
        console.error('Error updating user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-4">Edit User</h1>
      <form onSubmit={handleUpdate} className="form-container">
        {/* ... (existing form fields) */}
        <button type="submit" className="bg-green-500 text-white p-2 rounded-md hover:bg-green-700">
          Update
        </button>
      </form>
    </div>
  );
}