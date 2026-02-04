"use client";

import { useEffect, useState } from "react";

const MY_TIMEZONE = "Europe/London";
const MY_LOCATION = "Goodmayes, England, United Kingdom";

function formatTime(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

function getOffsetMinutes(date: Date, timeZone: string): number {
  const utcMins = date.getUTCHours() * 60 + date.getUTCMinutes();
  const tzStr = date.toLocaleString("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const [h, m] = tzStr.split(":").map(Number);
  let tzMins = (h ?? 0) * 60 + (m ?? 0);
  let diff = tzMins - utcMins;
  if (diff > 12 * 60) diff -= 24 * 60;
  if (diff < -12 * 60) diff += 24 * 60;
  return diff;
}

function formatTimeDifference(myTz: string, visitorTz: string): string {
  const d = new Date();
  const myOffset = getOffsetMinutes(d, myTz);
  const visitorOffset = getOffsetMinutes(d, visitorTz);
  const diffMinutes = visitorOffset - myOffset;
  if (diffMinutes === 0) return "Same time";
  const absHours = Math.abs(diffMinutes) / 60;
  const absMins = Math.abs(diffMinutes) % 60;
  const hStr =
    absHours >= 1
      ? `${Math.floor(absHours)}h`
      : "";
  const mStr = absMins > 0 ? `${absMins}m` : "";
  const parts = [hStr, mStr].filter(Boolean);
  const diffStr = parts.join(" ");
  return diffMinutes > 0
    ? `You're ${diffStr} ahead`
    : `You're ${diffStr} behind`;
}

function useCurrentTime(timeZone: string) {
  const [time, setTime] = useState("");
  useEffect(() => {
    setTime(formatTime(new Date(), timeZone));
    const id = setInterval(
      () => setTime(formatTime(new Date(), timeZone)),
      1000
    );
    return () => clearInterval(id);
  }, [timeZone]);
  return time;
}

interface VisitorLocation {
  city: string;
  region: string;
  country: string;
  timezone: string;
}

export default function TimeBar() {
  const myTime = useCurrentTime(MY_TIMEZONE);
  const [visitorLocation, setVisitorLocation] = useState<VisitorLocation | null>(
    null
  );
  const [visitorTime, setVisitorTime] = useState("");

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => {
        if (!res.ok) throw new Error("Geo failed");
        return res.json();
      })
      .then((data) => {
        const tz =
          data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
        setVisitorLocation({
          city: data.city ?? "",
          region: data.region ?? "",
          country: data.country_name ?? "",
          timezone: tz,
        });
      })
      .catch(() => {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setVisitorLocation({
          city: "",
          region: "",
          country: "",
          timezone: tz,
        });
      });
  }, []);

  useEffect(() => {
    if (!visitorLocation) return;
    setVisitorTime(formatTime(new Date(), visitorLocation.timezone));
    const id = setInterval(
      () => setVisitorTime(formatTime(new Date(), visitorLocation.timezone)),
      1000
    );
    return () => clearInterval(id);
  }, [visitorLocation]);

  const visitorPlace =
    visitorLocation &&
    [visitorLocation.city, visitorLocation.region, visitorLocation.country]
      .filter(Boolean)
      .join(", ");

  const timeDiff =
    visitorLocation?.timezone
      ? formatTimeDifference(MY_TIMEZONE, visitorLocation.timezone)
      : null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-10 bg-black/90 backdrop-blur-sm border-b border-gray-800/50 flex items-center">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between items-center text-xs font-space-grotesk font-medium tracking-wide text-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 uppercase">My time</span>
            <span className="text-white tabular-nums">{myTime || "—"}</span>
            <span>{MY_LOCATION}</span>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 text-gray-500">
            {timeDiff ?? "—"}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 uppercase">Your time</span>
            <span className="text-white tabular-nums">
              {visitorTime || "—"}
            </span>
            <span>
              {visitorPlace || visitorLocation?.timezone || "—"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
