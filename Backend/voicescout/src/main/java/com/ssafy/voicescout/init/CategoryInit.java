package com.ssafy.voicescout.init;

import com.ssafy.voicescout.entity.Category;
import com.ssafy.voicescout.repository.CategoryRepository;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CategoryInit {
  private final CategoryRepository categoryRepository;

  @PostConstruct
  public void init() {
    Category category1 = Category.builder()
        .type(0)
        .genre("대출 사칭형")
        .discription("금융기관을 사칭, 피싱사이트로 유인하여 피해자 명의로 대출 편취하는 사기 수법")
        .build();
    Category category2 = Category.builder()
        .type(1)
        .genre("수사기관 사칭형")
        .discription("수사기관을 사칭하여 피해자를 기망하여 금전 편취하는 사기 수법")
        .build();
    Category category3 = Category.builder()
        .type(2)
        .genre("지인 사칭형")
        .discription("지인이나 기관 등을 사칭해 문자나 전화로 돈을 요구하는 사기 수법")
        .build();
      categoryRepository.save(category1);
      categoryRepository.save(category2);
      categoryRepository.save(category3);
  }
}
