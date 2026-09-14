#!/usr/bin/env python3
import os
import sys
from pathlib import Path

from fastapi.testclient import TestClient

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

import main

SECRET = "ci-test-proxy-secret"


def request(client, secret=None, **params):
    headers = {"X-RapidAPI-Proxy-Secret": secret} if secret else {}
    return client.get("/api/v1/generate", headers=headers, params=params)


def main_check():
    client = TestClient(main.app)

    # Public health/status is intentionally reachable without billing credentials.
    health = client.get("/")
    assert health.status_code == 200, health.text
    assert "v1.0.2" in health.json()["active_engine"]

    # Production defaults fail closed if the trusted RapidAPI proxy secret is absent.
    os.environ.pop("RAPIDAPI_PROXY_SECRET", None)
    os.environ.pop("VARZIN_ALLOW_DIRECT_API", None)
    assert request(client).status_code == 503

    os.environ["RAPIDAPI_PROXY_SECRET"] = SECRET
    assert request(client).status_code == 403
    assert request(client, "wrong-secret").status_code == 403

    ok = request(client, SECRET, modulus=12, samples=5)
    assert ok.status_code == 200, ok.text
    payload = ok.json()
    assert len(payload) == 5
    assert all(row["correct_answer"] == "A" for row in payload)

    # Basic resource-abuse guards.
    assert request(client, SECRET, samples=0).status_code == 422
    assert request(client, SECRET, samples=101).status_code == 422
    assert request(client, SECRET, modulus=1).status_code == 422
    assert request(client, SECRET, modulus=257).status_code == 422

    print("PASS: origin locked to RapidAPI proxy secret; bounds and 5-sample generation verified")


if __name__ == "__main__":
    main_check()
