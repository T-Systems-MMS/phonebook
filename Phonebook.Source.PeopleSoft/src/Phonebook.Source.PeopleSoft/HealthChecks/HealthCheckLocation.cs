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
    public class HealthCheckLocation: IHealthCheck
    {
        public HealthCheckLocation(IServiceScopeFactory scopeFactory)
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
                    var result = await scope.ServiceProvider.GetService<ModelContext>().Locations.OrderBy(d => d.Id).FirstAsync();
                    if (string.IsNullOrWhiteSpace(result.ShortName?.ToString()))
                    {
                        return HealthCheckResult.Unhealthy("Location data is not accessible! 💣");
                    }
                    else
                    {
                        return HealthCheckResult.Healthy("Location data is accessible.");
                    }
                }
            }
            catch (Exception ex)
            {
                return HealthCheckResult.Unhealthy($"Location data is not accessible! 💣 {ex.Message}");
            }
        }
    }
}
