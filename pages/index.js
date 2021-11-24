import { useAuth } from "../lib/auth"

export default function Home() {
  const auth = useAuth();

  return auth.user ? (
    <div>
      <p>Email: {auth.user.email}</p>
      <button onClick={(e) => auth.logout()}>Sign Out</button>
    </div>
  ) : (
    <div>
      <button onClick={(e) => auth.signinWithGitHub()}>Github Sign In</button>
      <button onClick={(e) => auth.signinWithGoogle()}>Google Sign In</button>
    </div>
  )
}
