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
    public class HealthCheckBuildingPart: IHealthCheck
    {
        public HealthCheckBuildingPart(IServiceScopeFactory scopeFactory)
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
                    var result = await scope.ServiceProvider.GetService<ModelContext>().BuildingParts.OrderBy(d => d.Id).FirstAsync();
                    if (string.IsNullOrWhiteSpace(result.BuildingId?.ToString()))
                    {
                        return HealthCheckResult.Unhealthy("BuildingPart data is not accessible! 💣");
                    }
                    else
                    {
                        return HealthCheckResult.Healthy("BuildingPart data is accessible.");
                    }
                }                
            }
            catch (Exception ex)
            {
                return HealthCheckResult.Unhealthy($"BuildingPart data is not accessible! 💣 {ex.Message}");
            }
        }
    }
}
