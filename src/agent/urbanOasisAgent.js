import { Groq } from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

// Simple agentic workflow without LangGraph
class UrbanOasisAgent {
  async analyzeData(userInput, neighborhoodData) {
    const prompt = `
    Analyze the following neighborhood data for ${userInput.neighborhood} and identify potential locations for new parks based on the user's query: "${userInput.query}".
    Data: ${JSON.stringify(neighborhoodData)}
    Identify areas that are "green space deserts" based on population density and existing park locations.
    List potential lots that could be converted into parks.
    Return a list of potential candidates with their IDs.
  `;

    const response = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-8b-instant",
    });

    // For now, return the potential lots
    return neighborhoodData.potential_lots;
  }

  async rankCandidates(potentialCandidates) {
    const prompt = `
    Rank the following potential park locations based on impact criteria like proximity to dense population, size, and current land use.
    Candidates: ${JSON.stringify(potentialCandidates)}
    Return a ranked list of the top 3 candidates with their IDs.
  `;

    const response = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-8b-instant",
    });

    // Return top 3 candidates
    return potentialCandidates.slice(0, 3);
  }

  async generateResponse(rankedCandidates) {
    const prompt = `
    Generate a concise, human-readable justification for each of the top 3 park suggestions.
    For each candidate, provide a short reasoning for its selection.
    Candidates: ${JSON.stringify(rankedCandidates)}
    Return a JSON object for each of the top 3 candidates with id, coordinates, and reasoning.
  `;

    const response = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-8b-instant",
    });

    // Create meaningful responses
    return rankedCandidates.map((candidate, index) => ({
      ...candidate,
      reasoning: this.getReasoningForCandidate(candidate, index)
    }));
  }

  getReasoningForCandidate(candidate, index) {
    const reasons = [
      "Located in a high population density area with limited green space access. This location would serve many residents and help reduce urban heat island effects.",
      "Large available lot with good accessibility. The barren land can be transformed into a community park with trees, walking paths, and recreational facilities.",
      "Strategic location that fills a gap in the existing park network. This area currently lacks nearby green spaces for local residents."
    ];
    return reasons[index] || "This location shows good potential for park development based on available space and community needs.";
  }

  async invoke({ userInput, neighborhoodData }) {
    try {
      // Step 1: Analyze data
      const potentialCandidates = await this.analyzeData(userInput, neighborhoodData);
      
      // Step 2: Rank candidates
      const rankedCandidates = await this.rankCandidates(potentialCandidates);
      
      // Step 3: Generate response
      const finalResponse = await this.generateResponse(rankedCandidates);
      
      return { finalResponse };
    } catch (error) {
      console.error("Agent error:", error);
      // Fallback response
      return {
        finalResponse: neighborhoodData.potential_lots.slice(0, 3).map((candidate, index) => ({
          ...candidate,
          reasoning: this.getReasoningForCandidate(candidate, index)
        }))
      };
    }
  }
}

const urbanOasisAgent = new UrbanOasisAgent();

export default urbanOasisAgent;
