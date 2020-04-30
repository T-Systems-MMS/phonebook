using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace Phonebook.Source.PeopleSoft.HealthChecks
{
    public class HealthCheckIdentityMetadata : IHealthCheck
    {
        public HealthCheckIdentityMetadata(IHttpClientFactory clientFactory, IConfiguration configuration)
        {
            ClientFactory = clientFactory;
            Configuration = configuration;
        }

        public IHttpClientFactory ClientFactory { get; }
        public IConfiguration Configuration { get; }

        public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
        {
            if (Configuration.GetValue<bool>("useAnonymous"))
            {
                return HealthCheckResult.Healthy("We don't use identity for anonymous.");
            }
            var metadataAddress = Configuration.GetValue<string>("WsFederationConfig:MetadataAddress");
            if (string.IsNullOrWhiteSpace(metadataAddress))
            {
                return HealthCheckResult.Unhealthy("The metadata address for ws-federation is empty. Can't respond to authentification requests. 💣");
            }
            var httpClient = ClientFactory.CreateClient();
            var result = await httpClient.GetAsync(metadataAddress);
            if (result.IsSuccessStatusCode)
            {
                return HealthCheckResult.Healthy("The identity provider is accessible.");
            }
            return HealthCheckResult.Unhealthy($"The identity provider return a bad status code. (Status code: {result.StatusCode} 💣");
        }
    }
}
