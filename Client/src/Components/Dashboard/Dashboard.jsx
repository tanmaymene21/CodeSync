import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useAuth0 } from '@auth0/auth0-react';

const truncateCode = (code, maxLength = 40) => {
  return code.length > maxLength ? `${code.slice(0, maxLength)}...` : code;
};

const api_url = import.meta.env.VITE_API_URL;

const PlusIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 5V19M5 12H19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Dashboard = () => {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    user,
    getAccessTokenSilently,
  } = useAuth0();
  const [snippets, setSnippets] = useState([]);
  const [collabs, setCollabs] = useState([]);
  const navigate = useNavigate();
  const socketRef = useRef(null);

  useEffect(() => {
    const fetchSnippets = async () => {
      if (!isAuthenticated) return;
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${api_url}/api/snippets`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch snippets');
        }

        const snippetsData = await response.json();
        setSnippets(snippetsData);
      } catch (error) {
        console.error('Error fetching snippets:', error);
      }
    };

    fetchSnippets();
  }, [getAccessTokenSilently, isAuthenticated]);

  useEffect(() => {
    const fetchCollabs = async () => {
      if (!isAuthenticated) return;
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${api_url}/api/collabs`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch collabs');
        }

        const collabsData = await response.json();
        setCollabs(collabsData);
      } catch (error) {
        console.error('Error fetching collabs:', error);
      }
    };

    fetchCollabs();
  }, [getAccessTokenSilently, isAuthenticated]);

  const sendData = (collab) => {
    socketRef.current = io(`${api_url}/`);
    socketRef.current.emit('joinRoom', {
      roomId: collab._id,
      username: user?.name || 'Anonymous',
    });

    navigate(`/collab/${collab._id}`);

    return () => {
      socketRef.current.disconnect();
    };
  };

  const createEmptyCollab = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${api_url}/api/collabs`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to create collab');
      }

      const collab = await response.json();
      console.log('Empty Collab created:', collab);
      sendData(collab);
    } catch (error) {
      console.error('Error creating collab:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[100vh] bg-black text-white py-36 flex justify-center items-center">
        <button
          onClick={() => loginWithRedirect()}
          className="bg-blue-500 px-4 py-2 rounded text-white"
        >
          Login to access Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[100vh] bg-black text-white py-36">
      <div className="flex gap-3 justify-center px-5">
        <div className="border-r-2 border-white/60 px-5">
          <div className="flex flex-col mb-6 ml-2">
            <span className="text-2xl font-semibold">Recent...</span>
            <span className="text-md text-gray-300/75">
              View & edit your most recent snippets
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {snippets.length > 0 ? (
              snippets.map((snippet) => (
                <Link
                  key={snippet._id}
                  to={`/snippet/${snippet._id}`}
                  className={`bg-gradient-to-r ${snippet.gradient} p-2 text-white rounded-lg hover:scale-105 transition-all duration-300 min-h-[160px]`}
                  style={{ width: '100%', maxWidth: '250px' }}
                >
                  <div className="bg-[#1e1e1e] rounded-lg min-h-[100%]">
                    <div className="border-b-2 border-white/20 px-3 py-2 text-sm text-gray-300 font-semibold">
                      {snippet.name}
                    </div>
                    <div className="p-3">
                      <pre className="text-xs text-white/70 break-words whitespace-pre-wrap">
                        {truncateCode(snippet.code)}
                      </pre>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-300 col-span-full">
                No snippets available
              </p>
            )}
            <Link
              className="bg-[#333] text-white rounded-lg shadow-secondary-1 hover:scale-105 transition-all duration-300 flex justify-center items-center p-4"
              to={'/snippet'}
              style={{ width: '100%', maxWidth: '250px' }}
            >
              <PlusIcon />
              <span className="ml-2">Create New</span>
            </Link>
          </div>
        </div>
        <div className="px-5">
          <div className="flex flex-col mb-6 ml-2">
            <span className="text-2xl font-semibold">Collaborations</span>
            <span className="text-md text-gray-300/75">
              Collaborate with others
            </span>
          </div>
          <div className="">
            <button
              className="bg-[#333] text-white rounded-lg hover:scale-105 transition-all duration-300 flex justify-center items-center p-4"
              onClick={createEmptyCollab}
            >
              Join new Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
