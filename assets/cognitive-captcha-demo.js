(() => {
  "use strict";
  const root = document.querySelector("[data-vz-captcha]");
  if (!root) return;

  const trials = [
    { target: "ELŪZ–MAHAR", answer: "ŠARTHAL", trap: "TARHĀN–ELŪZ" },
    { target: "XĀṆŌRAH", answer: "MĀTIR–ELŪZ", trap: "RAHMŌT–ŠĀ" },
    { target: "SĀR–ELŪZ", answer: "DĀRZAN", trap: "TARHĀN–ELŪZ" },
    { target: "ṆĀRAH–ŠĀ", answer: "GŌṆ–SIL", trap: "XĀṆŌRAH" },
  ];
  const target = root.querySelector("[data-vz-target]");
  const count = root.querySelector("[data-vz-count]");
  const result = root.querySelector("[data-vz-result]");
  const a = root.querySelector("[data-vz-a]");
  const b = root.querySelector("[data-vz-b]");
  const next = root.querySelector("[data-vz-next]");
  let index = 0;
  function render() {
    const trial = trials[index];
    const options = index % 2 ? [trial.trap, trial.answer] : [trial.answer, trial.trap];
    target.textContent = trial.target;
    count.textContent = `Public example ${index + 1} / ${trials.length}`;
    a.textContent = options[0];
    b.textContent = options[1];
    a.dataset.correct = String(options[0] === trial.answer);
    b.dataset.correct = String(options[1] === trial.answer);
    result.textContent = "";
    result.className = "vz-demo-result";
    a.disabled = false;
    b.disabled = false;
  }

  function choose(button) {
    const correct = button.dataset.correct === "true";
    result.textContent = correct
      ? "Matches the published prototype mapping."
      : "This is the morphology-oriented distractor in the public prototype.";
    result.className = `vz-demo-result ${correct ? "is-correct" : "is-wrong"}`;
    a.disabled = true;
    b.disabled = true;
  }
  a.addEventListener("click", () => choose(a));
  b.addEventListener("click", () => choose(b));
  next.addEventListener("click", () => {
    index = (index + 1) % trials.length;
    render();
  });
  render();
})();
