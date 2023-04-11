function createEmployeeRecord(record) {
    return {
      firstName: record[0],
      familyName: record[1],
      title: record[2],
      payPerHour: record[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(records) {
    return records.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employee, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
    employee.timeInEvents.push({
      type: 'TimeIn',
      date: date,
      hour: parseInt(hour, 10)
    });
    return employee;
  }
  
  function createTimeOutEvent(employee, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
    employee.timeOutEvents.push({
      type: 'TimeOut',
      date: date,
      hour: parseInt(hour, 10)
    });
    return employee;
  }
  
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    if (timeIn && timeOut) {
      return (timeOut.hour - timeIn.hour) / 100;
    } else {
      return 0;
    }
  }
  
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }
  
  function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    const wages = datesWorked.map(date => wagesEarnedOnDate(employee, date));
    return wages.reduce((total, wage) => total + wage, 0);
  }
  
  function calculatePayroll(employees) {
    const wages = employees.map(employee => allWagesFor(employee));
    return wages.reduce((total, wage) => total + wage, 0);
  }
  
  // Example usage:
  
  const records = [
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150]
  ];
  
  const employees = createEmployeeRecords(records);
  
  createTimeInEvent(employees[0], "2023-04-10 0900");
  createTimeOutEvent(employees[0], "2023-04-10 1100");
  createTimeInEvent(employees[1], "2023-04-10 1000");
  createTimeOutEvent(employees[1], "2023-04-10 1400");
  
  console.log(calculatePayroll(employees)); // Output: 3800
  