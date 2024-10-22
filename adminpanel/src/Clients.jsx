import React, { useEffect, useState } from 'react';
import './Users.css';
import axiosInstance from './Axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Clients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axiosInstance.get('/Client/getClientList');
        console.log('Client List:', response.data);

        setClients(response.data.clientList);

      
      } catch (error) {
        console.error('Error fetching client list:', error);
        toast.error('An error occurred while fetching the client list.');
      }
    };

    fetchClients();
  }, []);

  const changeClientStatus = async (clientId, statusId) => {
    try {
      const newStatusId = statusId === 'Active' ? 0 : 1;
      const response = await axiosInstance.get(`/Client/changeClientStatusFromAdmin`, {
        params: {
          clientId: clientId,
          statusId: newStatusId,
        },
      });
        console.log('aa',response.data)
      if (response.data.success) {
        console.log('test')
        toast.success(response.data.message || 'Status changed successfully.');
        setTimeout(() => {
          window.location.reload();
        }, 1000); 
      } else {
        toast.error(response.data.message || 'Failed to change status.');
      }
    } catch (error) {
      console.error('Error changing client status:', error);
      toast.error('An error occurred while changing client status.');
    }
  };

  return (
    <>
      <main className='main-container'>
      <ToastContainer />
        <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
          <div className="flex items-center justify-between pb-6">
            <div>
              <h2 className="font-semibold text-gray-700">Latest Clients</h2>
            </div>
          </div>
          <div className="overflow-y-hidden rounded-lg border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ background: '#f1eee4' }} className="text-left text-xs font-semibold uppercase tracking-widest text-white">
                    <th className="px-5 py-3 text-gray-500">Client Name</th>
                    <th className="px-5 py-3 text-gray-500">Client Last Name</th>
                    <th className="px-5 py-3 text-gray-500">Email</th>
                    <th className="px-5 py-3 text-gray-500">Address</th>
                    <th className="px-5 py-3 text-gray-500">Gender</th>
                    <th className="px-5 py-3 text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody className="text-gray-500">
                  {clients.map((client) => (
                    <tr key={client.id}>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img className="h-full w-full rounded-full" src={`https://localhost:44340/${client.photo}`} alt="" />
                          </div>
                          <div className="ml-3">
                            <p className="whitespace-no-wrap">{client.clientName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{client.clientLastName}</p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{client.email}</p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{client.address}</p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{client.gender}</p>
                      </td>

                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <div>
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${client.statusId === 'Active' ? 'bg-green-200 text-green-900' : 'bg-red-200 text-red-900'}`}>
                            {client.statusId}
                          </span>
                          <div>
                            <button
                              style={{
                                marginTop: '5px',
                                backgroundColor: client.statusId === 'Active' ? '#EA5B60' : '#20C073',
                                color: 'white',
                                borderRadius: '5px',
                                padding: '2px 2px',
                                cursor: 'pointer',
                                fontSize: '10px',
                              }}
                              onClick={() => changeClientStatus(client.id, client.statusId)}
                            >
                              {client.statusId === 'Active' ? 'Make Client passive' : 'Make Client active'}
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Clients;
