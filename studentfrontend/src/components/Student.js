import * as React from "react";
import TextField from "@mui/material/TextField";
import { Container, Paper, Button } from "@mui/material";
import { blue } from "@mui/material/colors";

export default function Student() {
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [students, setStudents] = React.useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    const student = { name, address };
    console.log(student);
    fetch("http://localhost:8080/student/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    }).then(() => {
      console.log("New Student added");
    });
  };

  React.useEffect(() => {
    fetch("http://localhost:8080/student/getAll")
      .then((res) => res.json()) // Corrigez cette ligne
      .then((result) => {
        if (Array.isArray(result)) {
          setStudents(result);
        } else {
          console.error("Les données récupérées ne sont pas un tableau.");
        }
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des données :", error)
      );
  }, []);

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "blue" }}>
          <u>Add Student</u>
        </h1>
        <form noValidate autoComplete="off">
          <TextField
            id="standard-basic"
            label="name"
            variant="standard"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="address"
            variant="standard"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button
            variant="contained"
            color="success"
            style={{ marginTop: "20px" }}
            onClick={handleClick}
          >
            Submit
          </Button>
        </form>
      </Paper>

      <h1>Students</h1>
      <Paper elevation={3} style={paperStyle}>
        {students.map((student) => (
          <Paper
            elevation={6}
            style={{ margin: "10px", padding: "15px", textAlign: "left" }}
            key={student.id}
          >
            Id: {student.id}
            <br />
            Name: {student.name}
            <br />
            Address: {student.address}
          </Paper>
        ))}
      </Paper>
    </Container>
  );
}
