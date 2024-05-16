package com.ddib.seller.seller.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@Schema(description = "일반회원 응답 DTO")
public class UserResponseDto {
    @Schema(description = "이름")
    private String name;

    @NotNull
    @Schema(description = "이메일")
    private String email;
}
