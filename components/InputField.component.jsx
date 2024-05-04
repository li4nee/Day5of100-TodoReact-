import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { CiBookmarkPlus } from "react-icons/ci";
import { useState } from "react";
import getDate from "../utility/getDate";
import getTime from "../utility/getTime";
import { FaMarker } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

export default function InputFieldComponent() {
  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState("");

  const handleAddTodo = () => {
    setTodoList([
      ...todoList,
      {
        text: textInput,
        date: getDate(),
        time: getTime(),
        pending: true,
        buttonText: "Mark Done",
      },
    ]);
    setTextInput("");
  };

  const toggleList = (index) => {
    const newTodo = todoList.map((item, idx) => {
      if (idx == index) {
        return {
          ...item,
          pending: !item.pending,
          buttonText: item.pending ? "Mark Not Done" : "Mark Done",
        };
      } else {
        return item;
      }
    });
    setTodoList(newTodo);
  };

  const deleteItem = (index) => {
    const newTodo = todoList.filter((item, idx) => {
      if (idx == index) {
        return false;
      } else {
        return true;
      }
    });
    setTodoList(newTodo);
  };

  return (
    <Container className="p-4 d-flex flex-column align-items-center justify-content-center">
      <Form style={{ width: "50vw" }}>
        <Form.Group className="mb-3" controlId="todoInput">
          <Form.Label>
            <h1>TodoList</h1>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter todo task"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="success"
          type="button"
          className="p-2 m-1"
          onClick={handleAddTodo}
        >
          Add <CiBookmarkPlus />
        </Button>
      </Form>
      <Container className="m-3">
        {todoList.length > 0 ? (
          <table className="table table-striped">
            <thead className="thead-light">
              <tr>
                <th scope="col" style={{ width: "35%" }}>
                  Todo Task
                </th>
                <th scope="col">Date</th>
                <th scope="col">Added Time</th>
                <th scope="col" style={{ width: "25%" }}>
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              {todoList.map((item, index) => (
                <tr key={index}>
                  <td
                    style={{
                      ...(!item.pending && {
                        textDecoration: "line-through 3px red solid",
                        backgroundColor:"#FFEEEF",
                        color:"#A39899"
                      }),
                      width:"35%"
                    }}
                  >
                    {item.text}
                  </td>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>
                    <div className="d-flex align-items-center ">
                      <label htmlFor={`${index}`} title="Mark as Complete">
                        <Button
                          id={`${index}`}
                          type="button"
                          className="ml-2"
                          variant="light"
                          onClick={() => toggleList(index)}
                        >
                          <FaMarker />
                        </Button>
                      </label>
                      <label htmlFor={`d${index}`} title="Delete Todo Task">
                        <button
                          id={`d${index}`}
                          onClick={() => deleteItem(index)}
                          className="btn btn-light ml-2"
                        >
                          <FaTrash color="red" />
                        </button>
                      </label>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h3>No Todos</h3>
        )}
      </Container>
    </Container>
  );
}
