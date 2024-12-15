import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Box,
} from "@mui/material";

function CRUDTable() {
    const [employees, setEmployees] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState({
        EmployeeID: null,
        Name: "",
        Department: "",
        Age: "",
        JoiningDate: "",
        MonthlyPerformanceScore: "",
    });

    // Fetch employee data from backend
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:8000/employees");
            const data = await response.json();
            console.log(data);
            setEmployees(data);
        };
        fetchData();
    }, []);

    const handleClickOpen = (employee) => {
        setCurrentEmployee(employee || { EmployeeID: null, Name: "", Department: "", Age: "", JoiningDate: "", MonthlyPerformanceScore: "" });
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleSubmit = async () => {
        if (currentEmployee.EmployeeID) {
            // Update employee data
            const response = await fetch(`http://localhost:8000/employee/${currentEmployee.EmployeeID}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(currentEmployee),
            });
            const updatedEmployee = await response.json();
            setEmployees((prev) =>
                prev.map((emp) => (emp.EmployeeID === updatedEmployee.EmployeeID ? updatedEmployee : emp))
            );
        } else {
            // Add new employee
            const response = await fetch("http://localhost:8000/employees", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(currentEmployee),
            });
            const newEmployee = await response.json();
            setEmployees((prev) => [...prev, newEmployee]);
        }
        handleClose();
    };

    const handleDelete = async (EmployeeID) => {
        await fetch(`http://localhost:8000/employee/${EmployeeID}`, {
            method: "DELETE",
        });
        setEmployees((prev) => prev.filter((emp) => emp.EmployeeID !== EmployeeID));
    };

    console.log(employees);

    return (
        <div className="container">
            <h2 id="title-text">Employee Management</h2>

            <Box display="flex" justifyContent="flex-end" mb={2}>
                <Button variant="contained" onClick={() => handleClickOpen(null)}>
                    Add Employee
                </Button>
            </Box>

            <TableContainer component={Paper} style={{ marginTop: "20px" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Joining Date</TableCell>
                            <TableCell>Monthly Performance Score</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((emp) => (
                            <TableRow key={emp.EmployeeID}>
                                <TableCell>{emp.EmployeeID}</TableCell>
                                <TableCell>{emp.Name}</TableCell>
                                <TableCell>{emp.Department}</TableCell>
                                <TableCell>{emp.Age}</TableCell>
                                <TableCell>{emp.JoiningDate}</TableCell>
                                <TableCell>{emp.MonthlyPerformanceScore}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleClickOpen(emp)}
                                        style={{ marginRight: "10px" }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleDelete(emp.EmployeeID)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{currentEmployee.EmployeeID ? "Edit Employee" : "Add Employee"}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Name"
                        fullWidth
                        value={currentEmployee.Name}
                        onChange={(e) => setCurrentEmployee({ ...currentEmployee, Name: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Department"
                        fullWidth
                        value={currentEmployee.Department}
                        onChange={(e) => setCurrentEmployee({ ...currentEmployee, Department: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Age"
                        type="number"
                        fullWidth
                        value={currentEmployee.Age}
                        onChange={(e) => setCurrentEmployee({ ...currentEmployee, Age: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Joining Date"
                        fullWidth
                        value={currentEmployee.JoiningDate}
                        onChange={(e) => setCurrentEmployee({ ...currentEmployee, JoiningDate: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Monthly Performance Score"
                        type="number"
                        fullWidth
                        value={currentEmployee.MonthlyPerformanceScore}
                        onChange={(e) => setCurrentEmployee({ ...currentEmployee, MonthlyPerformanceScore: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        {currentEmployee.EmployeeID ? "Update" : "Add"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CRUDTable;
