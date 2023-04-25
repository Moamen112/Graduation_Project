﻿namespace Shared.DataTranferObjects;

public class ProfessorDto
{
    public Guid Id { get; init; }
    public string FullName { get; init; }
    public string Email { get; init; }
    public string PhoneNumber { get; init; }
    public double Rate { get; init; }
}
