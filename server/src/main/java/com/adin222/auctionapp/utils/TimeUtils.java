package com.adin222.auctionapp.utils;

import java.time.Duration;
import java.time.LocalDateTime;

public class TimeUtils {

    public static String getAuctionStatus(LocalDateTime endDate) {
        return endDate.isBefore(LocalDateTime.now()) ? "CLOSED" : "OPEN";
    }

    public static String calculateTimeLeft(LocalDateTime endDate) {
        LocalDateTime now = LocalDateTime.now();
        if (endDate.isBefore(now)) {
            return "0s";
        }

        Duration duration = Duration.between(now, endDate);

        long days = duration.toDays();
        long hours = duration.minusDays(days).toHours();
        long minutes = duration.minusDays(days).minusHours(hours).toMinutes();
        long seconds = duration.minusDays(days).minusHours(hours).minusMinutes(minutes).getSeconds();

        StringBuilder sb = new StringBuilder();
        if (days > 0)    sb.append(days).append("d ");
        if (hours > 0)   sb.append(hours).append("h ");
        if (minutes > 0) sb.append(minutes).append("m ");
        if (seconds > 0) sb.append(seconds).append("s");

        return sb.toString().trim();
    }
}
