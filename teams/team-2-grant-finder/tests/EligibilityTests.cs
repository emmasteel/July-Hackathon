using Team2GrantFinder.Core;
using Xunit;

namespace Team2GrantFinder.Tests;

public class EligibilityTests
{
    // A profile that qualifies for several grants — used across the matching tests.
    private static readonly BusinessProfile ValidProfile =
        new(State.VIC, Industry.Manufacturing, 15, 1_000_000m, 3);

    [Fact]
    public void ValidateProfile_AcceptsACompleteProfile()
    {
        var draft = new ProfileDraft(State.VIC, Industry.Manufacturing, 15, 1_000_000m, 3);

        var result = Eligibility.ValidateProfile(draft);

        Assert.True(result.Valid);
        Assert.Empty(result.Errors);
    }

    [Fact]
    public void ValidateProfile_RejectsAMissingState()
    {
        var draft = new ProfileDraft(State: null, Industry.Manufacturing, 15, 1_000_000m, 3);

        var result = Eligibility.ValidateProfile(draft);

        Assert.False(result.Valid);
        Assert.Equal("Select a state or territory.", result.Errors["state"]);
    }

    [Fact]
    public void ValidateProfile_RejectsNegativeEmployees()
    {
        var draft = new ProfileDraft(State.VIC, Industry.Manufacturing, -1, 1_000_000m, 3);

        var result = Eligibility.ValidateProfile(draft);

        Assert.False(result.Valid);
        Assert.Equal("Enter the number of employees (0 or more).", result.Errors["employees"]);
    }

    [Fact]
    public void ValidateProfile_RejectsMissingTurnover()
    {
        // In the UI a non-numeric turnover parses to null (the equivalent of the TS NaN case).
        var draft = new ProfileDraft(State.VIC, Industry.Manufacturing, 15, AnnualTurnover: null, 3);

        var result = Eligibility.ValidateProfile(draft);

        Assert.False(result.Valid);
        Assert.Equal("Enter your annual turnover in dollars (0 or more).", result.Errors["annualTurnover"]);
    }

    [Fact]
    public void CheckGrant_MatchesAnInStateManufacturer()
    {
        var grant = Eligibility.Grants.Single(g => g.Id == "regional-manufacturing");

        var result = Eligibility.CheckGrant(grant, ValidProfile);

        Assert.True(result.Eligible);
        Assert.NotEmpty(result.ReasonsFor);
        Assert.Empty(result.ReasonsAgainst);
    }

    [Fact]
    public void CheckGrant_RejectsAnOutOfStateBusiness()
    {
        var grant = Eligibility.Grants.Single(g => g.Id == "regional-manufacturing");
        var nswManufacturer = new BusinessProfile(State.NSW, Industry.Manufacturing, 15, 1_000_000m, 3);

        var result = Eligibility.CheckGrant(grant, nswManufacturer);

        Assert.False(result.Eligible);
        Assert.Contains(result.ReasonsAgainst, reason => reason.Contains("Only available in"));
    }

    [Fact]
    public void FindGrants_ReturnsEligibleGrantsFirst()
    {
        var results = Eligibility.FindGrants(ValidProfile);

        var firstIneligibleIndex = results
            .Select((result, index) => (result, index))
            .Where(x => !x.result.Eligible)
            .Select(x => x.index)
            .DefaultIfEmpty(results.Count)
            .First();

        // Every eligible result must appear before the first ineligible one.
        Assert.All(
            results.Take(firstIneligibleIndex),
            result => Assert.True(result.Eligible));
    }

    [Fact]
    public void Grants_AreLoadedFromTheEmbeddedFixture()
    {
        Assert.Equal(6, Eligibility.Grants.Count);
        Assert.Contains(Eligibility.Grants, g => g.Id == "small-biz-digital");
    }

    [Fact]
    public void FormatMoney_GroupsThousands()
    {
        Assert.Equal("2,000,000", Eligibility.FormatMoney(2_000_000m));
    }
}
