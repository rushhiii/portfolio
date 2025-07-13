[![Portfolio Preview](./assets/ele/preview.png)](https://rushii-portfolio.netlify.app)

# ★ Portfolio Website

**A modern, responsive portfolio website showcasing my journey as a Computer Science student and developer. Built with clean HTML, CSS, and JavaScript, featuring smooth animations and dark/light theme toggle.**

<h4>

A modern, responsive portfolio website showcasing my journey as a Computer Science student and developer. Built with clean HTML, CSS, and JavaScript, featuring smooth animations and dark/light theme toggle.

</h4>

<!-- 🔗 **[View Live Portfolio](https://rushii-portfolio.netlify.app)**  
🔗 **[Terminal Portfolio](https://github.com/rushhiii/Rushi-Bashfolio)** - Alternative bash-style portfolio -->



  [![My Portfolio Badge](https://img.shields.io/badge/Netlify-rushii%20portfolio-6366f1?style=for-the-badge&logo=netlify&logoColor=white&labelColor=2E3440)](https://rushii-portfolio.netlify.app)


<div>
  <p>
    <br>
  </p>
</div>

## Technologies Used

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Grid & Flexbox
- **JavaScript (ES6+)** - Interactive functionality
- **Font Awesome** - Icon library
- **Google Fonts** - Typography (Inter, Space Grotesk)

### Deployment & Tools
- **Netlify** - Hosting and form handling
- **Git** - Version control
- **VS Code** - Development environment

## Project Structure

```
Website-Portfolio/
├── index.html              # Main HTML file
├── thank-you.html          # Success page for form submissions
├── css/
│   └── style.css          # All styles and animations
├── js/
│   └── script.js          # Interactive functionality
├── assets/
│   ├── ele/               # Design elements and logos
│   ├── profile.jpg        # Profile image
│   └── rushi_tech_resume.pdf  # Resume download
├── projects.json          # Project data
├── .gitignore            # Git ignore rules
├── LICENSE               # Project license
└── README.md             # Project documentation
```

## Getting Started

### Prerequisites
- Web browser (Chrome, Firefox, Safari, Edge)
- Code editor (VS Code recommended)
- Git (for version control)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/rushhiii/Website-Portfolio.git
   cd Website-Portfolio
   ```

2. **Open in your browser**
   - Simply open `index.html` in your web browser
   - Or use a local server for better development experience:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using VS Code Live Server extension
   # Right-click on index.html → "Open with Live Server"
   ```

3. **View the website**
   - Open `http://localhost:8000` in your browser

### Customization

1. **Update Personal Information**
   - Edit `index.html` to update name, description, and contact details
   - Replace profile image in `assets/` folder
   - Update resume file in `assets/` folder

2. **Add Your Projects**
   - Update `projects.json` with your project data
   - Add project images to `assets/` folder

3. **Customize Styling**
   - Modify CSS variables in `css/style.css` for colors and themes
   - Update fonts in the `<head>` section of `index.html`

4. **Contact Form Setup**
   - Form is pre-configured for Netlify
   - Update form action and notification emails as needed

## Deployment

### Netlify (Recommended)

1. **Fork this repository** to your GitHub account

2. **Connect to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Choose your forked repository
   - Deploy with default settings

3. **Configure Forms**
   - Forms work automatically with Netlify
   - Check form submissions in Netlify dashboard
   - Set up email notifications in site settings

### Alternative Deployment Options

- **Vercel**: Connect GitHub repo for automatic deployment
- **GitHub Pages**: Enable in repository settings
- **Firebase Hosting**: Use Firebase CLI for deployment

## Contact Form Configuration

The contact form is configured to work with Netlify Forms:

```html
<form name="portfolio-contact" method="POST" data-netlify="true" action="/thank-you" netlify-honeypot="bot-field">
```

- **Spam Protection**: Includes honeypot field
- **Success Page**: Redirects to custom thank-you page
- **Email Notifications**: Configure in Netlify dashboard

## Customization Guide

<details>
<summary> Theme Colors </summary>
Update CSS variables in `style.css`:
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --accent-color: #f093fb;
  /* ... more variables */
}
```

</details>

<details>
<summary>Adding New Projects</summary>
Update `projects.json`:
```json
{
  "title": "Your Project",
  "description": "Project description",
  "image": "./assets/project-image.jpg",
  "tags": ["HTML", "CSS", "JavaScript"],
  "category": "web",
  "github": "https://github.com/username/repo",
  "demo": "https://your-demo-url.com"
}
```
</details>


## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

**Tirth Patel**  
📧 Email: rushiofficial1205@gmail.com  
💼 LinkedIn: [in/rushhiii](https://linkedin.com/in/rushhiii)  
🐙 GitHub: [@rushhiii](https://github.com/rushhiii)  
🌐 Portfolio: [rushii-portfolio.netlify.app](https://rushii-portfolio.netlify.app/)

#

<p align="center">Built with 💜 by Tirth Patel </p>
