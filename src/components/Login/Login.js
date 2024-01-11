import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};
const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  const Authctx = useContext(AuthContext);
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredClgname, setEnteredClgname] = useState("");
  const [ClgnameIsValid, setClgnameIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, []);

  // useEffect(()=>{
  //   const validitytimeout = setTimeout(() => {
  //     console.log('check validity')
  //     setFormIsValid(
  //     enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredClgname.trim().length > 0
  //   );
  //   }, 500);
  //   return ()=>{
  //     console.log('clean up')
  //     clearTimeout(validitytimeout)
  //   }
  // },[enteredEmail,enteredPassword,enteredClgname]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    setFormIsValid(
      event.target.value.includes("@") &&
        passwordState.value.trim().length > 6 &&
        enteredClgname.trim().length > 0
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
    setFormIsValid(
      emailState.value.includes("@") &&
        event.target.value.trim().length > 6 &&
        enteredClgname.trim().length > 0
    );
  };

  const clgnameChangeHandler = (event) => {
    setEnteredClgname(event.target.value);
    setFormIsValid(
      emailState.value.includes("@") &&
        passwordState.value.trim().length > 6 &&
        event.target.value.trim().length > 0
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validateClgnameHandler = () => {
    setClgnameIsValid(enteredClgname.trim().length > 0);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    Authctx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          isValid={emailState.isValid}
          id="email"
          label="User Email"
          type="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        ></Input>
        <Input
          isValid={ClgnameIsValid}
          id="clgname"
          label="College Name"
          type="text"
          value={enteredClgname}
          onChange={clgnameChangeHandler}
          onBlur={validateClgnameHandler}
        ></Input>
        <Input
          isValid={passwordState.isValid}
          id="password"
          label="Password"
          type="passowrd"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        ></Input>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
