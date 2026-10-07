# Hair & Skin Clinic Booking

A modern dermatology clinic website with online appointment booking for hair and skin treatments.

The application provides a premium, responsive interface for showcasing clinic services, treatment information, and allowing patients to request appointments online.

## Live Demo

[Visit the live website](https://mohan-skin-hair-clinic.ai.studio)

## Features

- Premium dermatology clinic landing page
- Hair and skin treatment services
- Online appointment booking interface
- Responsive design for desktop, tablet, and mobile
- Modern UI with smooth animations
- AI-powered functionality using Google Gemini
- Express server integration
- Environment variable support
- TypeScript-based development
- Fast development and production builds with Vite

## Technology Stack

- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Express.js**
- **Google Gemini API**
- **Motion**
- **Lucide React**
- **dotenv**
- **Node.js**

## Project Structure

```text
Hair-Skin-Clinic-Booking/
├── mohan-skin-&-hair-clinic/
│   ├── components/
│   ├── public/
│   ├── src/
│   ├── server.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── README.md
└── README.md
```

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) version 18 or later
- npm

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Gowthamone7/Hair-Skin-Clinic-Booking.git
cd Hair-Skin-Clinic-Booking
```

### 2. Navigate to the application directory

```bash
cd "mohan-skin-&-hair-clinic"
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file inside the `mohan-skin-&-hair-clinic` directory:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Replace `your_gemini_api_key` with your Google Gemini API key.

### 5. Start the development server

```bash
npm run dev
```

The application will be available at the local address shown in your terminal.

## Available Scripts

Inside the `mohan-skin-&-hair-clinic` directory, you can run:

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build |
| `npm run start` | Starts the application server |
| `npm run preview` | Previews the production build |
| `npm run clean` | Removes the generated `dist` directory |
| `npm run lint` | Checks TypeScript files for errors |

## Production Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `GEMINI_API_KEY` | API key used for Google Gemini functionality | Yes |

Do not commit `.env.local` or any file containing private API keys to the repository.

## Customization

You can customize the application by modifying:

- Clinic name and branding
- Services and treatment information
- Appointment form fields
- Contact details
- Colors and typography
- Images and promotional content
- AI-powered features
- Clinic availability and booking logic

## Deployment

The application can be deployed using platforms such as:

- Vercel
- Netlify
- Render
- Railway
- Google Cloud
- Any Node.js-compatible hosting provider

Before deployment, make sure to:

1. Run the production build.
2. Configure the required environment variables.
3. Use the correct start command.
4. Verify that appointment booking works correctly.

## Security

- Keep API keys private.
- Use environment variables for sensitive configuration.
- Never commit `.env.local` files.
- Validate appointment form input on both the client and server.
- Use HTTPS in production.

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add your feature"
   ```

4. Push the branch:

   ```bash
   git push origin feature/your-feature-name
   ```

5. Open a pull request.

## License

This project currently does not specify a license.

If you intend to allow others to use, modify, or distribute this project, consider adding an appropriate open-source license.

## Contact

For questions, suggestions, or appointment-related inquiries, please contact the clinic through the contact details provided on the website.

---

Built with React, TypeScript, Tailwind CSS, Vite, Express, and Google Gemini.
