from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow specific origin (React app)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Load data
df = pd.read_csv('employee_data.csv')

class Employee(BaseModel):
    EmployeeID: int
    Name: str
    Department: str
    Age: int
    JoiningDate: str
    MonthlyPerformanceScore: int

@app.get("/employees", response_model=List[Employee])
def get_employees():
    return df.to_dict(orient="records")

@app.post("/employees", response_model=Employee)
def add_employee(employee: Employee):
    df.loc[len(df)] = employee.dict()
    df.to_csv('employee_data.csv', index=False)
    return employee

@app.put("/employee/{employee_id}", response_model=Employee)
def update_employee(employee_id: int, employee: Employee):
    index = df[df['EmployeeID'] == employee_id].index
    if not index.empty:
        df.loc[index[0]] = employee.dict()
        df.to_csv('employee_data.csv', index=False)
        return employee

@app.delete("/employee/{employee_id}")
def delete_employee(employee_id: int):
    global df
    df = df[df["EmployeeID"] != employee_id]
    df.to_csv('employee_data.csv', index=False)
    return {"message": "Employee deleted successfully"}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
