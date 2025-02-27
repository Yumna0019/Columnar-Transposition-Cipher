import React, { useState } from "react";
import "./ColumnarTranspoCipher.css";

const ColumnarTranspoCipher = () => {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");

  const encryptMessage = (msg, key) => {
    let cipher = "";
    let k_indx = 0;
    const msg_lst = msg.replace(/\s/g, "").split(""); // Ignore spaces
    const key_lst = key.split("").sort();
    const col = key.length;
    const row = Math.ceil(msg_lst.length / col);
    const fill_null = row * col - msg_lst.length;
    for (let i = 0; i < fill_null; i++) {
      msg_lst.push("_");
    }
    const matrix = [];
    for (let i = 0; i < msg_lst.length; i += col) {
      matrix.push(msg_lst.slice(i, i + col));
    }
    for (let _ = 0; _ < col; _++) {
      const curr_idx = key.indexOf(key_lst[k_indx]);
      for (const row of matrix) {
        cipher += row[curr_idx];
      }
      k_indx++;
    }
    return cipher;
  };

  const decryptMessage = (cipher, key) => {
    let msg = "";
    let k_indx = 0;
    let msg_indx = 0;
    const msg_lst = cipher.split("");
    const col = key.length;
    const row = Math.ceil(cipher.length / col);
    const key_lst = key.split("").sort();
    const dec_cipher = Array.from({ length: row }, () => Array(col).fill(null));
    for (let _ = 0; _ < col; _++) {
      const curr_idx = key.indexOf(key_lst[k_indx]);
      for (let j = 0; j < row; j++) {
        dec_cipher[j][curr_idx] = msg_lst[msg_indx];
        msg_indx++;
      }
      k_indx++;
    }
    msg = dec_cipher.flat().join("");
    return msg.replace(/_/g, "");
  };

  return (
    <div className="cipher-container">
      <h2>Columnar Transposition Cipher</h2>
      <textarea
        placeholder="Enter text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <input
        type="text"
        placeholder="Enter key..."
        value={key}
        onChange={(e) => setKey(e.target.value)}
        required
      />
      <div className="button-group">
        <button onClick={() => setResult(encryptMessage(text, key))}>Encode</button>
        <button onClick={() => setResult(decryptMessage(text, key))}>Decode</button>
      </div>
      {result && (
        <div className="output">
          <h3>Result:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default ColumnarTranspoCipher;
