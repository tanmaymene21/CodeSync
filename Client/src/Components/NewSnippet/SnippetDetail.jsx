import React, { useRef, useState, useEffect } from 'react';
import * as htmlToImage from 'html-to-image';
import CodeMirror from '@uiw/react-codemirror';
import {
  abcdef,
  abyss,
  androidstudio,
  atomone,
  aura,
  bbedit,
  bespin,
  darcula,
  dracula,
  duotoneDark,
  duotoneLight,
  eclipse,
  githubDark,
  githubLight,
  gruvboxDark,
  gruvboxLight,
  kimbie,
  material,
  materialDark,
  materialLight,
  monokai,
  monokaiDimmed,
  noctisLilac,
  nord,
  okaidia,
  quietlight,
  red,
  solarizedDark,
  solarizedLight,
  sublime,
  tokyoNight,
  tokyoNightDay,
  tokyoNightStorm,
  tomorrowNightBlue,
  vscodeDark,
  vscodeLight,
  xcodeDark,
  xcodeLight,
} from '@uiw/codemirror-themes-all';

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
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';

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

const gradients = [
  'from-rose-400 via-red-500 to-yellow-400',
  'from-indigo-800 via-purple-700 to-pink-600',
  'from-teal-400 via-emerald-500 to-lime-600',
  'from-amber-400 via-orange-500 to-rose-600',
  'from-gray-900 via-neutral-600 to-gray-100',
  'from-fuchsia-600 via-purple-600 to-indigo-600',
  'from-sky-300 via-cyan-400 to-emerald-500',
  'from-amber-200 via-yellow-400 to-lime-500',
];

const themeMap = {
  abcdef,
  abyss,
  androidstudio,
  atomone,
  aura,
  bbedit,
  bespin,
  darcula,
  dracula,
  duotoneDark,
  duotoneLight,
  eclipse,
  githubDark,
  githubLight,
  gruvboxDark,
  gruvboxLight,
  kimbie,
  material,
  materialDark,
  materialLight,
  monokai,
  monokaiDimmed,
  noctisLilac,
  nord,
  okaidia,
  quietlight,
  red,
  solarizedDark,
  solarizedLight,
  sublime,
  tokyoNight,
  tokyoNightDay,
  tokyoNightStorm,
  tomorrowNightBlue,
  vscodeDark,
  vscodeLight,
  xcodeDark,
  xcodeLight,
};

const themes = Object.keys(themeMap);

const themeBackgroundColors = {
  abcdef: '#f0f0f0',
  abyss: '#1b1b1b',
  androidstudio: '#282b2e',
  atomone: '#282c34',
  aura: '#1c1f24',
  bbedit: '#3c4c57',
  bespin: '#28211c',
  darcula: '#2b2b2b',
  dracula: '#282a36',
  duotoneDark: '#2a2734',
  duotoneLight: '#faf8f5',
  eclipse: '#3b3b3b',
  githubDark: '#24292e',
  githubLight: '#ffffff',
  gruvboxDark: '#282828',
  gruvboxLight: '#fbf1c7',
  kimbie: '#221a0f',
  material: '#263238',
  materialDark: '#212121',
  materialLight: '#eeeeee',
  monokai: '#272822',
  monokaiDimmed: '#272822',
  noctisLilac: '#21212d',
  nord: '#2e3440',
  okaidia: '#272822',
  quietlight: '#f5f5f5',
  red: '#ff3e3e',
  solarizedDark: '#002b36',
  solarizedLight: '#fdf6e3',
  sublime: '#282c34',
  tokyoNight: '#1a1b26',
  tokyoNightDay: '#d5d6db',
  tokyoNightStorm: '#24283b',
  tomorrowNightBlue: '#002451',
  vscodeDark: '#1e1e1e',
  vscodeLight: '#ffffff',
  xcodeDark: '#1d1d1f',
  xcodeLight: '#f0f0f0',
};

