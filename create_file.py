import csv

# Sample employee data
data = [
    ["EmployeeID", "Name", "Department", "Age", "JoiningDate", "MonthlyPerformanceScore"],
    [1, "John Smith", "Sales", 30, "2015-06-01", 85],
    [2, "Jane Doe", "Engineering", 28, "2017-09-15", 92],
    [3, "Emily Davis", "Marketing", 35, "2012-03-12", 78],
    [4, "Michael Brown", "Sales", 45, "2010-08-25", 88],
    [5, "Laura Wilson", "Engineering", 31, "2018-04-30", 91],
    [6, "Daniel Martinez", "Marketing", 40, "2009-11-03", 82],
    [7, "Sophia Johnson", "HR", 29, "2016-01-20", 86],
    [8, "Chris Lee", "Engineering", 33, "2014-05-18", 89],
    [9, "Emma Garcia", "Marketing", 37, "2011-10-12", 81],
    [10, "Liam Walker", "Sales", 38, "2013-07-22", 90],
]

# Write data to CSV
file_name = "employee_data.csv"
with open(file_name, mode="w", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(data)

print(f"'{file_name}' created successfully with example data!")
