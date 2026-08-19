#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import json
import random
import math
from fastapi import FastAPI, Query
import uvicorn
from pydantic import BaseModel
from typing import Dict, List

# --- API Metadata ---
app = FastAPI(
    title="VARZIN Engine API",
    description="B2B Cognitive CAPTCHA & LLM Benchmarking API based on Aff(Z_N) geometry.",
    version="1.0.0"
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
    return {"status": "Online", "active_engine": "Varzin B2B SaaS Level-1"}

@app.get("/api/v1/generate", response_model=List[CaptchaTriplet], tags=["Data Generation"])
def generate_challenge(
    modulus: int = Query(12, description="The mathematical base N for the Affine group."),
    samples: int = Query(5, description="Number of cognitive test samples to generate.")
):
    """
    Generate a batch of Cognitive CAPTCHAs or Benchmarking logic gates.
    """
    engine = VarzinPGE(n_modulus=modulus)
    return engine.generate(num_samples=samples)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
