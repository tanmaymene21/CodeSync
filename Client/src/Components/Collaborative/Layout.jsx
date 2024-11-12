import React, { useState, useEffect, useRef } from 'react';
import { Profile } from '../Navbar/Profile';
import CodeMirror from '@uiw/react-codemirror';
import {
  githubDark,
  githubLight,
  vscodeDark,
  vscodeLight,
} from '@uiw/codemirror-themes-all';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { markdown } from '@codemirror/lang-markdown';
import { sql } from '@codemirror/lang-sql';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { php } from '@codemirror/lang-php';
import { rust } from '@codemirror/lang-rust';
import { xml } from '@codemirror/lang-xml';
import { yaml } from '@codemirror/lang-yaml';
import { json } from '@codemirror/lang-json';
import { io } from 'socket.io-client';
import logo from '../../assets';

const languages = [
  { name: 'JavaScript', extension: javascript() },
  { name: 'Python', extension: python() },
  { name: 'HTML', extension: html() },
  { name: 'CSS', extension: css() },
  { name: 'Markdown', extension: markdown() },
  { name: 'SQL', extension: sql() },
  { name: 'Java', extension: java() },
  { name: 'C++', extension: cpp() },
  { name: 'PHP', extension: php() },
  { name: 'Rust', extension: rust() },
  { name: 'XML', extension: xml() },
  { name: 'YAML', extension: yaml() },
  { name: 'JSON', extension: json() },
];

const themeMap = {
  githubDark,
  githubLight,
  vscodeDark,
  vscodeLight,
};

const themes = Object.keys(themeMap);

const Layout = () => {
  const [collabName, setCollabName] = useState('Untitled');
  const [selectedLanguage, setSelectedLanguage] = useState(
    languages[0].extension,
  );
  const [selectedTheme, setSelectedTheme] = useState('githubDark');
  const [fontSize, setFontSize] = useState(16);
  const [code, setCode] = useState('// Start coding...');
  const [participants, setParticipants] = useState([]);

  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth0();

  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('https://codesync-server-zpyc.onrender.com/');

    socketRef.current.emit('joinRoom', {
      roomId,
      username: user?.name || 'Anonymous',
    });

    socketRef.current.on('participantsUpdate', (participants) => {
      setParticipants(participants);
    });

    socketRef.current.on('codeUpdate', (newCode) => {
      setCode(newCode);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, user?.name]);

  const handleCollabName = (e) => setCollabName(e.target.value);
  const handleLanguageChange = (e) => {
    const selectedLang = languages.find((lang) => lang.name === e.target.value);
    setSelectedLanguage(selectedLang.extension);
  };
  const handleThemeChange = (e) => setSelectedTheme(e.target.value);
  const handleFontSizeChange = (size) => setFontSize(size);

  const handleCodeChange = (value) => {
    setCode(value);
    socketRef.current.emit('codeChange', { roomId, code: value });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Room link copied to clipboard!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <div className="py-4 px-5 w-full flex items-center justify-between border-b-2 border-white/20">
        <div className="flex space-x-4 items-center">
          <Link to={'/'} className="border-r-2 border-white/40 pr-3">
            <img src={logo} alt="" width="41px" height="41px" />
          </Link>
          <div>
            <input
              className="text-xl w-auto text-gray-400 font-semibold bg-transparent focus:outline-none placeholder:font-semibold placeholder-gray-500 placeholder-opacity-100 focus:placeholder-opacity-0 transition-opacity ease-in-out duration-700"
              placeholder="Untitled"
              value={collabName}
              onChange={handleCollabName}
            />
          </div>
        </div>
        <div>
          <Profile />
        </div>
      </div>
      <div className="flex flex-1">
        <div className="HELLO flex flex-col w-full border-r-2 border-white/20">
          <div className="flex w-full p-3 border-b-2">
            <div className="flex w-full space-x-4">
              <div className="flex items-center">
                <select
                  onChange={handleLanguageChange}
                  className="bg-transparent text-gray-300 p-2 rounded-md border border-white/20 focus:outline-none focus:ring-1 focus:ring-white/30 hover:border-white/30 transition ease-in-out duration-200 cursor-pointer"
                >
                  {languages.map((lang, index) => (
                    <option
                      key={index}
                      value={lang.name}
                      className="bg-[#191919] text-gray-300"
                    >
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center">
                <select
                  onChange={handleThemeChange}
                  className="bg-transparent text-gray-300 p-2 rounded-md border border-white/20 focus:outline-none focus:ring-1 focus:ring-white/30 hover:border-white/30 transition ease-in-out duration-200 cursor-pointer"
                >
                  {themes.map((theme, index) => (
                    <option
                      key={index}
                      value={theme}
                      className="bg-[#191919] text-gray-300"
                    >
                      {theme}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-center items-center space-x-3 border border-white/20 rounded-md px-3">
                {[16, 32, 48, 64].map((size) => (
                  <button
                    key={size}
                    className={`rounded-md hover:text-white transition-colors ease-in-out duration-200 text-sm focus:outline-none ${
                      fontSize === size ? 'text-white' : 'text-white/60'
                    }`}
                    onClick={() => handleFontSizeChange(size)}
                  >
                    {size}px
                  </button>
                ))}
              </div>
            </div>
            <div>
              <button
                className="flex h-[40px] items-center px-[16px] border-none rounded-[6px] bg-[rgba(106,131,255,0.3)] text-[#96aefc] cursor-pointer text-[16px] font-medium transition-transform ease-in-out duration-100 hover:bg-[rgba(106,131,255,0.4)]"
                style={{
                  gap: '8px',
                  letterSpacing: '0.1px',
                  transition: 'background-color 0.2s ease, transform 0.1s ease',
                }}
                onClick={handleShare}
              >
                Share
              </button>
            </div>
          </div>
          <div className="flex-1">
            <CodeMirror
              value={code}
              height="100%"
              theme={themeMap[selectedTheme]}
              extensions={[selectedLanguage]}
              className={`w-full h-full text-${fontSize}px`}
              onChange={handleCodeChange}
            />
          </div>
        </div>
        <div className="flex flex-col w-1/5">
          <div className="flex items-center justify-between p-3 border-b-2">
            <Link to={'/'}>
              <img src={logo} alt="" width="41px" height="41px" />
            </Link>
            <Link
              to={'/dashboard'}
              className="bg-transparent text-gray-300 p-2 hover:underline transition-all ease-in-out duration-200 cursor-pointer"
            >
              <span className="text-nowrap">My Documents</span>
            </Link>
          </div>
          <div className="p-3">
            <h3 className="text-lg font-semibold">Participants</h3>
            <ul>
              {participants.map((participant, key) => (
                <li key={key} className="text-gray-300">
                  {participant.username}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
