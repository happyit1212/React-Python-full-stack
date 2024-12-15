import pandas as pd
import matplotlib.pyplot as plt


data = pd.read_csv("employee_data.csv")

def process_employee_data(data):
    # Calculate average performance by department
    avg_performance = data.groupby('Department')['MonthlyPerformanceScore'].mean()

    # Find the top 3 performers
    top_performers = data.nlargest(3, 'MonthlyPerformanceScore')

    # Determine the longest-serving employee
    data['JoiningDate'] = pd.to_datetime(data['JoiningDate'])
    longest_serving = data.loc[data['JoiningDate'].idxmin()]

    return avg_performance, top_performers, longest_serving

# Process the data
avg_performance, top_performers, longest_serving = process_employee_data(data)

# Display results
print("Average Performance by Department:\n", avg_performance)
print("\nTop Performers:\n", top_performers)
print("\nLongest Serving Employee:\n", longest_serving)

# Save top performers to a CSV
top_performers.to_csv("processed_data.csv", index=False)
print("Processed data saved as 'processed_data.csv'.")

def plot_department_performance(avg_performance):
    avg_performance.plot(kind='bar', color='skyblue', figsize=(8, 6))
    plt.title("Average Performance by Department")
    plt.ylabel("Average Score")
    plt.xlabel("Department")
    plt.xticks(rotation=45)
    plt.savefig("department_performance.png")
    print("Bar chart saved as 'department_performance.png'.")

plot_department_performance(avg_performance)

def plot_employee_trend(data, employee_name):
    employee_data = data[data['Name'] == employee_name]
    employee_data = employee_data.sort_values('JoiningDate')

    plt.figure(figsize=(10, 6))
    plt.plot(employee_data['JoiningDate'], employee_data['MonthlyPerformanceScore'], marker='o', label=employee_name)
    plt.title(f"Performance Trend for {employee_name}")
    plt.xlabel("Date")
    plt.ylabel("Performance Score")
    plt.grid()
    plt.legend()
    plt.savefig("employee_trend.png")
    print("Line chart saved as 'employee_trend.png'.")

# Test the function with an employee's name
plot_employee_trend(data, "John Smith")
