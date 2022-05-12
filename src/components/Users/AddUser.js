import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import { useState } from "react";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";
import { useRef } from "react";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  // const [enteredUsername, setEnteredUsername] = useState("");
  // const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState("");

  const addUserHandler = (event) => {
    event.preventDefault();

    const enteredUserNameByRef = nameInputRef.current.value;
    const enteredUserAgeByRef = ageInputRef.current.value;

    // with useState
    // if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
    //   setError({
    //     title: "Invalid Input",
    //     message: "Please Enter Valid name and age (non-empty values)",
    //   });
    //   return;
    // }
    if (
      enteredUserNameByRef.trim().length === 0 ||
      enteredUserAgeByRef.trim().length === 0
    ) {
      setError({
        title: "Invalid Input",
        message: "Please Enter Valid name and age (non-empty values)",
      });
      return;
    }
    if (+enteredUserAgeByRef < 1) {
      setError({
        title: "Invalid Input",
        message: "Please Enter Valid age (non-empty age and age >= 1)",
      });
      return;
    }
    // with useState
    // if (+enteredAge < 1) {
    //   setError({
    //     title: "Invalid Input",
    //     message: "Please Enter Valid age (non-empty age and age >= 1)",
    //   });
    //   return;
    // }

    // console.log(enteredUsername, enteredAge);
    // props.onAddUser(enteredUsername, enteredAge);
    // setEnteredAge("");
    // setEnteredUsername("");

    props.onAddUser(enteredUserNameByRef, enteredUserAgeByRef);

    // should never manipulate dom by own, only for example
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  // const usernameChangeHandler = (event) => {
  //   setEnteredUsername(event.target.value);
  // };

  // const ageChangeHandler = (event) => {
  //   setEnteredAge(event.target.value);
  // };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">UserName</label>
          <input
            id="username"
            type="text"
            autoComplete="off"
            // onChange={usernameChangeHandler}
            // value={enteredUsername}
            ref={nameInputRef}
          ></input>
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            max="100"
            min="1"
            autoComplete="off"
            // onChange={ageChangeHandler}
            // value={enteredAge}
            ref={ageInputRef}
          ></input>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
