const { types } = require("babel-core");

// Your code here
function createEmployeeRecord(employeeArr){
    let employeeRecord = {
        firstName: employeeArr[0] || '',
        familyName: employeeArr[1] || '',
        title: employeeArr[2] || '',
        payPerHour: employeeArr[3] || 0,
        timeInEvents: [],
        timeOutEvents: [],
    };
    return employeeRecord
};

function createEmployeeRecords(employeesArr){
    if(employeesArr.length === 0) return [];
    let employeeRecords = [];
    for(let employeeRecord of employeesArr){
        employeeRecords.push(createEmployeeRecord(employeeRecord))
    }
    return employeeRecords
};

function createTimeInEvent(employeeRecord,dateTime){
    let [date, hour] = dateTime.split(" ");
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })
    return employeeRecord
};

function createTimeOutEvent(employeeRecord,dateTime){
    let [date, hour] = dateTime.split(" ");
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return employeeRecord
};

function hoursWorkedOnDate(employeeRecord,date){
    const timeOutEvents = employeeRecord.timeOutEvents.find((item)=> item.date === date).hour;
    const timeInEvents = employeeRecord.timeInEvents.find((item)=> item.date === date).hour
    return (timeOutEvents - timeInEvents)/100
};

function wagesEarnedOnDate(employeeRecord,date){
    const hoursWorked = hoursWorkedOnDate(employeeRecord,date);
    return employeeRecord.payPerHour * hoursWorked
};

function allWagesFor(employeeRecord){
    return employeeRecord.timeInEvents.reduce((total, timeInEvent)=>{
        let date = timeInEvent.date;
        let hoursWorked = hoursWorkedOnDate(employeeRecord, date);
        let dailyWages = hoursWorked * employeeRecord.payPerHour;
        return total + dailyWages;
    }, 0)
};

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalWages, employeeRecord)=>{
        return totalWages + allWagesFor(employeeRecord)
    },0)
}