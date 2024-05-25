using Microsoft.EntityFrameworkCore;
using Sol_Nimesh.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

public class EmployeeReservationRecordService : IEmployeeReservationRecordService
{
    private readonly EmployeeContext _employeeContext;

    public EmployeeReservationRecordService(EmployeeContext employeeContext)
    {
        _employeeContext = employeeContext;
    }

    public async Task<IEnumerable<EmployeeReservationRecord>> GetEmployeesResRecordAsync(int empId)
    {
        try
        {
            return await _employeeContext.EmployeeReservationRecords
                                         .Where(x => x.EmpId == empId)
                                         .ToListAsync();
        }
        catch (Exception ex)
        {
            throw new ApplicationException("An error occurred while fetching employee reservation records.", ex);
        }
    }

    public async Task<EmployeeReservationRecord> GetEmployeeResRecordByIdAsync(int id)
    {
        return await _employeeContext.EmployeeReservationRecords.FindAsync(id) ?? throw new Exception("Employee not found");
    }

    public async Task<EmployeeReservationRecord> AddEmployeeResRecordAsync(EmployeeReservationRecord employeeResRecord)
    {
        _employeeContext.EmployeeReservationRecords.Add(employeeResRecord);
        await _employeeContext.SaveChangesAsync();
        return employeeResRecord;
    }

    public async Task UpdateEmployeeResRecordAsync(int id, EmployeeReservationRecord employeeResRecord)
    {
        if (id != employeeResRecord.ID)
        {
            throw new ArgumentException("Employee ID mismatch");
        }

        _employeeContext.Entry(employeeResRecord).State = EntityState.Modified;
        await _employeeContext.SaveChangesAsync();
    }

    public async Task DeleteEmployeeResRecordAsync(int id)
    {
        var employee = await _employeeContext.EmployeeReservationRecords.FindAsync(id);
        if (employee != null)
        {
            _employeeContext.EmployeeReservationRecords.Remove(employee);
            await _employeeContext.SaveChangesAsync();
        }
    }
}
