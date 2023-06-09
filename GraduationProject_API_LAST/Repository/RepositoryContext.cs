﻿using Entities.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Repository.Configuration;

namespace Repository;

public class RepositoryContext : IdentityDbContext<User>
{
	public RepositoryContext(DbContextOptions options)
		: base(options)
	{

	}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Applying Configuration For Each Entity.
        modelBuilder.ApplyConfiguration(new UniversityConfiguration());
        modelBuilder.ApplyConfiguration(new FacultyConfiguration());
        modelBuilder.ApplyConfiguration(new DepartmentConfiguration());
        modelBuilder.ApplyConfiguration(new RoleConfiguration());
        modelBuilder.ApplyConfiguration(new UserConfiguration());
        modelBuilder.ApplyConfiguration(new UserRolesConfiguration());
        modelBuilder.ApplyConfiguration(new UniversityAdminConfiguration());
        modelBuilder.ApplyConfiguration(new FacultyAdminConfiguration());
        modelBuilder.ApplyConfiguration(new DepartmentAdminConfiguration());
        modelBuilder.ApplyConfiguration(new ProfessorConfiguration());
        modelBuilder.ApplyConfiguration(new StudentConfiguration());
        modelBuilder.ApplyConfiguration(new SubjectConfiguration());
    }

    // DbSets Here.
    public DbSet<University>? Universities { get; set; }
    public DbSet<Faculty>? Faculties { get; set; }
    public DbSet<Department>? Departments { get; set; }
    public DbSet<Subject>? Subjects { get; set; }
    public DbSet<Questionnaire>? Questionnaires { get; set; }
    public DbSet<UniversityAdmin>? UniversityAdmins { get; set; }
    public DbSet<FacultyAdmin>? FacultyAdmins { get; set; }
    public DbSet<DepartmentAdmin>? DepartmentAdmins { get; set; }
    public DbSet<Professor>? Professors { get; set; }
    public DbSet<Student>? Students { get; set; }
    public DbSet<Submition>? Submitions { get; set; }
    public DbSet<FacultyAnalysis>? FacultyAnalyses { get; set; }
    public DbSet<DepartmentAnalysis>? DepartmentAnalyses { get; set; }
    public DbSet<SubjectAnalysis>? SubjectAnalyses { get; set; }
    public DbSet<SubjectConclusion>? SubjectConclusions { get; set; }
    public DbSet<Recommendation>? Recommendations { get; set; }
}
