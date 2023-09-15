'use client';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import { Layout } from '@/components';

import axios, { AxiosResponse } from 'axios';

axios.defaults.withCredentials = true;

interface UserModel {
  username: string;
  first_name: string;
  last_name: string;
  competence: string;
}

export default function Results() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('s')!;
  const [users, setUsers] = useState<UserModel[]>([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        'http://localhost:8000/user/profile/getall'
      );

      if (response.status === 200) {
        const data = response.data;

        const formattedData = data.map((item: UserModel) => ({
          username: item.username,
          first_name: item.first_name,
          last_name: item.last_name,
          competence: item.competence
        }));

        const filteredUsers = formattedData.filter(
          (item: UserModel) =>
            item.competence.toLowerCase() === searchQuery.toLowerCase()
        );

        setUsers(filteredUsers);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col h-screen w-full items-center justify-center">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Nome</th>
              <th>Usuário</th>
              <th>Competência</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{`${user.first_name} ${user.last_name}`}</td>
                <td>@{user.username}</td>
                <td>{user.competence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
