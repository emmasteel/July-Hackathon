// LEGACY SNIPPET — do not judge the style; that's the point. See README.md.
// This produces a summary report from a list of business records. It works, but
// it is untyped, mutation-heavy, hard to read, and untested. Your job (stretch
// goal S5) is to modernise it WITHOUT changing its behaviour.

// eslint-disable-next-line no-var
var STATES = ['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT'];

function buildReport(records) {
  var out = '';
  var total = 0;
  var active = 0;
  var cancelled = 0;
  var byState = {};
  for (var i = 0; i < STATES.length; i++) {
    byState[STATES[i]] = 0;
  }
  var gstYes = 0;

  for (var r = 0; r < records.length; r++) {
    var rec = records[r];
    total = total + 1;
    if (rec.status == 'Active') {
      active = active + 1;
    } else {
      cancelled = cancelled + 1;
    }
    if (byState[rec.state] != undefined) {
      byState[rec.state] = byState[rec.state] + 1;
    }
    if (rec.gst == true || rec.gst == 'Y' || rec.gst == 'yes') {
      gstYes = gstYes + 1;
    }
  }

  out = out + 'ABR SUMMARY REPORT\n';
  out = out + '==================\n';
  out = out + 'Total businesses: ' + total + '\n';
  out = out + 'Active: ' + active + '\n';
  out = out + 'Cancelled: ' + cancelled + '\n';
  var pct = 0;
  if (total > 0) {
    pct = Math.round((active / total) * 100);
  }
  out = out + 'Active percentage: ' + pct + '%\n';
  out = out + 'GST registered: ' + gstYes + '\n';
  out = out + 'By state:\n';
  for (var s = 0; s < STATES.length; s++) {
    var st = STATES[s];
    if (byState[st] > 0) {
      out = out + '  ' + st + ': ' + byState[st] + '\n';
    }
  }
  return out;
}

// Sample data + a demo run so you can see the current behaviour.
var SAMPLE = [
  { name: 'Alpha Pty Ltd', state: 'NSW', status: 'Active', gst: true },
  { name: 'Beta Co', state: 'VIC', status: 'Active', gst: 'Y' },
  { name: 'Gamma Group', state: 'VIC', status: 'Cancelled', gst: false },
  { name: 'Delta Trust', state: 'QLD', status: 'Active', gst: 'yes' },
  { name: 'Epsilon Inc', state: 'WA', status: 'Cancelled', gst: 'N' },
];

if (typeof require !== 'undefined' && require.main === module) {
  // eslint-disable-next-line no-console
  console.log(buildReport(SAMPLE));
}

if (typeof module !== 'undefined') {
  module.exports = { buildReport, SAMPLE, STATES };
}
