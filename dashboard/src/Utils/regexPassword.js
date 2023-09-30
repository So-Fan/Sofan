function handlePasswordChange(e, setState, setStateRegexError) {
  setState(e.target.value);
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\S])[A-Za-z\d\S]{8,100}$/;
  setStateRegexError(!passwordRegex.test(e.target.value));
  //   function not finish.
}
