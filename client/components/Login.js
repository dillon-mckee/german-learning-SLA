import React from 'react';
import Banner from './Banner';


const Login = () => {
   return (
    <div className="login-button">
    <Banner/>
    <section>
<button type="button" className="button"><a href="/auth/google"> login </a></button>
</section>
    </div>
    );
};

export default Login
