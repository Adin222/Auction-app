package com.adin222.auctionapp.Interceptor;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import com.adin222.auctionapp.config.RequireToken;

@Component
public class TokenInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        if (handler instanceof HandlerMethod handlerMethod) {
            boolean required = handlerMethod.getMethod().isAnnotationPresent(RequireToken.class)
                    || handlerMethod.getBeanType().isAnnotationPresent(RequireToken.class);

            if (required) {
                String token = null;
                if (request.getCookies() != null) {
                    for (Cookie cookie : request.getCookies()) {
                        if (cookie.getName().equals("accessToken")) {
                            token = cookie.getValue();
                            break;
                        }
                    }
                }

                if (token == null || token.isEmpty()) {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized - No access token (cookie)");
                    return false;
                }
            }
        }
        return true;
    }
}

