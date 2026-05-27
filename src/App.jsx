import "./App.css";
import {SunIcon, MoonIcon} from "@heroicons/react/24/outline";
import {useEffect, useState, useRef} from "react";
import {QRCodeCanvas} from "qrcode.react";

export default function App() {

  const [url, setUrl] = useState("");
  const qrRef = useRef(null);

  const [isDark, setIsDark] = useState(() => {
    const dark = JSON.parse(localStorage.getItem("isDark"));
    if(dark) return dark;

  });

  function themeChange(){
    setIsDark(!isDark);
    localStorage.setItem("isDark", JSON.stringify(isDark));
  }

  useEffect(() => {
    if(isDark){
      document.documentElement.setAttribute("data-theme", "dark");
    }else{
      document.documentElement.removeAttribute("data-theme");
    }
  }, [isDark]);

  function createCode(){
    return <QRCodeCanvas value={url} size={256} level="H" />
  }

  function download(e){
    e.preventDefault();
    const canvas = qrRef.current.querySelector("canvas");
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.target= "_blank";
    link.download = "qrcode.png";
    link.click();
  };

  return (
    <div>

      <nav>
        <span className="qurl-logo">
          <span style={{color: "blue"}}>q</span>url
        </span>

        <span className="theme-icons" onClick={themeChange}>
          { isDark ? <SunIcon className="icons"/> : <MoonIcon className="icons"/> }
        </span>
      </nav>

      <main>

        <h1>Enter some text or a url to generate a QR Code</h1>

        <form className="form">
          <input type="text" onChange={(e) => setUrl(e.target.value)} required />
        </form>

        <div className="qrcode-display-area" ref={qrRef}>
            {createCode()} && <button className="download-btn" onClick={download}>Download</button>
        </div>
      </main>

    </div>
  )
}
