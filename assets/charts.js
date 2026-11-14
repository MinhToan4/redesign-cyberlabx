/* Biểu đồ tối giản bằng SVG, đọc màu từ token nên tự đổi theo giao diện sáng/tối. */
(function () {
  var NS = 'http://www.w3.org/2000/svg';

  // Radar kỹ năng: data = [{ name, value 0-100 }], tối thiểu 3 trục.
  function radar(host, data, opts) {
    opts = opts || {};
    var size = opts.size || 300, cx = size / 2, cy = size / 2 + 4, R = size / 2 - 62, n = data.length;
    var pt = function (i, f) { var a = -Math.PI / 2 + (i * 2 * Math.PI) / n; return [cx + Math.cos(a) * R * f, cy + Math.sin(a) * R * f]; };
    var ring = function (f) { return data.map(function (_, i) { return pt(i, f).join(','); }).join(' '); };
    var s = '<svg viewBox="0 0 ' + size + ' ' + (size + 8) + '" width="100%" role="img" aria-label="Radar kỹ năng">';
    [0.25, 0.5, 0.75, 1].forEach(function (f) { s += '<polygon points="' + ring(f) + '" fill="none" stroke="var(--line)" stroke-width="1"/>'; });
    data.forEach(function (_, i) { var p = pt(i, 1); s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + p[0] + '" y2="' + p[1] + '" stroke="var(--line)"/>'; });
    var shape = data.map(function (d, i) { return pt(i, d.value / 100).join(','); }).join(' ');
    s += '<polygon points="' + shape + '" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.5" stroke-linejoin="round"/>';
    data.forEach(function (d, i) {
      var p = pt(i, d.value / 100); s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="3" fill="var(--accent)"/>';
      var l = pt(i, 1.2); var anchor = l[0] < cx - 4 ? 'end' : l[0] > cx + 4 ? 'start' : 'middle';
      s += '<text x="' + l[0] + '" y="' + (l[1] - 2) + '" text-anchor="' + anchor + '" font-size="12" fill="var(--text-2)">' + d.name + '</text>';
      s += '<text x="' + l[0] + '" y="' + (l[1] + 12) + '" text-anchor="' + anchor + '" font-size="11" fill="var(--text-3)" font-family="var(--mono)">' + d.value + '%</text>';
    });
    host.innerHTML = s + '</svg>' + '<ul class="sr-only">' + data.map(function (d) { return '<li>' + d.name + ': ' + d.value + '%</li>'; }).join('') + '</ul>';
  }

  // Lưới hoạt động: heat = mảng mức 0-4 theo cột-tuần (7 ngày mỗi tuần).
  function heatmap(host, heat) {
    var weeks = Math.ceil(heat.length / 7), cell = 12, gap = 3, w = weeks * (cell + gap), h = 7 * (cell + gap);
    var s = '<svg viewBox="0 0 ' + w + ' ' + h + '" width="100%" role="img" aria-label="Hoạt động nộp bài 12 tháng gần nhất" style="display:block">';
    heat.forEach(function (v, i) {
      var x = Math.floor(i / 7) * (cell + gap), y = (i % 7) * (cell + gap);
      s += '<rect x="' + x + '" y="' + y + '" width="' + cell + '" height="' + cell + '" rx="3" fill="var(--heat-' + v + ')"/>';
    });
    var active = heat.filter(function (v) { return v > 0; }).length;
    host.innerHTML = s + '</svg><p class="sr-only">' + active + ' ngày có hoạt động nộp bài trong ' + weeks + ' tuần gần nhất.</p>';
  }

  window.CLXCharts = { radar: radar, heatmap: heatmap };
})();
