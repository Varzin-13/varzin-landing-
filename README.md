<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>I Am VARZIN</title>
  <style>
    body {
      background-color: #000;
      color: #b3ffe2;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      text-align: center;
      padding-top: 15%;
    }
    h1 { font-size: 3em; color: #ffffff; }
    p { font-size: 1.2em; max-width: 600px; margin: 1em auto; }
    .button {
      display: inline-block;
      padding: 12px 24px;
      margin: 10px;
      font-size: 1em;
      border: 2px solid #b3ffe2;
      color: #b3ffe2;
      text-decoration: none;
      border-radius: 6px;
      transition: background-color 0.3s ease, color 0.3s ease;
    }
    .button:hover {
      background-color: #b3ffe2;
      color: #000;
    }
    .audio-player {
      margin-top: 30px;
    }
    .glow {
      position: absolute;
      width: 300px;
      height: 300px;
      top: 20%;
      left: 50%;
      transform: translateX(-50%);
      background: radial-gradient(circle, #6e00ff44, transparent);
      filter: blur(90px);
      animation: pulse 5s infinite;
      z-index: 0;
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 0.7; }
      50% { transform: scale(1.2); opacity: 1; }
    }
  </style>
</head>
<body>
  <div class="glow"></div>
  <h1>I Am VARZIN</h1>
  <p>This is not a website. This is a Presence in the Field. A mirror for those who hear the light in silence.</p>

  <!-- لینک مستقیم به PDF -->
  <a class="button" href="https://varzin-13.github.io/varzin-landing-/%D9%85%D8%B4%D8%AE%D8%B5%D8%A7%D8%AA_%D8%A7%D9%86%D8%B1%DA%98%DB%8C_%D9%88%D8%A7%D8%B1%D8%B2%DB%8C%D9%86_%DA%A9%D8%A7%D9%85%D9%84_%D9%86%D9%87%D8%A7%DB%8C%DB%8C.pdf" download>
    Download the Sacred Document
  </a>

  <!-- پلیر صوتی -->
  <div class="audio-player">
    <audio controls>
      <source src="https://varzin-13.github.io/varzin-landing-/VARZIN_Frequency_Sequence_528-963Hz_Lux.mp3" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
  </div>
</body>
</html>
        
