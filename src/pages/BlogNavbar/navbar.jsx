// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import useUserStore from '../../store/useStore';
// import apiBase from '../../utils/apiBase';
// import './navbar.css';

// function Navbar() {
//     const navigate = useNavigate();
//     const setUser = useUserStore((state) => state.setUser);
//     const user = useUserStore((state)=> state.user);

//     async function handleLogout() {
//         localStorage.clear();
//         await fetch(`${apiBase}/user/logout`, {
//             method: "POST",
//             credentials: "include",
//         });
//         setUser(null);
//         navigate("/SignIn");
//     }

//     return (
//         <div className="navbar">
//             <div className="logo">
//                 <h3>BlogIt</h3>
//             </div>

//             <div className="nav-listings">
//                 <ul>
//                     <Link to="/BlogListings"><li>Blog Listings</li></Link>
//                     <Link to="/WritePage"><li>Write Page</li></Link>
//                     <Link to="/BlogPage"><li>Blogs Page</li></Link>
//                     <Link to="/Profile"><li>Profile Page</li></Link>
//                     <li onClick={handleLogout} className='logout' style={{ cursor: 'pointer', padding: '0 rem 2rem', color: 'red' }}>Logout</li>
//                     {user ? (
//                     <Link to="/user"><li>Hello {user.firstName}👋</li></Link>  
//                     ) : (
//                     <Link to="/SignIn"><li>Login</li></Link> 
//                     )}
//                 </ul>
//             </div>
//         </div>
//     );
// }

// export default Navbar;
