using Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Configuration;

public class DepartmentAdminConfiguration : IEntityTypeConfiguration<DepartmentAdmin>
{
    public void Configure(EntityTypeBuilder<DepartmentAdmin> builder)
    {
        builder.HasData
        (
            new DepartmentAdmin
            {
                Id = new Guid("7A369173-1E2F-491F-874F-7B324C034BC2"),
                DepartmentId = new Guid("84796C48-D538-4954-A98A-622DC5C9325A"),
                FacultyId = new Guid("D0552B49-6E7D-4CED-8A30-62CE8066A2D4"),
                UniveristyId = new Guid("86f697d4-a762-44d6-8322-2c08c66f94e4")
            }
        );
    }
}
