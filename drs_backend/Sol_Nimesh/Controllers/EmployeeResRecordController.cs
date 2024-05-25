using Microsoft.AspNetCore.Mvc;
using Sol_Nimesh.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class EmployeeResRecordController : ControllerBase
{
    private readonly IEmployeeReservationRecordService _employeeReservationRecordService;

    public EmployeeResRecordController(IEmployeeReservationRecordService employeeReservationRecordService)
    {
        _employeeReservationRecordService = employeeReservationRecordService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<EmployeeReservationRecord>>> GetEmployees(int empId)
    {
        var employees = await _employeeReservationRecordService.GetEmployeesResRecordAsync(empId);
        return Ok(employees);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<EmployeeReservationRecord>> GetEmployee(int id)
    {
        var employee = await _employeeReservationRecordService.GetEmployeeResRecordByIdAsync(id);
        if (employee == null)
        {
            return NotFound();
        }
        return Ok(employee);
    }

    [HttpPost]
    public async Task<ActionResult<EmployeeReservationRecord>> PostEmployee(EmployeeReservationRecord employeeResRecord)
    {
        var addedEmployee = await _employeeReservationRecordService.AddEmployeeResRecordAsync(employeeResRecord);
        return CreatedAtAction(nameof(GetEmployee), new { id = addedEmployee.ID }, addedEmployee);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> PutEmployee(int id, EmployeeReservationRecord employeeResRecord)
    {
        try
        {
            await _employeeReservationRecordService.UpdateEmployeeResRecordAsync(id, employeeResRecord);
            return Ok();
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteEmployee(int id)
    {
        await _employeeReservationRecordService.DeleteEmployeeResRecordAsync(id);
        return Ok();
    }
}
