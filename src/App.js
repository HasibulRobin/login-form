import './App.css';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import firebaseInitialize from './Firebase/firebase-initialize';
import { useState } from 'react';
firebaseInitialize()


function App() {
  const [email, setEmail] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [user, setUser] = useState({})
  const auth = getAuth()
  const googleProvider = new GoogleAuthProvider();
  const getEmail = e => {
    setEmail(e.target.value);
  }
  const getPassword = e => {
    setPassword(e.target.value)
    // console.log(email, password);
  }
  const getName = e => {
    setName(e.target.value);
  }
  const handleCheckBox = e => {
    setIsSignUp(e.target.checked);
  }
  const handleSignUp = e => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        console.log(result.user);
      })
  }
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
      })
  }
  const handleSignout = () => {
    signOut(auth)
      .then(() => {

      })
  }
  return (

    <div className="background container">

      <div className="login mx-auto">




        <h1 className="custom-heading">{isSignUp ? 'log in' : 'sign up'} please</h1>
        <form onSubmit={handleSignUp} className="row g-3 background-color">
          {!isSignUp && <div className="col-md-12">
            <label htmlFor="inputName4" className="form-label text-custom">Name</label>
            <input type="text" onBlur={getName} className="form-control" id="inputName4" placeholder="your Name" />
          </div>}
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label text-custom">Email</label>
            <input type="email" onBlur={getEmail} className="form-control" id="inputEmail4" placeholder="your email" />
          </div>
          <div className="col-md-12">
            <label htmlFor="inputPassword4" className="form-label text-custom">Password</label>
            <input type="password" onBlur={getPassword} className="form-control" id="inputPassword4" placeholder="your password" />
          </div>

          {/* <div className="col-12"> */}
          <div className="form-check">
            <input onChange={handleCheckBox} className="form-check-input" type="checkbox" id="gridCheck" />
            <label className="form-check-label text-custom" htmlFor="gridCheck">
              already sign up?
            </label>
          </div>
          {/* </div> */}
          <div className="col-12">
            <button type="submit" className="btn btn-primary">{isSignUp ? 'log in' : 'sign up'}</button>
          </div>
        </form>
        <div>
          <button onClick={handleGoogleSignIn} className="btn btn-danger"><i>sign in with google</i></button>
          <button className="btn btn-primary"><i>sign in with facebook</i></button>
        </div>

      </div>
    </div >
    // </div >
  );
}

export default App;
