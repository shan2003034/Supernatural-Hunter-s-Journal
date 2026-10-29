package lk.bytecodelk.SupernaturalHunter.sJournal.repository;

import lk.bytecodelk.SupernaturalHunter.sJournal.entity.HuntRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HuntRecordRepository extends JpaRepository<HuntRecord, Long> {
    List<HuntRecord> findAllByOrderByEncounteredAtDesc();
}