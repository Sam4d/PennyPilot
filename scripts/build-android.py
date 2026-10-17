"""Build a test APK using existing SDK/proxy configuration, without exposing credentials."""
import os
from pathlib import Path
import subprocess
import urllib.parse

root = Path(__file__).resolve().parent.parent
args = ["./gradlew", "--no-daemon", "--max-workers=4"]
proxy = urllib.parse.urlsplit(os.environ.get("HTTPS_PROXY", ""))
if proxy.hostname:
    if proxy.username or proxy.password:
        raise SystemExit("Use the platform's supported JVM authentication binding; credentials must not be copied into build arguments.")
    for protocol in ("https", "http"):
        args += [f"-D{protocol}.proxyHost={proxy.hostname}", f"-D{protocol}.proxyPort={proxy.port or 80}"]
# Use the machine's managed CA roots with a downloaded JDK as well.
managed_trust = Path('/etc/ssl/certs/java/cacerts')
if managed_trust.is_file():
    args.append(f'-Djavax.net.ssl.trustStore={managed_trust}')
args.append(":app:assembleDebug")
raise SystemExit(subprocess.call(args, cwd=root / "android"))
