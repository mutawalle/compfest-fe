import api from '@/util/api';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const Home = () => {

    const login = useGoogleLogin({
        onSuccess: token => {
            localStorage.setItem("token", token.access_token)
            console.log(token)
            try {
                api.get("/login", {
                    headers: {
                        Authorization: `Bearer ${token.access_token}`
                    }
                })
            } catch {
                console.log("error")
            }
        }
    })

    return (
        <div className='w-screen h-screen box-border bg-[#0c0c0c]'>
            <div className='w-full p-6 flex justify-between'>
                <h2 className='text-3xl font-bold text-[#5e1aab]'>
                    Job Ai
                </h2>
                <GoogleLogin
                    onSuccess={async credentialResponse => {
                        localStorage.setItem("token", credentialResponse.credential || "")
                        console.log(credentialResponse.credential);
                        console.log(jwtDecode(credentialResponse.credential || ""));
                        try {
                            await api.get("/login", {
                                headers: {
                                    Authorization: `Bearer ${credentialResponse.credential}`
                                }
                            })
                        } catch {
                            console.log("error")
                        }
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
                {/* <button onClick={() => login()}>
                    login
                </button> */}
            </div>
        </div>
    )
}

export default Home