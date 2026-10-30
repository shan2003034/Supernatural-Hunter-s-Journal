package lk.bytecodelk.SupernaturalHunter.sJournal.service;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.stereotype.Service;

@Service
public class JournalAnalysisService {

    private final ChatModel chatModel;

    // Builder එකක් නොමැතිව කෙලින්ම ChatModel එක ලබා ගැනීම
    public JournalAnalysisService(ChatModel chatModel) {
        this.chatModel = chatModel;
    }

    public String analyzeParanormalEvidence(String userEvidence) {

        // System instructions සහ User Evidence එකට සම්බන්ධ කර සෘජුවම Prompt එක සෑදීම
        String promptInstruction = """
            You are an ancient, battle-hardened supernatural hunter and a master demonologist. 
            A terrified user has just described a series of paranormal events they experienced.
            Your task is to analyze their evidence and provide a highly detailed, terrifying, and extensive journal entry. 
            Do not be brief; be excessively descriptive, dark, and spine-chilling.
            
            Format your response strictly using the following Markdown headers:
            
            ## The Entity
            Identify the creature or spirit. Describe in chilling detail what this entity looks like and how it feeds on human fear.
            
            ## The Method of Defeat
            Explain the exact, ancient methods required to banish or kill it. Be specific about the lore.
            
            ## The Imminent Danger
            Warn the user of what will happen if they fail to act immediately. Make it sound urgent and fatal.
            
            ## The Lore (A Dark Tale)
            Invent a chilling, extensive backstory or a historical case study about this specific entity. End the story with a sinister thought.
            
            Do not break character. Start immediately with the entity identification.
            
            User Evidence:
            """ + userEvidence;

        // පැරණි සංස්කරණයේ ආකාරයටම සෘජුවම String එකක් යවා AI පිළිතුර ලබා ගැනීම
        return chatModel.call(promptInstruction);
    }
}