const SnippetDetail = () => {
  const { id } = useParams();
  const finalSnippetRef = useRef();
  const [snippetName, setSnippetName] = useState();
  const [code, setCode] = useState();
  const [fontSize, setFontSize] = useState(16);
  const [selectedLanguage, setSelectedLanguage] = useState(
    languages[0].extension,
  );
  const [selectedTheme, setSelectedTheme] = useState();
  const [selectedGradient, setSelectedGradient] = useState();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(
          `http://localhost:3000/api/snippets/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error('Failed to fetch snippet');
        }

        const snippetData = await response.json();
        setSnippetName(snippetData.name);
        setCode(snippetData.code);
        setSelectedTheme(snippetData.theme);
        console.log(snippetData);
        setSelectedLanguage(
          languages.find((lang) => lang.name === snippetData.language)
            .extension,
        );
        setSelectedGradient(snippetData.gradient);
      } catch (error) {
        console.error('Error fetching snippet:', error);
      }
    };

    fetchSnippet();
  }, [id, getAccessTokenSilently]);

  const handleFontSizeChange = (size) => {
    setFontSize(size);
  };

  const handleExport = () => {
    if (finalSnippetRef.current) {
      htmlToImage
        .toPng(finalSnippetRef.current)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `${snippetName}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error('Failed to export image:', error);
        });
    }
  };

  const handleSave = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`http://localhost:3000/api/snippets/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: snippetName,
          code,
          theme: selectedTheme,
          language: languages.find(
            (lang) => lang.extension === selectedLanguage,
          ).name,
          gradient: selectedGradient,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save snippet');
      }

      console.log('Snippet saved successfully');
    } catch (error) {
      console.error('Error saving snippet:', error);
    }
  };

  const handleSnippetName = (e) => {
    setSnippetName(e.target.value);
  };

  const handleCodeChange = (value) => {
    setCode(value);
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(
      languages.find((lang) => lang.name === e.target.value).extension,
    );
  };

  const handleThemeChange = (e) => {
    setSelectedTheme(e.target.value);
  };

  return (
    <div className="min-h-screen bg-[#000000f5] p-4 px-16 pt-32 text-white relative overflow-hidden">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-auto bg-[#191919] flex items-center justify-between mb-5 space-x-2 border border-white/20 rounded-lg p-2">
          <div className="pr-2 border-r-2 border-white/40">
            <div className="flex w-full space-x-4">
              <div className="flex items-center">
                {/* Language Selector */}
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
                {/* Theme Selector */}
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
              <div className="flex items-center justify-center border border-white/20 rounded-md px-3">
                {gradients.map((gradient, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedGradient(gradient)}
                    className={`rounded-full bg-gradient-to-br ${gradient} ${
                      selectedGradient === gradient ? 'border-2' : ''
                    }`}
                    style={{
                      width: '25px',
                      height: '25px',
                      marginRight: '-5px',
                    }}
                  ></button>
                ))}
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
          </div>
          <div className="flex space-x-4">
            <button
              className="flex h-[40px] items-center px-[16px] border-none rounded-[6px] bg-[rgba(106,255,138,0.2)] text-[#8be786] cursor-pointer text-[16px] font-medium transition-transform ease-in-out duration-100 hover:bg-[rgba(106,255,138,0.26)]"
              style={{
                gap: '8px',
                letterSpacing: '0.1px',
                transition: 'background-color 0.2s ease, transform 0.1s ease',
              }}
              onClick={handleSave}
            >
              Save
            </button>

            <button
              className="flex h-[40px] items-center px-[16px] border-none rounded-[6px] bg-[rgba(255,99,99,0.15)] hover:bg-[rgba(255,99,99,0.24)] text-[#ff6363] cursor-pointer text-[16px] font-medium"
              style={{
                gap: '8px',
                letterSpacing: '0.1px',
                transition: 'background-color 0.2s ease, transform 0.1s ease',
              }}
              onClick={handleExport}
            >
              Export
            </button>
          </div>
        </div>

        <div className="min-w-[800px] p-10 pt-6 pr-6">
          <div
            className={`FINALSNIPPET bg-gradient-to-br ${selectedGradient} rounded-lg p-6 w-full`}
            ref={finalSnippetRef}
          >
            <div
              className="CODE text-white p-4 pt-2 rounded-lg min-h-80"
              style={{
                backgroundColor: themeBackgroundColors[selectedTheme],
              }}
            >
              <div className="flex">
                <div className="p-2 text-nowrap">
                  <span className="inline-block w-4 h-4 bg-red-500 rounded-full"></span>
                  <span className="inline-block w-4 h-4 bg-yellow-500 rounded-full ml-2"></span>
                  <span className="inline-block w-4 h-4 bg-green-500 rounded-full ml-2"></span>
                </div>
                <div className="flex items-center justify-center w-full">
                  <input
                    className="text-md text-gray-400 font-semibold bg-transparent text-center focus:outline-none placeholder:font-semibold placeholder-gray-500 placeholder-opacity-100 focus:placeholder-opacity-0 transition-opacity ease-in-out duration-700"
                    placeholder="untitled-1"
                    onChange={handleSnippetName}
                  />
                </div>
              </div>
              <CodeMirror
                value={code}
                height=""
                theme={themeMap[selectedTheme]}
                extensions={[selectedLanguage]}
                onChange={(value) => handleCodeChange(value)}
                className={`text-${fontSize}px`} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnippetDetail;
