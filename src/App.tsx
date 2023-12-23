import Layout from './components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home/Home';
import AddContact from './containers/AddContact/AddContact';
import EditContact from './containers/EditContact/EditContact';

function App() {
  
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/new-contact" element={<AddContact/>}/>
          <Route path="/contacts/:id/edit" element={<EditContact/>}/>
          <Route path="*" element={<h2>Page not found</h2>}/>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
