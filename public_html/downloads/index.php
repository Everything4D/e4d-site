<?php
// Downloads page — lists every file in this folder on each request.
// Drop a file in via FTP and it appears; remove it and it disappears. Nothing to rebuild.
header('X-Robots-Tag: noindex, nofollow');

$exclude = ['index.php', 'index.html', '.htaccess'];
$files = [];
foreach (scandir(__DIR__) as $name) {
    if ($name[0] === '.' || in_array($name, $exclude, true)) continue;
    $path = __DIR__ . DIRECTORY_SEPARATOR . $name;
    if (!is_file($path)) continue;
    $files[] = ['name' => $name, 'size' => filesize($path), 'modified' => filemtime($path)];
}
usort($files, fn($a, $b) => strnatcasecmp($a['name'], $b['name']));

function fmt_size(int $b): string {
    if ($b < 1024) return $b . ' B';
    foreach (['KB', 'MB', 'GB'] as $u) {
        $b /= 1024;
        if ($b < 1024 || $u === 'GB') return ($b >= 10 ? round($b) : number_format($b, 1)) . ' ' . $u;
    }
}
$h = fn($s) => htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
?>
<!DOCTYPE html>
<html lang="en-US">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Downloads — Everything 4D</title>
<meta name="robots" content="noindex, nofollow">
<link rel="icon" type="image/svg+xml" href="/assets/e4d_icon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/page.css">
</head>
<body>

<header>
  <div class="wrap nav">
    <a href="/" class="logo" aria-label="Everything 4D home"><img class="logo-svg" src="/assets/e4d_banner.svg" alt="Everything 4D" width="512" height="76"></a>
    <nav aria-label="Main">
      <a href="/">Home</a>
      <a href="/#contact">Contact</a>
    </nav>
  </div>
</header>

<main class="page">
  <div class="wrap">
    <div class="bars-inline" aria-hidden="true"><span></span><span></span><span></span></div>
    <h1>Downloads</h1>
    <p class="updated">Files provided by Everything 4D.</p>

<?php if (!$files): ?>
    <p class="empty">There are no files available at the moment.</p>
<?php else: ?>
    <ul class="files">
<?php foreach ($files as $f): ?>
      <li><a href="<?= $h(rawurlencode($f['name'])) ?>" download="<?= $h($f['name']) ?>">
        <span class="name"><?= $h($f['name']) ?></span>
        <span class="meta"><?= fmt_size($f['size']) ?> · <?= date('M j, Y', $f['modified']) ?></span>
        <span class="get">Download</span>
      </a></li>
<?php endforeach; ?>
    </ul>
<?php endif; ?>
  </div>
</main>

<footer>
  <div class="wrap">
    <p class="disc">Everything 4D LLC is an independent consulting firm. We are not affiliated with, endorsed by, or representing 4D SAS.</p>
    <p>© <?= date('Y') ?> Everything 4D LLC · San Francisco, California · <a href="https://www.linkedin.com/company/everything4d/" target="_blank" rel="noopener" class="foot-link">LinkedIn</a> · <a href="https://github.com/Everything4D" target="_blank" rel="noopener" class="foot-link">GitHub</a> · <a href="/privacy.html" class="foot-link">Privacy</a> · <a href="/terms.html" class="foot-link">Terms</a></p>
    <div class="foot-bars" aria-hidden="true"><span></span><span></span><span></span></div>
  </div>
</footer>

</body>
</html>
