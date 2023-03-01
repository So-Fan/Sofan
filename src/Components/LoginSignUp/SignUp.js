import React from "react";

function SignUp(props) {
  return (
      <div class="form-container register-container">
        <form action="#">
          <h1>Register hire.</h1>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Register</button>
          <span>or use your account</span>
          <div class="social-container">
            <a href="#" class="social">
              <i class="lni lni-facebook-fill"></i>
            </a>
            <a href="#" class="social">
              <i class="lni lni-google"></i>
            </a>
            <a href="#" class="social">
              <i class="lni lni-linkedin-original"></i>
            </a>
          </div>
        </form>
      </div>
  );
}

export default SignUp;
