# Da stehe ich nun…

![Da stehe ich nun…](https://julian.palacz.at/site/assets/files/1473/da_stehe_ich_nun.1300x0.jpg)

## Project Description

"Da stehe ich nun…" is an innovative project that bridges art, technology, and urban space. It draws from a database of public artworks in Vienna, transforming factual data into a detective's immersive monologue. Each database entry is reimagined using an LLM, creating text fragments that form a cohesive narrative. These fragments highlight overlooked details, such as inscriptions, hidden elements, and contextual connections, offering a vivid and detailed perspective on Vienna's public art.

This project explores the creative potential of automation, presenting Vienna's art and urban landscape in a new light through alternative storytelling. It is part of Vienna's Urban Art (Paraflows / Günther Friesinger & Judith Fegerl) and funded by "Kunst und Kultur im digitalen Raum - Call 2021" by BMKÖS and the City of Vienna, MA7. Original data is sourced from the Magistrat Wien (MA7 - Kultur) and available on data.gv.at.

For more information, visit [julian.palacz.at](https://julian.palacz.at/spuren/da-stehe-ich-nun).

---

## How to Run the Project

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A modern browser

### Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/dreerr/da-stehe-ich-nun-app.git
   cd da-stehe-ich-nun-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy the `.env.example` file to `.env` and update the environment variables as needed.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the app in your browser:
   ```
   http://localhost:5173
   ```

### Build for Production

To build the project for production, run:

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Linting and Formatting

To check for linting issues, run:

```bash
npm run lint
```

To format the code, run:

```bash
npm run format
```

---

## License

This project is licensed under [MIT License](LICENSE).

## Acknowledgments

- Original data provided by Magistrat Wien - MA7 - Kultur.
- Part of protestFORMEN – Vienna's Urban Art (Judith Fegerl & Günther Friesinger).
