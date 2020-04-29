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
    public class HealthCheckFloor: IHealthCheck
    {
        public HealthCheckFloor(IServiceScopeFactory scopeFactory)
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
                    var result = await scope.ServiceProvider.GetService<ModelContext>().Floors.OrderBy(d => d.Id).FirstAsync();
                    if (string.IsNullOrWhiteSpace(result.Number.ToString()))
                    {
                        return HealthCheckResult.Unhealthy("Floor data is not accessible! 💣");
                    }
                    else
                    {
                        return HealthCheckResult.Healthy("Floor data is accessible.");
                    }
                }
            }
            catch (Exception ex)
            {
                return HealthCheckResult.Unhealthy($"Floor data is not accessible! 💣 {ex.Message}");
            }
        }
    }
}
