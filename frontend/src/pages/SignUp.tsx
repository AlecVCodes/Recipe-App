import React, { useState } from "react";
import SignUpImg from "../images/sign-up-img.png";
import { Link } from "react-router-dom";
import { useSignUp } from "../hooks/useSignUp";

function SignUpComponent() {


  //regex validation

  const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState('')

  const { SignUp, error, isloading } = useSignUp();

  const validate = (password : any) => {
    if (!validPassword.test(password)) {
      let errors = [];
  
      if (password.length < 6) {
        errors.push("Password must be at least 6 characters long");
        setFormError("Password must have at least 6 letters")
      }
  
     
  
      if (!/(?=.*\d)/.test(password)) {
        errors.push("Password must contain at least one digit (0-9)");
        setFormError("Password must have at least 1 number")
      }
  
      if (errors.length > 0) {
        console.log("Password is not strong enough. The following conditions are not met:");
        errors.forEach((error) => {
          console.log(error);
        });

        if (!/([!@#$%^&*_+{}:"<>?|])/.test(password)) {
          errors.push("password must have at least 1 special characted")
          setFormError("password must have a special character")
        }
      }
      return false;
    }
  
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isPasswordValid = validate(password);

    if (isPasswordValid) {
      SignUp(email, password);
    } else {
      console.log("Password is not strong enough");
    }
  };
  return (
    <div className="sign-up-component">
      <main className="display-f">
        <div className="sign-up-container">
          <div className="content">
          <Link to="/">
      
            <svg
              className="auth-logo-large"
              width="114"
              height="108"
              viewBox="0 0 114 108"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <rect
                width="33.6153"
                height="33.4953"
                transform="matrix(-0.966192 0.257823 -0.259819 -0.965657 43.8574 32.3447)"
                fill="url(#pattern0)"
              />
              <path
                d="M88.4469 48.3293L88.447 40.4619H18.4757V49.4533C18.4756 56.1968 26.8722 65.1881 35.2688 69.6838H68.855C73.3332 69.6838 87.0475 57.3207 88.4469 48.3293Z"
                fill="#3E4853"
                stroke="#3E4853"
              />
              <rect
                x="47.8184"
                y="22.4785"
                width="6.77143"
                height="6.74351"
                rx="1"
                fill="#3E4853"
              />
              <rect
                x="36.5322"
                y="26.9746"
                width="6.77143"
                height="6.7435"
                rx="1"
                fill="#3E4853"
              />
              <path
                d="M49.624 27.4247V23.8281H53.2355V27.4247H49.624Z"
                fill="#3E4853"
              />
              <path
                d="M38.3379 31.9198V28.3232H41.9493V31.9198H38.3379Z"
                fill="#3E4853"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M74.0151 20.2405C75.166 20.31 75.8349 21.2831 76.2618 22.292C76.8448 23.6699 77.7763 25.3389 76.5815 26.3056C75.212 27.4137 73.1164 27.0351 71.6933 25.9885C70.4135 25.0474 70.0871 23.3833 70.6643 21.9542C71.1639 20.7175 72.6127 20.1559 74.0151 20.2405Z"
                fill="#3E4853"
              />
              <path
                d="M53.4615 34.4469V31.4697H49.44H48.7697H48.0996C45.4186 33.8514 44.0781 34.4469 48.0996 35.6377C51.3167 36.5904 53.0147 35.2408 53.4615 34.4469Z"
                stroke="#3E4853"
                stroke-width="0.5"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M64.7474 34.1304C65.1311 34.1535 64.6051 35.6056 64.7474 35.9415C64.9418 36.4002 65.2522 36.9575 64.854 37.2793C64.3975 37.6483 63.699 37.5221 63.2246 37.1737C62.798 36.8603 62.6892 36.3047 62.8816 35.8289C63.0481 35.4171 64.28 34.1022 64.7474 34.1304Z"
                fill="#3E4853"
              />
              <path
                d="M61.714 38.214L59.4965 33.7633C58.8806 32.4034 58.5356 30.277 62.0835 32.6507C62.4531 30.6726 63.6357 27.4583 65.4097 30.4254L66.1488 32.6507C68.3663 31.5381 72.1359 30.3513 69.475 34.5053C66.814 38.6592 66.1488 38.4614 66.1488 37.8433"
                stroke="#3E4853"
                stroke-width="0.8"
              />
              <path
                d="M75.7373 36.311C75.4525 35.2522 77.6355 33.4403 78.7627 32.6667C79.9728 31.209 81.2544 32.0018 81.7439 32.5804C81.8626 33.0216 81.6106 34.3182 79.6529 35.9754C77.6953 37.6326 76.3455 37.3308 75.9154 36.9727L75.7373 36.311Z"
                fill="#3E4853"
                stroke="#3E4853"
                stroke-width="0.8"
              />
              <path
                d="M59.3876 25.6731C59.6291 24.5806 61.6305 23.7786 62.601 23.5141C63.8864 22.6505 64.3408 23.8955 64.4074 24.6259C64.3068 25.0811 63.6537 26.1788 61.8464 26.9279C60.0391 27.6771 59.3536 26.8587 59.2367 26.3558L59.3876 25.6731Z"
                fill="#3E4853"
                stroke="#3E4853"
                stroke-width="0.5"
              />
              <path
                d="M1.36133 92V79.8477H8.5166V82.0391H3.95947V84.5376H8.5166V86.7456H3.95947V92H1.36133ZM10.4092 92V79.1338H12.7666V92H10.4092ZM21.167 87.916C21.167 87.1855 20.9816 86.6073 20.6108 86.1812C20.2456 85.755 19.7503 85.542 19.125 85.542C18.4831 85.542 17.9767 85.755 17.606 86.1812C17.2407 86.6017 17.0581 87.18 17.0581 87.916C17.0581 88.652 17.238 89.2248 17.5977 89.6343C17.9629 90.0438 18.4665 90.2485 19.1084 90.2485C19.7614 90.2485 20.2677 90.0438 20.6274 89.6343C20.9871 89.2248 21.167 88.652 21.167 87.916ZM23.3252 92H21.0342L21.0674 90.8296C20.7464 91.3442 20.359 91.7233 19.9053 91.9668C19.457 92.2048 18.9092 92.3237 18.2617 92.3237C17.1826 92.3237 16.311 91.9225 15.647 91.1201C14.9884 90.3177 14.6592 89.258 14.6592 87.9409C14.6592 86.5685 14.9829 85.5005 15.6304 84.7368C16.2834 83.9676 17.1882 83.583 18.3447 83.583C18.9479 83.583 19.4764 83.7186 19.9302 83.9897C20.3895 84.2609 20.7741 84.6649 21.084 85.2017V83.8569H23.3252V92ZM27.5669 92L24.2549 83.8569H26.9858L28.3638 88.0903C28.4744 88.4334 28.563 88.7516 28.6294 89.0449C28.6958 89.3382 28.7428 89.626 28.7705 89.9082C28.8369 89.4821 28.9033 89.1196 28.9697 88.8208C29.0361 88.522 29.1136 88.2508 29.2021 88.0073L30.5884 83.8569H33.2778L29.9326 92H27.5669ZM40.4663 87.9409C40.4663 87.2769 40.2726 86.7484 39.8853 86.3555C39.4979 85.957 38.9777 85.7578 38.3247 85.7578C37.6717 85.7578 37.1543 85.9543 36.7725 86.3472C36.3906 86.7401 36.1997 87.2713 36.1997 87.9409C36.1997 88.605 36.3906 89.1362 36.7725 89.5347C37.1543 89.9331 37.6717 90.1323 38.3247 90.1323C38.9722 90.1323 39.4896 89.9331 39.877 89.5347C40.2699 89.1362 40.4663 88.605 40.4663 87.9409ZM42.8735 87.9575C42.8735 89.2082 42.4447 90.2485 41.5869 91.0786C40.7347 91.9087 39.6528 92.3237 38.3413 92.3237C37.0187 92.3237 35.9285 91.9087 35.0708 91.0786C34.2131 90.2485 33.7842 89.2082 33.7842 87.9575C33.7842 86.7124 34.2158 85.672 35.0791 84.8364C35.9424 84.0008 37.0298 83.583 38.3413 83.583C39.6584 83.583 40.743 83.9953 41.5952 84.8198C42.4474 85.6444 42.8735 86.6903 42.8735 87.9575ZM46.9824 83.8569V88.1401C46.9824 88.8595 47.1208 89.3742 47.3975 89.6841C47.6797 89.994 48.1362 90.1489 48.7671 90.1489C49.3924 90.1489 49.8462 89.994 50.1284 89.6841C50.4106 89.3687 50.5518 88.854 50.5518 88.1401V83.8569H52.9175V88.1401C52.9175 89.5734 52.5827 90.6304 51.9131 91.311C51.2435 91.9862 50.2059 92.3237 48.8003 92.3237C47.367 92.3237 46.3128 91.9862 45.6377 91.311C44.9681 90.6359 44.6333 89.5789 44.6333 88.1401V83.8569H46.9824ZM57.4746 85.9487C57.7126 85.1574 58.0529 84.5653 58.4956 84.1724C58.9438 83.7795 59.4972 83.583 60.1558 83.583C60.3052 83.583 60.5514 83.6107 60.8945 83.666C60.9609 83.6771 61.0107 83.6854 61.0439 83.6909L60.687 86.231C60.5099 86.159 60.3301 86.1064 60.1475 86.0732C59.9704 86.0345 59.7822 86.0151 59.583 86.0151C58.8636 86.0151 58.3462 86.2005 58.0308 86.5713C57.7153 86.9365 57.5576 87.5508 57.5576 88.4141V92H55.1919V83.8569H57.5244L57.4746 85.9487ZM62.3223 92V79.8477H69.4775V82.0391H64.9204V84.5376H69.4775V86.7456H64.9204V92H62.3223ZM71.1626 80.5117C71.1626 80.1354 71.2982 79.8117 71.5693 79.5405C71.8405 79.2694 72.1642 79.1338 72.5405 79.1338C72.9224 79.1338 73.2489 79.2694 73.52 79.5405C73.7967 79.8062 73.9351 80.1299 73.9351 80.5117C73.9351 80.8936 73.7967 81.2201 73.52 81.4912C73.2489 81.7624 72.9224 81.8979 72.5405 81.8979C72.1642 81.8979 71.8405 81.7596 71.5693 81.4829C71.2982 81.2062 71.1626 80.8825 71.1626 80.5117ZM71.3701 92V83.8569H73.7275V92H71.3701ZM76.1265 92V83.8569H78.4424V85.1353C78.8685 84.604 79.325 84.2139 79.812 83.9648C80.3045 83.7103 80.8496 83.583 81.4473 83.583C82.0781 83.583 82.6066 83.6909 83.0327 83.9067C83.4644 84.117 83.8047 84.4408 84.0537 84.8779C84.1755 85.1048 84.2612 85.3621 84.311 85.6499C84.3664 85.9321 84.394 86.3776 84.394 86.9863V87.2437V92H82.0283V87.9741C82.0283 86.9725 81.9121 86.3112 81.6797 85.9902C81.4473 85.6693 81.0488 85.5088 80.4844 85.5088C80.1579 85.5088 79.8563 85.578 79.5796 85.7163C79.3084 85.8491 79.0815 86.04 78.8989 86.2891C78.755 86.4827 78.6499 86.7041 78.5835 86.9531C78.5226 87.2021 78.4922 87.5812 78.4922 88.0903V88.4141V92H76.1265ZM92.6367 87.916C92.6367 87.1855 92.4513 86.6073 92.0806 86.1812C91.7153 85.755 91.2201 85.542 90.5947 85.542C89.9528 85.542 89.4465 85.7523 89.0757 86.1729C88.7104 86.5879 88.5278 87.1634 88.5278 87.8994C88.5278 88.6354 88.7077 89.2109 89.0674 89.626C89.4326 90.041 89.9362 90.2485 90.5781 90.2485C91.2311 90.2485 91.7375 90.0438 92.0972 89.6343C92.4569 89.2248 92.6367 88.652 92.6367 87.916ZM94.7949 92H92.5039L92.5371 90.8296C92.2161 91.3442 91.8288 91.7233 91.375 91.9668C90.9268 92.2048 90.3789 92.3237 89.7314 92.3237C88.6523 92.3237 87.7808 91.9225 87.1167 91.1201C86.4582 90.3177 86.1289 89.258 86.1289 87.9409C86.1289 86.563 86.4526 85.4894 87.1001 84.7202C87.7531 83.951 88.6579 83.5664 89.8145 83.5664C90.4066 83.5664 90.9268 83.702 91.375 83.9731C91.8232 84.2443 92.2438 84.6732 92.6367 85.2598C92.609 85.0605 92.5869 84.842 92.5703 84.604C92.5592 84.3605 92.5537 84.0838 92.5537 83.7739V79.1338H94.7949V92ZM102.722 87.0859C102.656 86.5713 102.468 86.1839 102.158 85.9238C101.853 85.6582 101.436 85.5254 100.904 85.5254C100.373 85.5254 99.9469 85.6582 99.626 85.9238C99.3105 86.1839 99.1086 86.5713 99.02 87.0859H102.722ZM105.063 88.5137H98.9453C99.0394 89.1003 99.2524 89.5402 99.5845 89.8335C99.9165 90.1213 100.368 90.2651 100.938 90.2651C101.369 90.2651 101.74 90.1821 102.05 90.0161C102.365 89.8501 102.628 89.5983 102.838 89.2607L104.748 90.2153C104.305 90.9292 103.768 91.4604 103.137 91.8091C102.506 92.1522 101.757 92.3237 100.888 92.3237C99.5706 92.3237 98.5275 91.9308 97.7583 91.145C96.9891 90.3592 96.6045 89.3022 96.6045 87.9741C96.6045 86.6958 97.0057 85.6444 97.8081 84.8198C98.616 83.9953 99.6481 83.583 100.904 83.583C102.199 83.583 103.223 83.9704 103.976 84.7451C104.728 85.5143 105.104 86.5658 105.104 87.8994C105.104 87.9714 105.102 88.0516 105.096 88.1401C105.091 88.2231 105.08 88.3477 105.063 88.5137ZM109.139 85.9487C109.377 85.1574 109.717 84.5653 110.16 84.1724C110.608 83.7795 111.161 83.583 111.82 83.583C111.969 83.583 112.215 83.6107 112.559 83.666C112.625 83.6771 112.675 83.6854 112.708 83.6909L112.351 86.231C112.174 86.159 111.994 86.1064 111.812 86.0732C111.634 86.0345 111.446 86.0151 111.247 86.0151C110.528 86.0151 110.01 86.2005 109.695 86.5713C109.379 86.9365 109.222 87.5508 109.222 88.4141V92H106.856V83.8569H109.188L109.139 85.9487Z"
                fill="#3E4853"
              />
              <defs>
                <pattern
                  id="pattern0"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlinkHref="#image0_376_331"
                    transform="matrix(0.0078125 0 0 0.00784051 0 -0.00179254)"
                  />
                </pattern>
                <image
                  id="image0_376_331"
                  width="128"
                  height="128"
                  xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADsQAAA7EB9YPtSQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAASXSURBVHic7Z2/jxZFHIcfDjhiwkGwEGMhgaMzSgWcEIOolSXYkyh/grEnNlRGO4mJEKMxMbGEkAAhQSpjq5WCDWDCoXAHR+THvRT7Ggm+O+vuOzsz3/1+nmSbd29mP3vzvDuz7+wPsM9m4FPgT2AFOAPMN5R5AfgGWALuAF+PPwuxEzg73sYt4JPxtkVG1gOXgdEzy1/AyzVl5oArE8r8Nl43iW3A7QllLgHrIuyH6Mj7/LdR/llO1ZT5OFDmWE2ZrwJljky/G/mYyR1gSnYH1r1e8/meQJm9NZ8vBMqE1hWPdQGeD6wb1Xw+GyizoWVdAFsC64rHugChQdhSxO2E6jI9ELQuwKbAujsRtxOqK5SheIYsQKojgATIiLqAKbEugLqAKbEswBpgY2B9qiPA3DiLSSwLMEc4fyoBZgiLWDSWBWg69KYSAAx3A5YFaBp8pRTA7EDQsgBN37pUg0DQESAL6gIiYFkAdQERsCyAuoAIDFkAdQH/g6EKMAKWI25rifCUsLqADIQEuAc8jritx1TXAtZRdylZ8Vi+ni0kwCxwrmbdrkC5XYFy6wPlzB4BLAsQ+qfPAu90qHNLx3IaA2SgpH96SVlaIQHiUFKWVlgWoKR+t6QsrbAsQEnfupKytEICxKGkLK2weiXLDPCIcvKPqM6oVnMHaYvVI8Amyml8qLKY/DHIsgClUWKmRiRAPErM1IhVAUo87SoxUyNWBai7iTMnJWZqxKoAJQ0ATWNVgJhX+8Tidu4AXbAqwI3cASbwR+4AnlgDLFL/2JbUy81+d7c/rB4BRsBPuUM8xY+5A3TFqgAAp3MHeIqSsrjhJeAh+Q//D8ZZRAa+I78A3/a+l6KW16hmBXM1/iPg1d73UgT5gnwCnEiwf6KBzcDvpG/8qxidABoiC1Q3bqRq/BXCTxwVGThMNSLvu/EfAIcS7ZNoydv8ex9fH8td4N1keyM6sYfq0e+xG/9Xwg+nFgXxHHCc6qbOaRt+lWq0b/ZJYJ7ZCXwG3Kd9w/9N9Z6AV5KnFtF5ETgKfE/4bGFl/DcfAFuzJBW9c5F6AS5mzJUFy7OBIgISwDkSwDkSwDkSwDkSwDkSwDlrcwdIxALwHnAAeIv6d/2tUv2MvJvqd4FrSdKJ3lgLnKT7PMCX+PmSDJKPmH4y6MPkqUU0Jr0lvMs0sDBKl1nAZ5f7yVMnZOhnATFuIx/0rehDF0A0IAGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcIwGcM3QB7kaoYzlCHcUydAGuR6hj0O8PHroAP0So41KEOkQmDjD9m0PfSJ5aROUc3Rv/bIa8IjLzwCLtG/8msD1DXtED+2knwSKwL0tS0RvzwAWaG/88sCNTRpGAg8AJ4Beqc/xl4Gfgc+DNfLHy8ASEpFreH+LwpQAAAABJRU5ErkJggg=="
                />
              </defs>
            </svg>
          </Link>

          <h3>FLAVOURFINDER</h3>
          <p>
            Discover your taste.
          </p>
    <div className="content"></div>
          <button className="Sign-up-with-google">
            <svg
              className="google-authentication-icon"
              width="28"
              height="25"
              viewBox="0 0 28 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.7655 10.4596H23.8506V10.4163H13.6289V14.583H20.0476C19.1112 17.0085 16.5949 18.7497 13.6289 18.7497C9.86565 18.7497 6.81447 15.9512 6.81447 12.4997C6.81447 9.04811 9.86565 6.24967 13.6289 6.24967C15.3661 6.24967 16.9465 6.85072 18.1498 7.83249L21.3622 4.88613C19.3338 3.15228 16.6205 2.08301 13.6289 2.08301C7.35678 2.08301 2.27148 6.74707 2.27148 12.4997C2.27148 18.2523 7.35678 22.9163 13.6289 22.9163C19.9011 22.9163 24.9864 18.2523 24.9864 12.4997C24.9864 11.8012 24.908 11.1195 24.7655 10.4596Z"
                fill="#FFC107"
              />
              <path
                d="M3.58105 7.65124L7.31255 10.1611C8.32223 7.86842 10.7675 6.24967 13.629 6.24967C15.3661 6.24967 16.9465 6.85072 18.1498 7.83249L21.3623 4.88613C19.3338 3.15228 16.6206 2.08301 13.629 2.08301C9.2666 2.08301 5.48343 4.34186 3.58105 7.65124Z"
                fill="#FF3D00"
              />
              <path
                d="M13.6286 22.9165C16.5622 22.9165 19.2278 21.8868 21.2432 20.2124L17.728 17.4842C16.5494 18.3063 15.1093 18.7509 13.6286 18.7499C10.6745 18.7499 8.16619 17.0223 7.22124 14.6113L3.51758 17.2285C5.39724 20.602 9.21448 22.9165 13.6286 22.9165Z"
                fill="#4CAF50"
              />
              <path
                d="M24.7655 10.4602H23.8506V10.417H13.6289V14.5837H20.0476C19.5996 15.738 18.7928 16.7468 17.7267 17.4852L17.7284 17.4842L21.2435 20.2123C20.9948 20.4196 24.9864 17.7087 24.9864 12.5003C24.9864 11.8019 24.908 11.1201 24.7655 10.4602Z"
                fill="#1976D2"
              />
            </svg>
            Sign Up With Google
          </button>
          <div className="seperator">
            <div className="before-line"></div>
            <p>or</p>
            <div className="after-line"></div>
          </div>
          <form
            className="authentication-form"
            onSubmit={handleSubmit}
            id="signup-form"
          >
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="email"
            ></input>
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            ></input>

            <div className="signup-checkbox display-f">
              <input className="TC-checkbox mr-1" type="checkbox"></input>
              <p className="TC-message">I agree to the terms and conditions</p>
            </div>
            <button disabled={isloading} className="sign-up-btn">
              Sign Up
            </button>
            <span className="link-to-login">Already have an account? <Link to={"/login"}>Login</Link></span>
            {error && <div className="form-error">{error}</div>}
{!error && formError && <div className="form-error">{formError}</div>}

            
          </form>
          </div>
        </div>
    
      </main>
    </div>
  );
}

export default SignUpComponent;
