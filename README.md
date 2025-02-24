
# Math Practice App with Handwriting Recognition

A web application that allows users to practice math problems by writing solutions on a digital canvas. The app uses AI to recognize handwritten mathematical expressions and provides instant feedback.

Inspired by the [stackup.dev] February Hackathon challenge to create an interactive math learning experience with handwriting recognition and AI-assisted question generation.


## Features

- Interactive drawing canvas with touch support
- Handwriting recognition for mathematical expressions
- Real-time MathJax rendering of recognized equations
- Drawing tools (undo, clear)
- Support for multi-line equations
- Mobile-responsive design

## Demo
https://math-handwriting-recognition-app.vercel.app/


## Tech Stack

- Next.js
- Tailwind CSS
- DaisyUI
- better-react-mathjax
- Canvas API
- OpenAI API (for handwriting recognition)

## Prerequisites

- Node.js 16.8 or later
- npm or yarn
- OpenAI API key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/abrahamebij/math-handwriting-recognition-app
cd math-practice-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
GENAI_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

## Usage

1. View a math problem displayed at the top of the screen
2. Write your solution on the canvas using mouse or touch
3. Use the toolbar to undo strokes or clear the canvas
4. Click submit to convert your handwriting to mathematical notation
5. View the recognized equation rendered with MathJax

## Project Structure

```
src/
├── app/
│   ├── page.tsx            # Landing page
│   └── practice/           # Practice interface
├── components/
│   └── PracticeInterface/  # Main canvas component
└── lib/
    └── utils/             # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Acknowledgments

- Google GenAI API for the handwriting recognition API
- better-react-mathjax for equation rendering
- Canvas API for drawing functionality