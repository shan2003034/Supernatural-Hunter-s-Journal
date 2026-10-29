package lk.bytecodelk.SupernaturalHunter.sJournal.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "hunt_history")
@Data
public class HuntRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 2000, nullable = false)
    private String userEvidence;

    @Column(length = 100)
    private String entityType;

    @Column(length = 50)
    private String audioTheme;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String fullAnalysis;

    private LocalDateTime encounteredAt;

    @PrePersist
    protected void onCreate() {
        encounteredAt = LocalDateTime.now();
    }
}
