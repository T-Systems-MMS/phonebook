using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Phonebook.Source.PeopleSoft.Models.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Phonebook.Source.PeopleSoft.HealthChecks
{
    public class HealthCheckOrgUnit: IHealthCheck
    {
        public HealthCheckOrgUnit(IServiceScopeFactory scopeFactory)
        {            
            ScopeFactory = scopeFactory;
        }
        public IServiceScopeFactory ScopeFactory { get; }

        public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
        {
            try
            {
                using (var scope = ScopeFactory.CreateScope())
                {
                    var result = await scope.ServiceProvider.GetService<ModelContext>().OrgUnits.OrderBy(d => d.Id).FirstAsync();
                    if (string.IsNullOrWhiteSpace(result.ShortName?.ToString()))
                    {
                        return HealthCheckResult.Unhealthy("OrgUnit data is not accessible! 💣");
                    }
                    else
                    {
                        return HealthCheckResult.Healthy("OrgUnit data is accessible.");
                    }
                }
            }
            catch (Exception ex)
            {
                return HealthCheckResult.Unhealthy($"OrgUnit data is not accessible! 💣 {ex.Message}");
            }
        }
    }
}
