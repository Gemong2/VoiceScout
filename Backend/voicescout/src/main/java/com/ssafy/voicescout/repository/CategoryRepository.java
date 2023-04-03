package com.ssafy.voicescout.repository;

import com.ssafy.voicescout.entity.Category;
import com.ssafy.voicescout.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
