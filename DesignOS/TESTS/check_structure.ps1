$root = Split-Path -Parent $PSScriptRoot
$required = @(
    'AGENTS.md', 'README.md', '00_SPEC', '00_SPEC\requirements.md',
    '00_SPEC\design.md', '00_SPEC\tasks.md', '00_SPEC\tests.md',
    '00_SPEC\roadmap.md', 'CORE', 'SYSTEMS', 'TESTS', 'EVIDENCE',
    'KNOWLEDGE', 'DOCUMENTATION'
)
$missing = $required | Where-Object { -not (Test-Path (Join-Path $root $_)) }
if ($missing) {
    Write-Output 'FAIL'
    Write-Output ('Missing: ' + ($missing -join ', '))
    exit 1
}
Write-Output 'PASS'
