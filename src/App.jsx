import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './pages/Navbar/navbar';
import HeroSection from './pages/Hero-section/hero';
import RegisterUser from './pages/Registration/RegisterUser';
import ProfileUpdate from './components/Previews/ProfileUpdate';
import SignIn from './pages/Login/SignIn';
import { QueryClient, QueryClientProvider } from 'react-query';
import BlogListings from './pages/Blog/BlogListings';
import WritePage from './pages/Write/WritePage';
import BlogPage from './pages/Blog Page/BlogPage';
import EditBlog from './pages/EditPage/EditBlog';
import FullBlog from './pages/FullBlog/FullBlog';
import BlogPreview from './components/Previews/BlogPreview';
import PersonalBlogPreview from './components/Previews/PersonalBlogPreview';
import PersonalBlogsPreview from './components/Previews/PersonalBlogsPreview';
import Profile from './pages/Profile Page/Profile'
import UpdatePersonaInformation from './components/Previews/UpdatePersonaInformation';
import UpdatePassword from './components/Previews/UpdatePassword';
import './App.css';

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

function Main() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/BlogListings' && 
       location.pathname !== '/WritePage' && 
       !location.pathname.startsWith('/blogs/') &&
       location.pathname !== '/BlogPage' && 
       location.pathname !== '/Profile' && 
       !location.pathname.startsWith('/EditBlog') &&  
       !location.pathname.startsWith('/PersonalBlogPreview') && <Navbar />}
       
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/RegisterUser" element={<RegisterUser />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/blogs/:id" element={<FullBlog />} />
        <Route path="/BlogListings" element={<BlogListings />} />
        <Route path="/WritePage" element={<WritePage />} />
        <Route path="/BlogPage" element={<BlogPage />} />
        <Route path="/EditBlog/:blogId" element={<EditBlog />} />
        <Route path="/BlogPreview" element={<BlogPreview />} />
        <Route path="/PersonalBlogPreview" element={<PersonalBlogPreview />} />
        <Route path="/PersonalBlogsPreview" element={<PersonalBlogsPreview />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/UpdatePersonaInformation/:userId" element={<UpdatePersonaInformation />} />
        <Route path="/UpdatePassword/:userId" element={<UpdatePassword />} />
        <Route path="/ProfileUpdate" element={<ProfileUpdate/>} />
      </Routes>
    </>
  );
}

export default App;
