using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Team1Abr.Web;

var builder = WebAssemblyHostBuilder.CreateDefault(args);

// Single-page app: the root component composes the whole feature.
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

await builder.Build().RunAsync();
