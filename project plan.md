# Project Plan: UrbanOasis AI

## 1. Project Overview & Mission
UrbanOasis AI is a rapid-prototype, AI-driven web application designed to help urban planners and sustainability officers in India identify optimal locations for new "pocket parks."

**Mission:** To combat the Urban Heat Island (UHI) effect and improve citizen well-being by providing a smart, intuitive tool that instantly pinpoints "green space deserts." It replaces hours of manual data analysis with a simple, conversational query, enabling cities to make faster, more impactful environmental decisions.

This project is a serverless, front-end-only application. All logic, including the advanced AI agentic workflow, will run directly in the browser. All necessary geospatial and demographic data will be hardcoded as JSON objects to ensure speed and simplicity for this MVP.

## 2. Core Features & Functionality (MVP)
- **Interactive Map Display:** A map-centric UI will be the primary user interface. It will visually render a selected neighborhood, including existing parks and potential lots for development.

- **User Input Panel:** A simple and clean interface for the user to:
    - Select a target city and neighborhood from pre-defined dropdowns.
    - Enter a natural language query into a text box (e.g., "Find the best spots for new parks").

- **Dynamic Results Visualization:** Upon submitting a query, the application will:
    - Display the top 3 recommended locations as distinct pins on the map.
    - Show a clear, AI-generated "Reasoning Card" that explains the rationale behind each suggestion.

- **Agentic AI Workflow:** The core intelligence of the app. A sophisticated multi-step reasoning process, built with LangGraph.js, will run in the browser to analyze the user's request and the available data to produce expert-level recommendations.

## 3. Technology Stack & Architecture
- **Front-End Framework:** ReactJS for building the component-based user interface.
- **State Management:** React Hooks (useState, useEffect, useContext) for managing application state simply and effectively.
- **Agentic Workflow:** LangGraph.js to construct and run the multi-step AI agent graph directly in the browser.
- **LLM Provider:** Groq API for ultra-fast inference to power the language model nodes within our LangGraph agent. This ensures a responsive, real-time user experience.
- **Mapping Library:** A lightweight mapping library like Leaflet or Mapbox GL JS to render the interactive map and data overlays.
- **Styling:** Tailwind CSS for rapid, utility-first styling to create a clean and modern UI.
- **Architecture:** 100% Serverless & Client-Side. The application will be a single-page application (SPA) that runs entirely in the user's browser. There is no backend, no server, and no database, eliminating complexity and maximizing development speed.

## 4. Implementation Plan & Phases
This project will be executed in four distinct, sequential phases.

### Phase 1: Project Setup & Data Scaffolding (First 25 Minutes)
1.  **Initialize React App:** Create a new React application using create-react-app or Vite.
2.  **Install Dependencies:** Install all necessary libraries: langgraph, the Groq SDK, the chosen mapping library (e.g., react-leaflet), and tailwindcss.
3.  **Structure Project:** Create a clear folder structure: `components`, `data`, `hooks`, `agent`.
4.  **Hardcode Data:** Create a `data` folder. Inside, create a JSON file (e.g., `bangaloreData.js`). Populate this file with mock geospatial data for at least one neighborhood (e.g., Koramangala). This JSON object will contain:
    - `population_density_zones`
    - `existing_parks` (with names and coordinates)
    - `potential_lots` (with coordinates, size, and current land use like 'barren_land').
5.  **API Key Management:** Set up environment variables (`.env` file) to securely store the Groq API key.

### Phase 2: UI Component Development (Next 60 Minutes)
1.  **`MapDisplay` Component:**
    - Integrate the chosen mapping library.
    - Render the base map centered on the default neighborhood.
    - Implement logic to dynamically display markers (pins) based on props (for existing parks and new suggestions).
2.  **`InputPanel` Component:**
    - Create dropdowns for city and neighborhood selection (populated from the hardcoded JSON).
    - Create the text input for the user's natural language query.
    - Create the "Analyze" button.
    - Manage the component's state (selected city, query text).
3.  **`ResultsCard` Component:**
    - Design a component to display the text-based results.
    - It should conditionally render when results are available.
    - Style it to clearly present the AI's reasoning for each of the top 3 suggestions.
4.  **`App` Component (Main Layout):**
    - Assemble the main application layout using the components above (e.g., Input Panel on the left, Map Display on the right).
    - Manage the global state, passing data and functions down to child components as needed.

### Phase 3: Agentic Workflow with LangGraph.js (Next 75 Minutes)
This is the core logic of the application and will be developed in an `agent/urbanOasisAgent.js` file.

1.  **Define the Graph State:** Define the JavaScript object that will pass through the graph. It will contain fields like `userInput`, `neighborhoodData`, `potentialCandidates`, `rankedCandidates`, and `finalResponse`.
2.  **Create Agent Nodes:**
    - **`analyze_data_node`:** This node receives the user query and the hardcoded neighborhood data. Its function is to prompt the Groq LLM to perform an initial analysis: identify the core intent (find parks) and perform a first pass to identify "green space deserts" based on population and existing park data. It updates the state with a list of `potentialCandidates`.
    - **`rank_candidates_node`:** This node takes the `potentialCandidates`. It prompts the LLM again with a specific task: rank these candidates from 1 to N based on a combination of impact criteria (proximity to dense population, size, current land use). It updates the state with `rankedCandidates`.
    - **`generate_response_node`:** This node takes the top 3 `rankedCandidates`. It prompts the LLM a final time to generate the user-facing response: a concise, human-readable justification for each choice and the coordinates for map pinning. It populates the `finalResponse` field in the state.
3.  **Define Graph Edges & Logic:**
    - Set the `analyze_data_node` as the entry point.
    - Connect the nodes sequentially: `analyze_data_node` -> `rank_candidates_node` -> `generate_response_node`.
    - Set `generate_response_node` as the finish point.
4.  **Compile the Graph:** Use LangGraph's `compile()` method to create the runnable agent graph.
5.  **Integrate with UI:**
    - In the `App` component, create a function that is triggered by the "Analyze" button.
    - This function will call the compiled LangGraph agent, passing in the user's query and the relevant JSON data.
    - Use `await` to get the final result from the agent.
    - Update the React state with the results, which will cause the `MapDisplay` and `ResultsCard` to re-render with the new information.
    - Implement loading and error states to provide user feedback during the API call.

### Phase 4: Final Testing & Polish (Last 20 Minutes)
1.  **End-to-End Testing:** Run through the full user flow multiple times.
2.  **UI Polish:** Make final adjustments to styling, spacing, and layout using Tailwind CSS.
3.  **Code Cleanup:** Add comments and ensure the code is readable.

## 5. Timeline & Deliverables
- **Total Time:** 3 Hours
- **Deliverable:** A functional, client-side React MVP hosted on a service like Netlify or Vercel. The application will fulfill the core user story: a user can select a neighborhood, ask the AI for park suggestions, and see those suggestions visualized on a map with a clear, AI-generated rationale.
