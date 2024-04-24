package com.ddib.notification.subscriptioncategory.service;

import com.ddib.notification.subscriptioncategory.domain.SubscriptionCategory;
import com.ddib.notification.subscriptioncategory.dto.request.SubscriptionCategoryRequestDto;
import com.ddib.notification.subscriptioncategory.repository.SubscriptionCategoryRepository;
import com.ddib.notification.user.domain.User;
import com.ddib.notification.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SubscriptionCategoryService {
    private final SubscriptionCategoryRepository subscriptionCategoryRepository;
    private final UserRepository userRepository;

//    public void createSubscriptionCategory(List<SubscriptionCategoryRequestDto> categories, Principal principal) {
//        User user = userRepository.findByEmail(principal.getName());
//
//        for (SubscriptionCategoryRequestDto category : categories) {
//            SubscriptionCategory subscriptionCategory = SubscriptionCategory.builder()
//                    .user(user)
//                    .subscriptionCategory(category.getSubscriptionCategory())
//                    .build();
//
//            subscriptionCategoryRepository.save(subscriptionCategory);
//        }
//    }

        public void createSubscriptionCategory(List<SubscriptionCategoryRequestDto> categories) {
            String email = "kn9012@naver.com";
            User user = userRepository.findByEmail(email);

            for (SubscriptionCategoryRequestDto category : categories) {
                SubscriptionCategory subscriptionCategory = SubscriptionCategory.builder()
                        .user(user)
                        .subscriptionCategory(category.getSubscriptionCategory())
                        .build();

                subscriptionCategoryRepository.save(subscriptionCategory);
            }
        }

//    @Transactional
//    public void deleteSubscriptionCategory(Principal principal) {
//        subscriptionCategoryRepository.deleteSubscriptionCategoriesByUserEmail(principal.getName());
//    }

    @Transactional
    public void deleteSubscriptionCategory(String email) {
        subscriptionCategoryRepository.deleteSubscriptionCategoriesByUserEmail(email);
    }
}
