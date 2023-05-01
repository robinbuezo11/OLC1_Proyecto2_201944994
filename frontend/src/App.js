import './App.css';
import  { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
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
      <Navbar bg="secondary" variant='dark' id='nav'>
      <Container id='nav'>
        <Nav className="me-auto">
          <NavDropdown className='navitm' title="Archivo" id="basic-nav-dropdown">
            <NavDropdown.Item >Crear</NavDropdown.Item>
            <NavDropdown.Item >Abrir</NavDropdown.Item>
            <NavDropdown.Item >Guardar</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown className='navitm' title="Reportes" id="basic-nav-dropdown">
            <NavDropdown.Item  onClick={()=>{graphAST()}}>Árbol AST</NavDropdown.Item>
            <NavDropdown.Item >Tabla de Símbolos</NavDropdown.Item>
            <NavDropdown.Item >Tabla de Errores</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link className='navitm' onClick={()=>{analizar()} }>Ejecutar</Nav.Link>
        </Nav>
      </Container>
      </Navbar>
      </header>
      <body className='Content'>
        <div className='editores' >
          <div className='containerE'>
            <div className="editor1">
              <MonacoEditor
                language="javascript"
                theme="vs-dark"
                value={code}
                options={{ minimap: { enabled: false } }}
                onChange={setCode}
              />
            </div>
            <div className="editor2">
              <MonacoEditor
                language="javascript"
                theme="vs-dark"
                value={resultado}
                options={{ readOnly: true, minimap: { enabled: false } }}
              />
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;