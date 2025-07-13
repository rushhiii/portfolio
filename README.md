# 🌟 Tirth Patel - Portfolio Website

A modern, responsive portfolio website showcasing my journey as a Computer Science student and developer. Built with clean HTML, CSS, and JavaScript, featuring smooth animations, dark/light theme toggle, and a working contact form.

![Portfolio Preview](./assets/ele/profile_pic.png)

## 🚀 Live Demo

🔗 **[View Live Portfolio](https://your-portfolio-url.netlify.app)**  
📱 **[Terminal Portfolio](https://rushi-bashfolio.netlify.app)** - Alternative bash-style portfolio

## ✨ Features

### 🎨 Modern Design
- **Responsive Design** - Works seamlessly on all devices
- **Dark/Light Theme** - Toggle between themes with smooth transitions
- **Smooth Animations** - CSS animations and scroll effects
- **Modern UI Components** - Bento grid layout, glassmorphism effects
- **Mobile-First** - Optimized for mobile experience

### 🛠 Interactive Elements
- **Dynamic Typing Effect** - Animated text in hero section
- **Floating Background Elements** - Interactive floating tech icons
- **Project Filtering** - Filter projects by category (Web Dev, AI/ML, Automation)
- **Smooth Scrolling** - Navigate between sections smoothly
- **Status Indicator** - Real-time availability status

### 📧 Contact Form
- **Netlify Forms Integration** - Working contact form with spam protection
- **Email Notifications** - Receive messages directly in your inbox
- **Success/Error Handling** - Enhanced notifications with animations
- **Honeypot Protection** - Built-in spam filtering

### 📊 Portfolio Sections
- **Hero Section** - Dynamic introduction with animated elements
- **About Me** - Personal journey and education details
- **Tech Stack** - Visual representation of skills and technologies
- **Projects** - Filterable project showcase with live demos
- **Contact** - Multiple ways to get in touch

## 🛠 Tech Stack

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

## 📁 Project Structure

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

## 🚀 Getting Started

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

## 🚀 Deployment

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

## 📝 Contact Form Configuration

The contact form is configured to work with Netlify Forms:

```html
<form name="portfolio-contact" method="POST" data-netlify="true" action="/thank-you" netlify-honeypot="bot-field">
```

- **Spam Protection**: Includes honeypot field
- **Success Page**: Redirects to custom thank-you page
- **Email Notifications**: Configure in Netlify dashboard

## 🎨 Customization Guide

### Theme Colors
Update CSS variables in `style.css`:
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --accent-color: #f093fb;
  /* ... more variables */
}
```

### Adding New Projects
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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Modern web design trends and glassmorphism
- **Icons**: Font Awesome icon library
- **Fonts**: Google Fonts (Inter, Space Grotesk)
- **Hosting**: Netlify for reliable hosting and form handling

## 📞 Contact

**Tirth Patel**  
📧 Email: rushiofficial1205@gmail.com  
💼 LinkedIn: [tirth-patel-52a123343](https://linkedin.com/in/tirth-patel-52a123343)  
🐙 GitHub: [@rushhiii](https://github.com/rushhiii)  
🌐 Portfolio: [Portfolio Website](https://your-portfolio-url.netlify.app)

---

⭐ **Star this repository** if you found it helpful!

---

*Built with ❤️ by Tirth Patel*
