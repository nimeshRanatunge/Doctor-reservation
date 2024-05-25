using Sol_Nimesh.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface IEmployeeReservationRecordService
{
    Task<IEnumerable<EmployeeReservationRecord>> GetEmployeesResRecordAsync(int empId);
    Task<EmployeeReservationRecord> GetEmployeeResRecordByIdAsync(int id);
    Task<EmployeeReservationRecord> AddEmployeeResRecordAsync(EmployeeReservationRecord employeeResRecord);
    Task UpdateEmployeeResRecordAsync(int id, EmployeeReservationRecord employeeResRecord);
    Task DeleteEmployeeResRecordAsync(int id);
}
