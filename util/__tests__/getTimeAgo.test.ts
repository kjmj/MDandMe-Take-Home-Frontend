import { getTimeAgo } from "@/util/getTimeAgo";

describe("getTimeAgo", () => {
  it('should return "just now" for a date within the last minute', () => {
    const now = new Date();
    const result = getTimeAgo(now);
    expect(result).toBe("just now");
  });

  it('should return "1m" for a date that is 1 minute ago', () => {
    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);
    const result = getTimeAgo(oneMinuteAgo);
    expect(result).toBe("1m");
  });

  it('should return "2m" for a date that is 2 minutes ago', () => {
    const now = new Date();
    const twoMinutesAgo = new Date(now.getTime() - 2 * 60 * 1000);
    const result = getTimeAgo(twoMinutesAgo);
    expect(result).toBe("2m");
  });

  it('should return "1h" for a date that is 1 hour ago', () => {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const result = getTimeAgo(oneHourAgo);
    expect(result).toBe("1h");
  });

  it('should return "2h" for a date that is 2 hours ago', () => {
    const now = new Date();
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
    const result = getTimeAgo(twoHoursAgo);
    expect(result).toBe("2h");
  });

  it('should return "1d" for a date that is 1 day ago', () => {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const result = getTimeAgo(oneDayAgo);
    expect(result).toBe("1d");
  });

  it('should return "3d" for a date that is 3 days ago', () => {
    const now = new Date();
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
    const result = getTimeAgo(threeDaysAgo);
    expect(result).toBe("3d");
  });
});
