import './App.css';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, FacebookAuthProvider, GithubAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import firebaseInitialize from './Firebase/firebase-initialize';
import { useState } from 'react';
firebaseInitialize()


function App() {
  const [email, setEmail] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // const [name, setName] = useState('');
  const [user, setUser] = useState({});
  const auth = getAuth()
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const getEmail = e => {
    setEmail(e.target.value);
  }
  const getPassword = e => {
    setPassword(e.target.value);
  }
  const getName = e => {
    // setName(e.target.value);
  }
  const handleCheckBox = e => {
    setIsSignUp(e.target.checked);
  }
  const handleSignUp = e => {
    e.preventDefault();
    if (password.length < 8) {
      setError('password must be at least 8 character')
      return;
    }
    if (!/(?=.*[0-9])/.test(password)) {
      setError('you have to give at least one number')
      return;
    }
    isSignUp ? signIn() : signUp()
  }

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        console.log(' user signed in');
      })
  }
  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        setError('')
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
        setUser({})
      })
  }
  const handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
      .then(result => {
        const user = result.user;
        setUser(user)
      })
  }
  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const user = result.user;
        console.log(user);
        setUser(user)
      })
  }
  return (

    <div className="background container">
      <div className="login mx-auto">
        <h1 className="custom-heading">{isSignUp ? 'log in' : 'sign up'} please</h1>
        <form onSubmit={handleSignUp} className="row g-3 background-color">
          {!isSignUp && <div className="col-md-12">
            <label htmlFor="inputName4" className="form-label text-custom">Name</label>
            <input type="text" onBlur={getName} className="form-control" id="inputName4" placeholder="your Name" required />
          </div>}
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label text-custom">Email</label>
            <input type="email" onBlur={getEmail} className="form-control" id="inputEmail4" placeholder="your email" required />
          </div>
          <div className="col-md-12">
            <label htmlFor="inputPassword4" className="form-label text-custom">Password</label>
            <input type="password" onBlur={getPassword} className="form-control" id="inputPassword4" placeholder="your password" required />
            <p className="text-danger">{error}</p>
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

            {!isSignUp ?
              <button type="submit" className="btn btn-primary">sign up</button>
              :
              <button type="submit" className="btn btn-primary">sign in</button>}
          </div>
        </form>

      </div>
      <div className="text-white">
        {user.photoURL ?
          <div>
            <h1>welcome to login center {user.displayName}</h1>
            <p>your email is : {user.email}</p>
            <img src={user.photoURL} alt="" />
            <br />
            <br />
            <button onClick={handleSignout} className="btn btn-danger">sign out</button>
          </div>
          :
          <div className="pb-5">
            <button onClick={handleGoogleSignIn} className="btn btn-danger mx-3"><i>sign in with google</i></button>
            <button onClick={handleFacebookSignIn} className="btn btn-primary mx-3"><i>sign in with facebook</i></button>
            <button onClick={handleGithubSignIn} className="btn btn-danger mx-3"><i>sign in with Github</i></button>
          </div>
        }
      </div>
    </div >
  );
}
export default App;
