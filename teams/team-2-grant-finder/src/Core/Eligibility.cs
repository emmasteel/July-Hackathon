using System.Globalization;
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Team2GrantFinder.Core;

/// <summary>
/// Grant eligibility logic.
///
/// Pure logic — no UI, no network. Unit-tested in tests/EligibilityTests.cs.
///
/// Design principle for this feature: a match must ALWAYS explain WHY it matched
/// (or why it did not). Eligibility for public funding must be transparent, so
/// every result carries human-readable reasons.
///
/// Security note: the business profile comes from user input and is treated as
/// untrusted. We validate it at the boundary (see <see cref="Eligibility.ValidateProfile"/>)
/// before any eligibility logic runs.
/// </summary>
public static class Eligibility
{
    /// <summary>All states/territories, in the order shown in the UI dropdown.</summary>
    public static readonly IReadOnlyList<State> States =
    [
        State.NSW, State.VIC, State.QLD, State.SA, State.WA, State.TAS, State.NT, State.ACT,
    ];

    /// <summary>All industries, in the order shown in the UI dropdown.</summary>
    public static readonly IReadOnlyList<Industry> Industries =
    [
        Industry.Agriculture, Industry.Manufacturing, Industry.Technology,
        Industry.Retail, Industry.Health, Industry.Tourism,
    ];

    /// <summary>The sample grants, loaded once from the embedded fixture.</summary>
    public static readonly IReadOnlyList<Grant> Grants = LoadGrants();

    /// <summary>
    /// Validate a business profile at the boundary. Returns per-field errors so the
    /// UI can show accessible, specific messages next to each field.
    /// </summary>
    public static ProfileValidationResult ValidateProfile(ProfileDraft profile)
    {
        var errors = new Dictionary<string, string>();

        if (profile.State is null)
        {
            errors["state"] = "Select a state or territory.";
        }

        if (profile.Industry is null)
        {
            errors["industry"] = "Select an industry.";
        }

        if (profile.Employees is null or < 0)
        {
            errors["employees"] = "Enter the number of employees (0 or more).";
        }

        if (profile.AnnualTurnover is null or < 0)
        {
            errors["annualTurnover"] = "Enter your annual turnover in dollars (0 or more).";
        }

        if (profile.YearsTrading is null or < 0)
        {
            errors["yearsTrading"] = "Enter how many years you have been trading (0 or more).";
        }

        return new ProfileValidationResult(errors.Count == 0, errors);
    }

    /// <summary>
    /// Check a single grant against a validated profile, returning the match plus
    /// the reasons for/against. Assumes the profile has passed <see cref="ValidateProfile"/>.
    /// </summary>
    public static EligibilityResult CheckGrant(Grant grant, BusinessProfile profile)
    {
        var reasonsFor = new List<string>();
        var reasonsAgainst = new List<string>();

        if (grant.EligibleStates is not null)
        {
            if (grant.EligibleStates.Contains(profile.State))
            {
                reasonsFor.Add($"Available in {profile.State}.");
            }
            else
            {
                reasonsAgainst.Add($"Only available in {string.Join(", ", grant.EligibleStates)}.");
            }
        }

        if (grant.EligibleIndustries is not null)
        {
            if (grant.EligibleIndustries.Contains(profile.Industry))
            {
                reasonsFor.Add($"Open to the {profile.Industry} industry.");
            }
            else
            {
                reasonsAgainst.Add($"Only for: {string.Join(", ", grant.EligibleIndustries)}.");
            }
        }

        if (grant.MaxEmployees is int maxEmployees)
        {
            if (profile.Employees <= maxEmployees)
            {
                reasonsFor.Add($"Within the {maxEmployees}-employee limit.");
            }
            else
            {
                reasonsAgainst.Add($"Limited to {maxEmployees} employees or fewer.");
            }
        }

        if (grant.MaxTurnover is decimal maxTurnover)
        {
            if (profile.AnnualTurnover <= maxTurnover)
            {
                reasonsFor.Add($"Turnover is within the ${FormatMoney(maxTurnover)} cap.");
            }
            else
            {
                reasonsAgainst.Add($"Turnover must be ${FormatMoney(maxTurnover)} or less.");
            }
        }

        if (grant.MinYearsTrading is int minYearsTrading)
        {
            if (profile.YearsTrading >= minYearsTrading)
            {
                reasonsFor.Add($"Meets the {minYearsTrading}+ years trading requirement.");
            }
            else
            {
                reasonsAgainst.Add($"Must have traded for at least {minYearsTrading} years.");
            }
        }

        return new EligibilityResult(grant, reasonsAgainst.Count == 0, reasonsFor, reasonsAgainst);
    }

