using System.Reflection;
using System.Text.Json;

namespace Team1Abr.Core;

/// <summary>
/// Lookup of ABN details from LOCAL sample data only.
///
/// IMPORTANT: This does NOT call the live Australian Business Register
/// (abr.business.gov.au). For the hackathon we use a small static fixture so the
/// app and tests are fast, deterministic, and safe. Replacing this with a real
/// API call (with proper validation, error handling, and rate limiting) could be
/// a follow-up beyond the event.
/// </summary>
public static class Lookup
{
    private static readonly IReadOnlyList<BusinessRecord> Records = LoadRecords();

    /// <summary>
    /// Find a business by its normalised 11-digit ABN. Returns null when not found.
    /// Assumes the ABN has already passed <see cref="Abn.Validate"/>.
    /// </summary>
    public static BusinessRecord? LookupAbn(string normalisedAbn) =>
        Records.FirstOrDefault(record => record.Abn == normalisedAbn);

    private static IReadOnlyList<BusinessRecord> LoadRecords()
    {
        var assembly = typeof(Lookup).Assembly;
        var resourceName = assembly
            .GetManifestResourceNames()
            .Single(name => name.EndsWith("abn-sample-data.json", StringComparison.Ordinal));

        using var stream = assembly.GetManifestResourceStream(resourceName)
            ?? throw new InvalidOperationException("Embedded sample data not found.");

        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
        return JsonSerializer.Deserialize<List<BusinessRecord>>(stream, options) ?? [];
    }
}

/// <summary>A single business record from the sample data.</summary>
public sealed record BusinessRecord(
    string Abn,
    string EntityName,
    string EntityType,
    string AbnStatus,
    string State,
    string Postcode,
    bool GstRegistered);
