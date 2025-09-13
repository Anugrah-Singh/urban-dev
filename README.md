# 🏙️ UrbanOasis AI

**AI-Powered Urban Planning for Sustainable Cities**

UrbanOasis AI is a sophisticated web application that leverages artificial intelligence to identify optimal locations for new parks and green spaces in urban environments. Built with React and powered by advanced AI models, it provides comprehensive analysis for urban planners, city officials, and environmental advocates.

## ✨ Features

### 🤖 AI-Powered Analysis
- **Advanced AI Agent**: Uses Groq's Llama-3.1-8b-instant model for intelligent park location recommendations
- **Geospatial Analysis**: Comprehensive analysis of population density, existing parks, and land availability
- **Smart Reasoning**: AI provides detailed explanations for each recommended location

### 🗺️ Interactive Mapping
- **Dynamic Maps**: Interactive maps powered by React-Leaflet and OpenStreetMap
- **Custom Markers**: Professional markers with priority indicators and animations
- **Multi-Neighborhood Support**: Coverage across 6 major Bangalore neighborhoods
- **Real-time Updates**: Live map updates with suggested locations

### 📊 Professional Dashboard
- **Real-time Analytics**: Live metrics and performance indicators
- **Progress Visualization**: Circular progress rings and trend analysis
- **Population Impact**: Calculate population served and coverage metrics
- **Cost Analysis**: Investment estimates and budget optimization

### 🔍 Advanced Filtering
- **Comprehensive Filters**: 20+ filter criteria for precise search
- **Multi-Category Search**: Filter by neighborhood, park type, priority level
- **Budget Controls**: Min/max budget range specification
- **Accessibility Options**: Special requirements and sustainability filters
- **Proximity Filters**: Distance to schools, transport, residential areas

### 🎨 Professional UI/UX
- **Modern Design**: Professional gradients, animations, and responsive layout
- **Smooth Animations**: Micro-interactions and loading states
- **Mobile Responsive**: Optimized for all screen sizes
- **Professional Styling**: Enterprise-level visual design

## 🗺️ Coverage Areas

### Bangalore Neighborhoods
- **Koramangala**: Tech hub with diverse demographics
- **Indiranagar**: Established residential area
- **Whitefield**: IT corridor with growing population
- **Jayanagar**: Traditional neighborhood with cultural heritage
- **Electronic City**: Major IT hub in south Bangalore  
- **HSR Layout**: Modern residential development

### Data Coverage
- **28+ Potential Locations**: Comprehensive site analysis
- **Detailed Demographics**: Population, age groups, income levels
- **Existing Parks Database**: Current green space inventory
- **Cost Estimates**: Investment requirements for each location
- **Suitability Ratings**: AI-powered priority scoring

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- Groq API key (free at [groq.com](https://groq.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Anugrah-Singh/urban-dev.git
   cd urban-dev
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your API keys:
   ```
   VITE_GROQ_API_KEY="your_groq_api_key_here"
   RAPIDAPI_KEY="your_rapidapi_key_here"  # Optional
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5173`

## 🔧 Configuration

### API Setup
1. **Groq API**: Sign up at [groq.com](https://groq.com) for free AI inference
2. **Environment Variables**: Copy `.env.example` to `.env` and add your keys
3. **Model Configuration**: Currently uses Llama-3.1-8b-instant (configurable)

### Customization
- **Add New Neighborhoods**: Update `src/data/bangaloreData.js`
- **Modify AI Prompts**: Edit `src/agent/urbanOasisAgent.js`
- **Customize UI**: Update Tailwind classes in components
- **Add New Filters**: Extend `src/components/AdvancedFilters.jsx`

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS
- **Mapping**: React-Leaflet, OpenStreetMap
- **AI Integration**: Groq SDK, Custom Agent Architecture
- **State Management**: React Hooks, Context API
- **Styling**: Tailwind CSS, Custom Animations

### Project Structure
```
src/
├── components/          # React components
│   ├── AdvancedFilters.jsx    # Search and filter modal
│   ├── Header.jsx             # Application header
│   ├── Footer.jsx             # Professional footer
│   ├── InputPanel.jsx         # User input interface
│   ├── MapDisplay.jsx         # Interactive map component
│   ├── ResultsCard.jsx        # AI results display
│   ├── StatsDashboard.jsx     # Analytics dashboard
│   └── UrbanOasisContainer.jsx # Main container
├── agent/              # AI agent logic
│   └── urbanOasisAgent.js     # Custom AI agent
├── data/               # Data and configurations
│   └── bangaloreData.js       # Neighborhood data
└── assets/             # Static assets
```

## 📈 Usage Examples

### Basic Analysis
1. Select a neighborhood from the dropdown
2. Choose your analysis type or use custom query
3. Click "Start AI Analysis" to get recommendations
4. View results on the interactive map

### Advanced Filtering
1. Click "Advanced Filters" in the input panel
2. Set criteria like budget range, park type, priority
3. Apply accessibility or sustainability requirements
4. View filtered results with active filter indicators

### Professional Reports
1. Use the analytics dashboard for metrics overview
2. Export location data for presentations
3. Share interactive map views with stakeholders
4. Generate cost-benefit analysis reports

## 🤝 Contributing

We welcome contributions to UrbanOasis AI! Here's how you can help:

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit with descriptive messages: `git commit -m 'feat: add amazing feature'`
5. Push to your branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Contribution Areas
- **New Neighborhoods**: Add more cities and areas
- **Enhanced AI**: Improve reasoning and analysis
- **UI/UX**: Design improvements and accessibility
- **Data Sources**: Integration with more data providers
- **Mobile App**: React Native version
- **3D Visualization**: Advanced mapping features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Groq** for providing fast AI inference capabilities
- **React-Leaflet** for excellent mapping components
- **OpenStreetMap** for open-source mapping data
- **Tailwind CSS** for utility-first styling
- **Bangalore Open Data** for urban planning insights

## 🔗 Links

- **Live Demo**: [Coming Soon]
- **Documentation**: [GitHub Wiki](https://github.com/Anugrah-Singh/urban-dev/wiki)
- **Issues**: [GitHub Issues](https://github.com/Anugrah-Singh/urban-dev/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Anugrah-Singh/urban-dev/discussions)

## 📞 Support

Need help? Here are your options:

- 📧 **Email**: Create an issue on GitHub
- 💬 **Discussions**: Use GitHub Discussions for questions
- 🐛 **Bug Reports**: Submit detailed bug reports via Issues
- 💡 **Feature Requests**: Suggest new features through Issues

---

<div align="center">
  <strong>Built with ❤️ for sustainable urban development</strong>
  <br>
  <br>
  <a href="https://github.com/Anugrah-Singh/urban-dev">⭐ Star this project</a> if you find it helpful!
</div>+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