    /// <summary>
    /// Evaluate all grants for a profile. Returns eligible grants first, each with
    /// its explanation.
    /// </summary>
    public static IReadOnlyList<EligibilityResult> FindGrants(BusinessProfile profile) =>
        Grants
            .Select(grant => CheckGrant(grant, profile))
            .OrderByDescending(result => result.Eligible) // OrderBy is stable → preserves input order within each group.
            .ToList();

    /// <summary>Format an amount as an en-AU-style grouped number (e.g. 2,000,000).</summary>
    public static string FormatMoney(decimal amount) =>
        amount.ToString("N0", CultureInfo.InvariantCulture);

    private static IReadOnlyList<Grant> LoadGrants()
    {
        var assembly = typeof(Eligibility).Assembly;
        var resourceName = assembly
            .GetManifestResourceNames()
            .Single(name => name.EndsWith("grants-sample-data.json", StringComparison.Ordinal));

        using var stream = assembly.GetManifestResourceStream(resourceName)
            ?? throw new InvalidOperationException("Embedded sample data not found.");

        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
            Converters = { new JsonStringEnumConverter() },
        };
        return JsonSerializer.Deserialize<List<Grant>>(stream, options) ?? [];
    }
}

/// <summary>Australian states and territories.</summary>
public enum State
{
    NSW,
    VIC,
    QLD,
    SA,
    WA,
    TAS,
    NT,
    ACT,
}

/// <summary>Supported industries.</summary>
public enum Industry
{
    Agriculture,
    Manufacturing,
    Technology,
    Retail,
    Health,
    Tourism,
}

/// <summary>The business profile a user enters to check eligibility.</summary>
/// <param name="State">The business's state or territory.</param>
/// <param name="Industry">The business's industry.</param>
/// <param name="Employees">Number of employees (>= 0).</param>
/// <param name="AnnualTurnover">Annual turnover in AUD (>= 0).</param>
/// <param name="YearsTrading">Years the business has been operating (>= 0).</param>
public sealed record BusinessProfile(
    State State,
    Industry Industry,
    int Employees,
    decimal AnnualTurnover,
    int YearsTrading);

/// <summary>
/// A partially-filled profile from the form. Any field may be missing (null),
/// which is what <see cref="Eligibility.ValidateProfile"/> checks for.
/// </summary>
public sealed record ProfileDraft(
    State? State = null,
    Industry? Industry = null,
    int? Employees = null,
    decimal? AnnualTurnover = null,
    int? YearsTrading = null);

/// <summary>Eligibility rules for a grant. Missing (null) fields mean "no restriction".</summary>
public sealed record Grant(
    string Id,
    string Name,
    string Description,
    decimal Amount,
    IReadOnlyList<State>? EligibleStates = null,
    IReadOnlyList<Industry>? EligibleIndustries = null,
    int? MaxEmployees = null,
    decimal? MaxTurnover = null,
    int? MinYearsTrading = null);

/// <summary>The outcome of checking one grant against a profile.</summary>
/// <param name="Grant">The grant that was checked.</param>
/// <param name="Eligible">Whether the profile is eligible for this grant.</param>
/// <param name="ReasonsFor">Human-readable reasons the grant matched.</param>
/// <param name="ReasonsAgainst">Human-readable reasons the grant did NOT match.</param>
public sealed record EligibilityResult(
    Grant Grant,
    bool Eligible,
    IReadOnlyList<string> ReasonsFor,
    IReadOnlyList<string> ReasonsAgainst);

/// <summary>The outcome of validating a profile draft.</summary>
/// <param name="Valid">Whether the draft is valid.</param>
/// <param name="Errors">Field name → error message. Empty when valid.</param>
public sealed record ProfileValidationResult(
    bool Valid,
    IReadOnlyDictionary<string, string> Errors);
