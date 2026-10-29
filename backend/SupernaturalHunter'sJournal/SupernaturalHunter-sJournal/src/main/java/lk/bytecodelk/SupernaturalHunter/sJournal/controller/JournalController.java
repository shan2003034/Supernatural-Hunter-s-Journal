package lk.bytecodelk.SupernaturalHunter.sJournal.controller;

import lk.bytecodelk.SupernaturalHunter.sJournal.entity.HuntRecord;
import lk.bytecodelk.SupernaturalHunter.sJournal.repository.HuntRecordRepository;
import lk.bytecodelk.SupernaturalHunter.sJournal.service.JournalAnalysisService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/journal")
@CrossOrigin(origins = "*")
public class JournalController {

    private final JournalAnalysisService analysisService;
    private final HuntRecordRepository recordRepository;

    public JournalController(JournalAnalysisService analysisService, HuntRecordRepository recordRepository) {
        this.analysisService = analysisService;
        this.recordRepository = recordRepository;
    }

    @PostMapping("/analyze")
    public ResponseEntity<?> analyzeEvidence(@RequestBody Map<String, String> request) {
        try {
            String evidence = request.get("evidence");

            String aiResponse = analysisService.analyzeParanormalEvidence(evidence);
            String entityType = extractEntityName(aiResponse);


            String audioTheme = determineAudioTheme(entityType);

            HuntRecord record = new HuntRecord();
            record.setUserEvidence(evidence);
            record.setFullAnalysis(aiResponse);
            record.setEntityType(entityType);
            record.setAudioTheme(audioTheme);

            HuntRecord savedRecord = recordRepository.save(record);

            return ResponseEntity.ok(savedRecord);

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body(Map.of(
                            "error", "The spiritual connection was violently severed. Make sure the ritual (Ollama) is running in the background.",
                            "details", e.getMessage()
                    ));
        }
    }

    @GetMapping("/history")
    public ResponseEntity<List<HuntRecord>> getHuntHistory() {
        List<HuntRecord> history = recordRepository.findAllByOrderByEncounteredAtDesc();
        return ResponseEntity.ok(history);
    }

    private String extractEntityName(String aiResponse) {
        Pattern pattern = Pattern.compile("(?i)(Classification|Entity)(?:\\s|:)+(.*?)(?:\\n|\\r|\\*|$)");
        Matcher matcher = pattern.matcher(aiResponse);
        if (matcher.find()) {
            return matcher.group(2).trim();
        }
        return "Unknown Spirit";
    }


    private String determineAudioTheme(String entityType) {
        String lowerEntity = entityType.toLowerCase();
        if (lowerEntity.contains("demon")) return "demon_growl.mp3";
        if (lowerEntity.contains("poltergeist")) return "glass_shatter.mp3";
        if (lowerEntity.contains("wendigo") || lowerEntity.contains("beast")) return "creepy_woods.mp3";
        if (lowerEntity.contains("spirit") || lowerEntity.contains("ghost")) return "whispers.mp3";

        return "heartbeat.mp3";
    }
}