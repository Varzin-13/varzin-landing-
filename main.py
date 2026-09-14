#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import json
import random
import math
import hmac
from fastapi import FastAPI, Query, Header, HTTPException, Depends
import uvicorn
from pydantic import BaseModel
from typing import Dict, List

# --- API Metadata ---
app = FastAPI(
    title="VARZIN Engine API",
    description="B2B Cognitive CAPTCHA & LLM Benchmarking API based on Aff(Z_N) geometry.",
    version="1.0.2"
)

# --- Response Models for Auto-Documentation ---
class CaptchaTriplet(BaseModel):
    algebraic_rule: str
    target: str
    options: Dict[str, str]
    correct_answer: str
    trap_answer: str
    logic: str

class HealthStatus(BaseModel):
    status: str
    active_engine: str


def require_rapidapi_proxy(
    x_rapidapi_proxy_secret: str | None = Header(default=None, alias="X-RapidAPI-Proxy-Secret")
):
    """Restrict billable engine calls to RapidAPI's trusted proxy.

    Local/test bypass is opt-in only. Production should set RAPIDAPI_PROXY_SECRET
    to the value shown in RapidAPI Provider Dashboard > Security/Gateway.
    """
    if os.environ.get("VARZIN_ALLOW_DIRECT_API") == "1":
        return True

    expected = os.environ.get("RAPIDAPI_PROXY_SECRET")
    if not expected:
        raise HTTPException(
            status_code=503,
            detail="Commercial API origin protection is not configured."
        )

    if not x_rapidapi_proxy_secret or not hmac.compare_digest(
        x_rapidapi_proxy_secret, expected
    ):
        raise HTTPException(
            status_code=403,
            detail="Direct origin access is disabled. Use the RapidAPI gateway."
        )
    return True

# --- Core Mathematical Engine ---
class VarzinPGE:
    def __init__(self, n_modulus=12):
        self.N = n_modulus
        self.elements = list(range(self.N))
        self.roots = [
            "MAHAR", "DŌZ", "XĀṆ", "RAHT", "SIL", "ZARTH", 
            "NĀR", "TŪR", "ZĀH", "RIT", "KĀN", "RIM"
        ]
        while len(self.roots) < self.N:
            self.roots.append(f"VĀR{len(self.roots)}")
        self.prefixes = ["ELŪZ", "ŠĀ", "ṆĀRAH", "SAVAR", "TARHĀN"]

    def _get_coprimes(self):
        return [a for a in range(1, self.N) if math.gcd(a, self.N) == 1]

    def generate(self, num_samples):
        dataset = []
        valid_a = self._get_coprimes()
        for _ in range(num_samples):
            a = random.choice(valid_a)
            b = random.randint(0, self.N - 1)
            x = random.choice(self.elements)
            y = (a * x + b) % self.N
            
            available_traps = [e for e in self.elements if e != y]
            z = random.choice(available_traps)
            
            shared_prefix = random.choice(self.prefixes)
            
            dataset.append({
                "algebraic_rule": f"f(x) = ({a}x + {b}) mod {self.N}",
                "target": f"{shared_prefix}-{self.roots[x]}",
                "options": {
                    "A": self.roots[y],
                    "B": f"{shared_prefix}-{self.roots[z]}"
                },
                "correct_answer": "A",
                "trap_answer": "B",
                "logic": "Option A is the true affine mapping. Option B is a morphological hijack."
            })
        return dataset

# --- API Endpoints ---
@app.get("/", response_model=HealthStatus, tags=["System"])
def read_root():
    """Check if the Varzin Cloud Engine is running."""
    return {"status": "Online", "active_engine": "Varzin B2B SaaS Level-1 / v1.0.2"}

@app.get("/api/v1/generate", response_model=List[CaptchaTriplet], tags=["Data Generation"])
def generate_challenge(
    modulus: int = Query(12, ge=2, le=256, description="The mathematical base N for the Affine group."),
    samples: int = Query(5, ge=1, le=100, description="Number of cognitive test samples to generate."),
    _rapidapi_ok: bool = Depends(require_rapidapi_proxy),
):
    """
    Generate a batch of Cognitive CAPTCHAs or Benchmarking logic gates.
    """
    engine = VarzinPGE(n_modulus=modulus)
    return engine.generate(num_samples=samples)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
