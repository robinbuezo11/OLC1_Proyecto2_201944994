import './App.css';
import  { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
function App() {
  const [code, setCode] = useState('');
  const [resultado, setResultado] = useState('');
  function analizar(){
    axios.post('http://localhost:5000/analyzer', {
      input: code
    })
    .then(function (response) {
      console.log(response);
      setResultado(response.data.result);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  function graphAST(){
    axios.get('http://localhost:5000/graphAST');
  }
  return (
    <div className="App">
      <header className="App-header">
      <div className='editores' >
        <div className='containerE'>
          <div className="editor1">
            <MonacoEditor
              width="700"
              height="600"
              language="javascript"
              theme="vs-dark"
              value={code}
              options={{ minimap: { enabled: false } }}
              onChange={setCode}
            />
          </div>
          <div className="editor2">
            <MonacoEditor
              width="700"
              height="600"
              language="javascript"
              theme="vs-dark"
              value={resultado}
              options={{ readOnly: true }}
            />
          </div>
        </div>
          <div>
            <Button variant="primary" classname="boton" onClick={()=>{analizar()} }>Analizar</Button>
          </div>
          <div>
            <Button variant="primary" classname="boton" onClick={()=>{graphAST()}}>Generar AST</Button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;