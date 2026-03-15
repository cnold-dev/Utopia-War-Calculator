# Utopia War Calculator

A browser extension for Microsoft Edge that adds a calculator panel directly to the [Utopia: Age of Convergence](https://utopia-game.com) game interface.

Created by **Orcasaurus Wrecks**

---

## Features

- **Overpop Calculator** — estimates how many acres an enemy province must lose to trigger Military Desertion, Rioting, and Thieves Strike
- **Dragon Fund Calculator** — calculates each province's proportional gold and food donation share for a dragon project
- **Dragon Slay Calculator** — splits dragon HP proportionally across your kingdom so every province knows their damage quota

---

## Requirements

- Microsoft Edge browser
- An intel site CSV export for your kingdom

---

## Installation

This extension is installed manually via Edge Developer Mode:

1. Download the latest ZIP from the [Releases](../../releases) page
2. Extract the ZIP to a permanent folder on your computer
3. Open Edge and go to `edge://extensions`
4. Enable **Developer mode** (bottom-left toggle)
5. Click **Load unpacked** and select the extracted folder
6. The extension activates automatically on `utopia-game.com`

> Do not delete the extracted folder — Edge loads the extension from it every time.

---

## How to Use

See the full **[User Guide](Utopia_War_Calculator_Guide.docx)** included in the release ZIP for detailed instructions on each calculator.

### Quick Start
1. Export an **Enemy CSV** from your intel site (for Overpop Calculator)
2. Export your **Own Kingdom CSV** from your intel site (for Dragon calculators)
3. Load each CSV into the appropriate upload field in the panel
4. Select a province or enter values to calculate

---

## Calculators

### Overpop Calculator
Loads enemy province data from CSV. Select a province to see:
- Intel age per op type (color coded by freshness)
- Province stats and modifiers
- Target acre thresholds for each overpop penalty level

### Dragon Fund Calculator
Loads your own kingdom CSV. Enter target kingdom networth and dragon type to see:
- Total gold and food cost
- Dragon HP
- Each province's proportional donation share

### Dragon Slay Calculator
Loads your own kingdom CSV. Enter the dragon's current HP to see:
- Each province's proportional HP share to deal

---

## Version History

| Version | Notes |
|---------|-------|
| 0.9.0 | Initial beta release |

---

## License

MIT — free to use, share, and modify.

---

## Credits

Built for Utopia Age 114: The Age of Convergence  
Created by Orcasaurus Wrecks (GitHub: [cnold-dev](https://github.com/cnold-dev))

## Video Tutorial

[![Utopia War Calculator Tutorial](https://img.youtube.com/vi/Eiw8PbTn3x8/0.jpg)](https://www.youtube.com/watch?v=Eiw8PbTn3x8)
